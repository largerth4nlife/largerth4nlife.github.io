import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom/client";
import { PayrollCheckerPage } from "./PayrollCheckerPage";
import { FeedbackPage } from "./InquiryPage";
import { DocumentationPage } from "./DocumentationPage";
import "./styles.css";
function App(){const initial=window.location.hash==="#checker"?"checker":window.location.hash==="#feedback"?"feedback":"docs";const[page,setPage]=useState(initial);useEffect(()=>{const onHash=()=>setPage(window.location.hash==="#checker"?"checker":window.location.hash==="#feedback"?"feedback":"docs");window.addEventListener("hashchange",onHash);return()=>window.removeEventListener("hashchange",onHash)},[]);const go=(next:string)=>{window.location.hash=next==="checker"?"checker":next==="feedback"?"feedback":"docs";setPage(next)};return <><nav className="top-nav"><div className="nav-inner"><button className="brand" onClick={()=>go("docs")}>Payroll Checker</button><div className="nav-tabs"><button className={page==="docs"?"nav-tab active":"nav-tab"} onClick={()=>go("docs")}>Docs</button><button className={page==="checker"?"nav-tab active":"nav-tab"} onClick={()=>go("checker")}>Checker</button><button className={page==="feedback"?"nav-tab active":"nav-tab"} onClick={()=>go("feedback")}>Feedback</button></div></div></nav>{page==="docs"?<DocumentationPage/>:page==="feedback"?<FeedbackPage/>:<PayrollCheckerPage/>}</>}
ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);
