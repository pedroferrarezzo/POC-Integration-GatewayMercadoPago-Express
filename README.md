# POC-Integration-GatewayMercadoPago-Express

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
![image](https://github.com/user-attachments/assets/6f3d755f-3289-4833-8463-37273f506ee7)
![image](https://github.com/user-attachments/assets/34459ac0-c1b6-42e5-9368-bfa0c9810c34)
![image](https://github.com/user-attachments/assets/a7eed629-33b3-4491-a524-cd2acddc7205)
![image](https://github.com/user-attachments/assets/08406ccc-7632-4a1f-ac0f-31d4bc205e6f)
![image](https://github.com/user-attachments/assets/3d4c6b93-85a4-4685-b24e-4479f3b33872)
![image](https://github.com/user-attachments/assets/3dba7d4c-611f-457f-a09e-e19b36237979)
![image](https://github.com/user-attachments/assets/6c3cfa1d-74f4-4c8b-88d4-47d7d05baf53)
![image](https://github.com/user-attachments/assets/16b82fdc-8b93-4e04-a720-994aae6dcab3)
![image](https://github.com/user-attachments/assets/ed1f5cf3-6604-4e8f-ab11-81073f6af6aa)









## Referências:
- https://www.mercadopago.com.br/developers/pt/docs/qr-code/integration-configuration/qr-dynamic/integration#:~:text=Fluxo%20do%20modelo,sua%20escolha%2C%20efetue%20o%20pagamento;
- https://www.mercadopago.com.br/developers/pt/reference/qr-dynamic/_instore_orders_qr_seller_collectors_user_id_pos_external_pos_id_qrs/post;
- https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
