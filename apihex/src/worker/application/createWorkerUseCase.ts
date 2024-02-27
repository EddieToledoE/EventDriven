import { Worker } from "../domain/worker";
import { WorkerRepository } from "../domain/worker.repository";
import { NotificationWorkerUSeCase } from "./services/notificationNewWorker";
import { v4 as uuidv4 } from "uuid";
export class CreateWorkerUseCase {
  constructor(
    readonly workerRepository: WorkerRepository,
    readonly sendNotification: NotificationWorkerUSeCase
  ) {}

  async run(name: string, job: string): Promise<Worker | null> {
    const id = uuidv4(); //Se genera un id único para el producto
    const wkr = new Worker(id, name, job);
    try {
      const wk = await this.workerRepository.createWorker(wkr);
      if (wk)
        //Se valida que la creación del recurso sea exitosa
        this.sendNotification.run(wk);
      return wk;
    } catch (error) {
      return null;
    }
  }
}
