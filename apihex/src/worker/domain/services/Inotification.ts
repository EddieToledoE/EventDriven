import { Worker } from "../worker";

export interface INotificationNewWorker {
  sendNotification(worker: Worker): Promise<boolean>;
}
