FROM node

WORKDIR /usr/src/app

ADD backend/ ./
RUN npm install -y

CMD npm run dev
