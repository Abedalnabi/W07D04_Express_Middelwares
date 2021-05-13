const express = require("express");

const app = express();
const port = 3000;

const users = ["John", "Mark"];

app.get("/users", (req, res, next) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


//pulse check 
//1
const logUsers = (req, res, next)=>{
  console.log(users)
  next()
}
//2
app.use(logUsers)

//3
const logMethod = (req, res, next)=>{
  console.log(req.method)
  next()
}
// app.use("/users", logMethod, (req, res, next)=>{

// });
//4
app.use(express.json())
//5
app.use("/users",logMethod,(req, res, next)=>{
  if (users.length === 0) {
      const err = new Error("No users")
      err.status = 500
      next(err)
      }
      res.json(users)
})

app.use((err, req, res, next)=>{
  res.status(err.status);
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  })
})


