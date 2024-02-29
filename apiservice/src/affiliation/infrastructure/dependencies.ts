import { CreateAffiliationUseCase } from "../application/createAffiliationUseCase";
import { NotificationAffiliationUseCase } from "../application/services/notificationNewAffiliation";
import { BroadcastingAffiliationUseCase } from "../application/services/broadcastingNewAffiliation";
import { CreateAffiliationController } from "./controllers/createAffiliationControllers";
import { MongoRepository } from "./repositories/MongoRepository";
import { NotificationNewAffiliation } from "./servicesRabbitMQ/notificationNewAffiliation";
import { BroadcastingNewAffiliation } from "./servicesSocketIO/broadcastingNewAffiliation";

export const mongoRepository = new MongoRepository();
export const notificationAffiliation = new NotificationNewAffiliation();
export const broadcastingservice = new BroadcastingNewAffiliation();
export const serviceNotification = new NotificationAffiliationUseCase(
  notificationAffiliation
);
export const broadcastingAffiliation = new BroadcastingAffiliationUseCase(
  broadcastingservice
);
export const createAffiliationUseCase = new CreateAffiliationUseCase(
  mongoRepository,
  serviceNotification,
  broadcastingAffiliation
);

export const createAffiliationController = new CreateAffiliationController(
  createAffiliationUseCase
);
