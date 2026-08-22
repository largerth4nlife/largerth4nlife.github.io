import * as React from "react";

type Ctx = { value?: string; onValueChange?: (v:string)=>void; disabled?:boolean };
const SelectContext = React.createContext<Ctx>({});

export function Select({value,onValueChange,disabled,children}:{value?:string;onValueChange?:(v:string)=>void;disabled?:boolean;children:React.ReactNode}) {
  return <SelectContext.Provider value={{value,onValueChange,disabled}}><div>{children}</div></SelectContext.Provider>;
}
export function SelectTrigger({className="",children}:{className?:string;children:React.ReactNode}) {
  const c=React.useContext(SelectContext);
  return <select className={`input ${className}`} disabled={c.disabled} value={c.value} onChange={e=>c.onValueChange?.(e.target.value)}>{children}</select>;
}
export function SelectValue(){return null}
export function SelectContent({children}:{children:React.ReactNode}){return <>{children}</>}
export function SelectItem({value,children}:{value:string;children:React.ReactNode}){return <option value={value}>{children}</option>}