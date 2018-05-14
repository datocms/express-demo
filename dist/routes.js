"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlRequest = require("graphql-request");

var _express = require("express");

var _queries = require("./queries");

var queries = _interopRequireWildcard(_queries);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = (0, _express.Router)();
const { DATO_API_TOKEN } = process.env;
const endpoint = "https://site-api.datocms.com/graphql";
const client = new _graphqlRequest.GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${DATO_API_TOKEN}`
  }
});

let generalInfo = null;

const getData = async page => {
  page = page ? page : "";
  if (!generalInfo) {
    generalInfo = await client.request(queries.getGeneralInfo);
  }
  let q = queries.getPage(page);
  let data = await client.request(q);
  data = Object.assign(data, generalInfo);
  return data;
};

routes.get("/:page", (req, res) => {
  let page = req.params.page;
  getData(page).then(data => {
    res.render(page, { title: page, data });
  });
});

routes.get("/", (req, res) => {
  getData().then(data => {
    res.render("home", { title: "Home", data });
  });
});

exports.default = routes;
//# sourceMappingURL=routes.js.map