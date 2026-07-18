"use client";

import { useState } from 'react';

export default function CalculatorPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState('male');
  const [result, setResult] = useState(null);

  function calculate(event) {
    event.preventDefault();
    const heightCm = Number(height);
    const weightKg = Number(weight);
    const ageValue = Number(age || 25);

    const bmi = (weightKg / ((heightCm / 100) ** 2)).toFixed(1);
    const bmr = gender === 'female'
      ? (10 * weightKg + 6.25 * heightCm - 5 * ageValue - 161).toFixed(0)
      : (10 * weightKg + 6.25 * heightCm - 5 * ageValue + 5).toFixed(0);
    const targetCalories = (Number(bmr) + 300).toFixed(0);

    let label = 'Healthy range';
    if (Number(bmi) < 18.5) label = 'Underweight';
    else if (Number(bmi) >= 25) label = 'Overweight';

    setResult({ bmi, label, bmr, targetCalories });
  }

  return (
    <main>
      <section className="page-head">
        <p className="eyebrow">Calculate your starting point</p>
        <h1>BMI &amp; Fitness Calculator</h1>
        <p>Use these estimates to understand your body measurements, energy needs, and targets.</p>
      </section>

      <div className="grid-2">
        <div className="form-card">
          <h2>Enter your details</h2>
          <form onSubmit={calculate}>
            <label htmlFor="height">Height (cm)</label>
            <input id="height" type="number" min="100" max="250" required value={height} onChange={(e) => setHeight(e.target.value)} />

            <label htmlFor="weight">Weight (kg)</label>
            <input id="weight" type="number" min="30" max="250" required value={weight} onChange={(e) => setWeight(e.target.value)} />

            <label htmlFor="age">Age</label>
            <input id="age" type="number" min="10" max="100" value={age} onChange={(e) => setAge(e.target.value)} />

            <label htmlFor="gender">Gender</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button className="btn btn-primary" type="submit">Calculate</button>
          </form>
        </div>

        <div className="card">
          <h2>Your results</h2>
          <div className="output-box">
            {result ? (
              <div className="result-list">
                <div><strong>BMI:</strong> {result.bmi}</div>
                <div><strong>Category:</strong> {result.label}</div>
                <div><strong>BMR:</strong> {result.bmr} kcal/day</div>
                <div><strong>Suggested daily intake:</strong> {result.targetCalories} kcal/day</div>
              </div>
            ) : (
              <p>Fill out the form to see your BMI, BMR, and suggested calorie target.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
