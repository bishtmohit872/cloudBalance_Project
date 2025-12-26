package com.example.backend.utils;

import com.example.backend.DTO.requestDTO.AddUserRequestDTO;
import com.example.backend.DTO.requestDTO.EditUserRequestDTO;
import com.example.backend.DTO.responseDTO.UserResponseDTO;
import com.example.backend.entity.UserEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class Transformer {

    public static PasswordEncoder passwordEncoder;

    public Transformer(PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
    }

    // this method is for creating the user via admin
    public static UserEntity AddUserRequestDTOtoAddUserEntity(AddUserRequestDTO addUserRequestDTO){
        return UserEntity.builder()
                .firstName(addUserRequestDTO.getFirstName())
                .lastName(addUserRequestDTO.getLastName())
                .email(addUserRequestDTO.getEmail())
                .username(addUserRequestDTO.getUsername())
                .password(passwordEncoder.encode(addUserRequestDTO.getPassword()))
                .role(UserEntity.Role.valueOf(addUserRequestDTO.getRole()))
                .build();

    }

    public static UserResponseDTO UserEntitytoUserResponseDTO(UserEntity userEntity){
        return  UserResponseDTO.builder()
                .id(userEntity.getId())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .email(userEntity.getEmail())
                .username(userEntity.getUsername())
                .role(userEntity.getRole().toString())
                .build();
    }

    public static UserEntity EditUserRequestDTOtoUserEntity(EditUserRequestDTO editUserRequestDTO){
        return UserEntity.builder()
                .id(editUserRequestDTO.getId())
                .firstName(editUserRequestDTO.getFirstName())
                .lastName(editUserRequestDTO.getLastName())
                .email(editUserRequestDTO.getEmail())
                .build();
    }
}
