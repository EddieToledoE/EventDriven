import { Affiliation } from "../../domain/affiliation";
import { AffiliationRepository } from "../../domain/affiliation.repository";
import AffiliationModel from "../models/affiliation.model";

export class MongoRepository implements AffiliationRepository {
  async createAffiliation(
    affiliation: Affiliation
  ): Promise<Affiliation | null> {
    console.log("Creating affiliation in MongoRepository");
    try {
      const createdAffiliation = await AffiliationModel.create(affiliation);
      return createdAffiliation;
    } catch (error) {
      console.error("Error creating affiliation:", error);
      return null;
    }
  }
}
