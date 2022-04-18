import { useState } from "react"

import Example1 from "./webgl/animation_keyframes/Example"
import Example2 from "./webgl/animation_skinning_blending/Example"

const examples = [
  {
    name: "animation / keyframes",
    component: <Example1 />
  },
  {
    name: "animation / skinning / blending",
    component: <Example2 />
  }
];

const App = () => {
  const [example, setExample] = useState(examples[1]);

  return (
    <div>
      <div className="panel">
        {examples.map(example => (
          <div 
            key={example.name} 
            onClick={() => {
              const element = document.querySelectorAll(".lil-gui")
              if (element.length > 0) {
                element.forEach(e => e.remove())
              }
              setExample(example)
            }}>
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
