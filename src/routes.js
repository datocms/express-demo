import { GraphQLClient } from "graphql-request";
import { Router } from "express";
import * as queries from "./queries";

const routes = Router();
const { DATO_API_TOKEN } = process.env;
const endpoint = "https://graphql.datocms.com/";
const client = new GraphQLClient(endpoint, {
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

export default routes;
