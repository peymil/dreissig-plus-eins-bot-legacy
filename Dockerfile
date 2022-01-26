FROM node:16
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY src/ src/
COPY ormconfig.js ormconfig.js
COPY tsconfig.json tsconfig.json
RUN npm run build
RUN npm prune --production 
RUN mkdir data/
ENV NODE_ENV="production"
CMD ["npm", "start"]
