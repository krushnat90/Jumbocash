package com.jumbocash.t7.api;

import com.jumbocash.t7.dto.TranMaster;
import com.jumbocash.t7.model.Transaction;
import com.jumbocash.t7.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;
import javax.validation.Valid;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class TransactionApiController implements TransactionApi {

	private static final Logger log = LoggerFactory.getLogger(TransactionApiController.class);

	private final ObjectMapper objectMapper;

	private final HttpServletRequest request;

	private final TransactionService transactionService;

	public TransactionApiController(ObjectMapper objectMapper, HttpServletRequest request,
			TransactionService transactionService) {
		super();
		this.objectMapper = objectMapper;
		this.request = request;
		this.transactionService = transactionService;
	}

	public ResponseEntity<Transaction> addTransaction(
			@Parameter(in = ParameterIn.DEFAULT, description = "Transaction object that needs to be added.", required = true, schema = @Schema()) @Valid @RequestBody Transaction body) {
		
		Optional<TranMaster> addedTransaction = transactionService.addTransaction(body);
		
		if(!addedTransaction.isPresent())
			return ResponseEntity.badRequest().build();
		
		return ResponseEntity.ok(body);
	}

	public ResponseEntity<Transaction> getTransactionByTransactionId(
			@Parameter(in = ParameterIn.PATH, description = "Transaction ID", required = true, schema = @Schema()) @PathVariable("transactionId") BigInteger transactionId) {
			try {
				
				Optional<Transaction> transactionByTranId = transactionService.getTransactionByTranId(transactionId);
				
				return transactionByTranId.isPresent()?ResponseEntity.ok(transactionByTranId.get()):ResponseEntity.notFound().build();
				
			} catch (Exception e) {
				log.error("Couldn't serialize response for content type application/json", e);
				return new ResponseEntity<Transaction>(HttpStatus.INTERNAL_SERVER_ERROR);
			}

	}

	public ResponseEntity<List<Transaction>> getTransactionsByUserId(
			@Parameter(in = ParameterIn.PATH, description = "User ID", required = true, schema = @Schema()) @PathVariable("userId") BigInteger userId) {
			try {
				
				Optional<List<Transaction>> transactionsByUserId = transactionService.getTransactionsByUserId(userId);
				
				if(!transactionsByUserId.isPresent()){
					return ResponseEntity.notFound().build();
				}
				
				return ResponseEntity.ok(transactionsByUserId.get());
				
			} catch (Exception e) {
				log.error("Couldn't serialize response for content type application/json", e);
				return new ResponseEntity<List<Transaction>>(HttpStatus.INTERNAL_SERVER_ERROR);
			}

	}

	public ResponseEntity<Void> updateTransaction(
			@Parameter(in = ParameterIn.DEFAULT, description = "Transaction object that needs to be updated.", required = true, schema = @Schema()) @Valid @RequestBody Transaction body) {
		String accept = request.getHeader("Accept");
		return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
	}

}
