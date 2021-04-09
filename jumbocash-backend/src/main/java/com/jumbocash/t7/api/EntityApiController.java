package com.jumbocash.t7.api;

import com.jumbocash.t7.auth.GoogleAuthenticator;
import com.jumbocash.t7.exception.JumbocashException;
import com.jumbocash.t7.model.Entity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jumbocash.t7.service.EntityService;
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
import org.springframework.beans.factory.annotation.Autowired;
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
public class EntityApiController implements EntityApi {

	private static final Logger log = LoggerFactory.getLogger(EntityApiController.class);

	private final ObjectMapper objectMapper;

	private final HttpServletRequest request;

	private GoogleAuthenticator googleAuthenticator;

	@Autowired
	private EntityService entityService;

	public EntityApiController(ObjectMapper objectMapper, HttpServletRequest request,
			GoogleAuthenticator googleAuthenticator, EntityService entityService) {
		super();
		this.objectMapper = objectMapper;
		this.request = request;
		this.googleAuthenticator = googleAuthenticator;
		this.entityService = entityService;
	}

	public ResponseEntity<Void> addEntity(
			@Parameter(in = ParameterIn.DEFAULT, description = "Entity object that needs to be added.", required = true, schema = @Schema()) @Valid @RequestBody Entity entity) {
		try {
			String authorizationHeader = request.getHeader("AUTH_GOOGLE_TOKEN");
			if (!googleAuthenticator.isTokenIdValid(authorizationHeader))
				return new ResponseEntity(HttpStatus.FORBIDDEN);

			return new ResponseEntity<Void>(entityService.addNewEntity(entity), HttpStatus.OK);
		} catch (JumbocashException je) {
			log.error("Entry already present in database for Email ID : " + entity.getEmail());
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		} catch (Exception e) {
			log.error("Exception occurred in addEntity method for entity " + entity.toString() + " --> "
					+ e.getMessage());
			return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Entity> getEntityByEntityId(
			@Parameter(in = ParameterIn.PATH, description = "Entity ID", required = true, schema = @Schema()) @PathVariable("entityId") BigInteger entityId) {
		try {
			String authorizationHeader = request.getHeader("AUTH_GOOGLE_TOKEN");
			if (!googleAuthenticator.isTokenIdValid(authorizationHeader))
				return new ResponseEntity(HttpStatus.FORBIDDEN);

			Optional<Entity> entity = entityService.getEntityByEntityId(entityId);
			if (!entity.isPresent())
				return ResponseEntity.notFound().build();

			return ResponseEntity.ok(entity.get());
		} catch (Exception e) {
			log.error("Exception occurred in getEntityByEntityId method for entity ID: " + entityId + " --> "
					+ e.getMessage());
			return new ResponseEntity<Entity>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<List<Entity>> getEntitiesByUserId(
			@Parameter(in = ParameterIn.PATH, description = "User ID", required = true, schema = @Schema()) @PathVariable("userId") BigInteger userId) {
		try {
			String authorizationHeader = request.getHeader("AUTH_GOOGLE_TOKEN");
			if (!googleAuthenticator.isTokenIdValid(authorizationHeader))
				return new ResponseEntity(HttpStatus.FORBIDDEN);

			return new ResponseEntity<List<Entity>>(entityService.getEntitiesByUserId(userId), HttpStatus.OK);
		} catch (Exception e) {
			log.error("Exception occurred in getEntitiesByUserId method for user ID: " + userId + " --> "
					+ e.getMessage());
			return new ResponseEntity<List<Entity>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Entity> updateEntity(
			@Parameter(in = ParameterIn.DEFAULT, description = "Entity object that needs to be updated.", required = true, schema = @Schema()) @Valid @RequestBody Entity entity) {
		try {
			String authorizationHeader = request.getHeader("AUTH_GOOGLE_TOKEN");
			if (!googleAuthenticator.isTokenIdValid(authorizationHeader))
				return new ResponseEntity(HttpStatus.FORBIDDEN);

			return new ResponseEntity<Entity>(entityService.updateExistingEntity(entity), HttpStatus.OK);
		} catch (JumbocashException je) {
			log.error("No entry found in database for Entity ID " + entity.getEntityId());
			return new ResponseEntity<Entity>(HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			log.error("Exception occurred in updateEntity method for entity " + entity.toString() + " --> "
					+ e.getMessage());
			return new ResponseEntity<Entity>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<ApiResponseMessage> deleteEntity(@Valid BigInteger entityId) {
		try {
			String authorizationHeader = request.getHeader("AUTH_GOOGLE_TOKEN");
			if (!googleAuthenticator.isTokenIdValid(authorizationHeader))
				return new ResponseEntity(HttpStatus.FORBIDDEN);
			return ResponseEntity.ok(entityService.deleteEntity(entityId).get());
		} catch (Exception e) {
			log.error("Exception occurred in deleteEntity method for entity " + entityId + " --> " + e.getMessage());
			return new ResponseEntity<ApiResponseMessage>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
