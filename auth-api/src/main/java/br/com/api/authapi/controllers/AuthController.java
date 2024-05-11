package br.com.api.authapi.controllers;


import br.com.api.authapi.domain.user.User;
import br.com.api.authapi.dto.LoginRequestDTO;
import br.com.api.authapi.dto.RegisterRequestDTO;
import br.com.api.authapi.dto.ResponseDTO;
import br.com.api.authapi.infra.security.TokenService;
import br.com.api.authapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        User user = this.repository.findByUsername(body.username()).orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getUsername(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {


        Optional<User> userUsername = repository.findByUsername(body.username());
        if (userUsername.isPresent()) {
            return ResponseEntity.badRequest().body("Username already in use");
        }

        Optional<User> userEmail = repository.findByEmail(body.email());
        if (userEmail.isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }


        User newUser = new User();
        newUser.setPassword(passwordEncoder.encode(body.password()));
        newUser.setUsername(body.username());
        newUser.setEmail(body.email());
        this.repository.save(newUser);
        String token = this.tokenService.generateToken(newUser);
        return ResponseEntity.ok(new ResponseDTO(newUser.getUsername(), token));

//        return ResponseEntity.badRequest().build();
    }


}
