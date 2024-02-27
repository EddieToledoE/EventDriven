import { Request, Response } from "express";

import { CreateWorkerUseCase } from "../../application/createWorkerUseCase";
//import { Product } from "../../domain/Product";

export class CreateWorkerController {
  constructor(readonly createWorkerUseCase: CreateWorkerUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const product = await this.createWorkerUseCase.run(data.name, data.job);

      if (product)
        //Code HTTP : 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            id: product?.id,
            name: product?.name,
            job: product?.job,
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
