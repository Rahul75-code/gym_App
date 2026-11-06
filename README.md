# FitForge Gym App

FitForge is a comprehensive fitness management platform built with Next.js and Supabase. It provides users with tools to track their fitness journey, manage profiles, and monitor progress through a secure, authenticated system.

**Last updated: 2026-11-07**

## 🚀 Key Features

### User System
- **Secure Authentication:** Full Sign-up and Login flow powered by Supabase Auth.
- **Member Profiles:** Automatic profile creation upon signup with customizable fitness goals (Bulking, Cutting, and Maintenance, etc.).
- **Role-Based Access:** Specialized routing that directs regular users to their trackers and administrators to the management console.

### Fitness Tools
- **Progress Tracker:** A weekly weight logging system linked to individual member profiles.
- **BMI Calculator:** Tool to calculate Body Mass Index.
- **Exercise Library:** Organized guides for exercises grouped by muscle group.
- **Nutrition Corner:** Tips and healthy recipe ideas for optimized performance.
- **Fitness Blog:** Content focused on motivation, recovery, and health.

### Administrative Suite
- **Admin Dashboard:** A secure `/admin` console for managing the member directory.
- **User Management:** View all registered members, their goals, and join dates.
- **System Stats:** High-level overview of total members and active trackers.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React, CSS
- **Backend/Database:** Supabase (PostgreSQL + Auth)

## 📖 Setup & Documentation

### Database Setup
For Supabase credentials, schema migration, tracker verification, and troubleshooting, see the [Database Setup Guide](./DATABASE_SETUP.md).

### Project Structure
- `app/` - Main Next.js pages (including `/login`, `/signup`, `/admin`, and `/tracker`).
- `app/lib/supabase/` - Logic for database interactions and member management.
- `db-schema/` - Supabase database schema and RLS policies.
- `scripts/` - Utility scripts for data seeding and verification.

## 🚀 Deployment

This project is optimized for deployment on **Vercel**. Ensure your `.env.local` variables are mirrored in the Vercel environment settings for a seamless production launch.
