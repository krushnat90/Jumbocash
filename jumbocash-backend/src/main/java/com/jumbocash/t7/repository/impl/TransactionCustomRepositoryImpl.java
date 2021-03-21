package com.jumbocash.t7.repository.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.jumbocash.t7.beanMapper.impl.TransactionMapper;
import com.jumbocash.t7.dto.AppUser;
import com.jumbocash.t7.dto.AppUser_;
import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.dto.TranMaster_;
import com.jumbocash.t7.model.Transaction;
import com.jumbocash.t7.repository.TransactionCustomRepository;

@Repository
public class TransactionCustomRepositoryImpl implements TransactionCustomRepository {

	EntityManager entityManager;

	TransactionMapper objectMapper;

	public TransactionCustomRepositoryImpl(EntityManager entityManager, TransactionMapper objectMapper) {
		super();
		this.entityManager = entityManager;
		this.objectMapper = objectMapper;
	}

	@Override
	public Optional<List<Transaction>> getTransactionsByUserId(BigInteger userId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<TranMaster> query = builder.createQuery(TranMaster.class);
		Root<TranMaster> root = query.from(TranMaster.class);
		
		Join<TranMaster, AppUser> joinUser= root.join(TranMaster_.USER); 	 	
		
		List<Order> orderList = new ArrayList<>();

		Predicate hasUserId = builder.equal(joinUser.get(AppUser_.USER_ID), userId);
		orderList.add(builder.desc(root.get(TranMaster_.LST_UPDT_TS)));

		query.where(hasUserId).orderBy(orderList);

		return Optional.of(entityManager.createQuery(query).getResultList().stream()
				.map(objectMapper::convertFromDtoToJson).collect(Collectors.toList()));
	}

}