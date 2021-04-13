package com.jumbocash.t7.service.impl;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.jumbocash.t7.beanMapper.impl.UserMapper;
import com.jumbocash.t7.dto.AppUser;
import com.jumbocash.t7.model.User;
import com.jumbocash.t7.repository.EntityMasterRepository;
import com.jumbocash.t7.repository.TransactionRepository;
import com.jumbocash.t7.repository.UserRepository;
import com.jumbocash.t7.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;

	private TransactionRepository tranRepository;

	private EntityMasterRepository entityRepository;

	private UserMapper userMapper;

	private static final String CASH_IN_KEY = "totalCashIn";
	private static final String CASH_OUT_KEY = "totalCashOut";
	private static final String CUSTOMERS_KEY = "totalCustomers";
	private static final String VENDORS_KEY = "totalVendors";

	public UserServiceImpl(UserRepository userRepository, TransactionRepository tranRepository,
			EntityMasterRepository entityRepository, UserMapper userMapper) {
		super();
		this.userRepository = userRepository;
		this.tranRepository = tranRepository;
		this.entityRepository = entityRepository;
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

		// mandatory fields should be present
		if (StringUtils.isBlank(user.getEmail()) || StringUtils.isBlank(user.getName())
				|| StringUtils.isBlank(user.getToken()))
			return Optional.empty();

		List<AppUser> existingUser = existsUser(user.getEmail());

		// check if add or update
		if (existingUser.isEmpty()) {
			// add
			return Optional
					.of(userMapper.convertFromDtoToJson(userRepository.save(userMapper.convertFromJsonToDto(user))));

		} else {
			// update
			AppUser userToUpdate = userMapper.convertFromJsonToDto(user);
			userToUpdate.setUserId(existingUser.get(0).getUserId());
			return Optional.of(userMapper.convertFromDtoToJson(userRepository.save(userToUpdate)));
		}
	}

	@Override
	public Map<String, BigInteger> getSummaryInfoByUserId(BigInteger userId) {

		// get total cash in
		Optional<BigInteger> totalCashIn = Optional.ofNullable(tranRepository.getTotalCashIn(userId));

		// get total cash out
		Optional<BigInteger> totalCashOut = Optional.ofNullable(tranRepository.getTotalCashOut(userId));
		
		//get number of customers
		Optional<BigInteger> totalCustomers = Optional.ofNullable(entityRepository.getCountOfEntitiesByEntityType(userId, "customer"));
		
		//get number of vendors
		Optional<BigInteger> totalVendors = Optional.ofNullable(entityRepository.getCountOfEntitiesByEntityType(userId, "vendor"));

		Map<String, BigInteger> summaryInfo = new HashMap<>();

		summaryInfo.put(CASH_IN_KEY, totalCashIn.isPresent() ? totalCashIn.get() : BigInteger.ZERO);
		summaryInfo.put(CASH_OUT_KEY, totalCashOut.isPresent() ? totalCashOut.get() : BigInteger.ZERO);
		summaryInfo.put(CUSTOMERS_KEY, totalCustomers.isPresent() ? totalCustomers.get() : BigInteger.ZERO);
		summaryInfo.put(VENDORS_KEY, totalVendors.isPresent() ? totalVendors.get() : BigInteger.ZERO);

		return summaryInfo;
	}

}
