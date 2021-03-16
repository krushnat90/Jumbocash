package com.jumbocash.t7.service.impl;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jumbocash.t7.beanMapper.impl.TransactionMapper;
import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.model.Transaction;
import com.jumbocash.t7.repository.TransactionRepository;
import com.jumbocash.t7.service.TranValidationService;
import com.jumbocash.t7.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

	private TranValidationService tranValidationService;
	private TransactionRepository tranRepository;
	private TransactionMapper tranMapper;

	public TransactionServiceImpl(TranValidationService tranValidationService, TransactionRepository tranRepository,
			TransactionMapper tranMapper) {
		super();
		this.tranValidationService = tranValidationService;
		this.tranRepository = tranRepository;
		this.tranMapper = tranMapper;
	}

	@Override
	public Optional<TranMaster> addTransaction(Transaction transaction) {
		
		//validate
		if(!tranValidationService.validateAddTransactionRequest(transaction))
			return Optional.empty();
		
		return Optional.of(tranRepository.save(tranMapper.convertFromJsonToDto(transaction)));
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
