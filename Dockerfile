FROM ubuntu:latest AS build
WORKDIR /api
COPY . .
RUN rm -rf node_modules
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]