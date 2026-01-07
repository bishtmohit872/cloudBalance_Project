package com.example.backend.security;

import com.example.backend.DTO.requestDTO.LoginRequestDTO;
import com.example.backend.DTO.responseDTO.LoginResponseDTO;
import com.example.backend.DTO.responseDTO.UserResponseDTO;
import com.example.backend.entity.UserEntity;
import com.example.backend.utils.Transformer;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

@Service
//@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;

    public AuthService(AuthenticationManager authenticationManager,AuthUtil authUtil){

        this.authenticationManager = authenticationManager;
        this.authUtil = authUtil;
    }

    public LoginResponseDTO login(@Valid LoginRequestDTO loginRequestDTO) throws UsernameNotFoundException {
        System.out.println("in authservice");
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(),loginRequestDTO.getPassword()));
        System.out.println("From AuthSerice:"+authentication);
//        above line will return below object like this

//        UsernamePasswordAuthenticationToken [
//            principal = UserEntity // this contain whole information about user which fetch from userDetailsService
//            credentials = null
//            authorities = [ROLE_USER, ROLE_ADMIN]
//            authenticated = true
//        ]
        UserEntity userDetails = (UserEntity) authentication.getPrincipal();
        String token = authUtil.generateAccessToken(userDetails);

        UserResponseDTO userResponseDTO = Transformer.userEntitytoUserResponseDTO(userDetails);

        return LoginResponseDTO.builder()
                .Jwt(token)
                .userResponseDTO(userResponseDTO)
                .build();
    }
}
