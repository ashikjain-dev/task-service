ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

# Copy package and package-lock.json files to workdir in the container
COPY package*.json .

RUN npm ci

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.
CMD ["npm", "start"]
