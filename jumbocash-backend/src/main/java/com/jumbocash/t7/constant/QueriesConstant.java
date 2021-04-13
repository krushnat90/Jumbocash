package com.jumbocash.t7.constant;

public class QueriesConstant {
	
	public static final String SELECT_TOTAL_CASH_IN="select sum(abs(amount)) from TranMaster where user_Id=:userId and tranType='credit'";
	
	public static final String SELECT_TOTAL_CASH_OUT="select sum(abs(amount)) from TranMaster where user_Id=:userId and tranType='debit'";
	
	public static final String SELECT_SIX_MONTHS_TXN = "select new com.jumbocash.t7.model.RecentTransactionsBean(to_date(to_char(t.tranDate,'YYYY-MM-DD'),'YYYY-MM'),sum(abs(t.amount)))\r\n" + 
			"from TranMaster t \r\n" + 
			"where user_id= :userId \r\n" + 
			"and t.tranType= :tranType\r\n" + 
			"group by to_date(to_char(t.tranDate,'YYYY-MM-DD'),'YYYY-MM'),t.tranType\r\n" + 
			"order by to_date(to_char(t.tranDate,'YYYY-MM-DD'),'YYYY-MM') desc\r\n";
	
	public static final String SELECT_TRANSACTION_DURING_DATE = "select T from TranMaster T where user_id= :userId and tranType = :tranType \r\n" + 
			"and T.tranDate between :startDate and :endDate";

}
