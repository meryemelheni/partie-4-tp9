import { z } from "zod";

// TODO (partie 2) : compléter le schéma
//  - name    : chaîne, espaces retirés (trim), 2 à 100 caractères
//  - email   : adresse email valide, 254 caractères maximum
//  - message : chaîne, 10 à 2000 caractères
//  - aucun champ supplémentaire accepté (.strict())
export const contactSchema = z.object({
  name: z.string(),
});
