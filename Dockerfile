FROM node:carbon-alpine

ENV TZ=America/Edmonton
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .
RUN npm run build-prod

EXPOSE 8080

CMD [ "npm", "start" ]
