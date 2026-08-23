import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom/client";
import { PayrollCheckerPage } from "./PayrollCheckerPage";
import { InquiryPage } from "./InquiryPage";
import "./styles.css";
function App(){const[page,setPage]=useState(window.location.hash==="#inquiries"?"inquiries":"checker");useEffect(()=>{const onHash=()=>setPage(window.location.hash==="#inquiries"?"inquiries":"checker");window.addEventListener("hashchange",onHash);return()=>window.removeEventListener("hashchange",onHash)},[]);const go=(next:string)=>{window.location.hash=next==="inquiries"?"inquiries":"";setPage(next)};return <><nav className="top-nav"><div className="nav-inner"><button className="brand" onClick={()=>go("checker")}>Payroll Checker</button><div className="nav-tabs"><button className={page==="checker"?"nav-tab active":"nav-tab"} onClick={()=>go("checker")}>Checker</button><button className={page==="inquiries"?"nav-tab active":"nav-tab"} onClick={()=>go("inquiries")}>Inquiries & Support</button></div></div></nav>{page==="inquiries"?<InquiryPage/>:<PayrollCheckerPage/>}</>}
ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);
