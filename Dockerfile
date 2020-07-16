FROM node:12

# Create app directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
#COPY config*.json ./
COPY dist ./dist

# Install app dependencies
RUN npm install

EXPOSE 5000

# Start
CMD ["npm", "start"]
