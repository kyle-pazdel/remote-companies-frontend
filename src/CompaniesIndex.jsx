import axios from "axios";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";

export function CompaniesIndex(props) {
  const [currentCompany, setCurrentCompany] = useState({});

  const handleCompanyHighlight = (company) => {
    setCurrentCompany(company);
  };

  // const handleUpdateCompany = (id) => {
  //   // const params = {favorite: companyFavoriteStatus}
  //   axios.patch(`/companies/${id}.json`, params).then((response) => {
  //     setReviews(
  //       companies.map((company) => {
  //         if (company.id === response.data.id) {
  //           return response.data;
  //         } else {
  //           return company;
  //         }
  //       })
  //     );

  //   });

  return (
    <div>
      {props.currentCompanies
        .filter((company) => company.name?.toLowerCase().includes(props.searchFilter.toLowerCase()))
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
            <p className="col">{company.region}</p> |<p>{toString(company.favorite)}</p> |
            <ReactStars
              count={1}
              value={0}
              // onChange={() => handleUpdateFavorite(company.id)}
              size={30}
              isHalf={false}
              activeColor="#e98dd7"
              color="#ecb5bd"
            />
          </div>
        ))}
    </div>
  );
}
