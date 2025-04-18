# vngo-backend
VNGo is a drive-booking apps system. This system has 3 apps in total, they are VNGo, VNGo Driver and VNGo Admin.

This is an end-term project of our 4-member team in Intro To Software Engineer course.

Front-end apps repo:

## How to use:
Run code in database.sql to create database (Using MySQL command line, etc.)

Configure spring.datasource properties in application.yml to match your database

```
docker build -t vngo:0.0.1 .
```

```docker run -d \
  -p 8080:8080 \
  -e SERVER_PORT=8080 \
  -e DB_URL="jdbc:mysql://host.docker.internal:3306/vngo" \
  -e DB_USERNAME="root" \
  -e DB_PASSWORD="your_secure_password" \
  -e JWT_SIGNER_KEY="your_secure_key_here" \
  --name vngo-app \
  vngo:0.0.1```

```docker build -t nguyenphuc4444/vngo:latest .```

```docker login```

```docker tag nguyenphuc4444/vngo:latest nguyenphuc4444/vngo:latest```

```docker push nguyenphuc4444/vngo:latest```

```.\mvnw spring-boot:run -D"spring-boot.run.profiles"="dev"```