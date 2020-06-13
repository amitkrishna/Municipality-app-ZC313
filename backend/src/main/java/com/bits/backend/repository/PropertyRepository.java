package com.bits.backend.repository;

import com.bits.backend.model.Property;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

public interface PropertyRepository extends CrudRepository<Property, Long> {
    public List<Property> findAllByUserId(String userId);

    public Property findPropertyById(long id);

    @Transactional
    @Modifying
    @Query("update Property p set p.taxCalculated = true where p.id = ?1")
    public void updateTaxCalculated(Long id);
}
