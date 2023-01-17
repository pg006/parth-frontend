import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import MainBanner from "../../components/MainBanner/MainBanner";
import { getShips, useShips } from "./landingPageSlice";
import { useDispatch } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import ship from "../../assets/images/ship.png";
import Select from "react-select";

const LandingPage = () => {
  const [search, setSearch] = useState("");
  const [portName, setPortName] = useState("");
  const [shipType, setShipType] = useState("");
  const dispatch = useDispatch();
  const selector = useShips();
  const [filter, setFilter] = useState({
    limit: 9,
    page: 1,
    search: null,
    type: null,
    home_port: null,
  });

  const onPageClick = (val) => {
    console.log(val);
    setFilter({ ...filter, page: val });
  };

  const getAllShipDetails = async () => {
    try {
      await dispatch(getShips(filter)).unwrap();
    } catch (err) {}
  };

  useEffect(() => {
    getAllShipDetails();
  }, [filter]);

  return (
    <React.Fragment>
      <NavBar />
      <MainBanner />
      <div className="container mx-auto px-6 h-full max-w-7xl">
        <div className="grid lg:grid-cols-5 xl:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 lg:gap-4 md:gap-2 sm:gap-1 pt-3 items-center">
          <div className="lg:py-3 md:py-2 py-1 px-4 sm:py-1">
            <Select
              classNamePrefix="Select"
              options={selector?.shipTypeList}
              value={selector?.shipTypeList?.filter(
                (option) => option.value === shipType
              )}
              placeholder="Selecct Ship Type"
              name="types"
              onChange={(selectedOption) => {
                setShipType(selectedOption?.value);
              }}
            />
          </div>
          <div className="lg:py-3 md:py-2 py-1 px-4 sm:py-1">
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 py-3 px-3 rounded  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-rocket-name"
              type="text"
              placeholder="Search home port"
              value={portName}
              onChange={(e) => {
                setPortName(e.target.value);
              }}
            />
          </div>
          <div className="flex lg:py-3 md:py-2 py-1 px-4 sm:py-1">
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 py-3 px-3 rounded  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-rocket-name"
              type="text"
              placeholder="Search ship name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="lg:py-3 md:py-2 py-1 px-4 sm:py-1 flex justify-end items-center">
            <button
              className="flex-shrink-0 lg:py-2 md:py-2 sm:py-1 py-1 px-5 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-md font-medium border-4 text-white rounded"
              type="button"
              onClick={() => {
                setFilter({
                  ...filter,
                  search: search,
                  type: shipType,
                  home_port: portName,
                });
              }}
            >
              Apply
            </button>
          </div>
           <div className="py-3 px-4 sm:py-1">
           <span
              className="text-lg border-b-2 border-gray-700 cursor-pointer font-medium"
              onClick={() => {
                setFilter({
                  ...filter,
                  search: null,
                  type: null,
                  home_port: null,
                });
                setSearch("");
                setPortName("");
                setShipType("");
              }}
            >
              ALL
            </span>
          </div>
        </div>

        {selector?.ships && selector?.ships.length ? (
          <div className="grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 py-6 mb-5">
            {selector?.ships?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg  relative h-full drop-shadow-lg"
                >
                  <div
                    className="bg-local bg-center	bg-no-repeat bg-cover rounded-t-lg"
                    style={{
                      backgroundImage: `url(${
                        item?.image ? item?.image : ship
                      })`,
                      height: "265px",
                    }}
                  >
                    {/* <img src={item?.image} alt="Image not found" className="w-full h-full" /> */}
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-xl text-black font-medium">
                      {item?.name}
                    </p>
                    <div className="flex justify-between pb-4">
                      <p className="text-base text-left py-2 text-gray-900">
                        Home Port :
                      </p>
                      <p className="text-base text-right py-2 text-gray-600">
                        {item?.home_port}
                      </p>
                    </div>
                    <div className="absolute right-4 bottom-2">
                      <a
                        href={item?.link}
                        rel="noreferrer"
                        target="_blank"
                        className="text-xs text-blue-500"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          !selector.isLoaging && (
            <div className="flex justify-center py-6 mt-4">
              <h1 className="text-2xl font-medium">NO RECORD FOUND</h1>
            </div>
          )
        )}
        <div className="flex justify-end mb-5">
          <Pagination
            totalCount={selector?.totalData?.length || 0}
            limit={filter?.limit}
            onPageClick={onPageClick}
            page={filter?.page}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
