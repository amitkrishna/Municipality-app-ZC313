package com.bits.backend.service;

import com.bits.backend.model.Certificate;
import com.bits.backend.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

@Service
public class CertificateService {

    Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private CertificateRepository certificateRepository;

    public boolean insertCertificate(Certificate certificate){
        try{
            certificateRepository.save(certificate);
        }
        catch (Exception e){
            log.info(e.getMessage());
            return false;
        }
        return true;
    }

    public List<Certificate> getCertificatesByEmail(String email){
        List<Certificate> certificates = new ArrayList<Certificate>();
        try{
            certificateRepository.findAllByEmail(email).forEach(certificate -> certificates.add(certificate));
        }
        catch (Exception e){
            log.info(e.getMessage());
        }
        finally {
            return certificates;
        }
    }
}
