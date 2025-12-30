package com.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;

import java.util.List;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class AwsAccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "account_seq")
    @SequenceGenerator(
            name = "account_seq",
            sequenceName = "account_sequence",
            initialValue = 1000,
            allocationSize = 1
    )
    private Long Id;

    @NotNull
    @Column(unique = true)
    private String accountArn;
    private String accountName;
    private String accountStatus;

    @ManyToMany
    private List<UserEntity> users;

}
