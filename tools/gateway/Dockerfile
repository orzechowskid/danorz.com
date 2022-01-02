# context for this build is ../
# see the root docker-compose.yml for details

from nginx:alpine

ARG UID
ARG GID
ARG USER

USER $USER

COPY ./gateway/nginx.conf /etc/nginx/templates/gateway.conf.template
COPY ./fake-ca/domains/local.host/ /etc/fake-ca/local.host
