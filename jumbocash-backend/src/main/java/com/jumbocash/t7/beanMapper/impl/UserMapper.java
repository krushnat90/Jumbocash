package com.jumbocash.t7.beanMapper.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.jumbocash.t7.beanMapper.BeanMapperFunction;
import com.jumbocash.t7.dto.AppUser;
import com.jumbocash.t7.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements BeanMapperFunction<User, AppUser> {

	private ModelMapper modelMapper;

	public UserMapper(ModelMapper modelMapper) {
		super();
		this.modelMapper = modelMapper;
	}
	
	@Override
	public AppUser convertFromJsonToDto(User c) {
		return modelMapper.map(c, AppUser.class);
	}

	@Override
	public User convertFromDtoToJson(AppUser c) {
		return modelMapper.map(c, User.class);
	}

}
