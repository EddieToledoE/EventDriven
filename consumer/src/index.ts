import express, { Request, Response } from "express";
import * as amqp from "amqplib";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// RabitMQ Consuming part
const rabbitUrl =
  process.env.AMQPURL ||
  "amqps://masjjfxx:Rb4S6Fg2QGPY0h_XXpyRU2XaQSA7YXu7@woodpecker.rmq.cloudamqp.com/masjjfxx";
let recivedMessage: string;
async function consumeMessages() {
  try {
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    const queue = process.env.QUEUE || "hey-queue";
    await channel.assertQueue(queue);
    channel.consume(queue, (message: any) => {
      recivedMessage = message.content.toString();
      console.log(" [x] Received %s", message.content.toString());
      channel.ack(message);
    });
  } catch (error) {
    console.log("error--at consumeMessages", error);
  }
}

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ ___: "This is Consumer" });
});

app.get("/consumer", (req: Request, res: Response) => {
  consumeMessages()
    .then(() => {
      res.json({ status: recivedMessage });
    })
    .catch((error) => {
      console.log("error--at /consumer", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

//Listen
app.listen(PORT, () => {
  console.log(`Consumer server is connected at ${PORT} `);
  consumeMessages();
});
