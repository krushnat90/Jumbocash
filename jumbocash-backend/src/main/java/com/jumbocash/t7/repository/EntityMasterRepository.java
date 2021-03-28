package com.jumbocash.t7.repository;

import com.jumbocash.t7.dto.EntityMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository
public interface EntityMasterRepository extends JpaRepository<EntityMaster, BigInteger> {

    @Query("SELECT e FROM EntityMaster e JOIN UserEntityLnk u on u.entityId = e.entityId WHERE u.userId = :userId and e.email = :email and e.entityType = :entityType")
    Optional<List<EntityMaster>> getEntityByEmail(@Param("email") String email, @Param("userId") BigInteger userId, @Param("entityType") String entityType);

    @Query("SELECT e FROM EntityMaster e JOIN UserEntityLnk u on u.entityId = e.entityId WHERE u.userId = :userId")
    Optional<List<EntityMaster>> getEntitiesByUserId(@Param("userId") BigInteger userId);


}
