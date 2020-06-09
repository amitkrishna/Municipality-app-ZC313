package com.bits.backend.service;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.bits.backend.model.TaxDetails;
import com.bits.backend.repository.TaxDetailsRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

  @Autowired
  TaxDetailsRepository tdRepo;
  
  
}