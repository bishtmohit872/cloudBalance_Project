package com.example.backend.repository;

import com.snowflake.snowpark.Row;
import com.snowflake.snowpark.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CostExplorerRepository {

    @Autowired
    Session session;


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

    public Row[] getByAccountId(String accountId){
        StringBuilder query = new StringBuilder();
        query.append("select ");
        query.append("INSTANCE_TYPE,DATE_TRUNC('MONTH',BILL_DATE),PROFIT from AWSCOSTANALYTICS.PUBLIC.COSTANALYTICS Where ");
        query.append("ACCOUNT_ID=");
        query.append(accountId);
        Row[] rows = session.sql(query.toString()).collect();
        return rows;
    }
}
