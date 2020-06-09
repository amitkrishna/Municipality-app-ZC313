package com.bits.backend.repository;

import com.bits.backend.model.Certificate;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CertificateRepository extends CrudRepository<Certificate, Long> {
    public List<Certificate> findAllByEmail(String email);
    public Certificate findCertificateById(long id);
}