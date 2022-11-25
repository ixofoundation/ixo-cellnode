FROM node:18.10

# Create app directory
WORKDIR /app

# Copy files
COPY package*.json ./

# Install app dependencies and build
RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 5000

# Start
CMD ["npm", "start"]
