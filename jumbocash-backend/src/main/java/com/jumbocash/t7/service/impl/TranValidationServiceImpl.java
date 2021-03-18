package com.jumbocash.t7.service.impl;

import org.springframework.stereotype.Service;

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
	public boolean validateAddTransactionRequest(Transaction transaction) {
		return transaction.getUserId() != null && transaction.getEntityId() != null;
//				&& userService.existsUser(transaction.getUserId())
//				&& entityService.existsEntity(transaction.getEntityId());
	}

}
