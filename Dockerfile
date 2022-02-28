FROM node:17.3.0-slim
WORKDIR /app
# COPY package.json ./app
COPY . /app
RUN mkdir /certs
RUN npm i
CMD ["node", "/app/src/app.js"]