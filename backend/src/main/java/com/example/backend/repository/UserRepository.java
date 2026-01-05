package com.example.backend.repository;

import com.example.backend.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

//    UserEntity findByUsernameOrEmail(String username, String email);
//    List<UserEntity> findByUsernameContaining(String query);

//    This ? type notation is useful in preventing from sql injection and you can use alternative of ? that is
//    @Query("SELECT u FROM UserEntity u where u.lastName = ?1")
//    @Query(value = "select * from user_entity", nativeQuery = true) // Bydefault native query is false

//     @Query("SELECT u FROM UserEntity u where u.lastName = :lastName")
//    List<UserEntity> findByLastname(@Param("lastName") String lastName);
//
//     //these three annotations are required for an update okay
//     @Transactional
//     @Modifying
//     @Query("update UserEntity u set u.firstName = :name where u.id = :id")
//    void updateFirstnameWithId (@Param("name") String name ,@Param("id") Long id);

}
