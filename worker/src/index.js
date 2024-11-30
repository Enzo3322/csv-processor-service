const { connectRabbitMQ } = require("./services/rabbitMQService");
const { connectPostgres } = require("./services/postgresService");

async function startWorker() {
  try {
    const channel = await connectRabbitMQ();

    const queueName = "csv-processing";
    const pool = await connectPostgres();

    console.log("Worker iniciado, conectado ao RabbitMQ e Postgres");

    await channel.assertQueue(queueName, { durable: true });

    channel.consume(
      queueName,
      async (msg) => {
        if (msg !== null) {
          try {
            const record = JSON.parse(msg.content.toString());

            const { name, email, phone } = record;

            await pool.query(
              "INSERT INTO processed_data (name, email, phone) VALUES ($1, $2, $3)",
              [name, email, phone]
            );

            console.log("Created:", record);

            channel.ack(msg);
          } catch (error) {
            console.error("Erro ao processar mensagem:", error);
            channel.nack(msg, false, false);
          }
        }
      },
      {
        noAck: false,
      }
    );
  } catch (error) {
    console.error("Erro fatal no worker:", error);
    process.exit(1);
  }
}

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

startWorker();
