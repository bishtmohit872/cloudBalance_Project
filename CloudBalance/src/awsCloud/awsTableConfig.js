
export const ec2Instances = [
  { resourceId: "i-1b2c3d4e5f6g7h8i1", resourceName: "web-prod-2", region: "us-east-1", status: "stopped" },
  { resourceId: "i-0a1b2c3d4e5f6g7h0", resourceName: "web-prod-1", region: "us-east-1", status: "running" },
  { resourceId: "i-7h8i9j0k1l2m3n4o7", resourceName: "staging-app",  region: "us-west-1", status: "stopped" },
  { resourceId: "i-2c3d4e5f6g7h8i9j2", resourceName: "db-primary",  region: "us-west-2", status: "running" },
  { resourceId: "i-3d4e5f6g7h8i9j0k3", resourceName: "cache-01",    region: "eu-west-1", status: "terminated" },
  { resourceId: "i-8i9j0k1l2m3n4o5p8", resourceName: "analytics",    region: "ap-northeast-1", status: "running" },
  { resourceId: "i-9j0k1l2m3n4o5p6q9", resourceName: "dev-01",       region: "sa-east-1", status: "stopped" },
  { resourceId: "i-4e5f6g7h8i9j0k1l4", resourceName: "batch-worker", region: "ap-south-1", status: "running" },
  { resourceId: "i-5f6g7h8i9j0k1l2m5", resourceName: "mgmt",         region: "eu-central-1", status: "pending" },
  { resourceId: "i-6g7h8i9j0k1l2m3n6", resourceName: "ci-cd",        region: "us-east-2", status: "running" },
];


export const rdsInstances = [
  { resourceId: "rds-001", resourceName: "prod-db-1", engine: "mysql", region: "us-east-1", status: "available" },
  { resourceId: "rds-002", resourceName: "prod-db-2", engine: "postgres", region: "us-east-2", status: "modifying" },
  { resourceId: "rds-003", resourceName: "analytics-db-1", engine: "mysql", region: "us-west-1", status: "backing-up" },
  { resourceId: "rds-004", resourceName: "analytics-db-2", engine: "postgres", region: "us-west-2", status: "available" },
  { resourceId: "rds-005", resourceName: "staging-db-1", engine: "oracle", region: "eu-west-1", status: "available" },
  { resourceId: "rds-006", resourceName: "staging-db-2", engine: "mariadb", region: "eu-west-2", status: "stopped" },
  { resourceId: "rds-007", resourceName: "backup-db-1", engine: "sqlserver", region: "eu-central-1", status: "available" },
  { resourceId: "rds-008", resourceName: "backup-db-2", engine: "mysql", region: "ap-south-1", status: "available" },
  { resourceId: "rds-009", resourceName: "test-db-1", engine: "postgres", region: "ap-south-2", status: "stopped" },
  { resourceId: "rds-010", resourceName: "dev-db-1", engine: "mysql", region: "ap-northeast-1", status: "available" },
  { resourceId: "rds-011", resourceName: "dev-db-2", engine: "postgres", region: "ap-northeast-2", status: "modifying" },
  { resourceId: "rds-012", resourceName: "ci-db-1", engine: "mysql", region: "sa-east-1", status: "available" },
  { resourceId: "rds-013", resourceName: "ci-db-2", engine: "oracle", region: "ca-central-1", status: "backing-up" },
  { resourceId: "rds-014", resourceName: "monitor-db-1", engine: "sqlserver", region: "us-east-1", status: "available" },
  { resourceId: "rds-015", resourceName: "monitor-db-2", engine: "mariadb", region: "us-east-2", status: "stopped" },
  { resourceId: "rds-016", resourceName: "prod-reporting-db", engine: "postgres", region: "us-west-1", status: "available" },
  { resourceId: "rds-017", resourceName: "cache-index-db", engine: "mysql", region: "us-west-2", status: "available" },
  { resourceId: "rds-018", resourceName: "finance-db", engine: "sqlserver", region: "eu-west-1", status: "modifying" },
  { resourceId: "rds-019", resourceName: "hr-db", engine: "mariadb", region: "eu-west-3", status: "available" },
  { resourceId: "rds-020", resourceName: "ops-db", engine: "postgres", region: "eu-north-1", status: "backing-up" },
  { resourceId: "rds-021", resourceName: "audit-db", engine: "mysql", region: "ap-south-1", status: "available" },
  { resourceId: "rds-022", resourceName: "payment-db", engine: "oracle", region: "ap-southeast-1", status: "available" },
  { resourceId: "rds-023", resourceName: "orders-db", engine: "mysql", region: "ap-southeast-2", status: "stopped" },
  { resourceId: "rds-024", resourceName: "inventory-db", engine: "postgres", region: "ap-northeast-1", status: "available" },
  { resourceId: "rds-025", resourceName: "session-db", engine: "sqlserver", region: "ap-northeast-2", status: "available" },
  { resourceId: "rds-026", resourceName: "recommendation-db", engine: "mariadb", region: "sa-east-1", status: "modifying" },
  { resourceId: "rds-027", resourceName: "customer-db", engine: "mysql", region: "us-east-1", status: "available" },
  { resourceId: "rds-028", resourceName: "audit-log-db", engine: "postgres", region: "us-east-2", status: "available" },
  { resourceId: "rds-029", resourceName: "warehouse-db", engine: "oracle", region: "us-west-1", status: "backing-up" },
  { resourceId: "rds-030", resourceName: "training-db", engine: "mysql", region: "us-west-2", status: "available" }
];



