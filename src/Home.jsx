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
      <div className="row">
        <p className="col">Name</p>
        <p className="col">Website</p>
        <p className="col">Region</p>
        <p className="col">Favorite</p>
      </div>
      {companies.map((company) => (
        <div className="card">
          <div className="row">
            <p className="col">{company.name}</p>{" "}
            <a className="col btn btn-primary" href={company.url} target="_blank">
              See Site
            </a>{" "}
            <p className="col">{company.region}</p> |
            <div className="col">{company.favorite === true ? <p>*</p> : <p>_</p>}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
