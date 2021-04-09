package com.jumbocash.t7.service;

import org.springframework.stereotype.Service;

import com.jumbocash.t7.api.ApiResponseMessage;
import com.jumbocash.t7.model.Entity;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public interface EntityService {

    public Void addNewEntity(Entity entity) throws Exception;
    public Entity updateExistingEntity(Entity entity) throws Exception;
    public Optional<Entity> getEntityByEntityId(BigInteger entityId) throws Exception;
    public List<Entity> getEntitiesByUserId(BigInteger userId) throws Exception;
    
    boolean existsEntity(BigInteger entityId);
    
    public Optional<ApiResponseMessage> deleteEntity(BigInteger entityId);

}
