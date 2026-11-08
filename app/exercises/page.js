"use client";

import { useState } from 'react';

export default function ExercisesPage() {
  const [expandedWeek, setExpandedWeek] = useState(1);

  const toggleWeek = (week) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  return (
    <main>
      <section className="page-head">
        <p className="eyebrow">Workout library</p>
        <h1>Exercises by Muscle Group</h1>
        <p className="page-description">Explore <span className="text-accent">effective exercises</span> for each <span className="text-accent">major muscle group</span> and choose the <span className="text-accent">right movement</span> for your goal.</p>
      </section>

      <div className="grid-3">
        <div className="card exe-card exe-chest">
          <h2><span className="icon">💪</span> Chest</h2>
          <div className="exercise-list">
            <div><strong>Push-Ups</strong><br /><span className="tag">Beginner</span><span className="tag">Bodyweight</span></div>
            <div><strong>Bench Press</strong><br /><span className="tag">Intermediate</span><span className="tag">Strength</span></div>
            <div><strong>Incline Dumbbell Press</strong><br /><span className="tag">Intermediate</span><span className="tag">Upper chest</span></div>
          </div>
        </div>

        <div className="card exe-card exe-back">
          <h2><span className="icon">🏋️</span> Back</h2>
          <div className="exercise-list">
            <div><strong>Pull-Ups</strong><br /><span className="tag">Intermediate</span><span className="tag">Upper back</span></div>
            <div><strong>Barbell Rows</strong><br /><span className="tag">Intermediate</span><span className="tag">Pull</span></div>
            <div><strong>Lat Pulldown</strong><br /><span className="tag">Beginner</span><span className="tag">Core back</span></div>
          </div>
        </div>

        <div className="card exe-card exe-legs">
          <h2><span className="icon">🦵</span> Legs</h2>
          <div className="exercise-list">
            <div><strong>Squats</strong><br /><span className="tag">Beginner</span><span className="tag">Quads</span></div>
            <div><strong>Romanian Deadlift</strong><br /><span className="tag">Intermediate</span><span className="tag">Hamstrings</span></div>
            <div><strong>Lunges</strong><br /><span className="tag">Beginner</span><span className="tag">Balance</span></div>
          </div>
        </div>

        <div className="card exe-card exe-shoulders">
          <h2><span className="icon">🛡️</span> Shoulders</h2>
          <div className="exercise-list">
            <div><strong>Overhead Press</strong><br /><span className="tag">Intermediate</span><span className="tag">Strength</span></div>
            <div><strong>Lateral Raises</strong><br /><span className="tag">Beginner</span><span className="tag">Definition</span></div>
            <div><strong>Front Raises</strong><br /><span className="tag">Beginner</span><span className="tag">Delts</span></div>
          </div>
        </div>

        <div className="card exe-card exe-arms">
          <h2><span className="icon">🦾</span> Arms</h2>
          <div className="exercise-list">
            <div><strong>Bicep Curls</strong><br /><span className="tag">Beginner</span><span className="tag">Biceps</span></div>
            <div><strong>Triceps Dips</strong><br /><span className="tag">Intermediate</span><span className="tag">Triceps</span></div>
            <div><strong>Hammer Curls</strong><br /><span className="tag">Beginner</span><span className="tag">Forearms</span></div>
          </div>
        </div>

        <div className="card exe-card exe-core">
          <h2><span className="icon">🧘</span> Core</h2>
          <div className="exercise-list">
            <div><strong>Planks</strong><br /><span className="tag">Beginner</span><span className="tag">Stability</span></div>
            <div><strong>Crunches</strong><br /><span className="tag">Beginner</span><span className="tag">Abs</span></div>
            <div><strong>Dead Bug</strong><br /><span className="tag">Intermediate</span><span className="tag">Control</span></div>
          </div>
        </div>
      </div>

      <section className="exercise-details">
        <div className="card">
          <h2>Training Principles</h2>
          <p className="page-description">Focus on <span className="text-accent">controlled movement</span>, <span className="text-accent">good form</span>, and <span className="text-accent">progressive overload</span>. Quality reps matter more than quantity.</p>
          <ul>
            <li>Warm up for 5–10 minutes before each session.</li>
            <li>Use full range of motion for best muscle activation.</li>
            <li>Rest 48 hours before repeating the same muscle group.</li>
          </ul>
        </div>

        <div className="card">
          <h2>Workout Tips</h2>
          <p className="page-description"><span className="text-accent">Pair compound lifts</span> with one or two <span className="text-accent">accessory exercises</span>.</p>
          <ul>
            <li>Keep tempo steady: 1–2 seconds concentric, 2–3 seconds eccentric.</li>
            <li>Track your sets and weights to progress consistently.</li>
          </ul>
        </div>
      </section>

      <section className="exercise-stats">
        <div className="card">
          <h2>Recovery & Consistency</h2>
          <p className="page-description">Recovery is part of the workout. <span className="text-accent">Sleep</span>, <span className="text-accent">nutrition</span>, and <span className="text-accent">hydration</span> help your body adapt and grow stronger.</p>
          <div className="exercise-list">
            <div><strong>Sleep</strong><br /><span className="tag">7–9 hrs</span></div>
            <div><strong>Hydration</strong><br /><span className="tag">2–3 L/day</span></div>
            <div><strong>Protein</strong><br /><span className="tag">1.2–2.2 g/kg</span></div>
          </div>
        </div>
      </section>

      <section className="roadmap-section">
        <div className="card roadmap-intro">
          <h2>🏋️ Beginner Exercise Roadmap (4 Weeks)</h2>
          <p className="page-description">Follow a <span className="text-accent">simple, progressive 4-week plan</span> that builds <span className="text-accent">foundation, strength, endurance</span>, and split routine structure.</p>
        </div>

        <div className={`card roadmap-week ${expandedWeek === 1 ? 'expanded' : ''}`} onClick={() => toggleWeek(1)}>
          <h3>Week 1 – Foundation & Form <span className="roadmap-arrow">▾</span></h3>
          <div className={`roadmap-content ${expandedWeek === 1 ? 'expanded' : 'collapsed'}`}>
            <p className="roadmap-focus">Focus: Learn correct technique, light weights, full-body sessions (3x/week)</p>
            <div className="roadmap-table-wrap">
              <table className="roadmap-table">
                <thead>
                  <tr>
                    <th>Muscle Group</th>
                    <th>Exercise</th>
                    <th>Sets × Reps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Chest</td><td>Push-ups / Dumbbell Bench Press</td><td>3 × 10–12</td></tr>
                  <tr><td>Back</td><td>Lat Pulldown / Seated Row</td><td>3 × 10–12</td></tr>
                  <tr><td>Shoulders</td><td>Dumbbell Shoulder Press</td><td>3 × 10–12</td></tr>
                  <tr><td>Arms</td><td>Bicep Curl, Tricep Dips</td><td>2 × 12</td></tr>
                  <tr><td>Legs</td><td>Bodyweight Squats, Lunges</td><td>3 × 12</td></tr>
                  <tr><td>Core</td><td>Plank (30–45s), Crunches</td><td>3 rounds</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={`card roadmap-week ${expandedWeek === 2 ? 'expanded' : ''}`} onClick={() => toggleWeek(2)}>
          <h3>Week 2 – Strength Building <span className="roadmap-arrow">▾</span></h3>
          <div className={`roadmap-content ${expandedWeek === 2 ? 'expanded' : 'collapsed'}`}>
            <p className="roadmap-focus">Focus: Slightly increase weights, maintain form, 3–4 sessions/week</p>
            <div className="roadmap-table-wrap">
              <table className="roadmap-table">
                <thead>
                  <tr>
                    <th>Muscle Group</th>
                    <th>Exercise</th>
                    <th>Sets × Reps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Chest</td><td>Incline Dumbbell Press</td><td>3 × 8–10</td></tr>
                  <tr><td>Back</td><td>Dumbbell Deadlift</td><td>3 × 8–10</td></tr>
                  <tr><td>Shoulders</td><td>Lateral Raises</td><td>3 × 12</td></tr>
                  <tr><td>Arms</td><td>Hammer Curl, Tricep Pushdown</td><td>3 × 10</td></tr>
                  <tr><td>Legs</td><td>Leg Press / Step-ups</td><td>3 × 10</td></tr>
                  <tr><td>Core</td><td>Russian Twists, Leg Raises</td><td>3 × 15</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={`card roadmap-week ${expandedWeek === 3 ? 'expanded' : ''}`} onClick={() => toggleWeek(3)}>
          <h3>Week 3 – Endurance & Volume <span className="roadmap-arrow">▾</span></h3>
          <div className={`roadmap-content ${expandedWeek === 3 ? 'expanded' : 'collapsed'}`}>
            <p className="roadmap-focus">Focus: Higher reps, moderate weights, 4 sessions/week</p>
            <div className="roadmap-table-wrap">
              <table className="roadmap-table">
                <thead>
                  <tr>
                    <th>Muscle Group</th>
                    <th>Exercise</th>
                    <th>Sets × Reps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Chest</td><td>Push-ups (incline/decline)</td><td>4 × 15</td></tr>
                  <tr><td>Back</td><td>Dumbbell Rows</td><td>4 × 12</td></tr>
                  <tr><td>Shoulders</td><td>Arnold Press</td><td>3 × 12</td></tr>
                  <tr><td>Arms</td><td>Concentration Curl, Overhead Tricep Extension</td><td>3 × 12–15</td></tr>
                  <tr><td>Legs</td><td>Squats (with weights), Calf Raises</td><td>4 × 12–15</td></tr>
                  <tr><td>Core</td><td>Bicycle Crunches, Side Plank</td><td>3 × 20</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={`card roadmap-week ${expandedWeek === 4 ? 'expanded' : ''}`} onClick={() => toggleWeek(4)}>
          <h3>Week 4 – Progression & Split Routine <span className="roadmap-arrow">▾</span></h3>
          <div className={`roadmap-content ${expandedWeek === 4 ? 'expanded' : 'collapsed'}`}>
            <p className="roadmap-focus">Focus: Move to split training (Upper/Lower), 4–5 sessions/week</p>
            <div className="roadmap-list-wrap">
              <div>
                <h4>Upper Body (Day 1 & 3)</h4>
                <ul>
                  <li>Bench Press – 4 × 8</li>
                  <li>Pull-ups / Assisted Pull-ups – 4 × 8–10</li>
                  <li>Shoulder Press – 3 × 10</li>
                  <li>Bicep Curl – 3 × 12</li>
                  <li>Tricep Dips – 3 × 12</li>
                </ul>
              </div>
              <div>
                <h4>Lower Body (Day 2 & 4)</h4>
                <ul>
                  <li>Squats – 4 × 8–10</li>
                  <li>Deadlifts – 4 × 8</li>
                  <li>Lunges – 3 × 12 (each leg)</li>
                  <li>Leg Curl – 3 × 12</li>
                  <li>Calf Raises – 3 × 15</li>
                </ul>
              </div>
              <div>
                <h4>Core (Add to each day)</h4>
                <ul>
                  <li>Plank Variations – 3 × 45s</li>
                  <li>Hanging Leg Raises – 3 × 12</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card roadmap-notes">
          <h3>⚖️ Key Notes</h3>
          <ul>
            <li>Rest: 60–90 seconds between sets.</li>
            <li>Progression: Increase weights gradually (5–10%) each week.</li>
            <li>Form First: Never sacrifice technique for heavier loads.</li>
            <li>Recovery: At least 1 rest day per week.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
