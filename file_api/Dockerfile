FROM node:15.5.1
RUN mkdir -p /usr/src/app/file_api
WORKDIR /usr/src/app/file_api
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm","run","dev"]