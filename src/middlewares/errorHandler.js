/**
 * Middleware d'erreur centralisé (4 arguments : c'est ainsi qu'Express le reconnaît).
 * TODO (partie 2) :
 *  - JSON mal formé (err.type === "entity.parse.failed") → 400 { error: "INVALID_JSON" }
 *  - corps trop gros (err.type === "entity.too.large")    → 413 { error: "PAYLOAD_TOO_LARGE" }
 *  - toute autre erreur → 500 { error: "INTERNAL_ERROR" }, journalisée côté serveur
 *  - ne JAMAIS renvoyer err.stack ni le message SQL au client
 *
 * La version actuelle est volontairement dangereuse : elle divulgue la stack trace.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  res.status(500).json({ error: err.message, stack: err.stack });
}
