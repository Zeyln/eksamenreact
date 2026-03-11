export default function NavBar() {
    return (
        <header className="flex flex-row items-center bg-black text-white h-13">
            <h1 className="font-bold p-2">CryptoDash</h1>
            <ol className="flex flex-row p-2 ">
                <li className="p-2 ring-blue-500 hover:bg-gray-700"><button>Support</button></li>
                <li className="p-2 ring-blue-500 hover:bg-gray-700"><button>License</button></li>
            </ol>
        </header>
    )
}
