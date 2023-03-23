FROM maven:3.8.4

WORKDIR /app
COPY pom.xml .

COPY src/ /app/src/
RUN mvn clean package -DskipTests


CMD java -jar /app/target/finance-0.0.1-SNAPSHOT.jar

