package com.jumbocash.t7.dto;

import java.math.BigInteger;
import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity(name = "TRAN_MASTER")
public class TranMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tran_id")
	private BigInteger tranId;

	/*
	 * @Column(name="user_id") private BigInteger userId;
	 * 
	 * @Column(name="entity_id") private BigInteger entityId;
	 */

	@Column(name = "amount")
	private Long amount;

	@Column(name = "tran_typ")
	private String tranType;

	@Column(name = "pmt_mode")
	private String paymentMode;

	@Column(name = "crt_ts")
	@CreationTimestamp
	private Timestamp crtTs;

	@Column(name = "lst_updt_ts")
	@UpdateTimestamp
	private Timestamp lstUpdtTs;

	@Column(name = "remarks")
	private String remarks;

	@Column(name = "tran_status")
	private String tranStatus;
	
	@Column(name="tran_date")
	private Date tranDate;

	@ManyToOne
	@JoinColumn(name = "entity_id", nullable = false)
	private EntityMaster entity;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private AppUser user;

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public EntityMaster getEntity() {
		return entity;
	}

	public void setEntity(EntityMaster entity) {
		this.entity = entity;
	}

	public AppUser getUser() {
		return user;
	}

	public void setUser(AppUser user) {
		this.user = user;
	}

	public BigInteger getTranId() {
		return tranId;
	}

	public void setTranId(BigInteger tranId) {
		this.tranId = tranId;
	}

	public Long getAmount() {
		return amount;
	}

	public void setAmount(Long amount) {
		this.amount = amount;
	}

	public String getTranType() {
		return tranType;
	}

	public void setTranType(String tranTyp) {
		this.tranType = tranTyp;
	}

	public String getpaymentMode() {
		return paymentMode;
	}

	public void setpaymentMode(String pmtMode) {
		this.paymentMode = pmtMode;
	}

	public Timestamp getCrtTs() {
		return crtTs;
	}

	public void setCrtTs(Timestamp crtTs) {
		this.crtTs = crtTs;
	}

	public Timestamp getLstUpdtTs() {
		return lstUpdtTs;
	}

	public void setLstUpdtTs(Timestamp lstUpdtTs) {
		this.lstUpdtTs = lstUpdtTs;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getTranStatus() {
		return tranStatus;
	}

	public void setTranStatus(String tranStatus) {
		this.tranStatus = tranStatus;
	}

	public Date getTranDate() {
		return tranDate;
	}

	public void setTranDate(Date tranDate) {
		this.tranDate = tranDate;
	}
	
	

	/*
	 * public BigInteger getUserId() { return userId; }
	 * 
	 * public void setUserId(BigInteger userId) { this.userId = userId; }
	 * 
	 * public BigInteger getEntityId() { return entityId; }
	 * 
	 * public void setEntityId(BigInteger entityId) { this.entityId = entityId;
	 * }
	 */

}
