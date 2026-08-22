export type ScheduleEntry={start:number;end:number};
export type EmployeeSchedule=Record<string,ScheduleEntry|null>;
const t=(h:number,m:number)=>h*60+m;
const full=(s:number,e:number)=>({start:s,end:e});
export const ADMIN_SURNAME_ROLES:Record<string,string>={MARTINEZ:"ADMIN",ALPUTAN:"ADMIN",DACASIN:"ADMIN",DEJUAN:"ADMIN",MAGA:"ADMIN",PANINGBATAN:"ADMIN","RAMOS, H":"ADMIN","RAMOS, J":"ADMIN",RIOS:"ADMIN",SABOCO:"ADMIN",BARBERAN:"ADMIN",YAP:"ADMIN",BASCO:"ADMIN"};
export const EMPLOYEE_SCHEDULES:Record<string,EmployeeSchedule>={
 BAUTISTA:{monday:full(t(7,0),t(17,30)),tuesday:full(t(7,0),t(15,30)),wednesday:full(t(7,0),t(15,30)),thursday:full(t(7,0),t(15,30)),friday:full(t(13,0),t(17,30)),saturday:null,sunday:null},
 CAYABYAB:{monday:full(t(7,0),t(17,30)),tuesday:full(t(7,0),t(15,30)),wednesday:full(t(7,0),t(15,30)),thursday:full(t(7,0),t(15,30)),friday:full(t(7,0),t(15,30)),saturday:null,sunday:null},
 MANABAT:{monday:full(t(7,0),t(19,0)),tuesday:full(t(7,0),t(15,30)),wednesday:full(t(7,0),t(15,30)),thursday:full(t(7,0),t(15,30)),friday:full(t(7,0),t(15,30)),saturday:null,sunday:null},
 CORDOVA:{monday:full(t(7,0),t(19,0)),tuesday:full(t(10,0),t(18,0)),wednesday:full(t(7,0),t(15,30)),thursday:full(t(7,0),t(15,30)),friday:full(t(10,0),t(18,0)),saturday:null,sunday:null},
 BALTAZAR:{monday:full(t(8,30),t(17,30)),tuesday:full(t(7,0),t(15,30)),wednesday:full(t(7,0),t(15,30)),thursday:full(t(7,0),t(15,30)),friday:full(t(7,0),t(15,30)),saturday:null,sunday:null},
 JUAT:{monday:full(t(7,0),t(16,0)),tuesday:full(t(10,0),t(15,30)),wednesday:full(t(10,0),t(15,30)),thursday:full(t(10,0),t(15,30)),friday:full(t(10,0),t(15,30)),saturday:null,sunday:null},
 BACHAO:{monday:full(t(7,0),t(19,0)),tuesday:full(t(10,0),t(18,0)),wednesday:full(t(10,0),t(18,0)),thursday:full(t(10,0),t(18,0)),friday:full(t(10,0),t(18,0)),saturday:null,sunday:null},
 QUERIDO:{monday:full(t(7,0),t(17,30)),tuesday:full(t(9,0),t(18,0)),wednesday:full(t(9,0),t(18,0)),thursday:full(t(9,0),t(18,0)),friday:full(t(9,0),t(18,0)),saturday:null,sunday:null},
 RONO:{monday:full(t(7,0),t(17,30)),tuesday:full(t(7,0),t(15,0)),wednesday:full(t(7,0),t(15,0)),thursday:full(t(7,0),t(15,0)),friday:full(t(7,0),t(18,0)),saturday:null,sunday:null},
 CUMALDE:{monday:full(t(7,0),t(19,0)),tuesday:full(t(10,0),t(18,0)),wednesday:full(t(10,0),t(18,0)),thursday:full(t(10,0),t(18,0)),friday:full(t(10,0),t(18,0)),saturday:null,sunday:null},
 AGUILAR:{monday:full(t(7,0),t(19,0)),tuesday:full(t(10,0),t(18,0)),wednesday:full(t(10,0),t(18,0)),thursday:full(t(10,0),t(18,0)),friday:full(t(10,0),t(18,0)),saturday:null,sunday:null},
 BARELA:{monday:full(t(7,0),t(19,0)),tuesday:full(t(7,0),t(15,0)),wednesday:full(t(7,0),t(15,0)),thursday:full(t(10,0),t(18,0)),friday:full(t(10,0),t(18,0)),saturday:null,sunday:null},
 VILLANUEVA:{monday:full(t(7,0),t(19,0)),tuesday:full(t(7,0),t(15,0)),wednesday:full(t(10,0),t(18,0)),thursday:full(t(10,0),t(15,30)),friday:full(t(10,0),t(15,30)),saturday:null,sunday:null},
 BANGAYAN:{monday:full(t(16,0),t(19,0)),tuesday:full(t(15,30),t(18,0)),wednesday:full(t(15,30),t(18,0)),thursday:null,friday:null,saturday:null,sunday:null},
 BALANA:{monday:full(t(14,30),t(17,30)),tuesday:full(t(15,30),t(18,0)),wednesday:null,thursday:null,friday:full(t(15,30),t(18,0)),saturday:null,sunday:null}
};
export function normalizeName(v:string){return v.trim().toUpperCase().replace(/\s+/g," ");}
export function scheduleFor(name:string):EmployeeSchedule|null{return EMPLOYEE_SCHEDULES[normalizeName(name)]??null;}
