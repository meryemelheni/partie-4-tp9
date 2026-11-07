import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { createMemoryContactRepository } from "../src/repositories/contactRepository.js";

const valid = { name: "Ada Lovelace", email: "ada@example.com", message: "Bonjour, ceci est un test." };

describe("POST /api/contact", () => {
  let repo;
  let app;
  beforeEach(() => {
    repo = createMemoryContactRepository();
    app = createApp({ contactRepository: repo });
  });

  it("accepte un message valide (201)", async () => {
    const res = await request(app).post("/api/contact").send(valid);
    expect(res.status).toBe(201);
    expect(repo.items).toHaveLength(1);
  });

  // TODO (partie 4) : transformer chaque it.todo en test, avec le code HTTP ET le corps attendus.
  it.todo("refuse un email invalide (400 VALIDATION_ERROR)");
  it.todo("refuse un champ manquant");
  it.todo("refuse un champ supplémentaire (ex. isAdmin: true)");
  it.todo("refuse un type inattendu (message: 42, name: ['a'])");
  it.todo("refuse un JSON mal formé (400 INVALID_JSON)");
  it.todo("refuse un corps de plus de 10 ko (413)");
  it.todo("stocke tel quel un nom contenant une tentative d'injection SQL");
  it.todo("ne renvoie jamais de stack trace en cas d'erreur 500");
  it.todo("ajoute les headers de sécurité Helmet (x-content-type-options, ...)");
  it.todo("ne renvoie pas le header x-powered-by");
  it.todo("répond 429 après trop de requêtes sur /api/contact");
});
