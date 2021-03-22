FROM node:12

# Create app directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
#COPY config*.json ./
COPY dist ./dist

# Install app dependencies and build
RUN npm install
RUN npm run build

EXPOSE 5000

# Start
CMD ["npm", "start"]
