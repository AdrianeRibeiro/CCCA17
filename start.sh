#!/bin/bash

echo "Parando todos os containers..."
docker stop $(docker ps -q)

echo "Subindo banco e recriando tabelas..."
docker-compose up -d

# echo "Iniciando aplicação..."
# npx nodemon src/main.ts
