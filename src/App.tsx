import { useEffect, useState } from "react";
import { loadLapTops, type LapTopResponse } from "./api";
import { LoadingMask } from "./components/LoadingMask";
import { LapTop } from "./components/LapTop";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [laptops, setLaptops] = useState<LapTopResponse[]>([]);

  const loadedLapTops = async () => {
    const response = await loadLapTops();
    setLoading(false);
    if (!response.success) {
      setError("No data!");
    } else {
      setLaptops(response.data);
    }
  };

  useEffect(() => {
    loadedLapTops();
  }, []);

  return (
    <div>
      {loading ? <LoadingMask /> : null}
      {error && <p>{error}</p>}
      {laptops && <LapTop data={laptops} />}
    </div>
  );
}

export default App;
