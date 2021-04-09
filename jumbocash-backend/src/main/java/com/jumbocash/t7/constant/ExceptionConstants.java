package com.jumbocash.t7.constant;

public class ExceptionConstants {

    public static final String NO_ENTRY_FOUND_FOR_THIS_ENTITY = "No entry found for this entity";
    public static final String ENTITY_ALREADY_EXISTS = "An entity with same email id is already registered";
    
    public static final String TRANSACTION_USERID_ABSENT = "User id is not present which is mandatory for this request";
    public static final String TRANSACTION_ENTITYID_ABSENT = "Entity id is not present which is mandatory for this request";
    
    public static final String TRANSACTION_ABSENT = "Could not locate this transaction. Cannot proceed for this request.";
    
    public static final String TRANSACTION_USERID_INVALID = "User id is not present in the system. Cannot proceed for this request";
    public static final String TRANSACTION_ENTITYID_INVALID = "Entity id is not present in the system for this user. Cannot proceed for this request";
    
    public static final String TRANSACTION_USERID_CHANGE_NO_ALLOW = "User id cannot be updated with this request.";
    public static final String TRANSACTION_ENTITYID_CHANGE_NO_ALLOW = "Entity id cannot be updated with this request.";
    
    public static final String REQUEST_SUCCESS = "Request went all the way through! ";
    
    
    public static final String ENTITY_ABSENT = "Could not locate this Entity. Cannot proceed for this request.";
    
}
