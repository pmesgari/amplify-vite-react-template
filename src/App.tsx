import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [programs, setPrograms] = useState<Array<Schema["Program"]["type"]>>([]);

  useEffect(() => {

    client.models.Program.observeQuery().subscribe({
      next: (data) => setPrograms([...data.items]),
    });
  }, []);

  return (
    <main>
      <section className="hero is-success">
        <div className="hero-body">
          <p className="title">Programs</p>
          <p className="subtitle">Available Programs</p>
        </div>
      </section>
      <section className="section">
      {programs.map((program) => (
        <div>
          <div>
          <p>{program.id}</p>
          <p>{program.name}</p>
          <p>{program.description}</p>
          </div>
          <br/>
        </div>
      ))}
      </section>
    </main>
  );
}

export default App;
