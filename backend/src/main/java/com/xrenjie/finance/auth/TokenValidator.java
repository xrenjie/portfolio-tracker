package com.xrenjie.finance.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class TokenValidator {

  private final JWKProvider jwkProvider;
  @Autowired
  public TokenValidator(JWKProvider jwkProvider) {
    this.jwkProvider = jwkProvider;
  }

  public DecodedJWT decodeToken(String _token) throws JWTDecodeException {
    String token = _token.split(" ")[1];
    DecodedJWT jwt = JWT.decode(token);
    return jwt;
  }

  public Boolean isValidToken(String token) throws Exception {
    DecodedJWT jwt = decodeToken(token);
    jwkProvider.getAlgorithm(jwt).verify(jwt);

    return true;
  }

  public Boolean authenticateUserWithToken(String userID, String token) throws Exception {
    if (token == null || token.isEmpty()) return false;
    if (!isValidToken(token)) return false;

    DecodedJWT jwt = decodeToken(token);
    String tokenUserID = jwt.getSubject();
    return userID.equals(tokenUserID);
  }

  public String getTokenSubject(String token) throws Exception {
    DecodedJWT jwt = decodeToken(token);
    return jwt.getSubject();
  }
}
