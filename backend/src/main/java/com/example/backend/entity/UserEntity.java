package com.example.backend.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
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
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    @Email
    private String email;

    @Column(unique = true)
    private String username;

    private String password;

    @Builder.Default
    @ManyToMany(mappedBy = "users")
    private List<AwsAccountEntity> awsAccount = new ArrayList<>();

    public enum Role{
        Admin,Customer,ReadOnly;

    }

    @Enumerated(EnumType.STRING)
    private Role role;

    //As springboot understand authority as a GrantedAuthority
    //That why we make GrantedAuthority Object
    // Proper equals(), hashCode(), toString() implemented here in "new SimpleGrantedAuthority"
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_"+role.name()));
    }


}





