# CSV Processor

## Descrição

Projeto de processamento de CSV utilizando Node.js, Express, React, RabbitMQ e PostgreSQL.

## Pré-requisitos

- Docker
- Docker Compose

## Instalação e Execução

1. Clone o repositório

```bash
cd projeto-csv-processor
```

2. Inicie os serviços

```bash
docker-compose up --build
```

3. Acesso

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- RabbitMQ Management: http://localhost:15672

## Arquitetura

- Frontend: React com Vite
- Backend: Node.js com Express
- Fila: RabbitMQ
- Banco de Dados: PostgreSQL

## Fluxo

1. Faça upload de um arquivo CSV
2. Backend processa o arquivo linha por linha
3. Cada linha é enviada para uma fila no RabbitMQ
4. Worker consome a fila e insere no banco de dados
