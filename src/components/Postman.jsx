import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import Postmanleft from "./Postmanleft";
import Postmanright from "./Postmanright";
import {FaUserPlus,FaRegSun} from 'react-icons/fa';
import { AiOutlineBell ,AiOutlineSearch} from "react-icons/ai";
class Postman extends Component{
    state={
        data:{url:"",method:"",postjson:""},
        history:[],
        bgstyle:"",
        highlight:"",
    }
    senddata=(data)=>{
        let s1={...this.state};
        let data1={url:data.url,method:data.method};
        s1.highlight="true";
        console.log(s1.highlight)
        s1.history.push(data1);
        this.setState(s1);
    }
    handlehistoryclick=(data)=>{
        let s1={...this.state};
        s1.data.url=data.url;
        s1.data.method=data.method;
        s1.postjson=data.postjson;
        s1.highlight="false";
        console.log(s1.highlight)
        this.setState(s1);
    }
    changedata=(newdata)=>{
        let s1={...this.state};
        s1.data.url=newdata.url;
        this.setState(s1);
    }
    render(){
        let {history,data,bgstyle,highlight}=this.state;
        return(
            <div>
                <div className="headerdiv">
                    <div className="postmanlogodiv">
                        <img className="logo" src="./images/postman.png"></img>
                    </div>
                    <div className="headeroptionsdiv">
                        <div className="Home"><b>Home</b></div>
                        <div className="Workspaces"><b>Workspaces</b></div>
                        <div className="Api"><b>API&nbsp;Network</b></div>
                        <div className="Reports"><b>Reports</b></div>
                        <div className="Explore"><b>Explore</b></div>
                    </div>
                    <div className="divdiv" style={{width:"100%"}}></div>
                    <div className="headersearchdiv">
                        <input className="form-control" type="text" placeholder="     Search Postman">
                            </input>
                    </div>
                    <div className="divdiv" style={{width:"100%"}}>

                    </div>
                    <div className="invite">
                        <button className=" btn btn-sm btn-primary">
                        <FaUserPlus/>&nbsp;Invite</button>
                    </div>
                    <div className="icons">
                        <div><FaRegSun/></div>
                        <div><AiOutlineBell/></div>
                    </div>
                    <div className="">
                        <button className="upgrade btn btn-sm ">Upgrade</button>
                    </div>
                </div>

                
                <div className="data">
                    <div className="left">
                        <Postmanleft history={history} onSend={this.handlehistoryclick} bgstyle={bgstyle} highlight={highlight}/>
                    </div>
                    <div className="right">
                        <Postmanright onSend={this.senddata} ChangeData={this.changedata} data={data} highlight={highlight}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Postman;