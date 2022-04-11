import React, {Component} from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class Newpostman extends Component{
    render(){
        return(
            <div className="p-4">
                <form>
                    

                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="query-params-tab"
                                data-bs-toggle="tab" data-bs-target="#query-params" type="button"
                                role="tab" aria-controls="query-params" aria-selected="true">Query Params</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="request-headers-tab"
                                data-bs-toggle="tab" data-bs-target="#request-headers" type="button"
                                role="tab" aria-controls="request-headers" aria-selected="false">Headers</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="json-tab"
                                data-bs-toggle="tab" data-bs-target="#json" type="button"
                                role="tab" aria-controls="json" aria-selected="false">JSON</button>
                        </li>
                    </ul>

                    <div className="tab-content p-3 border-top-0 border">
                        <div className="tab-pane fade show active" id="query-params"
                            role="tabpanel" aria-labelledby="query-params-tab">
                                <div data-query-params></div>
                                <button data-add-query-param-btn className="mt-2 btn btn-outline-success"
                                    type="button">Add</button>
                        </div>
                        <div className="tab-pane fade " id="request-headers"
                            role="tabpanel" aria-labelledby="request-headers-tab">
                                <div data-request-headers></div>
                                <button data-add-request-headers-btn className="mt-2 btn btn-outline-success"
                                    type="button">Add2</button>
                        </div>
                        <div className="tab-pane fade " id="json"
                            role="tabpanel" aria-labelledby="json-tab">
                                <div data-json-request-body className="overflow-auto"
                                style={{maxheight:200}}></div>
                        </div>
                    </div>
                </form>

                <div className="mt-5" data-response-section>
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="body-tab"
                                data-bs-toggle="tab" data-bs-target="#body" type="button"
                                role="tab" aria-controls="body" aria-selected="true">Body</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="response-headers-tab"
                                data-bs-toggle="tab" data-bs-target="#response-headers" type="button"
                                role="tab" aria-controls="response-headers" aria-selected="false">Headers</button>
                        </li>
                    </ul>

                    <div className="tab-content p-3 border-top-0 border">
                        <div className="tab-pane fade show active" id="body"
                            role="tabpanel" aria-labelledby="body-tab">
                                
                        </div>
                        <div className="tab-pane fade " id="response-headers"
                            role="tabpanel" aria-labelledby="response-headers-tab">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Newpostman;