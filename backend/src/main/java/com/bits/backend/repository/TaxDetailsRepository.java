package com.bits.backend.repository;

import com.bits.backend.models.TaxDetails;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TaxDetailsRepository extends CrudRepository<TaxDetails, Long>{
	
	public List<TaxDetails> findByEmail(String email);
	
	@Query("select td from TaxDetails td where td.email = ?1 and td.paid = false")
	public List<TaxDetails> findUnpaidByUser(String email);
	
	@Query("select td from TaxDetails td where td.email = ?1 and td.discountRaised = false")
	public List<TaxDetails> findDiscountRaisedByUser(String email);
	
	@Query("select td from TaxDetails td where td.email = ?1 and td.discountApproved = true")
	public List<TaxDetails> findDiscountApprovedByUser(String email);
	
	@Modifying
	@Query("update TaxDetails td set td.paid = true where td.id = ?1")
	public void updatePaymentStatus(Long id);
	
	@Modifying
	@Query("update TaxDetails td set td.discountRaised = true where td.id = ?1")
	public void updateDiscountRaised(Long id);
	
	@Modifying
	@Query("update TaxDetails td set td.discountApproved = true where td.id = ?1")
	public void updateDiscountApproved(Long id);
	
}
