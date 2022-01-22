# Prerequisites

- install node@^16.0.0
- install npm@^7.0.0
- install Docker

# Getting Started

- clone this repo
- bootstrap the repo: `npm run bootstrap`
- build some Docker images and run them in containers: `./up.sh`
- add our development CA to your browser's list of trusted certificate authorities: see tools/README.md

## Getting Started with the Frontend

- start a live server: `cd packages/frontend; npm run start`
- (in your browser) visit https://localhost:8080

## Getting Started with the Backend

- `docker stop` the web-backend container (if it's running)
- start a live server: `cd packages/backend; npm run start`

# Provided for You

- you can log in to the webapp using a pre-set user with the username `r2d2` and password `starwars`
- a sample database is provided, using the mongo(ose) adapter, which contains mock data
