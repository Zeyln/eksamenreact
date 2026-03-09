import { useState } from 'react'
import Gman from "./components/gmananim.tsx"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Gman />
    </>
  )
}

export default App
