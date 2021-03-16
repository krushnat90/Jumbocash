package com.jumbocash.t7.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import java.math.BigInteger;

@Entity
@Table(name = "USER_ENTITY_LNK")
public class UserEntityLnk {

	@Id
	private BigInteger userId;

	private BigInteger entityId;

	public BigInteger getUserId() {
		return userId;
	}

	public UserEntityLnk() {
		super();
	}

	public UserEntityLnk(BigInteger userId, BigInteger entityId) {
		super();
		this.userId = userId;
		this.entityId = entityId;
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
