package com.jumbocash.t7.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.math.BigInteger;

@Entity
public class UserEntityLnk {
    @Id
    private BigInteger userId;
    private BigInteger entityId;

//    @M@OneToMany(mappedBy="UserEntityLnk")
//    private UserEntityLnk userEntityLnk;

    public BigInteger getUserId() {
        return userId;
    }

    public void setUserId(BigInteger userId) {
        this.userId = userId;
    }

    public BigInteger getEntityId() {
        return entityId;
    }

    public void setEntityId(BigInteger entityId) {
        this.entityId = entityId;
    }
}
