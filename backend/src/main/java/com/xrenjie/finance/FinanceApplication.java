package com.xrenjie.finance;

import com.xrenjie.finance.user.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;

@SpringBootApplication
@EnableJpaAuditing
public class FinanceApplication {

	public static void main(String[] args) {
		System.setProperty("spring.config.name", "main-web-server");
		SpringApplication.run(FinanceApplication.class, args);
	}

}