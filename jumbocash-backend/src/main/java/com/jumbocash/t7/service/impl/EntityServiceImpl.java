package com.jumbocash.t7.service.impl;

import com.jumbocash.t7.constant.ExceptionConstants;
import com.jumbocash.t7.dto.EntityMaster;
import com.jumbocash.t7.exception.JumbocashException;
import com.jumbocash.t7.model.Entity;
import com.jumbocash.t7.repository.EntityMasterRepository;
import com.jumbocash.t7.service.EntityService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EntityServiceImpl implements EntityService {

    @Autowired
    EntityMasterRepository entityMasterRepository;

    public static final Logger logger = LogManager.getLogger(EntityServiceImpl.class);

    @Override
    public Void addNewEntity(Entity entity) throws Exception {
        Optional<EntityMaster> entityMaster = entityMasterRepository.getEntityByEmail(entity.getEmail());
        if (entityMaster.isPresent()) {
            throw new JumbocashException(ExceptionConstants.ENTITY_ALREADY_EXISTS);
        }
        entityMasterRepository.save(setEntityMasterDbData(entity, false));
        logger.info("addNewEntity :: Data added successfully for ID : " + entity.getEntityId());
        return null;
    }

    @Override
    public Void updateExistingEntity(Entity entity) throws Exception {
        Optional<EntityMaster> entityMaster = entityMasterRepository.findById(entity.getEntityId());
        if (entityMaster.isPresent()) {
            entityMasterRepository.save(setEntityMasterDbData(entity, true));
            logger.info("updateExistingEntity :: Data updated successfully for ID : " + entity.getEntityId());
            return null;
        }
        throw new JumbocashException(ExceptionConstants.NO_ENTRY_FOUND_FOR_THIS_ENTITY);
    }

    @Override
    public Entity getEntityByEntityId(BigInteger entityId) {
        Optional<EntityMaster> entityMaster = entityMasterRepository.findById(entityId);
        if (entityMaster.isPresent()) {
            logger.info("getEntityByEntityId :: Data fetched successfully for ID : " + entityId);
            return setEntityJsonData(entityMaster.get());
        }
        logger.info("getEntityByEntityId :: Returning NULL from getEntityByEntityId method");
        return null;
    }

    @Override
    public List<Entity> getEntitiesByUserId(BigInteger userId) {
        Optional<List<EntityMaster>> entityMasterList = entityMasterRepository.getEntitiesByUserId(userId);
        if (entityMasterList.isPresent()) {
            logger.info("getEntitiesByUserId :: Data fetched successfully for ID : " + userId);
            List<Entity> entityListResponse = new ArrayList<>();
            for (EntityMaster entityMaster : entityMasterList.get()) {
                entityListResponse.add(setEntityJsonData(entityMaster));
            }
            return entityListResponse;
        }
        logger.info("getEntitiesByUserId :: Returning NULL from getEntitiesByUserId method");
        return null;
    }

    private Entity setEntityJsonData(EntityMaster entityMaster) {
        logger.debug("Setting Data in Response Object for Entity " + entityMaster.toString());
        Entity entityResponse = new Entity();
        entityResponse.setEntityId(entityMaster.getEntityId());
        entityResponse.setEntityName(entityMaster.getEntityName());
        entityResponse.setEntityType(entityMaster.getEntityTyp());
        entityResponse.setEmail(entityMaster.getEmail());
        entityResponse.setAddress(entityMaster.getAddress());
        entityResponse.setCity(entityMaster.getCity());
        entityResponse.setState(entityMaster.getState());
        entityResponse.setZip(entityMaster.getZip());
        entityResponse.setPhone(entityMaster.getPhone());
        return entityResponse;
    }

    private EntityMaster setEntityMasterDbData(Entity entity, boolean isUpdateTransaction) {
        logger.debug("Setting Json Data in Entity Master Dto" + entity.toString());
        EntityMaster entityMaster = new EntityMaster();
        if (isUpdateTransaction) {
            entityMaster.setEntityId(entity.getEntityId());
        }
        entityMaster.setEntityName(entity.getEntityName());
        entityMaster.setEntityTyp(entity.getEntityType());
        entityMaster.setEmail(entity.getEmail());
        entityMaster.setAddress(entity.getAddress());
        entityMaster.setCity(entity.getCity());
        entityMaster.setState(entity.getState());
        entityMaster.setZip(entity.getZip());
        entityMaster.setPhone(entity.getPhone());
        return entityMaster;
    }


}
