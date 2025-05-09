#!/bin/bash

echo "Escolha uma opção:"
echo "1 - Subir os containers (up)"
echo "2 - Derrubar os containers (down)"
read -p "Digite sua escolha: " choice

case $choice in
    1)
        echo "Subindo infra..."
        eval docker compose build --no-cache && docker compose up -d && docker image prune -f
        ;;
    2)
        echo "Derrubando infra..."
        eval docker compose down
        ;;
    *)
        echo "Opção inválida. Saindo..."
        exit 1
        ;;
esac