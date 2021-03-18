package com.jumbocash.t7.service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.model.Transaction;

public interface TransactionService {
	
	Optional<TranMaster> addTransaction(Transaction transaction);
	
	Optional<List<Transaction>> getTransactionsByUserId(BigInteger userId);
	
	Optional<Transaction> getTransactionByTranId(BigInteger tranId);
	

}
