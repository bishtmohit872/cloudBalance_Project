package com.example.backend.errorHandling;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.persistence.ElementCollection;
import jakarta.validation.ConstraintViolationException;
import net.snowflake.client.jdbc.SnowflakeSQLException;
import net.snowflake.client.jdbc.internal.google.protobuf.Api;
import net.snowflake.client.jdbc.internal.org.checkerframework.checker.units.qual.A;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

import java.security.SignatureException;
import java.util.NoSuchElementException;

// Remember this GlobalExceptionHandler work in MVC area not in Filter area

@RestControllerAdvice
public class GlobalExceptionHandling {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalArgumentException(){
        ApiError apiError = new ApiError("Role in not Specified",HttpStatus.BAD_REQUEST); //because wrong input from client side
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ApiError> handleNoSuchElementException(){
        ApiError apiError = new ApiError("No user found", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ApiError> handleMalformedJwtException(){
        ApiError apiError = new ApiError("Warned, Token is being changed",HttpStatus.UNAUTHORIZED); //because token expire or altered here
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    //Multiple Exception handle here by writing inside the {}
    // and if there is one exception then we can pass same exception in handlerInternalAuthenticationServiceException method
    // and if there is multiple exception then we have to pass (Exception ex) in handlerInternalAuthenticationServiceException method
    @ExceptionHandler({InternalAuthenticationServiceException.class,BadCredentialsException.class})
    public ResponseEntity<ApiError> handleInternalAuthenticationServiceException(){
        ApiError apiError = new ApiError("Invalid Credential",HttpStatus.UNAUTHORIZED);//because authentication get fail in both condition
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiError> handleUsernameNotFoundException(UsernameNotFoundException e){
        ApiError apiError = new ApiError(e.getMessage(), HttpStatus.UNAUTHORIZED);//here we can use 404 but from this we are giving hint to attacker that it not exist in db
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ApiError> handleJwtException(){
        ApiError apiError = new ApiError("JWT Token Expired",HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ApiError> handleSignatureException() {
        ApiError apiError = new ApiError("JWT token has been changed", HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleDataIntegrityViolationException(){
        ApiError apiError = new ApiError("User already exist with same email or username",HttpStatus.CONFLICT); // because of duplicacy conflict
        return new ResponseEntity<>(apiError, apiError.getStatusCode());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){

        String defaultMessage = e.getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        ApiError apiError = new ApiError(defaultMessage,HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {

        ApiError apiError = new ApiError("incoming JSON format is not valid", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiError, apiError.getStatusCode());
    }

    @ExceptionHandler(ClassCastException.class)
    public ResponseEntity<ApiError> handleClassCastException(ClassCastException e){
        ApiError apiError = new ApiError(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(SnowflakeSQLException.class)
    public ResponseEntity<ApiError> handleSnowflakeSQLException(SnowflakeSQLException e){
        ApiError apiError = new ApiError(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiError> handleMissingToken(RuntimeException ex) {
        ApiError apiError = new ApiError(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(apiError, apiError.getStatusCode());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiError> handleConstraintViolation(
            ConstraintViolationException ex) {

        String errorMessage = ex.getConstraintViolations()
                .iterator()
                .next()
                .getMessage();

        ApiError apiError = new ApiError(errorMessage, HttpStatus.BAD_REQUEST);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiError> handleMissingRequestParam(
            MissingServletRequestParameterException ex) {

        String errorMessage = "Missing required query parameter: " + ex.getParameterName();

        ApiError apiError = new ApiError(errorMessage, HttpStatus.BAD_REQUEST);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
    }

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<ApiError> handleAccountNotFound(AccountNotFoundException e){
        ApiError apiError = new ApiError(e.getMessage(),HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(apiError.getStatusCode()).body(apiError);
    }


}