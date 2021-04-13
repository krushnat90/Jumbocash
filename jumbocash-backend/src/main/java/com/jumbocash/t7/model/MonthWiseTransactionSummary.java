package com.jumbocash.t7.model;

import java.math.BigInteger;

public class MonthWiseTransactionSummary {
	
	private String month;
	private BigInteger credit;
	private BigInteger debit;
	
	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}
	
	public MonthWiseTransactionSummary month(String month){
		this.month = month;
		return this;
	}
	
	public BigInteger getCredit() {
		return credit;
	}

	public void setCredit(BigInteger credit) {
		this.credit = credit;
	}

	public MonthWiseTransactionSummary credit(BigInteger credit){
		this.credit = credit;
		return this;
	}

	public BigInteger getDebit() {
		return debit;
	}

	public void setDebit(BigInteger debit) {
		this.debit = debit;
	}

	public MonthWiseTransactionSummary debit(BigInteger debit){
		this.debit = debit;
		return this;
	}
	
}
