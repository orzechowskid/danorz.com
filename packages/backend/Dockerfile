# context for this build is ../
# see the root docker-compose.yml for details

FROM mhart/alpine-node:14

WORKDIR /app

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm ci

FROM mhart/alpine-node:slim-14

ARG APP_VERSION
WORKDIR /app

COPY --from=0 /app .
COPY ./backend/bin/ ./bin/
COPY ./backend/src/ ./src/
COPY ./translations/package.json /translations/
COPY ./translations/src /translations/src/
RUN echo $APP_VERSION > version.txt

RUN adduser -D serveup
USER serveup

CMD node --experimental-json-modules ./bin/index.js
