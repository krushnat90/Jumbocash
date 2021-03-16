package com.jumbocash.t7.service;

import java.math.BigInteger;

import org.springframework.stereotype.Service;

public interface UserService {
	
	boolean existsUser(BigInteger userId);

}
