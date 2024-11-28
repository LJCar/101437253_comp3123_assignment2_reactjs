FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Exposed port
EXPOSE 8080

# Start the application
CMD ["node", "src/app.js"]