/**
 * NOTE: This class is auto generated by the swagger code generator program (3.0.24).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package com.jumbocash.t7.api;

import com.jumbocash.t7.model.Transaction;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CookieValue;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Map;

@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2021-03-07T11:46:35.995Z[GMT]")
public interface TransactionApi {

    @Operation(summary = "Add new transaction", description = "", tags={ "transaction" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Successful Operation") })
    @RequestMapping(value = "/transaction",
        consumes = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<Void> addTransaction(@Parameter(in = ParameterIn.DEFAULT, description = "Transaction object that needs to be added.", required=true, schema=@Schema()) @Valid @RequestBody Transaction body);


    @Operation(summary = "Display transaction.", description = "Display transctions for a transaction ID.", tags={ "transaction" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(schema = @Schema(implementation = Transaction.class))) })
    @RequestMapping(value = "/transaction/{transactionId}",
        produces = { "application/json" }, 
        method = RequestMethod.GET)
    ResponseEntity<Transaction> getTransactionByTransactionId(@Parameter(in = ParameterIn.PATH, description = "Transaction ID", required=true, schema=@Schema()) @PathVariable("transactionId") Long transactionId);


    @Operation(summary = "Display all transaction.", description = "Display all transctions for an user.", tags={ "transaction" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Transaction.class)))) })
    @RequestMapping(value = "/transaction/{userId}",
        produces = { "application/json" }, 
        method = RequestMethod.GET)
    ResponseEntity<List<Transaction>> getTransactionsByUserId(@Parameter(in = ParameterIn.PATH, description = "User ID", required=true, schema=@Schema()) @PathVariable("userId") Long userId);


    @Operation(summary = "Update transaction details", description = "", tags={ "transaction" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Successful Operation") })
    @RequestMapping(value = "/transaction",
        consumes = { "application/json" }, 
        method = RequestMethod.PATCH)
    ResponseEntity<Void> updateTransaction(@Parameter(in = ParameterIn.DEFAULT, description = "Transaction object that needs to be updated.", required=true, schema=@Schema()) @Valid @RequestBody Transaction body);

}

