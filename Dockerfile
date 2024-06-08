# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the Maven files and source code
COPY pom.xml /app/
COPY src /app/src

# Install Maven and build the application
RUN apk add --no-cache maven && mvn clean package -DskipTests

# Stage 2: Run the application with JRE
FROM eclipse-temurin:21-jre-alpine

# Set the working directory
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar quiz-app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "quiz-app.jar"]