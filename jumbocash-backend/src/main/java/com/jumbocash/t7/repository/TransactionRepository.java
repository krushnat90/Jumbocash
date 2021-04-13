package com.jumbocash.t7.repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jumbocash.t7.constant.QueriesConstant;
import com.jumbocash.t7.dto.TranMaster;

@Repository
public interface TransactionRepository extends JpaRepository<TranMaster, BigInteger>,TransactionCustomRepository {
	
	@Query(QueriesConstant.SELECT_TOTAL_CASH_IN)
	BigInteger getTotalCashIn(@Param("userId") BigInteger userId);
	
	@Query(QueriesConstant.SELECT_TOTAL_CASH_OUT)
	BigInteger getTotalCashOut(@Param("userId") BigInteger userId);
	
	@Query(QueriesConstant.SELECT_TRANSACTION_DURING_DATE)
	List<TranMaster> getTransactionsBetweenDates(@Param("startDate") LocalDate startDate,@Param("endDate") LocalDate endDate, @Param("userId") BigInteger userId, @Param("tranType") String tranType);
	
}
