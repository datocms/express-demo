"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _nodeSassMiddleware = require("node-sass-middleware");

var _nodeSassMiddleware2 = _interopRequireDefault(_nodeSassMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { DATO_API_TOKEN, PORT = 3000 } = process.env;
const app = (0, _express2.default)();

const graphiql = `https://site-api.datocms.com/graphiql?apitoken=${DATO_API_TOKEN}`;

app.set("views", _path2.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use((0, _morgan2.default)("dev"));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use((0, _nodeSassMiddleware2.default)({
  src: _path2.default.join(__dirname, "../public/scss"),
  dest: _path2.default.join(__dirname, "../public"),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false
}));

app.use(_express2.default.static(_path2.default.join(__dirname, "../public")));

// Routes
app.use("/", _routes2.default);

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
  console.log(`Listening on port ${PORT}`);
  console.log(`Test your query at  ${graphiql}`);
});

exports.default = app;
//# sourceMappingURL=index.js.map