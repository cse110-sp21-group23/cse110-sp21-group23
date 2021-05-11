FROM node:14-alpine
RUN mkdir src
WORKDIR /src
COPY ./src ./
RUN npm install -g nodemon
RUN npm install
RUN ls
# CMD ["node", "/src/app.js"]