package com.jumbocash.t7.model;

import java.math.BigInteger;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Transaction
 */

public class Transaction {
	@JsonProperty("tranId")
	private Long tranId = null;

	/**
	 * Gets or Sets tranType
	 */

	@JsonProperty("tranType")
	private String tranType = null;

	@JsonProperty("tranTimestamp")
	private String lstUpdtTs = null;

	/**
	 * Gets or Sets tranStatus
	 */

	@JsonProperty("tranStatus")
	private String tranStatus = null;

	@JsonProperty("entityId")
	private BigInteger entityId = null;
	
	@JsonProperty("entityName")
	private String entityName = null;
	
	@JsonProperty("userId")
	private BigInteger userId = null;

	@JsonProperty("paymentMode")
	private String paymentMode = null;

	@JsonProperty("amount")
	private Long amount = null;

	@JsonProperty("remarks")
	private String remarks = null;

	public Transaction tranId(Long tranId) {
		this.tranId = tranId;
		return this;
	}

	/**
	 * Get tranId
	 * 
	 * @return tranId
	 **/
	@Schema(description = "")

	public Long getTranId() {
		return tranId;
	}

	public void setTranId(Long tranId) {
		this.tranId = tranId;
	}

	public Transaction tranType(String tranType) {
		this.tranType = tranType;
		return this;
	}
	
	

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	/**
	 * Get tranType
	 * 
	 * @return tranType
	 **/
	@Schema(description = "")

	public String getTranType() {
		return tranType;
	}

	public void setTranType(String tranType) {
		this.tranType = tranType;
	}

	public Transaction lstUpdtTs(String tranTimestamp) {
		this.lstUpdtTs = tranTimestamp;
		return this;
	}

	/**
	 * Get tranTimestamp
	 * 
	 * @return tranTimestamp
	 **/
	@Schema(description = "")

	public String getLstUpdtTs() {
		return lstUpdtTs;
	}

	public void setLstUpdtTs(String tranTimestamp) {
		this.lstUpdtTs = tranTimestamp;
	}

	public Transaction tranStatus(String tranStatus) {
		this.tranStatus = tranStatus;
		return this;
	}

	/**
	 * Get tranStatus
	 * 
	 * @return tranStatus
	 **/
	@Schema(description = "")

	public String getTranStatus() {
		return tranStatus;
	}

	public void setTranStatus(String tranStatus) {
		this.tranStatus = tranStatus;
	}

	public Transaction paymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
		return this;
	}

	/**
	 * Get paymentMode
	 * 
	 * @return paymentMode
	 **/
	@Schema(description = "")

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public Transaction amount(Long amount) {
		this.amount = amount;
		return this;
	}

	/**
	 * Get amount
	 * 
	 * @return amount
	 **/
	@Schema(description = "")

	public Long getAmount() {
		return amount;
	}

	public void setAmount(Long amount) {
		this.amount = amount;
	}

	public Transaction remarks(String remarks) {
		this.remarks = remarks;
		return this;
	}

	/**
	 * Get remarks
	 * 
	 * @return remarks
	 **/
	@Schema(description = "")

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	/**
	 * Get entity id
	 * 
	 * @return entityId
	 **/

	public Transaction entityId(BigInteger entityId){
		this.entityId = entityId;
		return this;
	}
	
	public BigInteger getEntityId() {
		return entityId;
	}

	public void setEntityId(BigInteger entityId) {
		this.entityId = entityId;
	}
	
	/**
	 * Get user id
	 * 
	 * @return userId
	 **/
	
	public Transaction userId(BigInteger userId){
		this.userId = userId;
		return this;
	}

	public BigInteger getUserId() {
		return userId;
	}

	public void setUserId(BigInteger userId) {
		this.userId = userId;
	}

	@Override
	public boolean equals(java.lang.Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Transaction transaction = (Transaction) o;
		return Objects.equals(this.tranId, transaction.tranId) && Objects.equals(this.tranType, transaction.tranType)
				&& Objects.equals(this.lstUpdtTs, transaction.lstUpdtTs)
				&& Objects.equals(this.tranStatus, transaction.tranStatus)
				&& Objects.equals(this.paymentMode, transaction.paymentMode)
				&& Objects.equals(this.amount, transaction.amount) && Objects.equals(this.remarks, transaction.remarks);
	}

	@Override
	public int hashCode() {
		return Objects.hash(tranId, tranType, lstUpdtTs, tranStatus, paymentMode, amount, remarks);
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("class Transaction {\n");

		sb.append("    tranId: ").append(toIndentedString(tranId)).append("\n");
		sb.append("    tranType: ").append(toIndentedString(tranType)).append("\n");
		sb.append("    tranTimestamp: ").append(toIndentedString(lstUpdtTs)).append("\n");
		sb.append("    tranStatus: ").append(toIndentedString(tranStatus)).append("\n");
		sb.append("    paymentMode: ").append(toIndentedString(paymentMode)).append("\n");
		sb.append("    amount: ").append(toIndentedString(amount)).append("\n");
		sb.append("    remarks: ").append(toIndentedString(remarks)).append("\n");
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
