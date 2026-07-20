export default function NutritionPage() {
  return (
    <main>
      <section className="page-head">
        <p className="eyebrow">Fuel your results</p>
        <h1>Nutrition Corner</h1>
        <p>Enjoy simple meal ideas, healthy recipes, and practical nutrition guidance for everyday performance.</p>
      </section>

      <div className="grid-4">
        <div className="card">
          <h2>Meal Plan Tip</h2>
          <p>Balance protein, complex carbs, and healthy fats in every meal to stay energized and support muscle recovery.</p>
        </div>
        <div className="card">
          <h2>Healthy Recipe</h2>
          <p>Try a grilled chicken bowl with rice, avocado, greens, and a light dressing for a quick post-workout lunch.</p>
        </div>
        <div className="card">
          <h2>Supplement Guide</h2>
          <p>Use supplements carefully and focus first on hydration, sleep, and a solid diet before adding extra products.</p>
        </div>
        <div className="card protein-card">
          <h2>Protein Sources</h2>
          <p>Choose high-quality protein every day to fuel recovery and maintain lean muscle.</p>
          <ul>
            <li>Chicken breast — 31 g/100 g</li>
            <li>Salmon — 25 g/100 g</li>
            <li>Greek yogurt — 10 g/100 g</li>
            <li>Tofu — 17 g/100 g</li>
            <li>Almonds — 21 g/100 g</li>
          </ul>
          <a href="#protein-corner" className="btn-secondary">Learn More</a>
        </div>
      </div>

      <section className="nutrition-details">
        <div id="protein-corner" className="protein-section">
          <h2>Protein Corner</h2>
          <h3>Why Protein Matters</h3>
          <p>Protein is vital for muscle repair, growth, and recovery. It supports metabolism, helps maintain lean mass, and keeps you fuller for longer — essential for both bulking and cutting phases.</p>

          <div className="protein-grid">
            <div className="protein-table card">
              <h3>Top Protein Sources</h3>
              <ul>
                <li><strong>Lean Meats</strong> — Chicken breast, turkey, lean beef · 25–31 g</li>
                <li><strong>Fish & Seafood</strong> — Salmon, tuna, shrimp, cod · 20–26 g</li>
                <li><strong>Eggs & Dairy</strong> — Eggs, Greek yogurt, cottage cheese, milk · 6–11 g</li>
                <li><strong>Plant-Based</strong> — Lentils, chickpeas, tofu, tempeh, edamame · 8–19 g</li>
                <li><strong>Nuts & Seeds</strong> — Almonds, chia seeds, pumpkin seeds, peanuts · 17–30 g</li>
                <li><strong>Protein Supplements</strong> — Whey, casein, soy, pea protein powders · 70–90 g</li>
              </ul>
            </div>

            <div className="protein-guide card">
              <h3>Daily Protein Intake</h3>
              <p>Use this guide to match your goals and bodyweight.</p>
              <ul>
                <li><strong>General fitness:</strong> 1.2–1.6 g per kg</li>
                <li><strong>Muscle gain:</strong> 1.6–2.2 g per kg</li>
                <li><strong>Fat loss:</strong> 1.8–2.4 g per kg</li>
              </ul>
              <p><strong>Example:</strong> A 70 kg person aiming for muscle gain should target 110–150 g protein/day.</p>
              <h3>Timing Tips</h3>
              <ul>
                <li>Morning: Include protein early to stabilize energy.</li>
                <li>Post-workout: Consume 20–30 g within 30 minutes of training.</li>
                <li>Throughout the day: Spread intake evenly across meals.</li>
              </ul>
            </div>
          </div>
        </div>
        <h2>Nutrition Essentials</h2>
        <p>Good nutrition is built on consistency, whole foods, and realistic habits. These practical tips help you stay on track no matter how busy your day gets.</p>

        <div className="grid-2">
          <div>
            <h3>Smart Eating Habits</h3>
            <ul>
              <li>Start with protein at every meal to support strength and fullness.</li>
              <li>Choose whole grains like oats, quinoa, and brown rice instead of refined carbs.</li>
              <li>Add vegetables to every plate for fiber, vitamins, and mineral support.</li>
              <li>Drink water regularly throughout the day — aim for at least 8 cups.</li>
            </ul>
          </div>
          <div>
            <h3>Meal Ideas</h3>
            <ul>
              <li>Breakfast: Greek yogurt with berries, nuts, and a drizzle of honey.</li>
              <li>Lunch: Turkey and veggie wrap with hummus, spinach, and whole-wheat tortilla.</li>
              <li>Dinner: Salmon with roasted sweet potatoes, broccoli, and a squeeze of lemon.</li>
              <li>Snack: Apple slices with almond butter or a smoothie with banana and spinach.</li>
            </ul>
          </div>
        </div>

        <div className="nutrition-cta card">
          <h3>Quick Nutrition Checklist</h3>
          <p>Use this simple checklist to keep your daily meals balanced and effective:</p>
          <ol>
            <li>Include a source of lean protein.</li>
            <li>Choose at least one vegetable or fruit.</li>
            <li>Pick an unprocessed carbohydrate.</li>
            <li>Stay hydrated with water.</li>
            <li>Get consistent sleep to support recovery.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
