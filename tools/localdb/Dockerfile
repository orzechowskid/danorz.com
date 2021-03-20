from mongo:4.4

ARG UID
ARG GID
ARG USER

RUN useradd --uid $UID -G users -m $USER

USER $USER
