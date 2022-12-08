import axios from "axios";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function CompaniesIndex(props) {
  const [currentCompany, setCurrentCompany] = useState({});
  const [date, setDate] = useState(0);

  const handleCompanyHighlight = (company) => {
    setCurrentCompany(company);
    setDate(company.date_visited);
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

  const handleUpdateDate = (event) => {
    event.preventDefault();
    console.log(date);
    const params = {
      date_visited: date,
    };
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
              // <form className="col row" onSubmit={handleUpdateDate}>
              //   {company.date_visited !== null ? (

              //     <input
              //       type="date"
              //       value={date}
              //       onChange={(event) => setDate(event.target.value)}
              //       className="col-10 me-1"
              //     />
              //   ) : (
              //     <input type="date" className="col-10 me-1" />
              //   )}
              //   <button type="submit" className="col-1 btn btn-primary btn-sm"></button>
              // </form>
              <form className="col row" onSubmit={handleUpdateDate}>
                <DatePicker
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  // isClearable
                  placeholderText={currentCompany.date_visited}
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="MMMM d, yyyy"
                />
                <button type="submit" className="col-1 btn btn-primary btn-sm"></button>
              </form>
            ) : (
              <div className="col">{String(company.date_visited)}</div>
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
