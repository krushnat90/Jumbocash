package com.jumbocash.t7.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jumbocash.t7.api.ApiResponseMessage;
import com.jumbocash.t7.constant.ExceptionConstants;
import com.jumbocash.t7.dto.EntityMaster;
import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.model.Transaction;
import com.jumbocash.t7.service.EntityService;
import com.jumbocash.t7.service.TranValidationService;
import com.jumbocash.t7.service.UserService;

@Service
public class TranValidationServiceImpl implements TranValidationService {

	private UserService userService;
	private EntityService entityService;

	public TranValidationServiceImpl(UserService userService, EntityService entityService) {
		super();
		this.userService = userService;
		this.entityService = entityService;
	}

	@Override
	public boolean validateAddOrUpdateTransactionRequest(Transaction transaction) {
		return transaction.getUserId() != null && transaction.getEntityId() != null;
		// && userService.existsUser(transaction.getUserId())
		// && entityService.existsEntity(transaction.getEntityId());
	}

	@Override
	public Optional<ApiResponseMessage> validateUpdateTransactionRequest(Transaction editTransactionRequest,
			Optional<TranMaster> possibleTransactionToEdit,
			Optional<EntityMaster> possibleEntityDetails) {

		StringBuilder responseMessageBuilder = new StringBuilder();
		int responseMessageCode = 4;

		if (!possibleTransactionToEdit.isPresent()) {
			responseMessageCode = 1;
			responseMessageBuilder.append(ExceptionConstants.TRANSACTION_ABSENT);
		} else if (Optional.ofNullable(editTransactionRequest.getEntityId()).isPresent()
				&& !possibleEntityDetails.isPresent()) {
			responseMessageCode = 1;
			responseMessageBuilder.append(ExceptionConstants.TRANSACTION_ENTITYID_INVALID);
		} else if(Optional.ofNullable(editTransactionRequest.getEntityId()).isPresent()
				&& !possibleTransactionToEdit.get().getUser().getEntities().contains(possibleEntityDetails.get())){
			responseMessageCode = 1;
			responseMessageBuilder.append(ExceptionConstants.TRANSACTION_ENTITYID_INVALID);
		}

		return (responseMessageCode == 1)?Optional.of(new ApiResponseMessage(responseMessageCode, responseMessageBuilder.toString())):Optional.empty();
	}

}
