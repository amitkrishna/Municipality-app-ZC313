package com.bits.backend.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.bits.backend.model.Property;
import com.bits.backend.service.PropertyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bits.backend.model.TaxDetails;
import com.bits.backend.service.TaxService;


@RestController
@RequestMapping("api/v1/property-tax")
public class TaxController {

	static final double DISCOUNT = 0.125;
	Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private TaxService taxService;

	@Autowired
	private PropertyService propertyService;
	
	@PostMapping("/calculate")
	public HttpEntity<TaxDetails> calculatePropertyTax(@RequestBody TaxDetails taxDetails) {
		/**
		 * Request body = {
		 * 	email: String,
		 *  propertyId: long
		 *  selfOccupied: boolean
		 * }
		 * OR
		 * {
		 * 	email: String,
		 * 	propertyId: long
		 *  discountRaised: boolean,
		 *  selfOccupied: boolean
		 *  }
		 */
		
		log.info(taxDetails.toString());
		HttpStatus status;
		TaxDetails response;
		Property p = propertyService.findPropertyById(taxDetails.getPropertyId());

		double taxRate = 0;
		switch(p.getZone()) {
		
			case "A":
			case "a":
				taxRate = 25;
				break;
			case "B":
			case "b":
				taxRate = 20;
				break;
			case "C":
			case "c":
				taxRate = 18;
				break;
			case "D":
			case "d":
				taxRate = 16;
				break;
			case "E":
			case "e":
				taxRate = 12;
				break;
			case "F":
			case "f":
			default:
				taxRate = 10;
		}
		
		taxRate = (taxDetails.isSelfOccupied())?taxRate: 2*taxRate;
		double taxPayable = taxRate * p.getArea();

		if(taxDetails.isDiscountRaised()){
			double discountAmt = DISCOUNT * taxPayable;
			taxPayable = taxPayable - discountAmt;
			taxDetails.setDiscount(discountAmt);
		}
		
		taxDetails.setTaxPayable(taxPayable);
		taxDetails.setDateCreated(LocalDate.now());
		taxDetails.setDateModified(LocalDateTime.now());

		if(taxService.insertTaxDetails(taxDetails)) {
			status = HttpStatus.CREATED;
			response = taxDetails;
		}
		else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			response = new TaxDetails();
		}
		
		HttpEntity<TaxDetails> res = new ResponseEntity<TaxDetails>(response, status);
		return res;
	}

	@GetMapping("/show/{email}")
	public HttpEntity<List<TaxDetails>> getTaxDetailsByUser(@PathVariable String email){

		HttpStatus status;
		List<TaxDetails> tdList = taxService.getTaxDetailsByUser(email);
		if(tdList.isEmpty())
			status = HttpStatus.NOT_FOUND;
		else status = HttpStatus.OK;

		HttpEntity<List<TaxDetails>> res = new ResponseEntity<List<TaxDetails>>(tdList, status);
		return res;
	}

	@GetMapping("/pay/{id}")
	public HttpEntity<TaxDetails> payTax(@PathVariable Long id){
		HttpStatus status;
		TaxDetails response;

		if(taxService.payTax(id)){
			status = HttpStatus.OK;
			response = taxService.findById(id);
		}
		else{
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			response = new TaxDetails();
		}

		HttpEntity<TaxDetails> res = new ResponseEntity<TaxDetails>(response, status);
		return res;
	}

	@GetMapping("/raise-discount/{id}")
	public HttpEntity<TaxDetails> raiseDiscount(@PathVariable long id){
		HttpStatus status;
		TaxDetails response;

		TaxDetails td = taxService.findById(id);
		if(td.isDiscountRaised()){
			status = HttpStatus.CONFLICT;
			response = new TaxDetails();
		}
		else{
			double taxPayable = td.getTaxPayable();
			double discount = DISCOUNT * taxPayable;
			log.info("Discount:"+discount);
			td.setDiscountRaised(true);
			td.setDiscount(discount);
			td.setTaxPayable(taxPayable - discount);
			if(taxService.raiseDiscount(id, discount)){
				status = HttpStatus.OK;
				response = td;
			}
			else{
				status = HttpStatus.INTERNAL_SERVER_ERROR;
				response = new TaxDetails();
			}
		}
		HttpEntity<TaxDetails> res = new ResponseEntity<TaxDetails>(response, status);
		return res;
	}

	@GetMapping("/send-for-approval/{id}")
	public HttpEntity<TaxDetails> sendForApproval(@PathVariable Long id) {
		
		HttpStatus status;
		TaxDetails response;

		if(taxService.sendForApproval(id)){
			status = HttpStatus.OK;
			response = taxService.findById(id);
		}
		else{
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			response = new TaxDetails();
		}

		HttpEntity<TaxDetails> res = new ResponseEntity<TaxDetails>(response, status);
		return res;
	}

	@GetMapping("/discount-raised")
	public HttpEntity<List<TaxDetails>> getDiscountRaised(){
		HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
		List<TaxDetails> tdList =  taxService.getDiscountRaised();

		if(!tdList.isEmpty())
			status = HttpStatus.OK;

		HttpEntity<List<TaxDetails>> res = new ResponseEntity<List<TaxDetails>>(tdList, status);
		return res;
	}

	@GetMapping("/approval-pending")
	public HttpEntity<List<TaxDetails>> getApprovalPending(){
		HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

		List<TaxDetails> tdList = taxService.getSentForApproval();
		if(!tdList.isEmpty())
			status = HttpStatus.OK;
		
		HttpEntity<List<TaxDetails>> res = new ResponseEntity<List<TaxDetails>>(tdList, status);
		return res;
	}
	
	@GetMapping("/approve-discount/{id}")
	public HttpEntity<TaxDetails> approveDiscount(@PathVariable Long id){
		
		HttpStatus status = HttpStatus.OK;
		TaxDetails response = taxService.approveDiscount(id);
		if(response.getDateCreated() == null)
			status = HttpStatus.INTERNAL_SERVER_ERROR;

		HttpEntity<TaxDetails> res = new ResponseEntity<TaxDetails>(response, status);
		return res;
	}
}
