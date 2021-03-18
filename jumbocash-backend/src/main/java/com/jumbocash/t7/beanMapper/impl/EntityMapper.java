package com.jumbocash.t7.beanMapper.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.jumbocash.t7.beanMapper.BeanMapperFunction;
import com.jumbocash.t7.dto.EntityMaster;
import com.jumbocash.t7.model.Entity;

@Component
public class EntityMapper implements BeanMapperFunction<Entity, EntityMaster> {

	private ModelMapper modelMapper;

	public EntityMapper(ModelMapper modelMapper) {
		super();
		this.modelMapper = modelMapper;
	}

	@Override
	public EntityMaster convertFromJsonToDto(Entity c) {
		return modelMapper.map(c, EntityMaster.class);
	}

	@Override
	public Entity convertFromDtoToJson(EntityMaster c) {
		return modelMapper.map(c, Entity.class);
	}

}
