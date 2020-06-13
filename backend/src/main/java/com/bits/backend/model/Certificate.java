package com.bits.backend.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "name", "date", "category" }))
@Entity
public class Certificate{


    public enum CertType{
        birth,
        death
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private long id;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    @Column(name = "time")
    private LocalTime time;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private CertType category;

    public long getId() {
        return id;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public CertType getCategory() {
        return category;
    }

    public void setCategory(CertType category) {
        this.category = category;
    }

    public Certificate(){}

    public Certificate(String email, String name, CertType category, String date, String time, String dateCreated){
        this.dateCreated = LocalDate.now();
        this.email = email;
        this.name = name;
        this.time = LocalTime.parse(time);
        this.date = LocalDate.parse(date);
        this.category = category;
        this.dateCreated = LocalDate.parse(dateCreated);
    }

    @Override
    public String toString(){

        return email+" "+name+" "+date+" "+category+" "+dateCreated;
    }
}
