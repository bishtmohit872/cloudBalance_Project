package com.example.backend.errorHandling;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.persistence.ElementCollection;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

import java.util.NoSuchElementException;

// Remember this GlobalExceptionHandler work in MVC area not in Filter area

@RestControllerAdvice
public class GlobalExceptionHandling {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalArgumentException(){
        ApiError apiError = new ApiError("Role in not Specified",HttpStatus.NOT_ACCEPTABLE);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ApiError> handleNoSuchElementException(){
        ApiError apiError = new ApiError("No user found", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ApiError> handleMalformedJwtException(){
        ApiError apiError = new ApiError("Warned, Token is being changed",HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    //Multiple Exception handle here by writing inside the {}
    // and if there is one exception then we can pass same exception in handlerInternalAuthenticationServiceException method
    // and if there is multiple exception then we have to pass (Exception ex) in handlerInternalAuthenticationServiceException method
    @ExceptionHandler({InternalAuthenticationServiceException.class,BadCredentialsException.class})
    public ResponseEntity<ApiError> handleInternalAuthenticationServiceException(){
        ApiError apiError = new ApiError("Invalid Credential",HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiError> handleUsernameNotFoundException(UsernameNotFoundException e){
        ApiError apiError = new ApiError(e.getMessage(), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ApiError> handleJwtException(){
        ApiError apiError = new ApiError("JWT Token Expired",HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleDataIntegrityViolationException(){
        ApiError apiError = new ApiError("User already exist with same email or username",HttpStatus.NOT_ACCEPTABLE);
        return new ResponseEntity<>(apiError, apiError.getStatusCode());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){

        String defaultMessage = e.getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        ApiError apiError = new ApiError(defaultMessage,HttpStatus.NOT_ACCEPTABLE);
        return new ResponseEntity<>(apiError,apiError.getStatusCode());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {

        ApiError apiError = new ApiError("incoming JSON format is not valid", HttpStatus.NOT_ACCEPTABLE);
        return new ResponseEntity<>(apiError, apiError.getStatusCode());
    }

}