import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import   LinePlot  from './components/Graph';
function App() {
  const [count, setCount] = useState(0)
  const data = [
    { "source": "Samsung", "target": "Apple", "type": "suit" },
    { "source": "Motorola", "target": "Apple", "type": "suit" },
    { "source": "Nokia", "target": "Apple", "type": "resolved" },
    { "source": "HTC", "target": "Apple", "type": "suit" },
    { "source": "Kodak", "target": "Apple", "type": "suit" },
    { "source": "Microsoft", "target": "Barnes & Noble", "type": "suit" },
    { "source": "Microsoft", "target": "Foxconn", "type": "suit" },
    { "source": "Oracle", "target": "Google", "type": "suit" },
    { "source": "Apple", "target": "HTC", "type": "suit" },
    { "source": "Microsoft", "target": "Inventec", "type": "suit" },
    { "source": "Samsung", "target": "Kodak", "type": "resolved" },
    { "source": "LG", "target": "Kodak", "type": "resolved" },
    { "source": "RIM", "target": "Kodak", "type": "suit" },
    { "source": "Sony", "target": "LG", "type": "suit" },
    { "source": "Kodak", "target": "LG", "type": "resolved" },
    { "source": "Apple", "target": "Nokia", "type": "resolved" },
    { "source": "Qualcomm", "target": "Nokia", "type": "resolved" },
    { "source": "Apple", "target": "Motorola", "type": "suit" },
    { "source": "Microsoft", "target": "Motorola", "type": "suit" },
    { "source": "Motorola", "target": "Microsoft", "type": "suit" },
    { "source": "Huawei", "target": "ZTE", "type": "suit" },
    { "source": "Ericsson", "target": "ZTE", "type": "suit" },
    { "source": "Kodak", "target": "Samsung", "type": "resolved" },
    { "source": "Apple", "target": "Samsung", "type": "suit" },
    { "source": "Kodak", "target": "RIM", "type": "suit" },
    { "source": "Nokia", "target": "Qualcomm", "type": "suit" }
  ]
  
  return (
    <>
      <LinePlot data={data} />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
