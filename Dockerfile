FROM maven:3.9.6-amazoncorretto-21 AS build

ARG DOCKER_DB_URL
ARG DB_URL
ARG DB_USER
ARG DB_PASSWORD

ENV DOCKER_DB_URL=$DOCKER_DB_URL
ENV DB_URL=$DB_URL
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD


WORKDIR /build
COPY . .
RUN mvn clean install -Ptest

FROM openjdk:21
COPY --from=build /build/target/quizapp-0.0.1-SNAPSHOT.jar /usr/local/lib/quizapp-0.0.1-SNAPSHOT.jar
EXPOSE 8011
CMD ["java", "-jar", "/usr/local/lib/quizapp-0.0.1-SNAPSHOT.jar"]