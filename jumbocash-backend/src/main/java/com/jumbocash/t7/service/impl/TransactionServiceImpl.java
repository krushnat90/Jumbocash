package com.jumbocash.t7.service.impl;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jumbocash.t7.beanMapper.impl.TransactionMapper;
import com.jumbocash.t7.dto.AppUser;
import com.jumbocash.t7.dto.EntityMaster;
import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.model.Transaction;
import com.jumbocash.t7.repository.EntityMasterRepository;
import com.jumbocash.t7.repository.TransactionRepository;
import com.jumbocash.t7.repository.UserRepository;
import com.jumbocash.t7.service.TranValidationService;
import com.jumbocash.t7.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

	private TranValidationService tranValidationService;
	private TransactionRepository tranRepository;
	private TransactionMapper tranMapper;
	private UserRepository userRepository;
	private EntityMasterRepository entityRepository;

	

	public TransactionServiceImpl(TranValidationService tranValidationService, TransactionRepository tranRepository,
			TransactionMapper tranMapper, UserRepository userRepository, EntityMasterRepository entityRepository) {
		super();
		this.tranValidationService = tranValidationService;
		this.tranRepository = tranRepository;
		this.tranMapper = tranMapper;
		this.userRepository = userRepository;
		this.entityRepository = entityRepository;
	}

	@Override
	public Optional<TranMaster> addTransaction(Transaction transaction) {
		
		//validate
		if(!tranValidationService.validateAddTransactionRequest(transaction))
			return Optional.empty();
		
		Optional<AppUser> userDetails = userRepository.findById(transaction.getUserId());
		if(!userDetails.isPresent())
			return Optional.empty(); 
		
		Optional<EntityMaster> entityDetails = entityRepository.findById(transaction.getEntityId());
		if(!entityDetails.isPresent())
			return Optional.empty();
		
		TranMaster transactionDetails = tranMapper.convertFromJsonToDto(transaction);
		transactionDetails.setEntity(entityDetails.get());
		transactionDetails.setUser(userDetails.get());
		
		return Optional.of(tranRepository.save(transactionDetails));
	}

	@Override
	public Optional<List<Transaction>> getTransactionsByUserId(BigInteger userId) {
		Optional<List<Transaction>> transactionsByUserId = tranRepository.getTransactionsByUserId(userId);
		if(!transactionsByUserId.isPresent()){
			return Optional.empty();
		}
		if(transactionsByUserId.get().isEmpty())
			return Optional.empty();
		
		return transactionsByUserId;
	}

	@Override
	public Optional<Transaction> getTransactionByTranId(BigInteger tranId) {
		Optional<TranMaster> transactionDto = tranRepository.findById(tranId);
		return transactionDto.isPresent()?Optional.of(tranMapper.convertFromDtoToJson(transactionDto.get())):Optional.empty();
	}

}
