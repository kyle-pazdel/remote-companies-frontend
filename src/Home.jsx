import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export function Home() {
  const [companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState({});
  const [searchFilter, setSearchFilter] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  const handleIndexCompanies = () => {
    axios.get("/companies.json").then((response) => {
      setCompanies(response.data);
      setPages(Math.floor(response.data.length / perPage));
    });
  };

  const handlePageClick = (event) => {
    let page = event.selected;
    setPage(page);
  };

  const handleCompanyHighlight = (company) => {
    setCurrentCompany(company);
    console.log(currentCompany);
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
        {companies
          .filter((company) => company.region?.toLowerCase().includes(searchFilter.toLowerCase()))
          .map((company) => (
            <div key={company.id} className="row m-2" onClick={() => handleCompanyHighlight(company)}>
              <p className="col">{company.name}</p>{" "}
              <a className="col btn btn-primary" href={company.url} target="_blank">
                See Site
              </a>{" "}
              <p className="col">{company.region}</p> |
              <div className="col">{company.favorite === true ? <p>*</p> : <p>_</p>}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
