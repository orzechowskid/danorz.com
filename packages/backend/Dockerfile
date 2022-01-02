# context for this build is the repo root
# see the root docker-compose.yml for details

FROM mhart/alpine-node:16

WORKDIR /app

# hot reloading (during development) does not work with ES modules so package.json
# does not contain "type":"module", but we need it at runtime
RUN apk add jq
COPY ./packages/backend/package.json ./package.json.orig
COPY ./package-lock.json ./package-lock.json
RUN cat ./package.json.orig | jq '. + {type:"module"}' > ./package.json
RUN npm ci

FROM mhart/alpine-node:slim-16

ARG APP_VERSION
WORKDIR /app

COPY --from=0 /app .
COPY ./packages/backend/bin/ ./bin/
COPY ./packages/backend/src/ ./src/
COPY ./packages/translations/package.json /translations/
COPY ./packages/translations/src /translations/src/
RUN echo $APP_VERSION > version.txt

RUN adduser -D serveup
USER serveup

CMD node --experimental-json-modules ./bin/index.js
