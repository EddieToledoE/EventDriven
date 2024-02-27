import { connect, ConsumeMessage } from "amqplib";

async function consumeMessages() {
  const connection = await connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchange = "your_exchange_name";
  const queue = "your_queue_name";
  const routingKey = "your_routing_key";

  await channel.assertExchange(exchange, "direct", { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, routingKey);

  channel.consume(queue, (message: ConsumeMessage | null) => {
    if (message) {
      const messageContent = message.content.toString();
      // Process the message or store it in your index
      console.log("Received message:", messageContent);
      channel.ack(message);
    }
  });
}

consumeMessages().catch((error) => {
  console.error("Error consuming messages:", error);
});
