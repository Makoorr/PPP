FROM node

COPY package.json ./

RUN npm install -g npm@9.6.2; npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]