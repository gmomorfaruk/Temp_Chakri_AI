# AI-Powered Personal & Career Management Web App

## 1. Product Summary
This platform helps students and job seekers manage career growth in one place:
- Career profile and secure document vault
- AI Career Coach for interview/viva prep and study support
- CV generator (ATS-friendly and formatted versions)
- Job matching and recommendations
- Automated PPTX generation from topic, notes, or uploaded files

Primary users:
- University students
- Fresh graduates
- Early-career professionals

## 2. MVP Scope (First Working Release)
Focus on features that prove product value quickly.

In scope:
- Authentication (email/password + JWT/session)
- User profile and portfolio basics (education, skills, achievements)
- Secure file upload and retrieval (certificates/CV/presentations)
- AI Career Coach chat (text-first)
- CV generator from stored profile data
- PPTX generator from topic + optional reference text

Out of scope for MVP:
- Full job board aggregation
- Government integrations
- Real-time voice interview simulation
- Complex recruiter-facing dashboards

## 3. Recommended Architecture
- Frontend: React + Tailwind (Vite or Next.js)
- Backend API: FastAPI (or Django REST if team is stronger in Django)
- Database: PostgreSQL
- Async jobs: Celery + Redis (or RQ) for CV/PPT generation jobs
- Object storage: AWS S3
- AI provider layer: abstraction supporting OpenAI + Hugging Face

High-level flow:
1. User submits request (e.g., generate CV/PPT or ask coach)
2. Backend validates request and stores metadata in PostgreSQL
3. Long-running task is queued
4. Worker calls AI model + post-processing
5. Output is saved to S3
6. Frontend polls/subscribes for status and downloads result

## 4. Suggested Monorepo Structure
```text
chakriAI/
  frontend/
    src/
    public/
  backend/
    app/
      api/
      models/
      schemas/
      services/
      workers/
      core/
    migrations/
    tests/
  infra/
    docker/
    terraform/ (optional later)
  docs/
    api/
    architecture/
  PROJECT_BLUEPRINT.md
```

## 5. Core Domain Model (Initial)
Key entities:
- User
- Profile
- Education
- Experience
- Skill
- Achievement
- Certificate
- UploadedFile
- GeneratedDocument (CV/PPT/cover letter)
- CoachingSession
- CoachingMessage
- JobPreference
- JobMatch

Minimum schema notes:
- Keep generated assets versioned (`version`, `source_snapshot`, `created_at`)
- Track job status (`queued`, `processing`, `completed`, `failed`)
- Store file metadata (mime type, size, sha256, s3 key)

## 6. API Design (MVP Endpoints)
Auth/Profile:
- `POST /auth/register`
- `POST /auth/login`
- `GET /me`
- `PATCH /me/profile`

Files:
- `POST /files/presign-upload`
- `POST /files/confirm-upload`
- `GET /files`
- `GET /files/{id}/download`

AI Coach:
- `POST /coach/sessions`
- `POST /coach/sessions/{id}/messages`
- `GET /coach/sessions/{id}`

CV Generator:
- `POST /cv/generate`
- `GET /cv/jobs/{job_id}`
- `GET /cv/documents/{id}`

PPTX Generator:
- `POST /pptx/generate`
- `GET /pptx/jobs/{job_id}`
- `GET /pptx/documents/{id}`

Job Matching (MVP-lite):
- `POST /jobs/preferences`
- `GET /jobs/matches`

## 7. AI Service Layer Design
Create one provider-agnostic interface:
- `generate_chat_response(context, user_input, mode)`
- `generate_cv(profile_data, target_role, style)`
- `generate_ppt_outline(topic, audience, duration, tone)`
- `generate_slide_content(outline, references)`

Safety and quality:
- Prompt templates versioned in code
- PII-safe logging (no raw sensitive text in logs)
- Output validators (length, format, banned content checks)
- Human-editable final outputs before download

## 8. PPTX Generation Pipeline
1. Input normalization (topic + optional reference text/files)
2. AI creates structured outline (title + sections + slide goals)
3. AI generates slide-by-slide content
4. `python-pptx` renders deck using style template
5. Export to `.pptx`, upload to S3
6. Return status + download URL

Template strategy:
- Start with 2-3 reusable professional themes
- Enforce max bullets per slide and speaker-note support

## 9. CV Generation Pipeline
1. Pull normalized profile snapshot
2. Build role-targeted summary and experience bullets
3. Generate ATS-safe plain template + styled template
4. Render PDF/DOCX outputs
5. Save versioned documents to S3

Quality checks:
- Missing sections warning (skills/experience/education)
- Grammar and consistency pass
- Optional keyword matching vs job description

## 10. Security & Compliance Basics
- JWT/session hardening, refresh token rotation
- S3 private buckets + short-lived signed URLs
- Server-side file type validation + malware scanning hook
- Rate limiting on AI endpoints
- Audit trail for generated content and file access
- Encrypt secrets with environment manager (not in repo)

## 11. Execution Roadmap (Engineering)
Phase 1 (Weeks 1-3):
- Repo setup, auth, profile, file upload, base UI shell

Phase 2 (Weeks 4-6):
- AI Coach MVP (chat + session history)

Phase 3 (Weeks 7-10):
- CV generation + PPTX generation + async jobs + status UI

Phase 4 (Weeks 11-13):
- Job matching MVP + recommendation scoring

Phase 5 (Weeks 14-16):
- Portfolio polishing, analytics, performance + reliability

## 12. KPIs to Track
- CV generation completion rate
- PPTX generation success rate
- Average time to first usable output
- Weekly active users
- Interview/viva practice sessions per user
- Conversion from free to paid (if monetized)

## 13. Risks & Mitigations
- Hallucinated/low-quality AI output:
  - Mitigation: strict templates, validation, easy manual editing
- High AI cost:
  - Mitigation: caching, prompt optimization, model routing
- Slow generation jobs:
  - Mitigation: async workers + progress updates
- Data privacy concerns:
  - Mitigation: secure storage defaults, clear consent and retention policy

## 14. Immediate Next Build Tasks
1. Initialize monorepo (`frontend`, `backend`, `docs`, `infra`)
2. Implement auth + profile CRUD
3. Add S3 upload flow with signed URLs
4. Add async job system skeleton (queue + worker + status table)
5. Implement first end-to-end feature: `POST /pptx/generate` to downloadable file
