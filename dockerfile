FROM node:14

RUN mkdir -p /img/app

WORKDIR /img/app

COPY . /img/app/

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]