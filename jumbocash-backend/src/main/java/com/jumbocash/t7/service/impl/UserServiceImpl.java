package com.jumbocash.t7.service.impl;

import java.math.BigInteger;

import org.springframework.stereotype.Service;

import com.jumbocash.t7.repository.UserRepository;
import com.jumbocash.t7.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public boolean existsUser(BigInteger userId) {
		return userRepository.findById(userId).isPresent();
	}

}
