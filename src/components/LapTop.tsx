import { useState, useEffect } from "react";
import { LapTopResponse } from "../api";

type LapTopProps = {
  data: LapTopResponse[];
};

export const LapTop = ({ data }: LapTopProps) => {
  const [buttonIndex, setButtonIndex] = useState<null | number>(null);
  const [sortedData, setSortedData] = useState<LapTopResponse[]>(data);
  const [sortAscending, setSortAscending] = useState(true);
  const [filterText, setFilterText] = useState('');

  const showHandler = (index: number) => {
    setButtonIndex(index === buttonIndex ? null : index);
  };

  const sortHandler = () => {
    const newData = [...data];
    newData.sort((a, b) => (sortAscending ? a.weight - b.weight : b.weight - a.weight));
    return newData;
  };

  const filterLaptops = () => {
    return data.filter((laptop) =>
      laptop.name.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  useEffect(() => {
    const newSortedData = sortHandler();
    setSortedData(newSortedData);
  }, [data, sortAscending]);

  useEffect(() => {
    const filteredData = filterLaptops();
    setSortedData(filteredData);
  }, [filterText, data]);

  return (
    <>
      <input
        type="text"
        placeholder="Filter by name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <button onClick={() => setSortAscending(!sortAscending)}>Sort</button>
      {sortedData.map((laptop, index) => (
        <li key={index} style={{ listStyle: "none" }}>
          <h2>{laptop.name}</h2>
          {buttonIndex === index && (
            <div>
              <p>Brand: {laptop.brand}</p>
              <p>Weight: {laptop.weight}</p>
            </div>
          )}
          <button onClick={() => showHandler(index)}>
            {buttonIndex === index ? "Show Less" : "Show More"}
          </button>
        </li>
      ))}
    </>
  );
};
