package com.example.backend.security;

import com.example.backend.entity.UserEntity;
import com.example.backend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@Slf4j
@RequiredArgsConstructor

public class JwtAuthFilter extends OncePerRequestFilter {

    public final UserRepository userRepository;
    public final AuthUtil authUtil;

    private final HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //basically we put try and catch here because exception can occur at dfferent stages, like
        // here exception can occur at filter stage also and its totally different from controller exception area,
        // so to handle this we put try and catch here by using HandlerExceptionResolver.
        // It will catch the error in filter area and send it to GlocalExceptionHandling okay.

        try{
            log.info("incoming request:{}",request.getRequestURI());

           if(request.getServletPath().equals("/snow")){
                filterChain.doFilter(request,response);
                return;
            }
            final String requestTokenHeader = request.getHeader("Authorization");


            if((requestTokenHeader==null) || (!requestTokenHeader.startsWith("Bearer "))){
                filterChain.doFilter(request,response);
                return;
            }

            String token = requestTokenHeader.split("Bearer ")[1];
            String email = authUtil.getEmailFromToken(token);
            System.out.println("jwtauthfilter:"+email);
            if((email!=null) && SecurityContextHolder.getContext().getAuthentication() ==null){
                UserEntity user = userRepository.findByEmail(email).orElseThrow();

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
            filterChain.doFilter(request,response);
        }

        catch (io.jsonwebtoken.security.SignatureException ex) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");

            String timestamp = LocalDateTime.now().toString();

            response.getWriter().write("""
                        {
                          "error": "JWT token has been changed",
                          "statusCpde": "401 UNAUTHORIZED,
                          "timestamp": "%s"
                        }
                    """.formatted(timestamp.toString()));
            return;
        }
        catch(Exception e){
            handlerExceptionResolver.resolveException(request,response,null,e);
            System.out.println("jwtauthfilter:"+e);
            return;
        }

    }
}
