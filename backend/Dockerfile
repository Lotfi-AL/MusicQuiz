FROM node:12-alpine

WORKDIR /node/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1337
