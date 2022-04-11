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
    try{
        res.send(questions)
        console.log(questions)
    }catch(error){
        if(error.response){
            console.log(error.response);
            res.send(error)
        }else{
            res.send(error);
            console.log(error)
        }
    }
})

app.post("/alldata",function(req,res){
    let body=req.body;
    try{
        questions.push(body);
        res.send(body);
        console.log(questions)
    }catch{
        res.status(404).send("Error in posting Data. URL not found or check internet connection");
        console.log("err")
    }
})

app.post("/newdata",async function(req,res){
    let body=req.body;
    console.log(body);
    let newdata={url:body.url,method:body.method,json:body.json};
    if(newdata.method==="GET"){
      await axios.get(`${newdata.url}`)
        .then(function(response){
            console.log(response);
            res.send(response.data);
        })
        .catch(function(error){
            if(error.response){
                let {status,statusText}=error.response;
                console.log(error.response);
                res.send(error)
            }else{
                res.send(error);
                console.log(error)
            }
        })
    }else if(newdata.method==="POST"){
        await axios.post(`${newdata.url}`,newdata.json)
            .then(function(){
                res.send(newdata.json);
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

