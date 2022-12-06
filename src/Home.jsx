import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { CompaniesIndex } from "./CompaniesIndex";

export function Home() {
  const [searchFilter, setSearchFilter] = useState("");
  const [companies, setCompanies] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  const handleIndexCompanies = () => {
    axios.get("/companies.json").then((response) => {
      setCompanies(response.data);
    });
  };
  useEffect(handleIndexCompanies, []);

  const itemsPerPage = 30;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentCompanies = companies.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(companies.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % companies.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

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
        <CompaniesIndex currentCompanies={currentCompanies} searchFilter={searchFilter} />
        <ReactPaginate
          className="d-flex justify-content-evenly list-group-horizontal"
          pageClassName="list-group-item"
          previousClassName="list-group-item"
          nextClassName="list-group-item"
          breakClassName="list-group-item"
          activeClassName="list-group-item active"
          breakLabel="-"
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
