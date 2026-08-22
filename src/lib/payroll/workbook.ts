import * as XLSX from "xlsx";
import type { CheckRow, Grid } from "./engine";

export async function readWorkbookGrid(file: File): Promise<Grid> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) throw new Error("The workbook has no worksheets.");
  return XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, defval: "" }) as Grid;
}

export function downloadIssuesReport(rows: CheckRow[], filename: string) {
  const data = rows.filter(r=>r.hasIssue).map(r=>({
    Date:r.dateLabel, Day:r.actualWeekday, "Issues / Remarks":r.remarks
  }));
  const ws=XLSX.utils.json_to_sheet(data);
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,"Issues");
  XLSX.writeFile(wb,filename);
}