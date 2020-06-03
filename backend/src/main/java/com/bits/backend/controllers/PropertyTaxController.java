package com.bits.backend.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bits.backend.models.TaxDetails;
import com.bits.backend.models.Discount;
import com.bits.backend.services.PropertyTaxService;


@RestController
@RequestMapping("api/v1/property-tax")
public class PropertyTaxController {

	Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private PropertyTaxService ptService;
	
	@PostMapping("/calculate")
	public HttpEntity<TaxDetails> calculatePropertTax(@RequestBody TaxDetails taxDetails) {
		/**
		 * Request body = {
		 * 	email: String,
		 *  zone: char,
		 *  area: double,
		 *  selfOccupied: boolean
		 * }
		 * OR
		 * {
		 * 	email: String,
		 * 	zone: char,
		 *  area: double,
		 *  discountRaised: boolean,
		 *  discount: double,
		 *  selfOccupied: boolean
		 *  }
		 */
		
		log.info(taxDetails.toString());
		HttpStatus status;
		TaxDetails response;
		double taxRate = 0;
		switch(taxDetails.getZone()) {
		
			case 'A':
			case 'a':
				taxRate = 2.5;
				break;
			case 'B':
			case 'b':
				taxRate = 2;
				break;
			case 'C':
			case 'c':
				taxRate = 1.8;
				break;
			case 'D':
			case 'd':
				taxRate = 1.6;
				break;
			case 'E':
			case 'e':
				taxRate = 1.2;
				break;
			case 'F':
			case 'f':
			default:
				taxRate = 1;
		}
		
		taxRate = (taxDetails.getSelfOccupied())?taxRate: 2*taxRate;

		taxDetails.setTaxPayable(taxRate * taxDetails.getArea());
		taxDetails.setDateCreated(LocalDate.now());
		taxDetails.setDateModified(LocalDateTime.now());

		if(ptService.insertTaxDetails(taxDetails)) {
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
		List<TaxDetails> tdList = ptService.getTaxDetailsByUser(email);
		if(tdList.isEmpty())
			status = HttpStatus.NOT_FOUND;
		else status = HttpStatus.OK;

		HttpEntity<List<TaxDetails>> res = new ResponseEntity<List<TaxDetails>>(tdList, status);
		return res;
	}

	@PatchMapping("/pay/{id}")
	public HttpEntity<TaxDetails> payTax(@PathVariable Long id){
		HttpStatus status;
		TaxDetails response;

		if(ptService.payTax(id)){
			status = HttpStatus.OK;
			response = ptService.findById(id);
		}
		else{
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			response = new TaxDetails();
		}

		HttpEntity<TaxDetails> res = new ResponseEntity<TaxDetails>(response, status);
		return res;
	}

	@PatchMapping("/raise-discount")
	public HttpEntity<TaxDetails> raiseDiscount(@RequestBody Discount discount){
	/**
	 * Request body = {
	 * 	id: long,
	 * 	discount: double
	 * }
	 * 
	 */
		HttpStatus status;
		TaxDetails response;
		if(ptService.raiseDiscount(discount.getId(), discount.getDiscount())){
			status = HttpStatus.OK;
			response = ptService.findById(discount.getId());
		}
		else{
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			response = new TaxDetails();
		}

		HttpEntity<TaxDetails> res = new ResponseEntity<TaxDetails>(response, status);
		return res;
	}

	@GetMapping("/send-for-approval/{id}")
	public HttpEntity<TaxDetails> sendForApproval(@PathVariable Long id) {
		
		HttpStatus status;
		TaxDetails response;

		if(ptService.sendForApproval(id)){
			status = HttpStatus.OK;
			response = ptService.findById(id);
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
		List<TaxDetails> tdList =  ptService.getDiscountRaised();

		if(!tdList.isEmpty())
			status = HttpStatus.OK;

		HttpEntity<List<TaxDetails>> res = new ResponseEntity<List<TaxDetails>>(tdList, status);
		return res;
	}

	@GetMapping("/approval-pending")
	public HttpEntity<List<TaxDetails>> getApprovalPending(){
		HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

		List<TaxDetails> tdList = ptService.getSentForApproval();
		if(!tdList.isEmpty())
			status = HttpStatus.OK;
		
		HttpEntity<List<TaxDetails>> res = new ResponseEntity<List<TaxDetails>>(tdList, status);
		return res;
	}
	
	@GetMapping("/approve-discount/{id}")
	public HttpEntity<TaxDetails> approveDiscount(@PathVariable Long id){
		
		HttpStatus status = HttpStatus.OK;
		TaxDetails response = ptService.approveDiscount(id);
		if(response.getDateCreated() == null)
			status = HttpStatus.INTERNAL_SERVER_ERROR;

		HttpEntity<TaxDetails> res = new ResponseEntity<TaxDetails>(response, status);
		return res;
	}
}
