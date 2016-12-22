FROM node:7.3.0

EXPOSE 3000

ADD . /

RUN npm install

CMD [ "npm", "start" ]
