import { useState } from "react"

import Example1 from "./webgl/animation_keyframes/Example"
import Example2 from "./webgl/animation_skinning_blending/Example"
import Example3 from "./webgl/animation_skinning_additive_blending/Example"
import Example4 from "./webgl/animation_skinning_morph/Example"

const examples = [
  {
    name: "animation / keyframes",
    component: <Example1 />
  },
  {
    name: "animation / skinning / blending",
    component: <Example2 />
  },
  {
    name: "animation / skinning / additive / blending",
    component: <Example3 />
  },
  {
    name: "animation / skinning / morph",
    component: <Example4 />
  }
];

const App = () => {
  const [example, setExample] = useState(examples[3]);

  return (
    <div>
      <div className="panel">
        {examples.map(example => (
          <div 
            key={example.name} 
            className="list"
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
