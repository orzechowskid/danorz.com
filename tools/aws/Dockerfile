FROM mikesir87/aws-cli

ARG UID
ARG GID
ARG USER

RUN groupadd --gid $GID awsusers
RUN useradd --gid $GID --uid $UID -m $USER

USER $USER
