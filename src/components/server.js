let express = require("express");
const { getEnvironmentData } = require("worker_threads");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
});

const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let { questions } = require("./data.js");
let axios = require("axios");

app.get("/alldata", function (req, res) {
  let answer = req.query.answer;
  console.log(answer);
  let arr1 = questions;
  if (answer) arr1 = questions.filter((qu) => qu.answer === +answer);
  res.send(arr1);
  console.log(arr1);
});

app.post("/alldata", function (req, res) {
  let body = req.body;
  let answer = req.query.answer;
  console.log("alldata POST");
  console.log(req.headers);
  console.log(answer);
  let arr1 = questions;
  console.log(arr1);
  try {
    if (answer) {
      body.answer = +answer;
      arr1.push(body);
      console.log(arr1);
      arr1 = questions.filter((qu) => qu.answer === +answer);
      res.send(arr1);
    } else {
      arr1.push(body);
      res.send(body);
    }
  } catch (error) {
    res.send(error);
  }
});

app.post("/newdata", async function (req, res) {
  let body = req.body;
  let newdata = {
    url: body.url,
    method: body.method,
    json: body.json,
    headers: body.headers,
  };
  let headers = newdata.headers;
  console.log(headers);
  if (newdata.method === "GET") {
    await axios
      .get(`${newdata.url}`, (headers = { headers }))
      .then(function (response) {
        const Alldata = {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          config: response.config,
        };
        console.log(response.config);
        res.send(Alldata);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          res.send(error);
        } else {
          res.send(error);
          console.log(error);
        }
      });
  } else if (newdata.method === "POST") {
    let url = `${newdata.url}`;
    let body = newdata.json;
    let headers = newdata.headers;
    await axios
      .post(url, body, (headers = { headers }))
      .then(function (response) {
        const Alldata = {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          config: response.config,
        };
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        //console.log(Alldata)
        res.send(Alldata);
      })
      .catch(function (error) {
        if (error.response) {
          let { status, statusText } = error.response;
          console.log(status, statusText);
          res.send(error);
        } else {
          res.send(error);
        }
      });
  }
});
