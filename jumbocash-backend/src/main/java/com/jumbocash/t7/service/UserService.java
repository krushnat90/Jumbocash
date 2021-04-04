package com.jumbocash.t7.service;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.jumbocash.t7.dto.AppUser;
import com.jumbocash.t7.model.User;

public interface UserService {
	
	boolean existsUser(BigInteger userId);
	
	List<AppUser> existsUser(String email);
	
	Optional<User> addOrUpdateUser(User user);
	
	Map<String, BigInteger> getSummaryInfoByUserId(BigInteger userId);

}
