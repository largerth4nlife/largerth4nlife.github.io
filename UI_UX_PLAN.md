# Payroll Checker UI/UX Upgrade Plan

## Goals
1. Drag-and-drop file upload
2. Workflow indicator: Employee → Date Range → Upload → Results
3. Employee autocomplete with alphabetical, case-insensitive matching from the employee data source
4. Improved results page with summary cards and readable attendance details
5. Visually emphasize unusual days (Absent, WFH, Leave, Late, Undertime, missing/invalid records)
6. Better result filters with status chips and clear/reset behavior
7. Problems Found section summarizing actionable anomalies
8. Clear processing feedback with stage-by-stage progress
9. Friendly, specific error messages with recovery guidance

## Implementation notes
- Preserve the existing parsing/business logic unless a UI change requires a small adapter.
- Employee autocomplete must filter as the user types and sort matches alphabetically.
- File upload should accept the existing supported formats and show selected files, size, validation state, and remove controls.
- Drag-and-drop must also retain a normal Browse Files fallback and keyboard accessibility.
- Results should remain usable on smaller screens.
- Processing errors should identify the affected file/step when possible and tell the user what to do next.
- Avoid exposing raw stack traces or implementation errors to end users.
