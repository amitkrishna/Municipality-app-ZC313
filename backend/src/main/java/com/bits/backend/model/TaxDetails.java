package com.bits.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "email", "zone", "date_created" }))
@Entity
public class TaxDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	private LocalDate dateCreated;
	

	@Column(name="date_modified")
	private LocalDateTime dateModified;

	@Column(name="self_occupied")
	private boolean selfOccupied;

	@Column(name="sent_for_approval")
	private boolean sentForApproval;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public char getZone() {
		return zone;
	}

	public void setZone(char zone) {
		this.zone = zone;
	}

	public double getArea() {
		return area;
	}

	public void setArea(double area) {
		this.area = area;
	}

	public double getTaxPayable() {
		return taxPayable;
	}

	public void setTaxPayable(double taxPayable) {
		this.taxPayable = taxPayable;
	}

	public boolean isPaid() {
		return paid;
	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}

	public boolean isDiscountRaised() {
		return discountRaised;
	}

	public void setDiscountRaised(boolean discountRaised) {
		this.discountRaised = discountRaised;
	}

	public boolean isDiscountApproved() {
		return discountApproved;
	}

	public void setDiscountApproved(boolean discountApproved) {
		this.discountApproved = discountApproved;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public LocalDate getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(LocalDate dateCreated) {
		this.dateCreated = dateCreated;
	}

	public LocalDateTime getDateModified() {
		return dateModified;
	}

	public void setDateModified(LocalDateTime dateModified) {
		this.dateModified = dateModified;
	}
	
	public boolean getSelfOccupied(){
		return selfOccupied;
	}

	public void setSelfOccupied(boolean selfOccupied){
		this.selfOccupied = selfOccupied;
	}

	public boolean getSentForApproval(){
		return sentForApproval;
	}

	public void setSentForApproval(boolean sentForApproval){
		this.sentForApproval = sentForApproval;
	}
	
	public TaxDetails() {	}
	
	
	public TaxDetails(String email, char zone, double area, boolean selfOccupied) {
	
		this.email = email;
		this.taxPayable = 0.0;
		this.paid = false;
		this.discountRaised = false;
		this.sentForApproval = false;
		this.discountApproved = false;
		this.discount = 0;
		this.area = area;
		this.zone = zone;
		this.selfOccupied = selfOccupied;
		this.dateCreated = LocalDate.now();
		this.dateModified = LocalDateTime.now();
	}
	
	public TaxDetails(String email, char zone, double area, boolean selfOccupied, boolean discountRaised) {
		
		this.email = email;
		this.taxPayable = 0.0;
		this.paid = false;
		this.zone = zone;
		this.area = area;
		this.discountRaised = discountRaised;
		this.sentForApproval = false;
		this.discountApproved = false;
		this.discount = 0.0;
		this.selfOccupied = selfOccupied;
		this.dateCreated = LocalDate.now();
		this.dateModified = LocalDateTime.now();
	}
	
	@Override
	public String toString() {
		return "{email:"+email+", taxPayable:"+taxPayable+", paid:"+paid+
				", zone:"+zone+", area:"+area+", discountRaised:"+discountRaised+
				", discountApproved:"+discountApproved+", discount:"+discount+
				", dateCreated:"+dateCreated+", dateModified:"+dateModified+"}";
	}

}