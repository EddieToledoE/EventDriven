import { Worker } from "../../domain/worker";
import { NotificationNewWorker } from "../../infrastructure/servicesRabbitMQ/notificationNewWorker";

export class NotificationWorkerUSeCase {
  constructor(readonly serviceNotifiacion: NotificationNewWorker) {}

  async run(worker: Worker) {
    await this.serviceNotifiacion.sendNotification(worker);
  }
}
