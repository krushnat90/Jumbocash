package com.jumbocash.t7.service;

import com.jumbocash.t7.model.Transaction;


public interface TranValidationService {
	
	boolean validateAddTransactionRequest(Transaction transaction);

}
