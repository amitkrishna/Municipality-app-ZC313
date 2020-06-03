package com.bits.backend.models;

public class Discount{
  private Long id;
  private double discount;

  public Long getId(){
    return id;
  }

  public void setId(Long id){
    this.id = id;
  }

  public double getDiscount(){
    return discount;
  }

  public void setDiscount(double discount){
    this.discount = discount;
  }

  Discount(){}

  Discount(Long id, double discount){
    this.id = id;
    this.discount = discount;
  }
}