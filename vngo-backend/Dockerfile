#FROM maven:3.9.9-amazoncorretto-21 AS build
#WORKDIR /app
#
#COPY pom.xml .
#RUN mvn dependency:go-offline
#
#COPY src ./src/
#RUN mvn package -DskipTests

#FROM amazoncorretto:21.0.6 AS build
FROM eclipse-temurin:21.0.6_7-jdk AS build
WORKDIR /app

#COPY . .
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Đảm bảo mvnw có quyền thực thi (trên hệ thống Linux)
RUN chmod +x ./mvnw

# Tải dependency bằng mvnw
RUN ./mvnw dependency:go-offline

COPY src ./src

RUN ./mvnw package -DskipTests

# Stage 2
#FROM amazoncorretto:21.0.6
FROM eclipse-temurin:21.0.6_7-jre-ubi9-minimal
WORKDIR /app

COPY --from=build /app/target/myapp.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
