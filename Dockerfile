FROM maven:3.9.6-amazoncorretto-21 AS build
WORKDIR /build
COPY . .
RUN mvn clean install  -Dmaven.test.skip=true

FROM openjdk:21
COPY --from=build /build/target/inthai-1.0.0.jar /usr/local/lib/inthai-1.0.0.jar
EXPOSE 8017
CMD ["java", "-jar", "/usr/local/lib/inthai-1.0.0.jar"]