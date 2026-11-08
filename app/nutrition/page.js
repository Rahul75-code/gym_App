// Last updated: 2026-11-03
export default function NutritionPage() {
  return (
    <main>
      <section className="page-head">
        <p className="eyebrow">Fuel your results</p>
        <h1>Nutrition Corner</h1>
        <p className="page-description">Enjoy <span className="text-accent">simple meal ideas</span>, <span className="text-accent">healthy recipes</span>, and <span className="text-accent">practical nutrition guidance</span> for everyday performance.</p>
      </section>

      <div className="grid-4">
        <div className="card nutri-card nutri-meal">
          <h2><span className="icon">🥗</span> Meal Plan Tip</h2>
          <p className="page-description"><span className="text-accent">Balance protein</span>, <span className="text-accent">complex carbs</span>, and <span className="text-accent">healthy fats</span> in every meal to stay energized and support muscle recovery.</p>
          <ul>
            <li>Include a protein source in every meal</li>
            <li>Prioritize leafy greens and colorful veg</li>
            <li>Use complex carbs for sustained energy</li>
            <li>Limit processed sugars and refined oils</li>
          </ul>
          <a href="#nutrition-essentials" className="btn-secondary">View Habits</a>
        </div>
        <div className="card nutri-card nutri-recipe">
          <h2><span className="icon">🍳</span> Healthy Recipe</h2>
          <p className="page-description">Try a <span className="text-accent">grilled chicken bowl</span> with rice, avocado, greens, and a <span className="text-accent">light dressing</span> for a quick post-workout lunch.</p>
          <ul>
            <li>Grilled Chicken Breast (150g)</li>
            <li>Brown Rice or Quinoa (1 cup)</li>
            <li>Fresh Spinach & Avocado</li>
            <li>Olive Oil & Lemon Dressing</li>
          </ul>
          <a href="#meal-ideas" className="btn-secondary">More Ideas</a>
        </div>
        <div className="card nutri-card nutri-supp">
          <h2><span className="icon">💊</span> Supplement Guide</h2>
          <p className="page-description">Use supplements carefully and focus first on <span className="text-accent">hydration</span>, <span className="text-accent">sleep</span>, and a <span className="text-accent">solid diet</span> before adding extra products.</p>
          <ul>
            <li>Creatine Monohydrate (5g/day)</li>
            <li>Whey/Plant Protein (post-workout)</li>
            <li>Omega-3 Fish Oil (for joints/heart)</li>
            <li>Multivitamins (if diet is lacking)</li>
          </ul>
          <a href="#supplement-info" className="btn-secondary">Learn More</a>
        </div>
        <div className="card nutri-card nutri-protein protein-card">
          <h2><span className="icon">🥩</span> Protein Sources</h2>
          <p className="page-description">Choose <span className="text-accent">high-quality protein</span> every day to fuel <span className="text-accent">recovery</span> and maintain <span className="text-accent">lean muscle</span>.</p>
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
          <h2>Protein Corner </h2>
          <h3>Why Protein Matters</h3>
          <p className="protein-highlight">Protein is vital for muscle repair, growth, and recovery. It supports metabolism, helps maintain lean mass, and keeps you fuller for longer — essential for both bulking and cutting phases.</p>

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
        <p className="page-description">Good nutrition is built on <span className="text-accent">consistency</span>, <span className="text-accent">whole foods</span>, and <span className="text-accent">realistic habits</span>. These practical tips help you stay on track no matter how busy your day gets.</p>

        <div className="grid-2">
          <div className="card">
            <h3><span className="icon">🍏</span> Smart Eating Habits</h3>
            <ul>
              <li>Start with protein at every meal to support strength and fullness.</li>
              <li>Choose whole grains like oats, quinoa, and brown rice instead of refined carbs.</li>
              <li>Add vegetables to every plate for fiber, vitamins, and mineral support.</li>
              <li>Drink water regularly throughout the day — aim for at least 8 cups.</li>
            </ul>
          </div>
          <div className="card">
            <h3><span className="icon">🍱</span> Meal Ideas</h3>
            <ul>
              <li><strong>Breakfast:</strong> Greek yogurt with berries, nuts, and a drizzle of honey.</li>
              <li><strong>Lunch:</strong> Turkey and veggie wrap with hummus, spinach, and whole-wheat tortilla.</li>
              <li><strong>Dinner:</strong> Salmon with roasted sweet potatoes, broccoli, and a squeeze of lemon.</li>
              <li><strong>Snack:</strong> Apple slices with almond butter or a smoothie with banana and spinach.</li>
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
