FROM node:carbon-alpine

ENV TZ=America/Edmonton
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

COPY package*.json ./

# we cannot use --only=production until we start using build stages in a newer version of docker
# RUN npm install --only=production
RUN npm install

COPY . .
RUN npm run build-prod

EXPOSE 8080

CMD [ "npm", "start" ]
