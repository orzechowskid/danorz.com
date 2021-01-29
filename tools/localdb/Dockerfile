from mongo:4.4

ARG UID
ARG GID
ARG USER

RUN groupadd --gid $GID mongousers
RUN useradd --gid $GID --uid $UID -m $USER

USER $USER
