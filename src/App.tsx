import { useState } from "react"

import Example1 from "./webgl/animation_keyframes/Example"

const examples = [
  {
    name: "animation / keyframes",
    component: <Example1 />
  }
];

const App = () => {
  const [example, setExample] = useState(examples[0]);

  return (
    <div>
      <div className="panel">
        {examples.map(example => (
          <div 
            key={example.name} 
            onClick={() => setExample(example)}>
              {example.name}
          </div>
        ))}
      </div>
      <div className="viewer">
        {example.component}
      </div>
    </div>
  );
}

export default App;
