from redis:6.2

ARG UID
ARG GID
ARG USER

RUN useradd --uid $UID -G users -m $USER

USER $USER
