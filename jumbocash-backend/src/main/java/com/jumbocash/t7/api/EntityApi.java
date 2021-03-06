/**
 * NOTE: This class is auto generated by the swagger code generator program (3.0.24).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package com.jumbocash.t7.api;

import com.jumbocash.t7.model.Entity;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

@CrossOrigin
public interface EntityApi {

    @Operation(summary = "Add new entity", description = "", tags={ "entity" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Successful Operation") })
    @RequestMapping(value = "/entity",
        consumes = { "application/json" }, 
        method = RequestMethod.POST)
    ResponseEntity<Void> addEntity(@Parameter(in = ParameterIn.DEFAULT, description = "Entity object that needs to be added.", required=true, schema=@Schema()) @Valid @RequestBody Entity entity);


    @Operation(summary = "Display entity by Entity ID.", description = "Display entity details.", tags={ "entity" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(schema = @Schema(implementation = Entity.class))) })
    @RequestMapping(value = "/entity/{entityId}",
        produces = { "application/json" }, 
        method = RequestMethod.GET)
    ResponseEntity<Entity> getEntityByEntityId(@Parameter(in = ParameterIn.PATH, description = "Entity ID", required=true, schema=@Schema()) @PathVariable("entityId") BigInteger entityId);


    @Operation(summary = "Display all entities.", description = "Display all entities for an user.", tags={ "entity" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Entity.class)))) })
    @RequestMapping(value = "/entity/user/{userId}",
        produces = { "application/json" }, 
        method = RequestMethod.GET)
    ResponseEntity<List<Entity>> getEntitiesByUserId(@Parameter(in = ParameterIn.PATH, description = "User ID", required=true, schema=@Schema()) @PathVariable("userId") BigInteger userId);


    @Operation(summary = "Update entity details", description = "", tags={ "entity" })
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful Operation") })
    @RequestMapping(value = "/entity",
        consumes = { "application/json" },
        method = RequestMethod.PATCH)
    ResponseEntity<Entity> updateEntity(@Parameter(in = ParameterIn.DEFAULT, description = "Entity object that needs to be updated.", required=true, schema=@Schema()) @Valid @RequestBody Entity entity);
    
    @Operation(summary = "Delete Entity", description = "", tags={ "entity" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Successful Operation") })
    @RequestMapping(value = "/entity/{entityId}",
        produces = { "application/json" }, 
        method = RequestMethod.DELETE)
    ResponseEntity<ApiResponseMessage> deleteEntity(@Parameter(in = ParameterIn.DEFAULT, description = "Entity id that needs to be deleted.", required=true, schema=@Schema()) @Valid @PathVariable("entityId") BigInteger entityId);

}

