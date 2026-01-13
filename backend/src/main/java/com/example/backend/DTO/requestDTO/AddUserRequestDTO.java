package com.example.backend.DTO.requestDTO;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

//admin detail for reference purpose
//{
//        "firstName":"Mohit",
//        "lastName":"Bisht",
//        "email":"Mohit.Bisht@cloudkeeper.com",
//        "username":"Mohit@123",
//        "password":"mohitbisht",
//        "role":"Admin",
//        "isActive": true
//}

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddUserRequestDTO {

    @Size(min=3,max=10, message = "First Name length should be between 3 and 10 characters")
    private String firstName;

    @Size(min=3,max=10, message = "Last Name length should be between 3 and 10 characters")
    private String lastName;

    @Email(message="Email format is not valid")
    private String email;

    @Size(min=4, message = "User Name length should be between 4 and 15 characters")
    private String username;

    @Size(min=4, max=15, message = "Password length should be between 4 and 15 atleast")
    private String password;

    @NotNull
    private String role;

    @Builder.Default
    private List<AddAwsOnboardRequestDTO> addAwsOnboardAccounts = new ArrayList<>();


}
