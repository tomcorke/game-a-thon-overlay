#!/bin/sh

set -e

export NODE_ENV=production

git checkout HEAD package-lock.json
git pull
npm i
npm run build