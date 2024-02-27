import { Worker } from "../../domain/worker";
import { WorkerRepository } from "../../domain/worker.repository";
import WorkerModel from "../models/worker.model";
export class Mongorepository implements WorkerRepository {
  async createWorker(worker: Worker): Promise<Worker | null> {
    console.log("Creating worker in MongoRepository");
    try {
      const createdWorker = await WorkerModel.create(worker);
      return createdWorker;
    } catch (error) {
      console.error("Error creating worker:", error);
      return null;
    }
  }
}
