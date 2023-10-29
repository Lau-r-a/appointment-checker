FROM node:lts-alpine3.18

# apk add gcompat
RUN apk add libc6-compat && apk cache clean

COPY . /app/
WORKDIR /app/

RUN npm install

# Entrypoint
CMD npm run start