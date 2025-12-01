# WorkflowDesk

**A ticket-based workflow management system for recurring business processes.**

WorkflowDesk is a business application designed to structure, monitor, and document recurring workflows in a transparent and auditable way.  
It standardizes repeatable processes (e.g., employee onboarding, approvals, project handovers) while providing progress tracking, quality control, and accountability.

---

## Features (MVP)

### 1. Dashboard

- Overview of all open workflow tickets
- Color-coded status indicators (Open, In Progress, Pending Review, Completed)
- Overdue tickets are highlighted in red
- Future ideas: filters, list/tile view toggle

### 2. Workflow Templates

- Create reusable templates with any number of phases (milestones)
- Each phase contains tasks (checklist items)
- Define completion rules per phase:
  - All tasks checked off
  - Requires supervisor approval
  - Requires evidence (e.g., screenshot or file upload)
- Templates include an optional start form (text, file, or link fields)

### 3. Start a Workflow

- Workflows are always started from templates
- Required input is collected through a start form
- A responsible person is assigned upon creation
- New workflows automatically start with status Open

### 4. Ticket & Phase Handling

- Only the active phase is editable; others are greyed out
- Tasks can be checked off or completed with file uploads
- Phase status progression: Open → In Progress → Pending Review → Approved → Completed
- Once a phase is approved, the next one becomes active

### 5. Approvals

- Only authorized roles (e.g., supervisors) can approve phases or entire workflows
- Rejection requires a mandatory comment with the reason
- Approved items are marked in green and locked (read-only)
- After approval, edits are no longer possible

### 6. File Uploads

- Upload files per phase or ticket (e.g., screenshots, PDFs)
- Files can be deleted until the phase/ticket is approved
- Once approved, uploads become read-only
- All users can view uploaded files at any time

### 7. History (Audit Log)

- Automatic log entries for every key event:
  - Workflow created
  - Phase submitted, approved, or rejected
  - Workflow submitted, approved, or rejected
- Each log entry includes timestamp, username, and action type
- Log entries are read-only and shown chronologically (newest on top)

### 8. Archive

- Completed workflows are automatically moved to the archive (read-only)
- Toggle between active and archived workflows
- Filters are planned for later releases

---

## Roles & Permissions

| Role             | Description                                           |
| ---------------- | ----------------------------------------------------- |
| **Creator**      | Creates and manages workflow templates                |
| **Owner**        | Starts workflows, reviews and approves phases/tickets |
| **Collaborator** | Completes assigned tasks and uploads evidence         |

---

## Tech Stack (planned)

- **Frontend:** React + TypeScript + Vite
- **UI / Styling:** Tailwind CSS
- **Backend / Database:** Supabase (Postgres + Auth + Storage)

---

## Architecture Overview

- Every workflow is based on a template
- Templates contain ordered phases, and each phase contains tasks
- History and uploads are linked to specific workflows or phases

---

## 👤 Author

**Stephan Haak**  
📧 [info@stephan-haak.com](mailto:info@stephan-haak.com)  
🌐 [www.stephan-haak.com](https://www.stephan-haak.com)

---

## 📝 License

This project is part of a learning and demonstration environment.  
© Stephan Haak — for non-commercial educational use only.

---
