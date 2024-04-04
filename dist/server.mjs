import {
  errorHnadler
} from "./chunk-HZTQHPGB.mjs";
import {
  checkIn
} from "./chunk-XLEHVINI.mjs";
import {
  createEvent
} from "./chunk-TERUHGHU.mjs";
import "./chunk-DTSKMKZP.mjs";
import {
  getAttendeeBadge
} from "./chunk-T5HSCAA7.mjs";
import {
  getEventAttendes
} from "./chunk-WVT3DO7W.mjs";
import {
  getEvent
} from "./chunk-SOP6FYTZ.mjs";
import {
  regisrterForEvent
} from "./chunk-CNGDWW45.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["aplication/json"],
    produces: ["aplication/json"],
    info: {
      title: "pass-in",
      description: "Espicifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass-in",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(regisrterForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendes);
app.setErrorHandler(errorHnadler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server Running!");
});
