FROM node:7.10.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --production
COPY . /usr/src/app

EXPOSE 9000

CMD [ "npm", "start" ]

