package com.jumbocash.t7.repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import com.jumbocash.t7.model.Transaction;

public interface TransactionCustomRepository {
	
	Optional<List<Transaction>> getTransactionsByUserId(BigInteger userId);

}