export const asgInstances = [
  { resourceId: "asg-001", resourceName: "web-asg-prod", region: "us-east-1", desiredCapacity: 4, minSize: 2, maxSize: 8, status: "Active" },
  { resourceId: "asg-002", resourceName: "api-asg-prod", region: "us-east-2", desiredCapacity: 6, minSize: 3, maxSize: 12, status: "Active" },
  { resourceId: "asg-003", resourceName: "worker-asg", region: "us-west-1", desiredCapacity: 3, minSize: 1, maxSize: 6, status: "Scaling" },
  { resourceId: "asg-004", resourceName: "batch-asg", region: "us-west-2", desiredCapacity: 2, minSize: 1, maxSize: 4, status: "Active" },
  { resourceId: "asg-005", resourceName: "analytics-asg", region: "eu-west-1", desiredCapacity: 5, minSize: 2, maxSize: 10, status: "Active" },
  { resourceId: "asg-006", resourceName: "cache-asg", region: "eu-west-2", desiredCapacity: 2, minSize: 1, maxSize: 5, status: "Standby" },
  { resourceId: "asg-007", resourceName: "frontend-asg", region: "eu-central-1", desiredCapacity: 4, minSize: 2, maxSize: 8, status: "Active" },
  { resourceId: "asg-008", resourceName: "backend-asg", region: "ap-south-1", desiredCapacity: 3, minSize: 1, maxSize: 7, status: "Scaling" },
  { resourceId: "asg-009", resourceName: "etl-asg", region: "ap-south-2", desiredCapacity: 2, minSize: 1, maxSize: 4, status: "Active" },
  { resourceId: "asg-010", resourceName: "stream-asg", region: "ap-northeast-1", desiredCapacity: 5, minSize: 2, maxSize: 10, status: "Active" },
  { resourceId: "asg-011", resourceName: "ci-asg", region: "ap-northeast-2", desiredCapacity: 1, minSize: 1, maxSize: 3, status: "Standby" },
  { resourceId: "asg-012", resourceName: "monitor-asg", region: "sa-east-1", desiredCapacity: 2, minSize: 1, maxSize: 5, status: "Active" },
  { resourceId: "asg-013", resourceName: "db-proxy-asg", region: "ca-central-1", desiredCapacity: 3, minSize: 1, maxSize: 6, status: "Active" },
  { resourceId: "asg-014", resourceName: "gateway-asg", region: "us-east-1", desiredCapacity: 4, minSize: 2, maxSize: 8, status: "Scaling" },
  { resourceId: "asg-015", resourceName: "edge-asg", region: "us-east-2", desiredCapacity: 2, minSize: 1, maxSize: 4, status: "Active" },
  { resourceId: "asg-016", resourceName: "internal-api-asg", region: "us-west-1", desiredCapacity: 3, minSize: 1, maxSize: 7, status: "Active" },
  { resourceId: "asg-017", resourceName: "security-asg", region: "us-west-2", desiredCapacity: 1, minSize: 1, maxSize: 3, status: "Standby" },
  { resourceId: "asg-018", resourceName: "billing-asg", region: "eu-west-1", desiredCapacity: 5, minSize: 2, maxSize: 12, status: "Scaling" },
  { resourceId: "asg-019", resourceName: "recommendation-asg", region: "eu-west-3", desiredCapacity: 6, minSize: 3, maxSize: 10, status: "Active" },
  { resourceId: "asg-020", resourceName: "search-asg", region: "eu-north-1", desiredCapacity: 4, minSize: 2, maxSize: 8, status: "Active" }
];



const EC2={
        header:["Resource ID","Resource Name","Region","status"],
        data:ec2Instances
    }

const RDS={
        header:["Resource ID","Resource Name","Engine","Region","Status"],
        data:rdsInstances,
    }

const ASG={
        header:["Resource ID","Resource Name","Region","Desired Capacity","Min Size","Max Size","Status"],
        data:asgInstances,
    }

const AwsTableConfig=[EC2,RDS,ASG]

export default AwsTableConfig