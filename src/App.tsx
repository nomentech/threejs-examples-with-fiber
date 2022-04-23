import { lazy, Suspense, useState } from "react"

const webgl = [
  "animation_keyframes",
  "animation_skinning_blending",
  "animation_skinning_additive_blending",
  "animation_skinning_morph",
  "animation_multiple",
  // "camera" // incomplete with bugs
  // "camera_array" // incomlete, arrayCamera is not working
]
let current = webgl[webgl.length-1]

const App = () => {
  const component = lazy(() => import(`./webgl/${current}/Example`))
  const [Example, setExample] = useState<any>(component)
  const [examples, setExamples] = useState(webgl)
  const [showMenu, setShowMenu] = useState(window.innerWidth >= 640 ? true: false)

  const clickHandler = (item: string) => {
    if (current !== item) {
      // Remove controls
      const element = document.querySelectorAll(".lil-gui")
      if (element.length > 0) {
        element.forEach(e => e.remove())
      }

      const component = lazy(() => import(`./webgl/${item}/Example`))
      setExample(component)

      current = item
      if (window.innerWidth < 640) setShowMenu(false)
    }
  }

  const searchExamples = (event: any) => {
    const result = webgl.filter(item => item.includes(event.target.value))
    setExamples(result)
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 640) setShowMenu(true)
    else setShowMenu(false)
  })

  return (
    <div>
      <div className={`fixed left-0 w-full sm:w-[300px] h-full overflow-auto ${showMenu ? "z-[5000]" : "z-50"}`}>
        <div className="h-12 flex justify-between items-center border-b border-b-[#e8e8e8]">
          <h1 className="pl-4 text-[#049ef4]">three.js examples with fiber</h1>
          <div className="bg-[url('./images/ic_menu_black_24dp.svg')] bg-center sm:bg-none
            w-12 h-12 bg-no-repeat cursor-pointer"
            onClick={() => setShowMenu(showMenu => !showMenu)}></div>
        </div>
        {showMenu && <div className="overflow-hidden bg-white w-[300px] absolute right-0 sm:block">
          <div className="flex items-center h-12 p-4 border-b border-b-[#e8e8e8]">
            <input className="bg-[url('./images/ic_search_black_24dp.svg')] 
              bg-no-repeat border-none outline-none w-full pl-8 text-[#444]" 
              onChange={searchExamples}
            />
          </div>
          <div className="px-4 overflow-x-hidden overflow-y-auto">
            <h2 className="my-4 font-medium text-[#049ef4]">webgl</h2>
            {examples.map(item => (
              <div 
                key={item} 
                className={`pb-1 font-medium hover:text-[#049ef4]
                  ${current === item ? "text-[#049ef4]" : ""}
                  ${current === item ? "cursor-default" : "cursor-pointer"}`}
                onClick={() => clickHandler(item)}
              >
                {item.replaceAll("_", " / ")}
              </div>
            ))}
          </div>
        </div>}
      </div>
      <div className="absolute sm:pl-[300px] w-full h-full left-0 right-0 pt-12 sm:pt-0 overflow-auto">
        <Suspense fallback={null}>
          <Example />
        </Suspense>
      </div>
    </div>
  )
}

export default App;
