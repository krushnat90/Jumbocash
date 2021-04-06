package com.jumbocash.t7.service.impl;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.jumbocash.t7.beanMapper.impl.TransactionMapper;
import com.jumbocash.t7.dto.AppUser;
import com.jumbocash.t7.dto.EntityMaster;
import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.model.MonthWiseTransactionSummary;
import com.jumbocash.t7.model.Transaction;
import com.jumbocash.t7.repository.EntityMasterRepository;
import com.jumbocash.t7.repository.TransactionRepository;
import com.jumbocash.t7.repository.UserRepository;
import com.jumbocash.t7.service.TranValidationService;
import com.jumbocash.t7.service.TransactionService;

import net.bytebuddy.asm.Advice.This;

@Service
public class TransactionServiceImpl implements TransactionService {

	private TranValidationService tranValidationService;
	private TransactionRepository tranRepository;
	private TransactionMapper tranMapper;
	private UserRepository userRepository;
	private EntityMasterRepository entityRepository;

	public static final Logger logger = LogManager.getLogger(TransactionServiceImpl.class);

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

		// validate
		if (!tranValidationService.validateAddTransactionRequest(transaction))
			return Optional.empty();

		Optional<AppUser> userDetails = userRepository.findById(transaction.getUserId());
		if (!userDetails.isPresent())
			return Optional.empty();

		Optional<EntityMaster> entityDetails = entityRepository.findById(transaction.getEntityId());
		if (!entityDetails.isPresent())
			return Optional.empty();

		TranMaster transactionDetails = tranMapper.convertFromJsonToDto(transaction);
		transactionDetails.setEntity(entityDetails.get());
		transactionDetails.setUser(userDetails.get());

		if (transactionDetails.getTranType().equalsIgnoreCase("debit"))
			transactionDetails.setAmount(0 - transactionDetails.getAmount());

		return Optional.of(tranRepository.save(transactionDetails));
	}

	@Override
	public Optional<List<Transaction>> getTransactionsByUserId(BigInteger userId) {
		Optional<List<Transaction>> transactionsByUserId = tranRepository.getTransactionsByUserId(userId);
		if (!transactionsByUserId.isPresent()) {
			return Optional.empty();
		}
		if (transactionsByUserId.get().isEmpty())
			return Optional.empty();
		
		return transactionsByUserId;
	}

	@Override
	public Optional<Transaction> getTransactionByTranId(BigInteger tranId) {
		Optional<TranMaster> transactionDto = tranRepository.findById(tranId);
		return transactionDto.isPresent() ? Optional.of(tranMapper.convertFromDtoToJson(transactionDto.get()))
				: Optional.empty();
	}

	@Override
	public Optional<List<MonthWiseTransactionSummary>> getLastSixMonthTransactions(BigInteger userId) {
		List<MonthWiseTransactionSummary> lastSixMonthTransactionInfo = new ArrayList<>();
		LocalDate today = LocalDate.now();

		for (int monthCounter = 6; monthCounter >= 0; monthCounter--) {
			logger.debug("Start month :"+monthCounter);
			LocalDate currentMonth = today.minusMonths(monthCounter);

			LocalDate firstDay = currentMonth.withDayOfMonth(1);

			LocalDate lastDay = currentMonth.with(TemporalAdjusters.lastDayOfMonth());

			logger.debug("Fetching credit txn from db");
			List<TranMaster> creditTransactionsDuringDate = tranRepository.getTransactionsBetweenDates(firstDay,
					lastDay, userId, "credit");
			logger.debug("Fetching debit txn from db");
			List<TranMaster> debitTransactionsDuringDate = tranRepository.getTransactionsBetweenDates(firstDay, lastDay,
					userId, "debit");
			
			logger.debug("calculating credit amount");
			Long totalCreditAmount = creditTransactionsDuringDate.stream().map(TranMaster::getAmount).reduce(0L,
					(subtotal, element) -> Long.sum(subtotal, Math.abs(element)));
			
			logger.debug("calculating debit amount");
			Long totalDebitAmount = debitTransactionsDuringDate.stream().map(TranMaster::getAmount).reduce(0L,
					(subtotal, element) -> Long.sum(subtotal, Math.abs(element)));


			lastSixMonthTransactionInfo.add(
					new MonthWiseTransactionSummary().month(currentMonth.format(DateTimeFormatter.ofPattern("MMM")))
							.credit(BigInteger.valueOf(totalCreditAmount)).debit(BigInteger.valueOf(totalDebitAmount)));

		}

		return Optional.of(lastSixMonthTransactionInfo);
	}

}
