import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import routes from "./routes";
import sassMiddleware from "node-sass-middleware";
const { DATO_API_TOKEN, PORT = 3000 } = process.env;
const app = express();
const graphiql = `https://site-api.datocms.com/graphiql?apitoken=${DATO_API_TOKEN}`;

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  sassMiddleware({
    src: path.join(__dirname, "../public/scss"),
    dest: path.join(__dirname, "../public"),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: false
  })
);
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res) => {
  res.status(err.status || 500).render("error", {
    message: err.message,
    error: err
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log(`Test your query at  ${graphiql}`)
});

export default app;
