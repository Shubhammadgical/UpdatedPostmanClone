import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Postman.css";
import http from "./http";
import JSONPretty from "react-json-pretty";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";

class Postmanright extends Component {
  state = {
    data: this.props.data,
    alldata: this.props.alldata,
    headers: this.props.headers,
    status: "",
    statustext: "",
    allqueryparams: this.props.allqueryparams,
    index: -1,
    allheaders: this.props.allheaders,
    index1: -1,
    querystr: this.props.querystr,
    highlight: this.props.highlight,
  };
  componentDidMount = () => {
    let s1 = { ...this.state };
    s1.allqueryparams = this.props.allqueryparams;
    s1.querystr = this.props.querystr;
    s1.allheaders = this.props.allheaders;
    this.setState(s1);
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      let s1 = { ...this.state };
      if (this.props.highlight === "false") {
        s1.querystr = "";
      }
      s1.allqueryparams = this.props.allqueryparams;
      s1.allheaders = this.props.allheaders;
      this.setState(s1);
    }
  };
  handlechange = (e) => {
    let s1 = { ...this.state };
    if (e.currentTarget.id === "query") {
      s1.allqueryparams[s1.index][e.currentTarget.name] = e.currentTarget.value;
      s1.querystr = "?";
      for (let i = 0; i < s1.allqueryparams.length; i++) {
        if (i === 0) {
          s1.querystr =
            s1.querystr +
            s1.allqueryparams[i].key +
            "=" +
            s1.allqueryparams[i].value;
        } else if (i != 0 && i === s1.allqueryparams.length - 1) {
          s1.querystr =
            s1.querystr +
            "&" +
            s1.allqueryparams[i].key +
            "=" +
            s1.allqueryparams[i].value;
        } else if (i != 0 && i != s1.allqueryparams.length - 1) {
          s1.querystr =
            s1.querystr +
            "&" +
            s1.allqueryparams[i].key +
            "=" +
            s1.allqueryparams[i].value;
        }
      }
    } else if (e.currentTarget.id === "header") {
      s1.allheaders[s1.index1][e.currentTarget.name] = e.currentTarget.value;
    } else {
      s1.data[e.currentTarget.name] = e.currentTarget.value;
    }
    this.setState(s1);
    this.props.ChangeData(this.state);
  };

  async fetchdata() {
    let s1 = { ...this.state };
    let AllData;
    let head = {};

    for (let i = 0; i < s1.allheaders.length; i++) {
      if (s1.allheaders[i].key != "" || s1.allheaders[i].value != "") {
        head[s1.allheaders[i].key] = s1.allheaders[i].value;
      }
    }
    console.log(head);
    if (s1.data.method === "POST") {
      try {
        let post = JSON.parse(s1.data.postjson);
        AllData = {
          url: s1.data.url,
          method: s1.data.method,
          json: post,
          headers: head,
        };
        console.log("true");
        let response = await http.post("/newdata", AllData);
        console.log(response.data);
        s1.alldata = response.data.data;
        s1.headers = response.data.headers;
        if (response.data.data) {
          s1.alldata = response.data.data;
        } else {
          s1.alldata = response.data;
        }
        if (response.data.status) {
          s1.status = response.data.status;
        } else if (response.status) {
          s1.status = response.status;
        } else {
          s1.status = "NOT FOUND";
        }
      } catch (e) {
        s1.alldata = "";
        s1.status = "";
        s1.headers = "";
        alert("Please check JSON format which you want to post.");
      }
    } else {
      console.log(s1.data);
      AllData = {
        url: s1.data.url + s1.querystr,
        method: s1.data.method,
        headers: head,
      };
      let response = await http.post("/newdata", AllData);
      console.log(response.data);
      if (response.data.data) {
        s1.alldata = response.data.data;
      } else {
        s1.alldata = response.data;
      }
      s1.headers = response.data.headers;
      console.log(s1.headers);
      if (response.data.status) {
        s1.status = response.data.status;
      } else if (response.status) {
        s1.status = response.status;
      } else {
        s1.status = "NOT FOUND";
      }
    }
    this.setState(s1);
    this.props.OnSend(s1.alldata, s1.headers, s1.data);
  }
  handlesendbtn = () => {
    let s1 = { ...this.state };
    if (s1.data.method == "") {
      s1.data.method = "GET";
    }
    this.setState(s1);
    this.fetchdata();
    console.log(s1.data);
    this.props.onSend(s1.data, s1.querystr);
  };
  handleaddquery = () => {
    let s1 = { ...this.state };
    s1.allqueryparams.push({ key: "", value: "" });
    this.setState(s1);
  };
  handleremovebtn = (index) => {
    let s1 = { ...this.state };
    if (s1.allqueryparams.length > 1) {
      s1.allqueryparams.splice(index, 1);
      s1.querystr = "?";
      for (let i = 0; i < s1.allqueryparams.length; i++) {
        if (i === 0) {
          s1.querystr =
            s1.querystr +
            s1.allqueryparams[i].key +
            "=" +
            s1.allqueryparams[i].value;
        } else if (i != 0 && i === s1.allqueryparams.length - 1) {
          s1.querystr =
            s1.querystr +
            "&" +
            s1.allqueryparams[i].key +
            "=" +
            s1.allqueryparams[i].value;
        } else if (i != 0 && i != s1.allqueryparams.length - 1) {
          s1.querystr =
            s1.querystr +
            "&" +
            s1.allqueryparams[i].key +
            "=" +
            s1.allqueryparams[i].value;
        }
      }
      console.log(s1.querystr);
    } else {
      s1.allqueryparams[index].key = "";
      s1.allqueryparams[index].value = "";
      s1.querystr = "";
    }
    this.setState(s1);
  };
  setindex = (index) => {
    let s1 = { ...this.state };
    s1.index = index;
    this.setState(s1);
  };
  handleaddheader = () => {
    let s1 = { ...this.state };
    s1.allheaders.push({ key: "", value: "" });
    this.setState(s1);
  };
  handleremovebtn1 = (index) => {
    let s1 = { ...this.state };
    if (s1.allheaders.length > 1) {
      s1.allheaders.splice(index, 1);
    } else {
      s1.allheaders[index].key = "";
      s1.allheaders[index].value = "";
    }
    this.setState(s1);
  };
  setindex1 = (index) => {
    let s1 = { ...this.state };
    s1.index1 = index;
    this.setState(s1);
  };
  render() {
    let { url, method, postjson } = this.state.data;
    let { alldata, status, headers, allqueryparams, allheaders, querystr } =
      this.state;
    let urllen = url + querystr;
    let headerKeys;
    let headervalues;
    if (this.props.headers && headers) {
      headerKeys = Object.keys(headers);
      headervalues = Object.values(headers);
      console.log(headerKeys);
      console.log(headervalues);
    }
    return (
      <div className="fullrightpannel">
        <div className="rightpannel">
          <div className="urlsavebtndiv">
            <div className="showurl">
              <b>
                {urllen.length > 50 ? urllen.substring(0, 50) + "..." : urllen}
              </b>
            </div>
            <div className="divdiv" style={{ width: "100%" }}></div>
            <div>
              <button className="btn btn-sm ">Save</button>
            </div>
            <div>
              <button className="btn btn-sm ">/</button>
            </div>
            <div
              style={{
                width: 1,
                backgroundColor: "lightgray",
                marginLeft: 5,
                marginRight: 5,
              }}
            ></div>
            <div className="penmsgdiv">
              <button className="btn btn-sm ">
                <BiMessageDetail className="lefticons" />
              </button>
            </div>
          </div>
          <div className="input-group p-2">
            <select
              className="form-select flex-grow-0 w-auto"
              name="method"
              value={method}
              onChange={this.handlechange}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
            <input
              required
              className="form-control"
              id="url"
              name="url"
              value={url}
              onChange={this.handlechange}
              type="url"
              placeholder="http://localhost:2410/example"
            ></input>
            <button
              className="btn btn-primary"
              onClick={() => this.handlesendbtn()}
            >
              Send
            </button>
          </div>
          <div>
            <div className="bodydata">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="query-params-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#query-params"
                    type="button"
                    role="tab"
                    aria-controls="query-params"
                    aria-selected="true"
                  >
                    Query Params
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="request-headers-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#request-headers"
                    type="button"
                    role="tab"
                    aria-controls="request-headers"
                    aria-selected="false"
                  >
                    Headers
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="json-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#json"
                    type="button"
                    role="tab"
                    aria-controls="json"
                    aria-selected="false"
                  >
                    JSON
                  </button>
                </li>
              </ul>

              <div className="tab-content p-3 border-top-0 border">
                <div
                  className="tab-pane fade show active"
                  id="query-params"
                  role="tabpanel"
                  aria-labelledby="query-params-tab"
                >
                  <div className="querydiv">
                    <div className="queryScroller">
                      {allqueryparams.map((qu, index) => (
                        <div
                          className="input-group"
                          onFocus={() => this.setindex(index)}
                        >
                          <input
                            className="form-control"
                            type="text"
                            id="query"
                            name={`key`}
                            value={qu.key}
                            placeholder="Key"
                            onChange={this.handlechange}
                          ></input>
                          <input
                            className="form-control"
                            type="text"
                            id="query"
                            name={`value`}
                            value={qu.value}
                            placeholder="Value"
                            onChange={this.handlechange}
                          ></input>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => this.handleremovebtn(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        data-add-query-param-btn
                        className="mt-2 btn btn-outline-success"
                        type="button"
                        onClick={() => this.handleaddquery()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="request-headers"
                  role="tabpanel"
                  aria-labelledby="request-headers-tab"
                >
                  <div data-request-headers className="queryheaderdiv">
                    <div className="queryheaderscroller">
                      {allheaders.map((qu, index) => (
                        <div
                          className="input-group"
                          onFocus={() => this.setindex1(index)}
                        >
                          <input
                            className="form-control"
                            type="text"
                            id="header"
                            name={`key`}
                            value={qu.key}
                            placeholder="Key"
                            onChange={this.handlechange}
                          ></input>
                          <input
                            className="form-control"
                            type="text"
                            id="header"
                            name={`value`}
                            value={qu.value}
                            placeholder="Value"
                            onChange={this.handlechange}
                          ></input>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => this.handleremovebtn1(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        data-add-query-param-btn
                        className="mt-2 btn btn-outline-success"
                        type="button"
                        onClick={() => this.handleaddheader()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane "
                  id="json"
                  role="tabpanel"
                  aria-labelledby="json-tab"
                >
                  <div className="jsondiv">
                    <textarea
                      name="postjson"
                      value={postjson}
                      onChange={this.handlechange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="responsebody px-2">
              <div className="row">
                <div className="col-6">
                  <h3>Response</h3>
                </div>
                <div className="col-6" style={{ marginTop: 20 }}>
                  Status : {this.props.alldata ? status : ""}
                </div>
              </div>
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="body-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#body"
                    type="button"
                    role="tab"
                    aria-controls="body"
                    aria-selected="true"
                  >
                    Body
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="response-headers-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#response-headers"
                    type="button"
                    role="tab"
                    aria-controls="response-headers"
                    aria-selected="false"
                  >
                    Headers
                  </button>
                </li>
              </ul>
              <div className="tab-content p-3 border-top-0 border">
                <div
                  className="tab-pane fade show active"
                  id="body"
                  role="tabpanel"
                  aria-labelledby="body-tab"
                >
                  <div className="rightscrollerbody">
                    <div className="rightscroller">
                      <JSONPretty
                        data={alldata == "" ? alldata : this.props.alldata}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="response-headers"
                  role="tabpanel"
                  aria-labelledby="response-headers-tab"
                >
                  <div className="responsiveheaderdiv">
                    <div className="responsiveheaderscroller">
                      {this.props.headers && headers
                        ? headerKeys.map((head, index) => (
                            <div className="row ">
                              <div className=" p-2" style={{ width: "300px" }}>
                                {head}
                              </div>
                              <div className=" p-2" style={{ width: "700px" }}>
                                {headervalues[index]}
                              </div>
                            </div>
                          ))
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rightoptions">
          <div>{"</>"}</div>
          <div>
            {" "}
            <HiOutlineLightBulb className="lefticons" />
          </div>
        </div>
      </div>
    );
  }
}
export default Postmanright;
