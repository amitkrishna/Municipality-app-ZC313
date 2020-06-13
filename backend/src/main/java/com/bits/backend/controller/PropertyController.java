package com.bits.backend.controller;

import com.bits.backend.model.Property;
import com.bits.backend.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/property")
public class PropertyController {

    Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private PropertyService propertyService;

    @PostMapping("/add")
    public HttpEntity<Property> addProperty(@RequestBody Property property){
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        Property response = new Property();

        if(propertyService.insertProperty(property)){
            status = HttpStatus.OK;
            response = property;
        }
        HttpEntity<Property> res= new ResponseEntity<>(response, status);
        return res;
    }

    @GetMapping("/show/{email}")
    public HttpEntity<List<Property>> getPropertyByUser(@PathVariable String email){

        HttpStatus status = HttpStatus.OK;
        List<Property> response = propertyService.getPropertyByUserId(email);
        if(response.isEmpty()){
            status = HttpStatus.NOT_FOUND;
        }
        HttpEntity<List<Property>> res = new ResponseEntity<>(response, status);
        return res;
    }
}
