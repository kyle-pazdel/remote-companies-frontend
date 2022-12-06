import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { CompaniesIndex } from "./CompaniesIndex";

export function Home() {
  const [searchFilter, setSearchFilter] = useState("");
  const [companies, setCompanies] = useState([]);

  const handleIndexCompanies = () => {
    axios.get("/companies.json").then((response) => {
      setCompanies(response.data);
    });
  };

  useEffect(handleIndexCompanies, []);

  return (
    <div>
      <h1>Remote-Friendly Companies</h1>
      <div className="card">
        <input
          type="search"
          className="form-control me-2"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        ></input>
        <div className="row mt-4">
          <p className="col">Name</p>
          <p className="col">Website</p>
          <p className="col">Region</p>
          <p className="col">Favorite</p>
        </div>
        <CompaniesIndex companies={companies} searchFilter={searchFilter} />
      </div>
    </div>
  );
}
