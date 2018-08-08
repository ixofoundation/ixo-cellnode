# create a file named Dockerfile
FROM node:latest
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
COPY config*.json ./
COPY dist ./dist
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]