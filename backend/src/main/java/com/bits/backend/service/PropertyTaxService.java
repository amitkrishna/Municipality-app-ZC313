package com.bits.backend.service;

import com.bits.backend.model.TaxDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bits.backend.repository.TaxDetailsRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PropertyTaxService {
	
	Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private TaxDetailsRepository tdRepo;
	
	public boolean insertTaxDetails(TaxDetails taxDetails) {
		
		try {
			tdRepo.save(taxDetails);
			return true;
		}
		catch(Exception e) {
			
			log.info(e.getMessage());
			return false;
			
		}
	}
	
	public List<TaxDetails> getTaxDetailsByUser(String email){
		
		List<TaxDetails> taxDetails = new ArrayList<>();
		
		try {
			tdRepo.findByEmail(email).forEach(taxDetails::add);
		}
		catch(Exception e) {
			log.info(e.getMessage());
		}
		
		return taxDetails;
	}
	
	public List<TaxDetails> getUnpaidByUser(String email){
		
		List<TaxDetails> taxDetails = new ArrayList<>();

		try {
			tdRepo.findUnpaidByUser(email).forEach(taxDetails::add);
		}
		catch(Exception e) {
			log.info(e.getMessage());
		}
		
		return taxDetails;
	}
	
	public boolean payTax(Long id) {
		
		try {
			tdRepo.updatePaymentStatus(id, LocalDateTime.now());
		}
		catch(Exception e) {
			log.info(e.getMessage());
			return false;
		}
		
		return true;
	}
	
	public boolean raiseDiscount(Long id, double discount) {
		
		try {
			tdRepo.updateDiscountRaised(id, discount, LocalDateTime.now());
		}
		catch(Exception e) {
			log.info(e.getMessage());
			return false;
		}
		return true;
	}
	
	public TaxDetails approveDiscount(Long id) {
		
		double updatedTax = 0;
		TaxDetails td = new TaxDetails();
		try {

			td = tdRepo.findTaxDetailsById(id);
			if(!td.isDiscountApproved()){
				updatedTax = td.getTaxPayable() - td.getDiscount();
				tdRepo.updateDiscountApproved(id, updatedTax, LocalDateTime.now());
			}
		}
		catch(Exception e) {
			log.info(e.getMessage());
		}
		return td;
	}

	public boolean sendForApproval(Long id) {
		try{
			tdRepo.updateSentForApproval(id, LocalDateTime.now());
		}
		catch(Exception e){
			log.info(e.getMessage());
			return false;
		}
		return true;
	}

	public List<TaxDetails> getDiscountRaised(){

		List<TaxDetails> taxDetails = new ArrayList<>();
		try{
			tdRepo.findAllDiscountRaised().forEach(taxDetails::add);
		}
		catch(Exception e){
			log.info(e.getMessage());
			return taxDetails;
		}
		return taxDetails;
		
	}

	public List<TaxDetails> getSentForApproval(){

		List<TaxDetails> taxDetails = new ArrayList<>();
		try{
			tdRepo.findAllSentForApproval().forEach(taxDetails::add);
		}
		catch(Exception e){
			log.info(e.getMessage());
			return taxDetails;
		}
		return taxDetails;
	}

	public TaxDetails findById(Long id){

		try{
			return tdRepo.findTaxDetailsById(id);
		}
		catch(Exception e){
			log.info(e.getMessage());
			return new TaxDetails();
		}
	}
}
