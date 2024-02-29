import { Affiliation } from "../../domain/affiliation";
import { BroadcastingNewAffiliation } from "../../infrastructure/servicesSocketIO/broadcastingNewAffiliation";

export class BroadcastingAffiliationUseCase {
  constructor(readonly serviceBroadcasting: BroadcastingNewAffiliation) {}

  async run(affiliation: Affiliation) {
    await this.serviceBroadcasting.broadcastAffiliation(affiliation);
  }
}
