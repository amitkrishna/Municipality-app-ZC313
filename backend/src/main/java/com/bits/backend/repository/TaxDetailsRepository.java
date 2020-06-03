package com.bits.backend.repository;

import com.bits.backend.models.TaxDetails;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TaxDetailsRepository extends CrudRepository<TaxDetails, Long>{
	
	public List<TaxDetails> findByEmail(String email);

	public TaxDetails findTaxDetailsById(Long id);

	@Query("select td from TaxDetails td where td.email = ?1 and td.paid = false")
	public List<TaxDetails> findUnpaidByUser(String email);
	
	@Query("select td from TaxDetails td where td.email = ?1 and td.discountRaised = true")
	public List<TaxDetails> findDiscountRaisedByUser(String email);
	
	@Query("select td from TaxDetails td where td.email = ?1 and td.sentForApproval = true")
	public List<TaxDetails> findSentForApprovalByUser(String email);

	@Query("select td from TaxDetails td where td.email = ?1 and td.discountApproved = true")
	public List<TaxDetails> findDiscountApprovedByUser(String email);

	@Query("select td from TaxDetails td where td.discountRaised = true and td.sentForApproval = false")
	public List<TaxDetails> findAllDiscountRaised();

	@Query("select td from TaxDetails td where td.sentForApproval = true and td.discountApproved = false")
	public List<TaxDetails> findAllSentForApproval();
	
	@Transactional
	@Modifying
	@Query("update TaxDetails td set td.paid = true, td.dateModified = ?2 where td.id = ?1")
	public void updatePaymentStatus(Long id, LocalDateTime dateModified);
	
	@Transactional
	@Modifying
	@Query("update TaxDetails td set td.discountRaised = true, td.discount = ?2, td.dateModified = ?3 where td.id = ?1")
	public void updateDiscountRaised(Long id, double discount, LocalDateTime dateModified);

	@Transactional
	@Modifying
	@Query("update TaxDetails td set td.sentForApproval = true, td.dateModified = ?2 where td.id = ?1")
	public void updateSentForApproval(Long id, LocalDateTime dateModified);
	
	@Transactional
	@Modifying
	@Query("update TaxDetails td set td.discountApproved = true, td.taxPayable = ?2, td.dateModified = ?3 where td.id = ?1")
	public void updateDiscountApproved(Long id, double taxPayable, LocalDateTime dateModified);
	
}
