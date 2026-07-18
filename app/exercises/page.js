export default function ExercisesPage() {
  return (
    <main>
      <section className="page-head">
        <p className="eyebrow">Workout library</p>
        <h1>Exercises by Muscle Group</h1>
        <p>Explore effective exercises for each major muscle group and choose the right movement for your goal.</p>
      </section>

      <div className="grid-3">
        <div className="card">
          <h2>Chest</h2>
          <div className="exercise-list">
            <div><strong>Push-Ups</strong><br /><span className="tag">Beginner</span><span className="tag">Bodyweight</span></div>
            <div><strong>Bench Press</strong><br /><span className="tag">Intermediate</span><span className="tag">Strength</span></div>
            <div><strong>Incline Dumbbell Press</strong><br /><span className="tag">Intermediate</span><span className="tag">Upper chest</span></div>
          </div>
        </div>

        <div className="card">
          <h2>Back</h2>
          <div className="exercise-list">
            <div><strong>Pull-Ups</strong><br /><span className="tag">Intermediate</span><span className="tag">Upper back</span></div>
            <div><strong>Barbell Rows</strong><br /><span className="tag">Intermediate</span><span className="tag">Pull</span></div>
            <div><strong>Lat Pulldown</strong><br /><span className="tag">Beginner</span><span className="tag">Core back</span></div>
          </div>
        </div>

        <div className="card">
          <h2>Legs</h2>
          <div className="exercise-list">
            <div><strong>Squats</strong><br /><span className="tag">Beginner</span><span className="tag">Quads</span></div>
            <div><strong>Romanian Deadlift</strong><br /><span className="tag">Intermediate</span><span className="tag">Hamstrings</span></div>
            <div><strong>Lunges</strong><br /><span className="tag">Beginner</span><span className="tag">Balance</span></div>
          </div>
        </div>

        <div className="card">
          <h2>Shoulders</h2>
          <div className="exercise-list">
            <div><strong>Overhead Press</strong><br /><span className="tag">Intermediate</span><span className="tag">Strength</span></div>
            <div><strong>Lateral Raises</strong><br /><span className="tag">Beginner</span><span className="tag">Definition</span></div>
            <div><strong>Front Raises</strong><br /><span className="tag">Beginner</span><span className="tag">Delts</span></div>
          </div>
        </div>

        <div className="card">
          <h2>Arms</h2>
          <div className="exercise-list">
            <div><strong>Bicep Curls</strong><br /><span className="tag">Beginner</span><span className="tag">Biceps</span></div>
            <div><strong>Triceps Dips</strong><br /><span className="tag">Intermediate</span><span className="tag">Triceps</span></div>
            <div><strong>Hammer Curls</strong><br /><span className="tag">Beginner</span><span className="tag">Forearms</span></div>
          </div>
        </div>

        <div className="card">
          <h2>Core</h2>
          <div className="exercise-list">
            <div><strong>Planks</strong><br /><span className="tag">Beginner</span><span className="tag">Stability</span></div>
            <div><strong>Crunches</strong><br /><span className="tag">Beginner</span><span className="tag">Abs</span></div>
            <div><strong>Dead Bug</strong><br /><span className="tag">Intermediate</span><span className="tag">Control</span></div>
          </div>
        </div>
      </div>
    </main>
  );
}
