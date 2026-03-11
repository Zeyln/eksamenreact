import BitcoinDB from "./components/BitcoinDash.tsx"
import EthereumDB from "./components/EthereumDash.tsx"
import NavBar from "./components/NavBar.tsx"


function App() {

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <NavBar />
      <BitcoinDB />
      <EthereumDB />
    </div>
  )
}

export default App
