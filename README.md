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




## Referências:
- https://www.mercadopago.com.br/developers/pt/docs/qr-code/integration-configuration/qr-dynamic/integration#:~:text=Fluxo%20do%20modelo,sua%20escolha%2C%20efetue%20o%20pagamento;
- https://www.mercadopago.com.br/developers/pt/reference/qr-dynamic/_instore_orders_qr_seller_collectors_user_id_pos_external_pos_id_qrs/post;
- https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
