FROM node:12.2.0-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

EXPOSE 3000
CMD ["npm", "start"]