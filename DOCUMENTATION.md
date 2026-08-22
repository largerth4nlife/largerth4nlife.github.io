# Payroll Checker — System Documentation

## 1. Purpose

Payroll Checker is a React + TypeScript + Vite web application for auditing employee attendance. The user provides an employee surname, date range, DTR workbook, and biometrics workbook. The application identifies the employee, retrieves the stored schedule, matches DTR and biometric attendance, detects discrepancies, and produces an Excel report.

Uploaded attendance files are processed in the browser. Do not commit real DTR or biometrics files to GitHub.

## 2. Workflow

```text
Surname → database check → date range → upload DTR + biometrics
→ employee/ID/role matching → schedule lookup → real weekday calculation
→ DTR/biometric matching → attendance validation
→ Issues / WFH / ABSENT → user verification → Excel export
```

Excel export is locked until all WFH and ABSENT entries requiring verification have been checked.

## 3. Employee Identification

The surname field checks the stored employee database and displays whether the surname was found.

The two Ramos records must remain distinguishable:

- `RAMOS, H`
- `RAMOS, J`

The admin surname list currently contains:

`MARTINEZ`, `ALPUTAN`, `DACASIN`, `DEJUAN`, `MAGA`, `PANINGBATAN`, `RAMOS, H`, `RAMOS, J`, `RIOS`, `SABOCO`, `BARBERAN`, `YAP`, `BASCO`.

Employee schedules and admin mappings are maintained in `src/lib/payroll/employeeSchedules.ts`.

## 4. Schedules

Regular employees use their stored weekday schedules. A `null` weekday means no scheduled work.

Example: MANABAT is scheduled Monday 7:00 AM–7:00 PM and Tuesday–Friday 7:00 AM–3:30 PM, with no Saturday/Sunday schedule.

Admin employees use the configured admin schedule.

## 5. Date Handling

The application supports any valid start/end date range. The actual calendar date determines the weekday; the weekday text written in the DTR is not trusted for schedule validation.

## 6. DTR and Biometrics

The DTR parser supports the project's actual workbook format, including date rows such as `JUNE 26`, `JULY 7`, `JULY 8`, and `JULY 10`.

Recognized DTR conditions include:

- `ABSENT`
- `WORK FROM HOME`
- `WORK FROM HOME DUE TO TYPHOON`
- `NO WORK`
- LATE remarks
- U.T. remarks

Biometric files can contain duplicate taps. The attendance engine consolidates punches so duplicate taps do not become separate attendance events.

## 7. Attendance Checks

The engine can detect:

- Missing C/In
- Missing C/Out
- Late arrival
- Undertime
- Incorrect LATE remarks
- Incorrect U.T. remarks
- DTR/biometric mismatches
- ABSENT with biometric attendance
- WFH with biometric attendance
- Other schedule/attendance discrepancies

## 8. WFH Rules

If the DTR says WFH and there are no biometrics:

1. Show WFH in the website's **Issues / Remarks** column.
2. Show a visible **Confirm WFH** checkbox.
3. Keep the entry unverified until the user checks it.
4. Do not treat the DTR remark alone as proof that work was completed.
5. Keep Excel export locked until the WFH entry is verified.

Example:

```text
WORK FROM HOME — WORK FROM HOME DUE TO TYPHOON
☐ Confirm WFH
```

After checking:

```text
WORK FROM HOME — WORK FROM HOME DUE TO TYPHOON
☑ WFH confirmed
```

If WFH has biometric attendance, the conflict can be flagged as an issue.

## 9. ABSENT Rules

If the DTR says ABSENT and there are no biometrics:

1. Show ABSENT in **Issues / Remarks**.
2. Show a visible **Confirm absence** checkbox.
3. Keep the entry unverified until the user checks it.
4. Do not treat the DTR remark alone as proof that required documentation was submitted.
5. Keep Excel export locked until the absence is verified.

