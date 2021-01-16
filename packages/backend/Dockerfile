FROM mhart/alpine-node:14

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --prod

FROM mhart/alpine-node:slim-14

ARG APP_VERSION
WORKDIR /app

COPY --from=0 /app .
COPY bin/ ./bin/
COPY src/ ./src/
RUN echo $APP_VERSION > version.txt

RUN adduser -D serveup
USER serveup

CMD node -r esm ./bin/index.js
