FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
ADD . /usr/src/app
RUN npm install && npm run build
# EXPOSE 8080
CMD [ "npm", "start" ]
# docker-machine create --driver generic --generic-ip-address=raspberrypi.local --generic-ssh-key
# "%localappdata%/lxss/home/{bash-username}/.ssh/id_rsa" --generic-ssh-user=pi docker-machine create --driver generic --generic-ip-address={ip-address} --generic-ssh-key "%localappdata%/lxss/home/{bash-username}/.ssh/id_rsa" --generic-ssh-user={remote-ssh-username} {remote-docker-host}
