FROM node:lts-alpine3.18


COPY . /app/
WORKDIR /app/

RUN npm ci

# Entrypoint
CMD npm run start