# FitForge Technical Manifest

## Core Infrastructure
- **Runtime:** Node.js (v20+ recommended)
- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth

## Database Schema Mapping
| Table | Primary Key | Foreign Keys | Description |
| :--- | :--- | :--- | :--- |
| `members` | `id` (UUID) | `user_id` $\rightarrow$ `auth.users` | User profiles, fitness goals, admin flags. |
| `trackers` | `id` (UUID) | `member_id` $\rightarrow$ `members`, `user_id` $\rightarrow$ `auth.users` | Weekly weight logs for progress tracking. |

## Security Model
- **RLS (Row Level Security):** Enabled on `members` and `trackers`. Users can only `SELECT`, `INSERT`, or `UPDATE` rows where `user_id == auth.uid()`.
- **Admin Override:** The email `rai.rahul.kumar509@gmail.com` is hardcoded as the primary admin for bypass and management.
- **API Layer:** `/api/signup` uses the `service_role` key (if configured) to create users and profiles atomically.

## Development Bottlenecks
- **Connectivity:** The project has a history of DNS resolution errors with the Supabase URL. Always verify `.env.local` before testing DB features.
- **Hardcoded Admin:** The admin check is fragile. Moving this to a dedicated `roles` table is a recommended mid-term improvement.
