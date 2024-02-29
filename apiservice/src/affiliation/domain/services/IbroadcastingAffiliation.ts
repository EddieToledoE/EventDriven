import { Affiliation } from "../affiliation";

export interface IBroadcastingAffiliation {
  broadcastAffiliation(affiliation: Affiliation): Promise<Boolean>;
}
