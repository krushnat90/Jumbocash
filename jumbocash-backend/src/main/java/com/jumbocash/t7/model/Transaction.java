package com.jumbocash.t7.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Transaction
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2021-03-07T11:46:35.995Z[GMT]")


public class Transaction   {
  @JsonProperty("tranId")
  private Long tranId = null;

  /**
   * Gets or Sets tranType
   */
  public enum TranTypeEnum {
    CREDIT("credit"),
    
    DEBIT("debit");

    private String value;

    TranTypeEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static TranTypeEnum fromValue(String text) {
      for (TranTypeEnum b : TranTypeEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }
  @JsonProperty("tranType")
  private TranTypeEnum tranType = null;

  @JsonProperty("tranTimestamp")
  private String tranTimestamp = null;

  /**
   * Gets or Sets tranStatus
   */
  public enum TranStatusEnum {
    PENDING("pending"),
    
    DONE("done");

    private String value;

    TranStatusEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static TranStatusEnum fromValue(String text) {
      for (TranStatusEnum b : TranStatusEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }
  @JsonProperty("tranStatus")
  private TranStatusEnum tranStatus = null;

  @JsonProperty("entityName")
  private String entityName = null;

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
   * @return tranId
   **/
  @Schema(description = "")
  
    public Long getTranId() {
    return tranId;
  }

  public void setTranId(Long tranId) {
    this.tranId = tranId;
  }

  public Transaction tranType(TranTypeEnum tranType) {
    this.tranType = tranType;
    return this;
  }

  /**
   * Get tranType
   * @return tranType
   **/
  @Schema(description = "")
  
    public TranTypeEnum getTranType() {
    return tranType;
  }

  public void setTranType(TranTypeEnum tranType) {
    this.tranType = tranType;
  }

  public Transaction tranTimestamp(String tranTimestamp) {
    this.tranTimestamp = tranTimestamp;
    return this;
  }

  /**
   * Get tranTimestamp
   * @return tranTimestamp
   **/
  @Schema(description = "")
  
    public String getTranTimestamp() {
    return tranTimestamp;
  }

  public void setTranTimestamp(String tranTimestamp) {
    this.tranTimestamp = tranTimestamp;
  }

  public Transaction tranStatus(TranStatusEnum tranStatus) {
    this.tranStatus = tranStatus;
    return this;
  }

  /**
   * Get tranStatus
   * @return tranStatus
   **/
  @Schema(description = "")
  
    public TranStatusEnum getTranStatus() {
    return tranStatus;
  }

  public void setTranStatus(TranStatusEnum tranStatus) {
    this.tranStatus = tranStatus;
  }

  public Transaction entityName(String entityName) {
    this.entityName = entityName;
    return this;
  }

  /**
   * Get entityName
   * @return entityName
   **/
  @Schema(description = "")
  
    public String getEntityName() {
    return entityName;
  }

  public void setEntityName(String entityName) {
    this.entityName = entityName;
  }

  public Transaction paymentMode(String paymentMode) {
    this.paymentMode = paymentMode;
    return this;
  }

  /**
   * Get paymentMode
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
   * @return remarks
   **/
  @Schema(description = "")
  
    public String getRemarks() {
    return remarks;
  }

  public void setRemarks(String remarks) {
    this.remarks = remarks;
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
    return Objects.equals(this.tranId, transaction.tranId) &&
        Objects.equals(this.tranType, transaction.tranType) &&
        Objects.equals(this.tranTimestamp, transaction.tranTimestamp) &&
        Objects.equals(this.tranStatus, transaction.tranStatus) &&
        Objects.equals(this.entityName, transaction.entityName) &&
        Objects.equals(this.paymentMode, transaction.paymentMode) &&
        Objects.equals(this.amount, transaction.amount) &&
        Objects.equals(this.remarks, transaction.remarks);
  }

  @Override
  public int hashCode() {
    return Objects.hash(tranId, tranType, tranTimestamp, tranStatus, entityName, paymentMode, amount, remarks);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Transaction {\n");
    
    sb.append("    tranId: ").append(toIndentedString(tranId)).append("\n");
    sb.append("    tranType: ").append(toIndentedString(tranType)).append("\n");
    sb.append("    tranTimestamp: ").append(toIndentedString(tranTimestamp)).append("\n");
    sb.append("    tranStatus: ").append(toIndentedString(tranStatus)).append("\n");
    sb.append("    entityName: ").append(toIndentedString(entityName)).append("\n");
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
