package com.bits.backend.controllers;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bits.backend.models.TaxDetails;
import com.bits.backend.services.PropertyTaxService;

@RestController
@RequestMapping("api/v1/property-tax")
public class PropertyTaxController {

	Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private PropertyTaxService ptService;
	
	@PostMapping("/calculate")
	public HttpEntity<String> calculatePropertTax(@RequestBody TaxDetails taxDetails) {
		/**
		 * Request body = {
		 * 	email: String,
		 *  zone: char,
		 *  area: double,
		 * }
		 * OR
		 * {
		 * 	email: String,
		 * 	zone: char,
		 *  area: double,
		 *  discountRaised: boolean,
		 *  discount: double
		 *  }
		 */
		
		log.info(taxDetails.toString());
		HttpStatus status;
		String response;
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
		
		taxDetails.setTaxPayable(taxRate * taxDetails.getArea());
		taxDetails.setDateCreated(LocalDateTime.now());
		taxDetails.setDateModified(LocalDateTime.now());
		if(ptService.insertTaxDetails(taxDetails)) {
			status = HttpStatus.OK;
			response = taxDetails.toString();
		}
		else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			response = "Something Went Wrong!";
		}
		
		HttpEntity<String> res = new ResponseEntity<String>(response, status);
		return res;
	}
}
