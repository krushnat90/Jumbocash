package com.jumbocash.t7.service;

import org.springframework.stereotype.Service;
import com.jumbocash.t7.model.Entity;
import java.math.BigInteger;
import java.util.List;

@Service
public interface EntityService {

    public Void addNewEntity(Entity entity) throws Exception;
    public Void updateExistingEntity(Entity entity) throws Exception;
    public Entity getEntityByEntityId(BigInteger entityId) throws Exception;
    public List<Entity> getEntitiesByUserId(BigInteger userId) throws Exception;

}
