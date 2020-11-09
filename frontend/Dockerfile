FROM node:12-alpine

WORKDIR /node/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
