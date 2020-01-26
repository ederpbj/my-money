"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "BalanceUpdate",
    embedded: false
  },
  {
    name: "Broker",
    embedded: false
  },
  {
    name: "Investment",
    embedded: false
  },
  {
    name: "SequelizeMeta",
    embedded: false
  },
  {
    name: "Transaction",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/ederpbj-833032/my-money/dev`
});
exports.prisma = new exports.Prisma();
