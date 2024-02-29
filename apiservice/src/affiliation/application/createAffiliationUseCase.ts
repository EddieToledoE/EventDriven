import { Affiliation } from "../domain/affiliation";
import { AffiliationRepository } from "../domain/affiliation.repository";
import { NotificationAffiliationUseCase } from "./services/notificationNewAffiliation";
import { BroadcastingAffiliationUseCase } from "./services/broadcastingNewAffiliation";

import { v4 as uuidv4 } from "uuid";

export class CreateAffiliationUseCase {
  constructor(
    readonly affiliationRepository: AffiliationRepository,
    readonly sendNotification: NotificationAffiliationUseCase,
    readonly broadcastingAffiliation: BroadcastingAffiliationUseCase
  ) {}

  async run(worker: Array<string>): Promise<Affiliation | null> {
    const id = uuidv4();
    const affiliation = new Affiliation(id, worker);
    try {
      const aff = await this.affiliationRepository.createAffiliation(
        affiliation
      );
      if (aff) {
        this.sendNotification.run(aff);
        if (aff) {
          this.broadcastingAffiliation.run(aff);
        }
      }
      return aff;
    } catch (error) {
      return null;
    }
  }
}
