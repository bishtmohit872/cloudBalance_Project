package com.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.apache.catalina.User;

import java.util.ArrayList;
import java.util.List;

//Here iam removing data annotation because UserEntity has a Many to Many relation with AwsAccountEntity so during execution of controller method
//of addUser and editUser it will throw StackOverFlowError() because (toString) Method which coming from @Data Annotation call recursively.
// So in UserService when i call System.out.println(oldUSer) then it internally call like this
//UserEntity.toString()
// └─ prints awsAccount list
//     └─ AwsAccountEntity.toString()
//         └─ prints users list
//             └─ UserEntity.toString()
//                 └─ prints awsAccount list
//                     └─ AwsAccountEntity.toString()
//                         └─ prints users list
//                             └─ UserEntity.toString()
//                                 ...
//                                         ...
//                                         (infinite)
// Due to this it print stackOVerFlow Error due to this okay

@Getter
@Setter
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
//    private String accountStatus;

    @Builder.Default
    @ManyToMany
    private List<UserEntity> users = new ArrayList<>();

}
