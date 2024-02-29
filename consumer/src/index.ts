import express, { Request, Response } from "express";
import * as amqp from "amqplib";
import axios from "axios";
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8881;
const rabbitUrl = process.env.AMQPURL || "your_rabbitmq_url_here";

async function consumeMessages() {
  try {
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();
    const queue = process.env.QUEUE || "hey-queue";

    await channel.assertQueue(queue, {
      durable: true,
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, (message) => {
      if (message) {
        const msgContent = JSON.parse(message.content.toString());
        // Extraer y enviar solo los datos necesarios
        const { name, id, job } = msgContent;

        axios
          .post("http://34.237.54.108:7774/affiliations/create", {
            worker: { name, id, job },
          })
          .then((response) => {
            console.log("Message sent successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });

        console.log(" [x] Received %s", message.content.toString());
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error in consumeMessages:", error);
  }
}

app.get("/", (req: Request, res: Response) => {
  res.send("Consumer Service Running");
});

app.listen(PORT, () => {
  console.log(`Consumer service running on port ${PORT}`);
  consumeMessages()
    .then(() => {
      console.log("RabbitMQ Consumer running...");
    })
    .catch((error) => {
      console.error("Error starting RabbitMQ Consumer:", error);
    });
});
