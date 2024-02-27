import amqplib from "amqplib";
import { Worker } from "../../domain/worker";
import { INotificationNewWorker } from "../../domain/services/Inotification";

export class NotificationNewWorker implements INotificationNewWorker {
  private options: any;
  private url: any;
  private exch: any;
  //private server: any;

  constructor() {
    this.options = {
      vhost: process.env.AMQP_VHOST,
      username: process.env.AMQP_USERNAME,
      password: process.env.AMQP_PASSWORD,
      port: process.env.AMQP_PORT,
    };
    this.url = process.env.RABBIT_URI;
    this.exch = process.env.AMQP_EXCH;
    //Options solo para cloudamqp
    //this.server = process.env.AMQP_SERVER;
  }

  async sendNotification(worker: Worker): Promise<boolean> {
    let conn, ch;
    try {
      //Opción de conexión para instancia EC2
      conn = await amqplib.connect(this.url /*this.options*/);
      //Opción de conexión para cloudamqp
      //conn  = await amqplib.connect(this.server);
      ch = await conn.createChannel();
      const status = await ch.publish(
        this.exch,
        "",
        Buffer.from(JSON.stringify(worker))
      );
      console.log("Message content:", JSON.stringify(worker));
      console.log("Message sent status:", status);
      return status;
    } catch (error) {
      console.error("Error sending notification:", error);
      return false;
    } finally {
      // Asegurarse de cerrar el canal y la conexión adecuadamente
      if (ch) {
        await ch.close();
        console.log("Channel closed");
      }
      if (conn) {
        await conn.close();
        console.log("Connection closed");
      }
    }
  }
}
