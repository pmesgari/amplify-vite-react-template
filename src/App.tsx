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
      <h1>My recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
