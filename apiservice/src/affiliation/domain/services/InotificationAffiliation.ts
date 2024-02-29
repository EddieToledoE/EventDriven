import { Affiliation } from "../affiliation";

export interface InotificationAffiliation {
  notifyAffiliation(affiliation: Affiliation): Promise<Boolean>;
}
