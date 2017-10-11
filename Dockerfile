FROM node:boron

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .

RUN npm install

RUN npm install pm2 -g

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

# Bundle app source
COPY . .

COPY limits.conf /etc/security/
COPY sysctl.conf /etc/
COPY rc.local /etc/
COPY common-session /etc/pam.d/
COPY common-session-noninteractive /etc/pam.d/
COPY supervisord.conf /etc/supervisor/

EXPOSE 8000

CMD [ "pm2", "start" , "/bin/www", "--name='socket-service'"]