import { Router } from "express";
// import { validate } from "../middlewares/validate.js";
// import { contactSchema } from "../schemas/contact.js";

export function contactRouter({ contactRepository }) {
  const router = Router();

  // TODO (partie 2) : insérer validate(contactSchema) avant le handler
  router.post("/", async (req, res, next) => {
    try {
      // TODO (partie 2) : n'utiliser que les données validées (req.body après validate)
      const saved = await contactRepository.create(req.body);
      res.status(201).json({ id: saved.id, status: "received" });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
