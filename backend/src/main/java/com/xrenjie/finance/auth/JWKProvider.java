package com.xrenjie.finance.auth;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.JwkProviderBuilder;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;

import java.security.interfaces.RSAPublicKey;
import java.util.concurrent.TimeUnit;


@Service
public class JWKProvider {

  private final JwkProvider provider = new JwkProviderBuilder("https://finance-12-app.us.auth0.com")
  // up to 10 JWKs will be cached for up to 24 hours
        .cached(10, 24, TimeUnit.HOURS)
  // up to 10 JWKs can be retrieved within one minute
        .rateLimited(10, 1, TimeUnit.MINUTES)
        .build();


  public Algorithm getAlgorithm(DecodedJWT jwt) throws Exception {
    Jwk jwk = provider.get(jwt.getKeyId());
    return Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(),null);
  }
}
