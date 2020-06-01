package com.bits.backend.services;

import com.bits.backend.models.TaxDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bits.backend.repository.TaxDetailsRepository;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PropertyTaxServices {
	
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
			tdRepo.updatePaymentStatus(id);
		}
		catch(Exception e) {
			log.info(e.getMessage());
			return false;
		}
		
		return true;
	}
	
	public boolean raiseDiscount(Long id) {
		
		try {
			tdRepo.updateDiscountRaised(id);
		}
		catch(Exception e) {
			log.info(e.getMessage());
			return false;
		}
		return true;
	}
	
	public boolean approveDiscount(Long id) {
		
		try {
		
			tdRepo.updateDiscountApproved(id);
		}
		catch(Exception e) {
			log.info(e.getMessage());
			return false;
		}
		return true;
	}
}
