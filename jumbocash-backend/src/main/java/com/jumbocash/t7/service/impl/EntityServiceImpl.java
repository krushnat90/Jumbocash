package com.jumbocash.t7.service.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.jumbocash.t7.api.ApiResponseMessage;
import com.jumbocash.t7.beanMapper.impl.EntityMapper;
import com.jumbocash.t7.constant.ExceptionConstants;
import com.jumbocash.t7.dto.AppUser;
import com.jumbocash.t7.dto.EntityMaster;
import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.dto.UserEntityLnk;
import com.jumbocash.t7.exception.JumbocashException;
import com.jumbocash.t7.model.Entity;
import com.jumbocash.t7.repository.EntityMasterRepository;
import com.jumbocash.t7.repository.UserEntityLnkRepository;
import com.jumbocash.t7.repository.UserRepository;
import com.jumbocash.t7.service.EntityService;

@Service
public class EntityServiceImpl implements EntityService {

	EntityMasterRepository entityMasterRepository;

	UserRepository userRepository;

	EntityMapper entityMapper;

	public static final Logger logger = LogManager.getLogger(EntityServiceImpl.class);

	public EntityServiceImpl(EntityMasterRepository entityMasterRepository, UserRepository userRepository,
			EntityMapper entityMapper) {
		super();
		this.entityMasterRepository = entityMasterRepository;
		this.userRepository = userRepository;
		this.entityMapper = entityMapper;
	}

	@Override
	@Transactional
	public Void addNewEntity(Entity entity) throws Exception {
		Optional<List<EntityMaster>> entityMaster = entityMasterRepository.getEntityByEmail(entity.getEmail(),entity.getUserId(),entity.getEntityType());
		Optional<AppUser> userDetails = userRepository.findById(entity.getUserId());
		if (entityMaster.isPresent() && !entityMaster.get().isEmpty()) {
			throw new JumbocashException(ExceptionConstants.ENTITY_ALREADY_EXISTS);
		}
		
		if(!userDetails.isPresent()){
			return null;
		}

		EntityMaster entityToAdd = entityMapper.convertFromJsonToDto(entity);
		entityToAdd.addUser(userDetails.get());
		
		EntityMaster addedEntity = entityMasterRepository.save(entityToAdd);

		logger.info("addNewEntity :: Data added successfully for ID : " + addedEntity.getEntityId());
		return null;
	}

	@Override
	public Entity updateExistingEntity(Entity entity) throws Exception {
		Optional<EntityMaster> possibleEntityToUpdate = entityMasterRepository.findById(entity.getEntityId());
		if (possibleEntityToUpdate.isPresent()) {
			logger.info("updateExistingEntity :: Data updated successfully for ID : " + entity.getEntityId());
			
			EntityMaster entityToUpdate = entityMapper.convertFromJsonToDto(entity);
			
			entityToUpdate.setUsers(possibleEntityToUpdate.get().getUsers());
			
			return entityMapper.convertFromDtoToJson(entityMasterRepository.save(entityToUpdate));
		}
		throw new JumbocashException(ExceptionConstants.NO_ENTRY_FOUND_FOR_THIS_ENTITY);
	}

	@Override
	public Optional<Entity> getEntityByEntityId(BigInteger entityId) {
		Optional<EntityMaster> entityMaster = entityMasterRepository.findById(entityId);
		if (entityMaster.isPresent()) {
			logger.info("getEntityByEntityId :: Data fetched successfully for ID : " + entityId);
			return Optional.of(entityMapper.convertFromDtoToJson(entityMaster.get()));
		}
		logger.info("getEntityByEntityId :: Returning NULL from getEntityByEntityId method");
		return Optional.empty();
	}

	@Override
	public List<Entity> getEntitiesByUserId(BigInteger userId) {
		Optional<List<EntityMaster>> entityMasterList = entityMasterRepository.getEntitiesByUserId(userId);
		if (entityMasterList.isPresent()) {
			logger.info("getEntitiesByUserId :: Data fetched successfully for ID : " + userId);
			List<Entity> entityListResponse = new ArrayList<>();
			for (EntityMaster entityMaster : entityMasterList.get()) {
				entityListResponse.add(entityMapper.convertFromDtoToJson(entityMaster));
			}
			return entityListResponse;
		}
		logger.info("getEntitiesByUserId :: Returning NULL from getEntitiesByUserId method");
		return Collections.emptyList();
	}

	@Override
	public boolean existsEntity(BigInteger entityId) {
		return entityMasterRepository.findById(entityId).isPresent();
	}

	@Override
	public Optional<ApiResponseMessage> deleteEntity(BigInteger entityId) {
		logger.info("delete request received for entity id ->" + entityId);
		Optional<EntityMaster> possibleEntityToDelete = entityMasterRepository
				.findById(Optional.ofNullable(entityId).isPresent()
						? entityId : BigInteger.ZERO);
		
		if(!possibleEntityToDelete.isPresent())
			return Optional.of(new ApiResponseMessage(1, ExceptionConstants.TRANSACTION_ABSENT));
		
		entityMasterRepository.delete(possibleEntityToDelete.get());
		logger.info("delete request finished for entity id ->" + entityId);
		return Optional.of(new ApiResponseMessage(4, ExceptionConstants.REQUEST_SUCCESS));
	}

}
