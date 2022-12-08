import axios from "axios";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";

export function CompaniesIndex(props) {
  const [currentCompany, setCurrentCompany] = useState({});
  // const [favoriteCompanyId, setFavoriteCompanyId] = useState(0);
  const [favorite, setFavorite] = useState({});

  const handleCompanyHighlight = (company) => {
    setCurrentCompany(company);
  };

  // const handleUpdateCompany = (id, favorite) => {
  // const params = {favorite: favorite,};
  // axios.patch(`/companies/${id}.json`, params).then((response) => {props.sortCompanies(companies.map((company)=> {if (company.id === response.data.id) {
  //   return response.data;
  // } else {
  //   return company;
  // }}))});

  const handleUpdateCompanyFavorite = (id, favorite) => {
    const params = { favorite: String(favorite) };
    console.log(params);
    axios.patch(`/companies/${id}.json`, params).then((response) => {
      console.log(response.data);
      props.sortCompanies(
        props.currentCompanies.map((company) => {
          if (company.id === response.data.id) {
            return response.data;
          } else {
            return company;
          }
        })
      );
    });
  };

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
            <p className="col">{company.region}</p> |<p className="col">{Number(company.favorite)}</p> |
            <div className="col" onClick={() => handleUpdateCompanyFavorite(company.id, !company.favorite)}>
              <ReactStars
                count={1}
                value={Number(company.favorite)}
                size={30}
                isHalf={false}
                activeColor="#E1AD01"
                color="#ecb5bd"
              />
            </div>
          </div>
        ))}
    </div>
  );
}
