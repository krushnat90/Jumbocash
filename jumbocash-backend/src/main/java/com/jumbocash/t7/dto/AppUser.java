package com.jumbocash.t7.dto;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "APP_USER")
public class AppUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private BigInteger userId;

	@Column(name = "email")
	private String email;

	@Column(name = "name")
	private String name;

	@Column(name = "provider_id")
	private BigInteger providerId;

	@Column(name = "token")
	private String token;

	@ManyToMany(mappedBy="users")
	private List<EntityMaster> entities = new ArrayList<>();

	public List<EntityMaster> getEntities() {
		return entities;
	}

	public void setEntities(List<EntityMaster> entities) {
		this.entities = entities;
	}

	public BigInteger getUserId() {
		return userId;
	}

	public void setUserId(BigInteger userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigInteger getProvider() {
		return providerId;
	}

	public void setProviderId(BigInteger providerId) {
		this.providerId = providerId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
