package com.bits.backend.repository;

import com.bits.backend.model.Property;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PropertyRepository extends CrudRepository<Property, Long> {
    public List<Property> findAllByUserId(String userId);
}
