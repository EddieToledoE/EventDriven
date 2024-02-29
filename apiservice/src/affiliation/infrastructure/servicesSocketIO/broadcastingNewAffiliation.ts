import ioClient from "socket.io-client";
import { Affiliation } from "../../domain/affiliation";
import { IBroadcastingAffiliation } from "../../domain/services/IbroadcastingAffiliation";
const socket = ioClient("http://localhost:5555");

export class BroadcastingNewAffiliation implements IBroadcastingAffiliation {
  async broadcastAffiliation(affiliation: Affiliation): Promise<Boolean> {
    try {
      socket.emit("newAffiliation", affiliation);
      console.log(
        "The affiliation was emited succesfully :",
        JSON.stringify(affiliation)
      );
      console.log("Message sent status: OK");
      return true;
    } catch (error) {
      console.error("Error sending notification:", error);
      return false;
    }
  }
}
