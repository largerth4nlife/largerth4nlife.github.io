import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom/client";
import { PayrollCheckerPage } from "./PayrollCheckerPage";
import { FeedbackPage } from "./InquiryPage";
import "./styles.css";
function App(){const[page,setPage]=useState(window.location.hash==="#feedback"?"feedback":"checker");useEffect(()=>{const onHash=()=>setPage(window.location.hash==="#feedback"?"feedback":"checker");window.addEventListener("hashchange",onHash);return()=>window.removeEventListener("hashchange",onHash)},[]);const go=(next:string)=>{window.location.hash=next==="feedback"?"feedback":"";setPage(next)};return <><nav className="top-nav"><div className="nav-inner"><button className="brand" onClick={()=>go("checker")}>Payroll Checker</button><div className="nav-tabs"><button className={page==="checker"?"nav-tab active":"nav-tab"} onClick={()=>go("checker")}>Checker</button><button className={page==="feedback"?"nav-tab active":"nav-tab"} onClick={()=>go("feedback")}>Feedback</button></div></div></nav>{page==="feedback"?<FeedbackPage/>:<PayrollCheckerPage/>}</>}
ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);
