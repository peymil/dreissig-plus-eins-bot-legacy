FROM node:16
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm prune --production 
ADD . /app
RUN npm run build
ENV NODE_ENV="production"
CMD ["npm", "start"]
