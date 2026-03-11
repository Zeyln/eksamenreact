import { useState } from 'react'
import BitcoinDB from "./components/BitcoinDash.tsx"
import EthereumDB from "./components/EthereumDash.tsx"


function App() {

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <BitcoinDB />
      <EthereumDB />
    </div>
  )
}

export default App
