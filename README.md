![image](https://github.com/user-attachments/assets/ed076210-e700-4587-b03c-a2e3793caacd)# POC-Integration-GatewayMercadoPago-Express

## ENDPOINTS
- ``/qr/:userId/:externalPosId (HTTP over TCP)``: gera um QR code e retorna no body a resposta da API do mercado pago;
- ``/notification (HTTP over TCP)``: retransmite o conteúdo enviado no body para todos os clientes conectados via websocket. Atua como um webhook que será informado no atributo "notification_url" da API do mercado pago;
- ``/ (WEBSOCKET over TCP)``: exibe o body enviado para o webhook /notification em tempo real.

## UPLOAD ECR

- Configurar ``~/.aws/credentials`` de acordo com as informações da AWS Academy;
  
- Executar ``aws configure`` via cli;

- Criando repositório:
![image](https://github.com/user-attachments/assets/a1d36968-4a22-49c5-94e4-9c7cd61923f7)

- Push para o Registry:
  - ``aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 146654071014.dkr.ecr.us-east-1.amazonaws.com``
  - ``docker build \
    -f docker/Dockerfile \
    --target prod \
    --build-arg PORT=3000 \
    --build-arg WORKDIR_API=/app \
    -t ferrarezzo/mpnotificationpoc:prod \
    .``
  - ``docker tag ferrarezzo/mpnotificationpoc:prod 146654071014.dkr.ecr.us-east-1.amazonaws.com/ferrarezzo/mpnotificationpoc:prod``
  - ``docker push 146654071014.dkr.ecr.us-east-1.amazonaws.com/ferrarezzo/mpnotificationpoc:prod``

## DEPLOY ECS

- Criando Cluster;
![image](https://github.com/user-attachments/assets/89affab0-e644-4668-bceb-f1f887ac13f7)

- Criando Task Definition;
![image](https://github.com/user-attachments/assets/8163a332-6b20-48cf-81bb-a238b890c7d6)
![image](https://github.com/user-attachments/assets/2a7acb01-9520-489e-a9a1-f18d55b5d7a4)
![image](https://github.com/user-attachments/assets/a489e9d9-ad2c-4181-bac9-f2f2fa27d8b7)
![image](https://github.com/user-attachments/assets/0860c671-5557-4e33-b172-cc64c8275b0c)

- Criando Service;
![image](https://github.com/user-attachments/assets/ef8c7d31-3a98-4464-9ac0-da7c4ca5daaa)
![image](https://github.com/user-attachments/assets/06146bbb-49c1-4cae-bfea-7abbd0d18340)
![image](https://github.com/user-attachments/assets/c85b760e-f657-41c3-a47d-63b47e944e60)
![image](https://github.com/user-attachments/assets/189e2a2a-1bf8-4be1-a0c5-9694d7c6fa07)
![image](https://github.com/user-attachments/assets/da6cf81c-99c6-4e72-ab73-c61b9f78f888)
![image](https://github.com/user-attachments/assets/5e173c70-168e-46b4-bcc8-aaab4ee68bec)
![image](https://github.com/user-attachments/assets/900bbff3-2ed5-466d-920d-f7439e364577)
![image](https://github.com/user-attachments/assets/91d8d471-f6a0-4bd8-8373-f7caee6307f9)


## Referências:
- https://www.mercadopago.com.br/developers/pt/docs/qr-code/integration-configuration/qr-dynamic/integration#:~:text=Fluxo%20do%20modelo,sua%20escolha%2C%20efetue%20o%20pagamento;
- https://www.mercadopago.com.br/developers/pt/reference/qr-dynamic/_instore_orders_qr_seller_collectors_user_id_pos_external_pos_id_qrs/post;
- https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
