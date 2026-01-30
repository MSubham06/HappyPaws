# backend/Dockerfile

# 1. Build the App
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# 2. Run the App
# ✅ CHANGED: Switched from 'openjdk:17-jdk-slim' to 'eclipse-temurin:17-jdk-jammy'
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
