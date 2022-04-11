import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaUser,FaRegFile} from 'react-icons/fa';
import { GiMeepleCircle } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";
import { FiBox ,FiMonitor} from "react-icons/fi";
import { HiOutlineInbox} from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import './Postman.css';
class Postmanleft extends Component{
    state={
        history:this.props.history,
        colorindex:-1,
        bgstyle:this.props.bgstyle,
    }
    handlehistoryclick(index){
        let s1={...this.state};
        s1.colorindex=index;
        this.props.onSend(s1.history[index]);
        this.setState(s1)
    }
    render(){
        let {history,colorindex}=this.state;
        return(
            <div>
                <div className="myworkspace">
                    <b><FaUser/>&nbsp;&nbsp;My Workspace</b>
                    <button className="btn btn-sm">Import</button>
                    <button className="btn btn-sm">New</button>
                </div>
                <div className="leftleft">
                        <div className="leftoptions">
                            <div>
                                <FaRegFile className="lefticons"/><br/>
                                Collections
                            </div>
                            <div className="">
                                <GiMeepleCircle className="lefticons"/><br/>APIs
                            </div>
                            <div className="">
                                <FiBox className="lefticons"/><br/>Environments
                            </div>
                            <div className="">
                                <HiOutlineInbox  className="lefticons"/><br/>Mock Servers
                            </div>
                            <div className="">
                                <FiMonitor className="lefticons"/><br/>Monitors
                            </div>
                            <div className="">
                                <GrHistory className="lefticons"/><br/>History
                            </div>
                        </div>
                        <div className="historypannel">
                            <div className="p-2 row">
                                <div className="col-10">
                                    <input className="filter form-control" type="text"></input>
                                </div>
                                <div className="col-2 px-2"><BsThreeDotsVertical/></div>
                            </div>
                            <div className="leftpannel ">
                                <div className="leftscroller p-2">
                                    {history.map((d,index)=>(
                                        colorindex===index && this.props.highlight==="false" ?
                                        <div className="row">
                                        <div className="historydiv px-2"  style={{backgroundColor:"lightgray",borderRadius:"10px"}} onClick={()=>this.handlehistoryclick(index)}>
                                            <span style={{color:"blue"}}>{d.method}</span> &nbsp;{d.url.length>22 ? d.url.substring(0,22)+"...":d.url}
                                        </div>
                                        </div> 
                                        :
                                        <div className="row">
                                        <div className="historydiv px-2" onClick={()=>this.handlehistoryclick(index)}>
                                            <span className="method">{d.method}</span> &nbsp;{d.url.length>22 ? d.url.substring(0,22)+"...":d.url}
                                        </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
export default Postmanleft;
