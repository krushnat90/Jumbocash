package com.jumbocash.t7.model;

import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
	
	@JsonProperty
	private BigInteger userId;
	
	@JsonProperty
	private String email;
	
	@JsonProperty
	private String name;
	
	@JsonProperty
	private String providerName;
	
	@JsonProperty
	private String token;

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

	public String getProviderName() {
		return providerName;
	}

	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	

}
