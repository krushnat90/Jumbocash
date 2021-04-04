package com.jumbocash.t7.api;

import com.jumbocash.t7.auth.GoogleAuthenticator;
import com.jumbocash.t7.model.User;
import com.jumbocash.t7.model.UserEntityLink;
import com.jumbocash.t7.service.UserService;
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

@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2021-03-07T11:46:35.995Z[GMT]")
@RestController
public class UserApiController implements UserApi {

	private static final Logger log = LoggerFactory.getLogger(UserApiController.class);

	private final HttpServletRequest request;

	UserService userService;
	
	GoogleAuthenticator googleAuthenticator; 

	

	public UserApiController(HttpServletRequest request, UserService userService,
			GoogleAuthenticator googleAuthenticator) {
		super();
		this.request = request;
		this.userService = userService;
		this.googleAuthenticator = googleAuthenticator;
	}

	public ResponseEntity<Void> linkEntity(
			@Parameter(in = ParameterIn.DEFAULT, description = "User Entity Link Object.", required = true, schema = @Schema()) @Valid @RequestBody UserEntityLink body) {
		String authorizationHeader = request.getHeader("AUTH_GOOGLE_TOKEN");
		if(!googleAuthenticator.isTokenIdValid(authorizationHeader))
			return new ResponseEntity(HttpStatus.FORBIDDEN);
		return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
	}

	@Override
	public ResponseEntity<User> addOrUpdateUser(@Valid User user) {

		String authorizationHeader = request.getHeader("AUTH_GOOGLE_TOKEN");
		if(!googleAuthenticator.isTokenIdValid(authorizationHeader))
			return new ResponseEntity(HttpStatus.FORBIDDEN);
		
		Optional<User> operatedUser = userService.addOrUpdateUser(user);

		if (!operatedUser.isPresent())
			return ResponseEntity.badRequest().build();

		return ResponseEntity.ok(operatedUser.get());
	}

	@Override
	public ResponseEntity<Map<String, BigInteger>> getSummaryInfoByUserId(BigInteger userId) {

		try {
			
			String authorizationHeader = request.getHeader("AUTH_GOOGLE_TOKEN");
			if(!googleAuthenticator.isTokenIdValid(authorizationHeader))
				return new ResponseEntity(HttpStatus.FORBIDDEN);
			
			return ResponseEntity.ok(userService.getSummaryInfoByUserId(userId));
		} catch (Exception ex) {
			return new ResponseEntity<Map<String, BigInteger>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
