import { useEffect, useState } from 'react'
import { loadLapTops, type LapTopResponse } from './api'
import './App.css'
import { LoadingMask } from './components/LoadingMask'

function App() {
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")
const [laptops, setLaptops] = useState<LapTopResponse[]>([])

const loadedLapTops = async () => {
    const response = await loadLapTops()
    setLoading(false)
    if (!response.success){
        setError("No data!")
    }else{
        setLaptops(response.data)
    }
}

useEffect(() => {
    loadedLapTops()
}, [])
    
    return (
        <div>
            <>
                {loading ? <LoadingMask /> : null}
            </>
            <>
                {error && <p>{error}</p>}
                {laptops.map((laptop, index) => {
                    <li key={index}>
                        <h1>{laptop.brand}</h1>
                        <h2>{laptop.name}</h2>
                        <h3>{laptop.weight}</h3>
                    </li>
                })}
            </>
                    
            
        </div>
    )
}

export default App
