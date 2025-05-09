#!/bin/bash

echo "Escolha uma opção:"
echo "1 - Subir container (up)"
echo "2 - Derrubar container (down)"
read -p "Digite sua escolha: " choiceInfra

case $choiceInfra in
    1)
        echo "--------------------------------"
        echo "Escolha um ambiente:"
        echo "1 - DEV"
        echo "2 - PROD"
        read -p "Digite sua escolha: " choiceEnv
        case $choiceEnv in
            1)
                echo "Subindo infra..."
                eval docker compose build --no-cache mp_notification_api_dev && docker compose up -d mp_notification_api_dev && docker image prune -f
                ;;
            2)
                echo "Subindo infra..."
                eval docker compose build --no-cache mp_notification_api_prod && docker compose up -d mp_notification_api_prod && docker image prune -f
                ;;
            *)
                echo "Opção inválida. Saindo..."
                exit 1
                ;;
        esac
        ;;
    2)
        echo "--------------------------------"
        echo "Escolha um ambiente:"
        echo "1 - DEV"
        echo "2 - PROD"
        read -p "Digite sua escolha: " choiceEnv
        case $choiceEnv in
            1)
                echo "Derrubando infra..."
                eval docker compose down mp_notification_api_dev
                ;;
            2)
                echo "Derrubando infra..."
                eval docker compose down mp_notification_api_prod
                ;;
            *)
                echo "Opção inválida. Saindo..."
                exit 1
                ;;
        esac
        ;;
    *)
        echo "Opção inválida. Saindo..."
        exit 1
        ;;
esac