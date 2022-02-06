FROM node:14 AS builder
RUN apt-get update && apt-get install -y build-essential && apt-get install -y openjdk-8-jdk && apt-get install -y lsof
WORKDIR /frontend
COPY ./frontend .
WORKDIR /frontend/app
RUN yarn install && \
    yarn build

FROM nginx:1.20-alpine AS prod

COPY --from=builder /frontend/app/build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]