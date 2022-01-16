FROM node:14
RUN apt-get update && apt-get install -y build-essential && apt-get install -y openjdk-8-jdk && apt-get install -y lsof
WORKDIR /frontend
COPY ./frontend .