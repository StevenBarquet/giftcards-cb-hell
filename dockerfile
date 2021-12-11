FROM node:10

# Create app directory
WORKDIR /shelly_store_backend

#Environment variables
ENV NODE_ENV=production
ENV USE_SSL=TRUE
ENV SSL_PATH=/etc/letsencrypt/live/some-domain.com
ENV PORT=4000
ENV DEBUG=app:prod



# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000

CMD [ "node", "./dist/index.js" ]