import axios from "axios";
import { useState, useEffect } from "react";

export function Home() {
  const [companies, setCompanies] = useState([]);

  const handleIndexCompanies = () => {
    axios.get("/companies.json").then((response) => {
      setCompanies(response.data);
      console.log(response.data);
    });
  };

  useEffect(handleIndexCompanies, []);

  return (
    <div>
      <h1>Remote-Friendly Companies</h1>
      {companies.map((company) => (
        <p>
          {company.name} | {company.url} | {company.region}
        </p>
      ))}
    </div>
  );
}
