package com.example.backend.controller;

import com.example.backend.DTO.requestDTO.LoginRequestDTO;
import com.example.backend.DTO.responseDTO.LoginResponseDTO;
import com.example.backend.DTO.responseDTO.UserResponseDTO;
import com.example.backend.security.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    Map<String,Boolean> map = new HashMap<>();

    //constructor is done by @RequiredArgsConstructor , is basically only with final or @notNull annotations.
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@Valid @RequestBody LoginRequestDTO loginRequestDTO){
        LoginResponseDTO loginResponseDTO = authService.login(loginRequestDTO);
        return new ResponseEntity<>(loginResponseDTO,HttpStatus.OK);
    }
}
