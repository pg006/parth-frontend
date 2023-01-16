import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import MainBanner from "../../components/MainBanner/MainBanner";
import { getRockets, useRockets } from "./landingPageSlice";
import { useDispatch } from "react-redux";
import Pagination from "../../components/Pagination";

const LandingPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const rockets = useRockets();
  const [rocketDetails, setRocketDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const onPageClick = (val) => {
    setPage(val);
  };

  const getAllRocketsDetails = async () => {
    try {
      await dispatch(getRockets()).unwrap();
    } catch (err) {}
  };

  useEffect(() => {
    getAllRocketsDetails();
  }, []);

  useEffect(() => {
    if (search) {
      let newData = rockets.filter((x) => {
        return x.name.toLowerCase().search(search.toLowerCase()) > -1;
      });
      setRocketDetails(newData);
    } else {
      setRocketDetails(rockets);
    }
  }, [rockets]);

  useEffect(() => {
    let counts = 0;

    if (rocketDetails?.length) {
      for (let i = 0; i < rocketDetails?.length; i++) {
        for (let j = 0; j < rocketDetails[i]?.flickr_images.length; j++) {
          counts += 1;
        }
      }
    }
    setTotalCount(counts);
  }, [rocketDetails]);

  return (
    <React.Fragment>
      <NavBar />
      <MainBanner />
      <div className="container mx-auto px-6 h-full max-w-7xl">
        <div className="grid lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 pt-3">
          <div></div>
          <div className="flex">
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded-l-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-rocket-name"
              type="text"
              placeholder="Search Rocket Name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-r-lg"
              type="button"
              onClick={() => {
                getAllRocketsDetails();
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 py-6 mb-5">
          {rocketDetails && rocketDetails.length ? (
            rocketDetails.map((val) => {
              return val?.flickr_images.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 h-auto relative"
                  >
                    <div className="">
                      <img src={item} alt="img" className="w-full h-full" />
                    </div>
                    <div className="py-4">
                      <p className="text-xl text-black font-medium py-3">
                        {val?.name}
                      </p>
                      <p className="text-base text-justify">
                        {val?.description}
                      </p>
                      <div className="absolute right-4 bottom-2">
                        <a
                          href={val?.wikipedia}
                          target="_blank"
                          className="text-xs text-blue-500"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                );
              });
            })
          ) : (
            <div>
              <h1>NO RECORD FOUND</h1>
            </div>
          )}
        </div>
        <div className="flex justify-end mb-5">
          <Pagination
            totalCount={totalCount}
            limit={6}
            onPageClick={onPageClick}
            page={page}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
