import { Affiliation } from "../../domain/affiliation";
import { NotificationNewAffiliation } from "../../infrastructure/servicesRabbitMQ/notificationNewAffiliation";

export class NotificationAffiliationUseCase {
  constructor(readonly serviceNotifiacion: NotificationNewAffiliation) {}

  async run(affiliation: Affiliation) {
    await this.serviceNotifiacion.notifyAffiliation(affiliation);
  }
}
