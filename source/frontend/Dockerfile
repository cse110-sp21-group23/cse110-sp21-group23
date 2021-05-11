FROM node:10-slim
RUN mkdir src
WORKDIR /src
ADD webpack webpack/
ADD src src/
ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install
