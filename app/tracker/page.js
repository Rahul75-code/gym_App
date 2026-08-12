"use client";

import { useEffect, useRef, useState } from 'react';
import { getTrackerEntries, saveTrackerEntry } from '../lib/supabase/memberService';

export default function TrackerPage() {
  const canvasRef = useRef(null);
  const [entries, setEntries] = useState([]);
  const [week, setWeek] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await getTrackerEntries();
        setEntries(data.map((entry) => ({ id: entry.id, week: entry.week, weight: Number(entry.weight) })));
      } catch (err) {
        setError(err.message || 'Unable to load your tracker data.');
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || entries.length === 0) return;
    const ctx = canvas.getContext('2d');
    const labels = entries.map((entry) => entry.week);
    const values = entries.map((entry) => entry.weight);
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    const padding = 30;
    const maxValue = Math.max(...values) + 2;
    const minValue = Math.min(...values) - 2;
    const stepX = (width - padding * 2) / (labels.length - 1 || 1);
    const stepY = (height - padding * 2) / (maxValue - minValue || 1);

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i += 1) {
      const y = padding + (height - padding * 2) * (i / 4);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    ctx.beginPath();
    values.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = height - padding - (value - minValue) * stepY;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#ff6b35';
    ctx.lineWidth = 3;
    ctx.stroke();

    values.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = height - padding - (value - minValue) * stepY;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#1cc9a0';
      ctx.fill();
    });
  }, [entries]);

  async function addEntry(event) {
    event.preventDefault();
    if (!week || !weight) return;

    setError('');
    setMessage('');

    try {
      const created = await saveTrackerEntry({ week, weight });
      setEntries((current) => [...current, { id: created.id, week: created.week, weight: Number(created.weight) }]);
      setWeek('');
      setWeight('');
      setMessage('Progress entry saved to Supabase.');
    } catch (err) {
      setError(err.message || 'Unable to save your progress entry.');
    }
  }

  return (
    <main>
      <section className="page-head">
        <p className="eyebrow">Keep momentum</p>
        <h1>Progress Tracker</h1>
        <p>Track your weekly weight changes and stay motivated with a simple visual chart.</p>
      </section>

      <div className="grid-2">
        <div className="form-card">
          <h2>Log a new entry</h2>
          {error ? <div className="auth-alert error">{error}</div> : null}
          {message ? <div className="auth-alert success">{message}</div> : null}
          <form onSubmit={addEntry}>
            <label htmlFor="week">Week</label>
            <input id="week" type="text" placeholder="Week 5" required value={week} onChange={(e) => setWeek(e.target.value)} />

            <label htmlFor="weight-log">Weight (kg)</label>
            <input id="weight-log" type="number" step="0.1" required value={weight} onChange={(e) => setWeight(e.target.value)} />

            <button className="btn btn-primary" type="submit">Add entry</button>
          </form>
          {loading ? <p>Loading your saved entries...</p> : null}
        </div>

        <div className="card">
          <h2>Weekly progress chart</h2>
          <div className="canvas-wrap">
            <canvas ref={canvasRef} width="500" height="240" />
          </div>
        </div>
      </div>
    </main>
  );
}
