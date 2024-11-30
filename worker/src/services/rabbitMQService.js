const amqp = require("amqplib");

async function connectRabbitMQ() {
  try {
    console.log("Tentando conectar ao RabbitMQ...");
    console.log("URL de conexão:", process.env.RABBITMQ_URL);

    const connection = await amqp.connect(process.env.RABBITMQ_URL);

    console.log("Conexão com RabbitMQ estabelecida!");
    return await connection.createChannel();
  } catch (error) {
    console.error("Erro detalhado de conexão RabbitMQ:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw error;
  }
}

module.exports = { connectRabbitMQ };
