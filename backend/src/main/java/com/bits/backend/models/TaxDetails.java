package com.bits.backend.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Getter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TaxDetails {
	@Id
	@Column(name ="id", unique=true)
	private long id;
	@Column(name ="email")
	private String email;
	@Column(name="zone")
	private char zone;
	@Column(name="area")
	private double area;
	@Column(name ="tax_payable")
	private double taxPayable;
	@Column(name="paid")
	private boolean paid;
	@Column(name="discount_raised")
	private boolean discountRaised;
	@Column(name="discount_approved")
	private boolean discountApproved;
	@Column(name="discount")
	private double discount;
	@Column(name="date_created")
	private LocalDateTime dateCreated;
	@Column(name="date_modified")
	private LocalDateTime dateModified;
	
	
	public TaxDetails(String email, double taxPayable, char zone, double area) {
	
		this.email = email;
		this.taxPayable = taxPayable;
		this.paid = false;
		this.discountRaised = false;
		this.discountApproved = false;
		this.discount = 0;
		this.area = area;
		this.zone = zone;
		this.dateCreated = LocalDateTime.now();
		this.dateModified = LocalDateTime.now();
	}
	
	public TaxDetails(String email, double taxPayable, char zone, double area, boolean discountRaised, double discount) {
		
		this.email = email;
		this.taxPayable = taxPayable;
		this.paid = false;
		this.zone = zone;
		this.area = area;
		this.discountRaised = discountRaised;
		this.discountApproved = false;
		this.discount = discount;
		this.dateCreated = LocalDateTime.now();
		this.dateModified = LocalDateTime.now();
	}
	
	

}