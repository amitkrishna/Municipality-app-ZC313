package com.bits.backend.model;

import javax.persistence.*;
import java.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "user_id", "area", "zone" }))
@Entity
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "area")
    private double area;

    @Column(name = "zone")
    private String zone;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    @Column(name = "tax_calculated")
    private boolean taxCalculated;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public double getArea() {
        return area;
    }

    public void setArea(double area) {
        this.area = area;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public boolean isTaxCalculated(){
        return taxCalculated;
    }

    public void setTaxCalculated(boolean taxCalculated){
        this.taxCalculated = taxCalculated;
    }

    public Property(){}

    public Property(String userId, double area, String zone){
        this.userId = userId;
        this.area = area;
        this.zone = zone;
        this.taxCalculated = false;
        Logger log = LoggerFactory.getLogger(getClass());
        log.info(String.valueOf(LocalDate.now()));
        this.dateCreated = LocalDate.now();
    }

    @Override
    public String toString() {
        return this.id+" "+this.userId+" "+this.zone+" "+this.area+" "+this.dateCreated;
    }
}
