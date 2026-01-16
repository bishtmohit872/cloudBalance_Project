package com.example.backend.repository;

import com.example.backend.entity.AwsAccountEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.errorHandling.AccountNotFoundException;
import com.example.backend.errorHandling.AssociatedAcccountException;
import com.snowflake.snowpark.Row;
import com.snowflake.snowpark.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CostExplorerRepository {

    @Autowired
    Session session;

    @Autowired
    UserRepository userRepository;


    public Row[] getColumnData(String col){
        StringBuilder query = new StringBuilder();
        query.append("select ");
        query.append(col);
        query.append(" from AWSCOSTANALYTICS.PUBLIC.COSTANALYTICS");
        Row[] rows = session.sql(query.toString()).collect();
        return rows;
    }

    public Row[] getMonthWiseData(String groupBy){
        StringBuilder query = new StringBuilder();
        query.append("select ");
        query.append(groupBy);
        query.append(",DATE_TRUNC('MONTH',BILL_DATE),SUM(PROFIT) from AWSCOSTANALYTICS.PUBLIC.COSTANALYTICS group by ");
        query.append(groupBy);
        query.append(",DATE_TRUNC('MONTH',BILL_DATE) ORDER BY DATE_TRUNC('MONTH',BILL_DATE),");
        query.append(groupBy);
        Row[] rows = session.sql(query.toString()).collect();
        return rows;
    }

    public Row[] getByCategory(String category,String value){
        StringBuilder query = new StringBuilder();
        query.append("select ");
        query.append("INSTANCE_TYPE,DATE_TRUNC('MONTH',BILL_DATE),PROFIT from AWSCOSTANALYTICS.PUBLIC.COSTANALYTICS Where ");
        query.append(category);
        query.append("=");
        query.append("'"+value+"'");
        Row[] rows = session.sql(query.toString()).collect();
        return rows;
    }

    public Optional<Row[]> getByAccountId(String accountId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();
        UserEntity loginUser = userRepository.findById(user.getId()).orElseThrow(()->new AccountNotFoundException("Account Not Found"));
        List<AwsAccountEntity> awsAccountEntityList =  loginUser.getAwsAccount();

        for(AwsAccountEntity aws : awsAccountEntityList){
//            System.out.println(aws.getId().toString());
            if(aws.getId().toString().equals(accountId)){
                StringBuilder query = new StringBuilder();
                query.append("select ");
                query.append("INSTANCE_TYPE,DATE_TRUNC('MONTH',BILL_DATE),PROFIT from AWSCOSTANALYTICS.PUBLIC.COSTANALYTICS Where ");
                query.append("ACCOUNT_ID=");
                query.append(accountId);
                Row[] rows = session.sql(query.toString()).collect();
                return rows.length > 0 ? Optional.of(rows) : Optional.empty();
            }
        }
        throw new AccountNotFoundException(
                "AccountId " + accountId + " is not mapped with logged-in user"
        );

    }
}
