package com.bits.backend.service;

import com.bits.backend.model.Property;
import com.bits.backend.repository.PropertyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PropertyService {

    Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private PropertyRepository propertyRepo;

    public boolean insertProperty(Property property){

        try{
            propertyRepo.save(property);
            return true;
        }
        catch(Exception e){
            log.info(e.getMessage());
            return false;
        }
    }

    public List<Property> getPropertyByUserId(String userId){

        List<Property> properties = new ArrayList<Property>();
        try{
            propertyRepo.findAllByUserId(userId).forEach(property -> properties.add(property));
        }
        catch (Exception e){
            log.info(e.getMessage());
        }
        finally {
            return properties;
        }
    }

    public boolean updateTaxCalculated(long id){

        try{
            propertyRepo.updateTaxCalculated(id);
        }
        catch (Exception e){
            log.info(e.getMessage());
            return false;
        }
        return true;
    }

    public Property findPropertyById(long id){
        Property p = new Property();
        try{
           p = propertyRepo.findPropertyById(id);
        }
        catch (Exception e){
            log.info(e.getMessage());
        }
        finally {
            return p;
        }
    }

}
