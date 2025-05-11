# POC-Integration-GatewayMercadoPago-Express

## ENDPOINTS
- ``/qr/:userId/:externalPosId (HTTP over TCP)``: gera um QR code e retorna no body a resposta da API do mercado pago;
- ``/notification (HTTP over TCP)``: retransmite o conteúdo enviado no body para todos os clientes conectados via websocket. Atua como um webhook que será informado no atributo "notification_url" da API do mercado pago;
- ``/ (WEBSOCKET over TCP)``: exibe o body enviado para o webhook /notification em tempo real.

## MERCADO PAGO 

- Acessar https://www.mercadopago.com.br/developers, logar com conta pessoal, e criar aplicação:
  ![image](https://github.com/user-attachments/assets/8266b18d-afbf-4735-b38c-37d9179cb762)

- Criar duas contas de teste ``Comprador`` e ``Vendedor``:
![image](https://github.com/user-attachments/assets/c24af5b9-65f5-4157-ae23-4751d7c24ba8)

- Acessar https://www.mercadopago.com.br/developers, dessa vez, utilizando as credenciais do usuário ``Vendedor`` criado anteriormente;

- Criar novamente aplicação, desta vez, na conta developer do ``Vendedor``:
 ![image](https://github.com/user-attachments/assets/8266b18d-afbf-4735-b38c-37d9179cb762)

- Anotar ``User ID``, presente na aba ``Informações Gerais``
![image](https://github.com/user-attachments/assets/fafa122b-1505-4433-a54f-d5a9163271f9)

- Anotar ``Acess Token``, presente na aba ``Credenciais de Produção``
![image](https://github.com/user-attachments/assets/e520e1a6-5c34-4931-b33b-28798c552c50)

## UPLOAD ECR

- Configurar ``~/.aws/credentials`` de acordo com as informações da AWS Academy;
  ![Captura de Tela 2025-05-11 às 03 40 06](https://github.com/user-attachments/assets/0ac42978-ac41-4b2e-b678-91323e015ce9)

- Executar ``aws configure`` via cli;

- Criando repositório:
![image](https://github.com/user-attachments/assets/a1d36968-4a22-49c5-94e4-9c7cd61923f7)

- Push para o Registry (Ex ECR URL: 146654071014.dkr.ecr.us-east-1.amazonaws.com):
  - ``aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 146654071014.dkr.ecr.us-east-1.amazonaws.com``
  - ``docker build -f docker/Dockerfile --target prod --build-arg PORT=3000 -build-arg WORKDIR_API=/app -t ferrarezzo/mpnotificationpoc:latest .``
  - ``docker tag ferrarezzo/mpnotificationpoc:latest 146654071014.dkr.ecr.us-east-1.amazonaws.com/ferrarezzo/mpnotificationpoc:latest``
  - ``docker push 146654071014.dkr.ecr.us-east-1.amazonaws.com/ferrarezzo/mpnotificationpoc:latest``

## DEPLOY ECS

- Criando Cluster;
![image](https://github.com/user-attachments/assets/89affab0-e644-4668-bceb-f1f887ac13f7)

- Criando Task Definition. Em ``BEARER_TOKEN_MP`` defina o ``Access Token`` capturado anteriormente na conta ``Vendedor``;
![image](https://github.com/user-attachments/assets/8163a332-6b20-48cf-81bb-a238b890c7d6)
![image](https://github.com/user-attachments/assets/2a7acb01-9520-489e-a9a1-f18d55b5d7a4)
![image](https://github.com/user-attachments/assets/a489e9d9-ad2c-4181-bac9-f2f2fa27d8b7)
![image](https://github.com/user-attachments/assets/0860c671-5557-4e33-b172-cc64c8275b0c)

- Criando Service, configurando ALB e AutoScaling;
![image](https://github.com/user-attachments/assets/6f3d755f-3289-4833-8463-37273f506ee7)
![image](https://github.com/user-attachments/assets/34459ac0-c1b6-42e5-9368-bfa0c9810c34)
![image](https://github.com/user-attachments/assets/a7eed629-33b3-4491-a524-cd2acddc7205)
![image](https://github.com/user-attachments/assets/08406ccc-7632-4a1f-ac0f-31d4bc205e6f)
![image](https://github.com/user-attachments/assets/3d4c6b93-85a4-4685-b24e-4479f3b33872)
![image](https://github.com/user-attachments/assets/3dba7d4c-611f-457f-a09e-e19b36237979)
![image](https://github.com/user-attachments/assets/6c3cfa1d-74f4-4c8b-88d4-47d7d05baf53)
![image](https://github.com/user-attachments/assets/16b82fdc-8b93-4e04-a720-994aae6dcab3)
![image](https://github.com/user-attachments/assets/ed1f5cf3-6604-4e8f-ab11-81073f6af6aa)
![image](https://github.com/user-attachments/assets/eaafb68d-0423-4200-b9f9-36b951179c0f)
![image](https://github.com/user-attachments/assets/81d6222e-3e2a-43aa-9e66-e961eb0e6354)

- Anote a ``Record A`` do ALB da Service criada:
![image](https://github.com/user-attachments/assets/d8b394d4-3caf-404b-950c-9696718d636b)

## INSOMNIA

- Crie uma loja, informando o ``User ID`` e ``Access Token`` capturado anteriormente na conta ``Vendedor``, no ``Path Paramter`` e ``Header Authorization`` respectivamente:
  ![image](https://github.com/user-attachments/assets/821c1349-b78e-44a4-8059-eaacce42fdb6)

- Crie um POS, informando o ``Access Token`` capturado anteriormente na conta ``Vendedor`` no ``Header Authorization``, e no body o ``id`` e ``external_id`` da loja criada:
![Captura de Tela 2025-05-11 às 03 18 13](https://github.com/user-attachments/assets/582ecdd0-5d0e-4239-a9bf-c3c083fc6cba)

- Gere o código do QR Code de pagamento informando via Path Paramter o ``external_pos_id`` do POS criado, através do endpoint ``http://ecs_alb_url/qr/:userId/:externalPosId``:
![image](https://github.com/user-attachments/assets/08571760-c27a-4e70-9efd-f908f3081b20)

## TESTE DE INTEGRAÇÃO

- Baixe o aplicativo do mercado pago, logue com a conta criada no ínicio de ``Comprador``;
  
- Acesse https://www.qrcode-monkey.com/pt/#text, copie o ``qr_data`` retornado pela API ``/qr``, e gere o Qr Code:
![image](https://github.com/user-attachments/assets/c713fee0-250f-4cfa-b74e-c414875a177f)

- Via Insomnia, se conecte ao endpoint Websocket ``ws://ecs_alb_url``:
![Captura de Tela 2025-05-11 às 03 20 46](https://github.com/user-attachments/assets/f91bf1fa-3285-4f8f-9b5f-c1fd3a98172b)

- Escaneie o Qr Code, pague com saldo em conta e observe o webhook sendo acionado pelo mercado pago:
![WhatsApp Image 2025-05-11 at 03 31 14](https://github.com/user-attachments/assets/018fae67-0c4c-4f17-ba52-76d403879c91)
![Captura de Tela 2025-05-11 às 03 28 16](https://github.com/user-attachments/assets/4b2b9b73-f7e6-4048-a4fc-04fa0891a713)

## Referências:
- https://www.mercadopago.com.br/developers/pt/docs/qr-code/integration-configuration/qr-dynamic/integration#:~:text=Fluxo%20do%20modelo,sua%20escolha%2C%20efetue%20o%20pagamento;
- https://www.mercadopago.com.br/developers/pt/reference/qr-dynamic/_instore_orders_qr_seller_collectors_user_id_pos_external_pos_id_qrs/post;
- https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks;
- https://www.mercadopago.com.br/developers/pt/docs/qr-code/integration-test/dynamic-model/test-purchase;
- https://www.mercadopago.com.br/developers/pt/reference
