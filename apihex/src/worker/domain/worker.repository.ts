import { Worker } from "./worker";

export interface WorkerRepository {
  createWorker(worker: Worker): Promise<Worker | null>;
}
