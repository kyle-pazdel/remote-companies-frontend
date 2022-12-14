import axios from "axios";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { format } from "date-fns";

export function CompaniesIndex(props) {
  const [currentCompany, setCurrentCompany] = useState({});
  const [date, setDate] = useState("");

  const handleCompanyHighlight = (company) => {
    setCurrentCompany(company);
  };

  const handleUpdateCompanyFavorite = (id, favorite) => {
    const params = { favorite: String(favorite) };
    console.log(params);
    axios.patch(`/companies/${id}.json`, params).then((response) => {
      console.log(response.data);
      props.sortCompanies(
        props.companies.map((company) => {
          if (company.id === response.data.id) {
            return response.data;
          } else {
            return company;
          }
        })
      );
    });
  };

  const handleDateChange = (event) => {
    event.preventDefault();
    const userOffset = new Date().getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(event.target.value);
    const utcDate = new Date(localDate.getTime() + userOffset);
    console.log("utcDate: ", utcDate);
    setDate(utcDate);
  };

  const handleUpdateDate = (event) => {
    event.preventDefault();
    const params = {
      date_visited: date,
    };
    console.log(params);
    axios.patch(`/companies/${currentCompany.id}.json`, params).then((response) => {
      console.log(response.data);
      props.sortCompanies(
        props.companies.map((company) => {
          if (company.id === response.data.id) {
            return response.data;
          } else {
            return company;
          }
        })
      );
    });
  };

  const formatDate = (date) => {
    if (date) {
      return format(new Date(date), "MM/dd/yyyy");
    } else {
      return null;
    }
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
            <p className="col">{company.region}</p>
            {currentCompany.id === company.id ? (
              <form className="col row ms-1" onSubmit={handleUpdateDate}>
                <input type="date" value={date} onChange={handleDateChange} className="col-10 me-1" />
                <button type="submit" className="col-1 btn btn-primary btn-sm"></button>
              </form>
            ) : (
              <div className="col">{formatDate(company.date_visited)}</div>
            )}
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
