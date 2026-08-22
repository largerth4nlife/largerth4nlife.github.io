export const WEEKDAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"] as const;
export type Weekday = typeof WEEKDAYS[number];
export type ScheduleType = "FULL DAY"|"MORNING"|"AFTERNOON";
export type DailySchedule = {start:number;end:number;type:ScheduleType};
export type Schedule = Record<Weekday,DailySchedule|null>;
export type Grid = unknown[][];
export type CheckRow = {dateLabel:string;actualWeekday:string;remarks:string;hasIssue:boolean};
export type RunResult = {rows:CheckRow[];totalDays:number;issueCount:number;employeeId?:string|number;remarksColumnFound:boolean};

export const DEFAULT_ADMIN_SCHEDULE:Schedule = {
  monday:{start:480,end:1020,type:"FULL DAY"},tuesday:{start:480,end:1020,type:"FULL DAY"},
  wednesday:{start:480,end:1020,type:"FULL DAY"},thursday:{start:480,end:1020,type:"FULL DAY"},
  friday:{start:480,end:1020,type:"FULL DAY"},saturday:null,sunday:null
};

function asDate(v:unknown):Date|null {
  if(v instanceof Date&&!Number.isNaN(v.getTime())) return v;
  if(typeof v==="number"){const d=new Date(Math.round((v-25569)*86400*1000));return Number.isNaN(d.getTime())?null:d;}
  if(typeof v==="string"){const d=new Date(v);return Number.isNaN(d.getTime())?null:d;}
  return null;
}
function key(v:unknown){const d=asDate(v);if(!d)return null;return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function weekday(d:Date):Weekday{return WEEKDAYS[(d.getDay()+6)%7];}
function header(grid:Grid,names:string[]){const wanted=names.map(x=>x.toLowerCase());for(const row of grid.slice(0,15)){const i=row.findIndex(x=>wanted.includes(String(x??"").trim().toLowerCase()));if(i>=0)return i;}return -1;}
function headerRow(grid:Grid){for(let i=0;i<Math.min(15,grid.length);i++){const s=grid[i].map(x=>String(x??"").toLowerCase()).join(" ");if(/date|employee|timestamp|time|remarks|remark/.test(s))return i;}return 0;}
function timeFromDate(v:unknown){const d=asDate(v);return d?d.getHours()*60+d.getMinutes():null;}

export function runCheck({dtrGrid,bioGrid,schedule,startDate,endDate}:{dtrGrid:Grid;bioGrid:Grid;schedule:Schedule;startDate:Date;endDate:Date}):RunResult {
  const dr=headerRow(dtrGrid), br=headerRow(bioGrid);
  const dDate=header(dtrGrid,["date","dtr date","day"]), remarks=header(dtrGrid,["remarks","remark","remarks / status","status"]);
  const bTime=header(bioGrid,["timestamp","datetime","date/time","time"]), bType=header(bioGrid,["c/in or c/out","c/in","c/out","type"]), bEmp=header(bioGrid,["employee no.","employee no","employee number","emp no"]);
  const bio=new Map<string,{cin:number|null;cout:number|null;employee?:string}>();
  for(const row of bioGrid.slice(br+1)){const d=asDate(bTime>=0?row[bTime]:row[0]);if(!d)continue;const k=key(d)!;const cur=bio.get(k)??{cin:null,cout:null};const t=String(bType>=0?row[bType]??"":"").toLowerCase();const m=timeFromDate(d)!;if(t.includes("out"))cur.cout=cur.cout===null?m:Math.max(cur.cout,m);else cur.cin=cur.cin===null?m:Math.min(cur.cin,m);if(bEmp>=0&&row[bEmp]!=null)cur.employee=String(row[bEmp]);bio.set(k,cur);}
  const rows:CheckRow[]=[];const cursor=new Date(startDate);let totalDays=0;
  while(cursor<=endDate){const k=key(cursor)!;totalDays++;const day=weekday(cursor),plan=schedule[day];const dtr=dtrGrid.slice(dr+1).find(r=>key(dDate>=0?r[dDate]:r[0])===k);const original=remarks>=0&&dtr?String(dtr[remarks]??"").trim():"";const b=bio.get(k);const issues:string[]=[];
    if(plan){if(!b?.cin)issues.push("Missing C/In");if(!b?.cout)issues.push("Missing C/Out");if(b?.cin!=null&&b.cin>plan.start)issues.push("LATE");if(b?.cout!=null&&b.cout<plan.end)issues.push("U.T.");if(original.toUpperCase().includes("ABSENT"))issues.push("ABSENT");}
    else if(b)issues.push("Attendance on NO WORK day");
    rows.push({dateLabel:k,actualWeekday:day,remarks:issues.length?issues.join(" • "):original||"OK",hasIssue:issues.length>0});cursor.setDate(cursor.getDate()+1);}
  return {rows,totalDays,issueCount:rows.filter(r=>r.hasIssue).length,employeeId:Array.from(bio.values()).find(v=>v.employee)?.employee,remarksColumnFound:remarks>=0};
}