import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [recipes, setRecipes] = useState<Array<Schema["Recipe"]["type"]>>([]);

  useEffect(() => {

    client.models.Recipe.observeQuery().subscribe({
      next: (data) => setRecipes([...data.items]),
    });
  }, []);

  return (
    <main>
      <section className="hero is-success">
        <div className="hero-body">
          <p className="title">Meal Plan</p>
          <p className="subtitle">Week 1</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid">
            {recipes.map((recipe) => (
              <div className="cell" key={recipe.id}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src="https://bulma.io/assets/images/placeholders/1280x960.png"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{recipe.title}</p>
                        <p className="subtitle is-6">{recipe.description}</p>
                      </div>
                    </div>
                    <div className="content">
                      <a href="#">Recipe</a>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </main>
  );
}

export default App;
