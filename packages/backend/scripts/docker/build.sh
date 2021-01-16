#!/bin/bash

# extract version string to pass to build process, then normalize to prevent Docker
# cache misses

PKG_JSON=$(cat package.json)
VERSION=$(echo $PKG_JSON | jq -r '.version')

echo $PKG_JSON | jq '.version = "0.0.0"' > package.json

docker build -t danorz-backend --build-arg APP_VERSION=$VERSION .

echo $PKG_JSON | jq . > package.json
