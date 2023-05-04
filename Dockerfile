FROM node:16

WORKDIR /code
COPY package.json /code
COPY package-lock.json /code
RUN npm ci

COPY src /code/src
COPY client /code/client
COPY world /code/world

EXPOSE 8989
CMD [ "npm", "start" ]
