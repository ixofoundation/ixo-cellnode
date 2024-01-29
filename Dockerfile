FROM --platform=linux/amd64 node:18.15.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./

# Install app dependencies and build
RUN yarn --pure-lockfile --production && yarn cache clean

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 5000

# Start
CMD ["yarn", "start"]
