package com.bits.backend.model;

import java.time.LocalDate;

public class TaxDetailsPDF {

  private String zone;
	private double area;
	private double taxPayable;
	private String paid;
	private String discountRaised;
	private String discountApproved;
	private double discount;
	private LocalDate dateCreated;
	private String selfOccupied;
	private String sentForApproval;


	public String getZone() {
		return zone;
	}

	public void setZone(String zone) {
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

  public TaxDetailsPDF(){}

  public TaxDetailsPDF(char zone, double area, boolean selfOccupied, double taxPayable, boolean paid, boolean discountRaised, double discount, boolean sentForApproval, boolean discountApproved, LocalDate dateCreated){
    this.zone = zone;
    this.area = area;
    this.selfOccupied = (selfOccupied)?"Yes":"No";
    this.taxPayable = taxPayable;
    this.paid = (paid)?"Yes":"No";
    this.discountRaised = (discountRaised)?"Yes":"No";
    this.discount = discount;
    this.sentForApproval = (sentForApproval)? "Yes":(discountRaised)? "No": "N/A";
    this.discountApproved = (discountApproved)? "Yes":(discountRaised)? "No": "N/A";
    this.dateCreated = dateCreated;
  }
}