If ABSENT has biometric attendance, flag it as an issue.

## 10. Results and Filters

The website provides:

- **ALL** — all analyzed dates.
- **ISSUE** — attendance discrepancies.
- **WFH** — WFH dates.
- **ABSENT** — absence dates.
- **VERIFIED** — normal verified rows plus manually verified WFH/ABSENT rows.
- **UNVERIFIED** — WFH/ABSENT rows still awaiting user confirmation.

The Issues / Remarks column must explicitly show WFH or ABSENT when the DTR contains those conditions.

## 11. Excel Export

The Export Excel button is located below the results/issues list.

Export is disabled while any WFH or ABSENT entry is unverified. After all required checkboxes are checked, export becomes available.

The output can contain employee information, date/day, status, attendance issues/remarks, and conditional WFH/ABSENT verification columns. WFH/ABSENT records are only included in the final output after the user's verification.

## 12. User Interface

Current interface features include:

- Monochrome black/white/gray design
- Responsive layout
- Surname database-found/not-found indicator
- DTR and biometrics upload controls
- Processing/loading screen
- Employee/ID/role/date summary
- Status indicators
- Issues/WFH/ABSENT/Verified/Unverified filters
- Visible WFH and ABSENT verification checkboxes
- Locked/unlocked Excel export

## 13. Project Structure

```text
src/
├── PayrollCheckerPage.tsx
├── main.tsx
└── lib/
    └── payroll/
        ├── engine.ts
        ├── employeeSchedules.ts
        └── workbook.ts
```

### Main files

**`PayrollCheckerPage.tsx`** — main interface, uploads, date inputs, filters, verification, loading state, and export control.

**`engine.ts`** — employee matching, DTR/biometrics parsing, schedule validation, and issue detection.

**`employeeSchedules.ts`** — employee schedules, admin mappings, and name normalization.

**`workbook.ts`** — spreadsheet reading and Excel report generation.

## 14. Run Locally

Requirements: Node.js 18+ (Node 20+ recommended) and npm.

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

A change should not be considered finished until `npm run build` succeeds.

## 15. Beginner Git Guide

### Get the newest code

```bash
git pull origin main
```

### See changes

```bash
git status
```

### Add changes

```bash
git add .
```

Or add one file:

```bash
git add src/PayrollCheckerPage.tsx
```

### Commit

```bash
git commit -m "Describe the change"
```

A commit is a saved checkpoint.

### Push to GitHub

```bash
git push origin main
```

### Recommended routine

```bash
git pull origin main
# make your edits
npm run build
git status
git add .
git commit -m "Describe the change"
git push origin main
```

## 16. Troubleshooting

### Old website version

Hard refresh with `Ctrl + F5`. GitHub Pages may also need time to deploy a successful build.

### Build error

Run `npm run build` and fix the first TypeScript/Vite error reported.

### Surname not found

Check spelling and the records in `src/lib/payroll/employeeSchedules.ts`. For Ramos, use `RAMOS, H` or `RAMOS, J`.

### WFH/ABSENT not shown

Confirm the DTR row contains a recognizable date and a remark containing `ABSENT` or `WORK FROM HOME`.

### Export disabled

This is intentional. Verify every WFH/ABSENT entry first.

## 17. Sample Acceptance Test

For the sample MANABAT files, the website is expected to show:

| Date | Expected result |
|---|---|
| July 7, 2026 | ABSENT + visible unchecked absence verification |
| July 8, 2026 | WFH + visible unchecked WFH verification |
| July 10, 2026 | WFH + visible unchecked WFH verification |

The user must verify these entries before Excel export is enabled.

## 18. Future Improvements

- Dedicated employee master database with employee ID, full name, role, and schedule.
- More robust name matching across files.
- Automated regression tests using sample DTR/biometrics files.
- Better DTR coverage validation.
- More detailed Excel formatting.
- Additional official HR attendance rules.
