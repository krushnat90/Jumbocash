package com.jumbocash.t7.service.impl;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.jumbocash.t7.beanMapper.impl.UserMapper;
import com.jumbocash.t7.dto.AppUser;
import com.jumbocash.t7.model.User;
import com.jumbocash.t7.repository.UserRepository;
import com.jumbocash.t7.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;

	private UserMapper userMapper;

	public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
		super();
		this.userRepository = userRepository;
		this.userMapper = userMapper;
	}

	@Override
	public boolean existsUser(BigInteger userId) {
		return userRepository.findById(userId).isPresent();
	}

	@Override
	public List<AppUser> existsUser(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public Optional<User> addOrUpdateUser(User user) {

		// email should be present
		if (StringUtils.isBlank(user.getEmail()))
			return Optional.empty();

		return Optional.of(userMapper.convertFromDtoToJson(userRepository.save(userMapper.convertFromJsonToDto(user))));

	}

}
