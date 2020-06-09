package com.bits.backend.controller;

import com.bits.backend.model.Certificate;
import com.bits.backend.service.CertificateService;
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
@RequestMapping("api/v1/certificate")
public class CertificateController {

    Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private CertificateService certificateService;

    @PostMapping("/request")
    public HttpEntity<Certificate> requestCertificate(@RequestBody Certificate certificate){

        log.info(certificate.toString());
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        Certificate response = new Certificate();

        if(certificateService.insertCertificate(certificate)){
            status = HttpStatus.CREATED;
            response = certificate;
        }

        HttpEntity<Certificate> res = new ResponseEntity<Certificate>(response, status);
        return res;
    }

    @GetMapping("/show/{email}")
    public HttpEntity<List<Certificate>> showCertificates(@PathVariable String email){

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        List<Certificate> response = new ArrayList<Certificate>();
        response = certificateService.getCertificatesByEmail(email);
        if(response.isEmpty()){
            status = HttpStatus.NOT_FOUND;
        }
        else
            status = HttpStatus.OK;

        HttpEntity<List<Certificate>> res = new ResponseEntity<List<Certificate>>(response, status);
        return res;
    }

}
