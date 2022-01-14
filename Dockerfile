FROM node:16
WORKDIR /app
ADD . /app
RUN npm install && npm run build
ENV NODE_ENV="production"
RUN npm prune --production 
CMD ["npm", "start"]
