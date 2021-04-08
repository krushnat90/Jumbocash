package com.jumbocash.t7.service;

import java.util.Optional;

import com.jumbocash.t7.api.ApiResponseMessage;
import com.jumbocash.t7.dto.EntityMaster;
import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.model.Transaction;

public interface TranValidationService {

	boolean validateAddOrUpdateTransactionRequest(Transaction transaction);

	Optional<ApiResponseMessage> validateUpdateTransactionRequest(Transaction editTransactionRequest,
			Optional<TranMaster> possibleTransactionToEdit,
			Optional<EntityMaster> possibleEntityDetails);

}
