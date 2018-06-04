#!/bin/bash
docker stop auth
docker rm auth
# -l "traefik.frontend.rule=Host:darenyong.com,www.darenyong.com;PathPrefixStrip:/auth" \

docker run -d --name auth \
  -l "traefik.backend=auth" \
  -l "traefik.frontend.rule=Host:darenyong.com,www.darenyong.com;" \
  -l "traefik.enable=true" \
  -l "traefik.port=8080" \
  --network proxy \
  -e "NODE_ENV=development" \
  -v ${PWD}/log:/usr/src/app/log:Z \
  auth2:1.0.0
