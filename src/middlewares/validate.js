/**
 * Middleware générique de validation.
 * TODO (partie 2) :
 *  - appeler schema.safeParse(req.body)
 *  - si échec : répondre 400 avec { error: "VALIDATION_ERROR", details: [...] }
 *    (details = liste { field, message } construite à partir de result.error.issues)
 *  - si succès : remplacer req.body par result.data puis appeler next()
 */
// eslint-disable-next-line no-unused-vars
export const validate = (schema) => (req, res, next) => {
  next();
};
