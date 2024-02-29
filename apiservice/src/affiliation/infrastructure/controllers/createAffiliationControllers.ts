import { Request, Response } from "express";
import { CreateAffiliationUseCase } from "../../application/createAffiliationUseCase";

export class CreateAffiliationController {
  constructor(readonly createAffiliationUseCase: CreateAffiliationUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const affiliation = await this.createAffiliationUseCase.run(data.worker);
      if (affiliation)
        res.status(201).send({
          status: "success",
          data: {
            id: affiliation?.id,
            worker: affiliation?.worker,
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
