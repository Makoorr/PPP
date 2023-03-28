FROM node

RUN npm install -g npm@9.6.2

WORKDIR /server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]