import { LapTopResponse } from "../api";

type LapTopProps = {
  data: LapTopResponse[];
};

export const LapTop = ({ data }: LapTopProps) => {
  return (
    <>
      {data.map((laptop, index) => (
        <li key={index}>
          <h1>{laptop.brand}</h1>
          <h2>{laptop.name}</h2>
          <h3>{laptop.weight}</h3>
        </li>
      ))}
    </>
  );
};
