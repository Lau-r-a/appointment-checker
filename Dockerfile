FROM node:18.18.2-bullseye

COPY . /app/
WORKDIR /app/

RUN npm install

# Entrypoint
CMD npm run start