package com.jumbocash.t7.model;

import java.math.BigInteger;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Entity
 */
@Validated
public class Entity {
	@JsonProperty("id")
	private BigInteger entityId = null;

	@JsonProperty("entityType")
	private String entityType = null;

	@JsonProperty("entityName")
	private String entityName = null;

	@JsonProperty("email")
	private String email = null;

	@JsonProperty("phone")
	private BigInteger phone = null;

	@JsonProperty("address")
	private String address = null;

	@JsonProperty("city")
	private String city = null;

	@JsonProperty("state")
	private String state = null;

	@JsonProperty("zip")
	private Integer zip = null;

	@JsonProperty("userId")
	private BigInteger userId = null;
	
	public Entity userId(BigInteger userId){
		this.userId = userId;
		return this;
	}

	public BigInteger getUserId() {
		return userId;
	}

	public void setUserId(BigInteger userId) {
		this.userId = userId;
	}

	public Entity entityId(BigInteger entityId) {
		this.entityId = entityId;
		return this;
	}

	/**
	 * Get entityId
	 * 
	 * @return entityId
	 **/
	@Schema(description = "")

	public BigInteger getEntityId() {
		return entityId;
	}

	public void setEntityId(BigInteger entityId) {
		this.entityId = entityId;
	}

	public Entity entityType(String entityType) {
		this.entityType = entityType;
		return this;
	}

	/**
	 * Get entityType
	 * 
	 * @return entityType
	 **/
	@Schema(description = "")

	public String getEntityType() {
		return entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

	public Entity entityName(String entityName) {
		this.entityName = entityName;
		return this;
	}

	public Entity email(String email) {
		this.email = email;
		return this;
	}

	/**
	 * Get email
	 * 
	 * @return email
	 **/
	@Schema(description = "")

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Get entityName
	 * 
	 * @return entityName
	 **/
	@Schema(description = "")

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public Entity phone(BigInteger phone) {
		this.phone = phone;
		return this;
	}

	/**
	 * Get phone
	 * 
	 * @return phone
	 **/
	@Schema(description = "")

	public BigInteger getPhone() {
		return phone;
	}

	public void setPhone(BigInteger phone) {
		this.phone = phone;
	}

	public Entity address(String address) {
		this.address = address;
		return this;
	}

	/**
	 * Get address
	 * 
	 * @return address
	 **/
	@Schema(description = "")

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Entity city(String city) {
		this.city = city;
		return this;
	}

	/**
	 * Get city
	 * 
	 * @return city
	 **/
	@Schema(description = "")

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Entity state(String state) {
		this.state = state;
		return this;
	}

	/**
	 * Get state
	 * 
	 * @return state
	 **/
	@Schema(description = "")

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Entity zip(Integer zip) {
		this.zip = zip;
		return this;
	}

	/**
	 * Get zip
	 * 
	 * @return zip
	 **/
	@Schema(description = "")

	public Integer getZip() {
		return zip;
	}

	public void setZip(Integer zip) {
		this.zip = zip;
	}

	@Override
	public boolean equals(java.lang.Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Entity entity = (Entity) o;
		return Objects.equals(this.entityId, entity.entityId) && Objects.equals(this.entityType, entity.entityType)
				&& Objects.equals(this.entityName, entity.entityName) && Objects.equals(this.email, entity.email)
				&& Objects.equals(this.phone, entity.phone) && Objects.equals(this.address, entity.address)
				&& Objects.equals(this.city, entity.city) && Objects.equals(this.state, entity.state)
				&& Objects.equals(this.zip, entity.zip);
	}

	@Override
	public int hashCode() {
		return Objects.hash(entityId, entityType, entityName, email, phone, address, city, state, zip);
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("class Entity {\n");

		sb.append("    entityId: ").append(toIndentedString(entityId)).append("\n");
		sb.append("    entityType: ").append(toIndentedString(entityType)).append("\n");
		sb.append("    entityName: ").append(toIndentedString(entityName)).append("\n");
		sb.append("    entityName: ").append(toIndentedString(email)).append("\n");
		sb.append("    phone: ").append(toIndentedString(phone)).append("\n");
		sb.append("    address: ").append(toIndentedString(address)).append("\n");
		sb.append("    city: ").append(toIndentedString(city)).append("\n");
		sb.append("    state: ").append(toIndentedString(state)).append("\n");
		sb.append("    zip: ").append(toIndentedString(zip)).append("\n");
		sb.append("}");
		return sb.toString();
	}

	/**
	 * Convert the given object to string with each line indented by 4 spaces
	 * (except the first line).
	 */
	private String toIndentedString(java.lang.Object o) {
		if (o == null) {
			return "null";
		}
		return o.toString().replace("\n", "\n    ");
	}
}
