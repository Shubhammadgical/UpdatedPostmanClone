let express=require("express");
const { getEnvironmentData } = require("worker_threads");
let app = express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
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
app.listen(port, ()=> console.log(`Node app listening on port ${port}!`));

let {questions}=require("./data.js");
let axios = require("axios");

app.get("/alldata",function(req,res){
    let answer=req.query.answer;
    console.log(answer);
    let arr1=questions;
    if(answer) arr1 =questions.filter(qu=> qu.answer=== +answer);
    res.send(arr1)
    console.log(arr1)
})

app.post("/alldata",function(req,res){
    let body=req.body;
    try{
        questions.push(body);
        res.send(body);
    }catch{
        res.status(404).send("Error in posting Data. URL not found or check internet connection");
        console.log("err")
    }
})

app.post("/newdata",async function(req,res){
    let body=req.body;
    console.log(body);
    let newdata={url:body.url,method:body.method,json:body.json,headers:body.headers};
    let headers=newdata.headers;
    if(newdata.method==="GET"){
      await axios.get(`${newdata.url}`,headers={headers})
        .then(function(response){
            console.log(response.config);
            res.send(response.data);
        })
        .catch(function(error){
            if(error.response){
                console.log(error.response);
                res.send(error)
            }else{
                res.send(error);
                console.log(error)
            }
        })
    }else if(newdata.method==="POST"){
        let url=`${newdata.url}`;
        let body= newdata.json;
        let headers= newdata.headers;
        await axios.post(url, body ,headers={headers})
            .then(function(response){
                console.log(response.config)
                res.send(body);
            })
            .catch(function(error){
                if(error.response){
                    let {status,statusText}=error.response;
                    console.log(status,statusText);
                    res.send(error)
                }else{
                    res.send(error);
                }
            })
    }
})

