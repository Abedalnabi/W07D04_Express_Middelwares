const express = require("express");

const app = express();
const port = 3000;
const authRouter = express.Router();
const prodectRouter = express.Router();
const users = ["John", "Mark"];

app.get("/users", (req, res, next) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//pulse check
//1
const logUsers = (req, res, next) => {
  console.log(users);
  next();
};
//2
app.use(logUsers);

//3

app.use("/users", (req, res, next) => {
  console.log(req.method);
  next();
});

//4
app.use(express.json());
//5
app.use("/users", logMethod, (req, res, next) => {
  if (users.length === 0) {
    const err = new Error("No users");
    err.status = 500;
    next(err);
  }
  res.json(users);
});

app.use((err, req, res, next) => {
  res.status(err.status);
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

//practice
//1

authRouter.use("/users", (req, res, next) => {
  res.json(users);
  next();
});

//2
const bodyIfFound = (req, res, next) => {
  console.log(req.body);
};
authRouter.use("/users/create", bodyIfFound, (req, res, next) => {
  users.push(req.body.name);
  res.json(users);
  next();
});

//3
authRouter.use("/products", (req, res, next) => {});
app.use("/products", authRouter, (req, res, next) => {
  next();
});

//4

const products = ["keyboard", "mouse"];

prodectRouter.use("/products/update", (req, res, next) => {});
/// i can use products.splice(0, 1, product);
//5
prodectRouter.use("/", (req, res, next) => {
  console.log(products);
});
//6

app.use((req, res, next) => {
  if (users.length === 0) {
    const err = new Error("No users");
    err.status = 500;
    next(err);
  }
});
app.use((err, req, res, next) => {
  res.status(err.status);
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});
