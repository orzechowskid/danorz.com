# don't install `docker` via snapcraft on Linux machines
snap packages conflict with the AppArmor security service.  make sure `docker.io` and `docker-compose` are installed via `apt` or similar, not `snap`.
