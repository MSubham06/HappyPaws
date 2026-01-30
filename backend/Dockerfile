# backend/Dockerfile

# 1. Build the App
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# 2. Run the App
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Copy the built JAR file to the current directory (/app/app.jar)
COPY --from=build /app/target/*.jar app.jar

# Expose the port
EXPOSE 8080

# ✅ FIXED: Run the jar from the current directory
ENTRYPOINT ["java","-jar","app.jar"]
