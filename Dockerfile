FROM ubuntu:22.04
WORKDIR /api
COPY . .
RUN rm -rf node_modules
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs
RUN npm i
CMD ["npm", "start"]
EXPOSE 3000