const fs = require("fs");
const { parse } = require("csv-parse");
const { connectRabbitMQ } = require("./rabbitMQService");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function processCSV(filePath) {
  const channel = await connectRabbitMQ();
  const queueName = "csv-processing";

  await channel.assertQueue(queueName, { durable: true });

  const parser = fs.createReadStream(filePath).pipe(
    parse({
      delimiter: ",",
      columns: true,
    })
  );

  for await (const record of parser) {
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(record)), {
      persistent: true,
    });
    // prevent postgres crash by sending too many messages at once
    await sleep(50);
  }

  fs.unlinkSync(filePath);
}

module.exports = { processCSV };
