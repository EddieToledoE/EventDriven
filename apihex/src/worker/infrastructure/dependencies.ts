import { CreateWorkerUseCase } from "../application/createWorkerUseCase";
import { NotificationWorkerUSeCase } from "../application/services/notificationNewWorker";
import { CreateWorkerController } from "./controllers/createWorkerControllers";
import { Mongorepository } from "./repositories/MongoRepository";
import { NotificationNewWorker } from "./servicesRabbitMQ/notificationNewWorker";

export const mongodbRepository = new Mongorepository();
export const notificationWorker = new NotificationNewWorker();
export const serviceNotification = new NotificationWorkerUSeCase(
  notificationWorker
);
export const createWorkerUseCase = new CreateWorkerUseCase(
  mongodbRepository,
  serviceNotification
);
export const createWorkerController = new CreateWorkerController(
  createWorkerUseCase
);
