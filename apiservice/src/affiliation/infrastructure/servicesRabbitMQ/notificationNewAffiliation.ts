import amqplib from "amqplib";
import { Affiliation } from "../../domain/affiliation";
import { InotificationAffiliation } from "../../domain/services/InotificationAffiliation";

export class NotificationNewAffiliation implements InotificationAffiliation {
  private exch: any;
  private server: any;

  constructor() {
    this.exch = process.env.AMQP_EXCH;
    this.server = process.env.AMQP_SERVER;
  }

  async notifyAffiliation(affiliation: Affiliation): Promise<Boolean> {
    let conn, ch;
    try {
      conn = await amqplib.connect(this.server);

      ch = await conn.createChannel();
      const status = await ch.publish(
        this.exch,
        "",
        Buffer.from(JSON.stringify(affiliation))
      );
      console.log("Message content:", JSON.stringify(affiliation));
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
