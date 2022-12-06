import axios from "axios";
import { useState, useEffect } from "react";

export function CompaniesIndex(props) {
  const [companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState({});

  const handleIndexCompanies = () => {
    axios.get("/companies.json").then((response) => {
      setCompanies(response.data);
    });
  };

  const handleCompanyHighlight = (company) => {
    setCurrentCompany(company);
    console.log(currentCompany);
  };

  useEffect(handleIndexCompanies, []);
  return (
    <div>
      {companies
        .filter((company) => company.region?.toLowerCase().includes(props.searchFilter.toLowerCase()))
        .map((company) => (
          <div
            key={company.id}
            className={company.id === currentCompany.id ? "row pt-2 pb-2 current-company" : "row pt-2 pb-2 company"}
            onClick={() => handleCompanyHighlight(company)}
          >
            <p className="col">{company.name}</p>{" "}
            <a className="col btn btn-primary" href={company.url} target="_blank">
              See Site
            </a>{" "}
            <p className="col">{company.region}</p> |
            <div className="col">{company.favorite === true ? <p>*</p> : <p>_</p>}</div>
          </div>
        ))}
    </div>
  );
}
