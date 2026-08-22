# Payroll Checker — System Documentation

## 1. Purpose

Payroll Checker is a React + TypeScript + Vite web application for auditing employee attendance. The user provides an employee surname, date range, DTR workbook, and biometrics workbook. The application identifies the employee, retrieves the stored schedule, matches DTR and biometric attendance, detects discrepancies, and produces an Excel report.

**Current scope:** This website is currently personalized for a specific company. Employee schedules, admin records, attendance rules, and related data are configured for that company's current workflow. A separate, more general-purpose version of the Payroll Checker is planned for future development so it can be adapted for use by other companies and organizations.

Uploaded attendance files are processed in the browser. Do not commit real DTR or biometrics files to GitHub.

## 2. Schedules

Regular employees use their stored weekday schedules. A `null` weekday means no scheduled work.

Example: MANABAT is scheduled Monday 7:00 AM–7:00 PM and Tuesday–Friday 7:00 AM–3:30 PM, with no Saturday/Sunday schedule.

Admin employees use the configured admin schedule.

## 3. Date Handling

The application supports any valid start/end date range. The actual calendar date determines the weekday; the weekday text written in the DTR is not trusted for schedule validation.

## 4. DTR and Biometrics

The DTR parser supports the project's actual workbook format, including date rows such as `JUNE 26`, `JULY 7`, `JULY 8`, and `JULY 10`.

Recognized DTR conditions include:

- `ABSENT`
- `WORK FROM HOME`
- `WORK FROM HOME DUE TO TYPHOON`
- `NO WORK`
- LATE remarks
- U.T. remarks

Biometric files can contain duplicate taps. The attendance engine consolidates punches so duplicate taps do not become separate attendance events.

## 5. Attendance Checks

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

## 6. Results and Filters

The website provides:

- **ALL** — all analyzed dates.
- **ISSUE** — attendance discrepancies.
- **WFH** — WFH dates.
- **ABSENT** — absence dates.
- **VERIFIED** — normal verified rows plus manually verified WFH/ABSENT rows.
- **UNVERIFIED** — WFH/ABSENT rows still awaiting user confirmation.

The Issues / Remarks column must explicitly show WFH or ABSENT when the DTR contains those conditions.

## 7. Excel Export

The Export Excel button is located below the results/issues list.

Export is disabled while any WFH or ABSENT entry is unverified. After all required checkboxes are checked, export becomes available.

The output can contain employee information, date/day, status, attendance issues/remarks, and conditional WFH/ABSENT verification columns. WFH/ABSENT records are only included in the final output after the user's verification.

## 8. User Interface

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

## 9. Project Structure

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

## 10. Run Locally

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

## 11. Troubleshooting

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

## 12. Future Improvements

- Dedicated employee master database with employee ID, full name, role, and schedule.
- More robust name matching across files.
- Automated regression tests using sample DTR/biometrics files.
- Better DTR coverage validation.
- More detailed Excel formatting.
- Additional official HR attendance rules.
- Separate general-purpose version that is not tied to a specific company's employees, schedules, admin list, or attendance configuration.
