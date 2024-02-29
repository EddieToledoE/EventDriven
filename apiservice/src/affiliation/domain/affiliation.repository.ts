import { Affiliation } from "./affiliation";

export interface AffiliationRepository {
  createAffiliation(affiliation: Affiliation): Promise<Affiliation | null>;
}
