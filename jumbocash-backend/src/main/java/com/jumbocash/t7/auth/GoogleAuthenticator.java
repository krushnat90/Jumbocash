package com.jumbocash.t7.auth;

import java.util.Collections;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

@Component
public class GoogleAuthenticator {

	public static final Logger logger = LogManager.getLogger(GoogleAuthenticator.class);

	@Value("${ENABLE_AUTH}")
	private boolean isAuthenticationEnabled;

	@Value("${GOOGLE_CLIENT_ID}")
	private String CLIENT_ID;

	private static final HttpTransport transport = new NetHttpTransport();

	private static final JsonFactory jsonFactory = new GsonFactory();

	public boolean isTokenIdValid(String tokenId) {
		
		logger.debug("Token received : "+tokenId);
		
		if(!isAuthenticationEnabled)
			return true;

		if (StringUtils.isNotBlank(tokenId)) {
			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
					.setAudience(Collections.singletonList(CLIENT_ID)).build();
			try {
				Optional<GoogleIdToken> idToken = Optional.of(verifier.verify(tokenId));
				return idToken.isPresent();

			} catch (Exception e) {
				logger.error("Exception at google authenticator : " + ExceptionUtils.getStackTrace(e));
			}
		}
		return false;
	}

}
