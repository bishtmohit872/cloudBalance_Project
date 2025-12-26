package com.example.backend.DTO.requestDTO;
import com.example.backend.entity.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditUserRequestDTO {


    private Long id;

    @Size(min=3,max=10, message = "firstName length should be between 3 and 10 characters")
    private String firstName;

    @Size(min=3,max=10, message = "lastName length should be between 3 and 10 characters")
    private String lastName;

    @Email(message="Email format is not valid")
    private String email;

    @NotNull(message="Specify the role of current user")
    private String role;

}
