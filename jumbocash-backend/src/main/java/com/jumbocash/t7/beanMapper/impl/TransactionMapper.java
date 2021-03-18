package com.jumbocash.t7.beanMapper.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.jumbocash.t7.beanMapper.BeanMapperFunction;
import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.model.Transaction;

@Component
public class TransactionMapper implements BeanMapperFunction<Transaction, TranMaster> {

	private ModelMapper modelMapper;

	public TransactionMapper(ModelMapper modelMapper) {
		super();
		this.modelMapper = modelMapper;
	}

	@Override
	public TranMaster convertFromJsonToDto(Transaction c) {

		TranMaster tranMasterDto = modelMapper.map(c, TranMaster.class);

		return tranMasterDto;
	}

	@Override
	public Transaction convertFromDtoToJson(TranMaster d) {

		return modelMapper.map(d, Transaction.class);
	}

}
