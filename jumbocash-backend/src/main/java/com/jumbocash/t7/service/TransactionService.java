package com.jumbocash.t7.service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.RequestParam;

import com.jumbocash.t7.api.ApiResponseMessage;
import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.model.MonthWiseTransactionSummary;
import com.jumbocash.t7.model.Transaction;

public interface TransactionService {
	
	Optional<TranMaster> addTransaction(Transaction transaction);
	
	Optional<List<Transaction>> getTransactionsByUserId(BigInteger userId);
	
	Optional<Transaction> getTransactionByTranId(BigInteger tranId);
	
	Optional<List<MonthWiseTransactionSummary>> getLastSixMonthTransactions(BigInteger userId);
	
	Optional<ApiResponseMessage> updateTransaction(Transaction transaction);
	
	Optional<ApiResponseMessage> deleteTransaction(Transaction transaction);
	
}
