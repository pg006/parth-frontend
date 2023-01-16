import React from "react";

const MainBanner = () => {
  return (
    <React.Fragment>
      <div className="pt-16">
      <div
        className="bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage:
            'url("https://sxcontent9668.azureedge.us/cms-assets/assets/Homepage_Desktop_5ebdeb0c6c.webp")',
          height: "70vh",
        }}
      >
        <div className="container mx-auto px-6 h-full max-w-7xl flex justify-end flex-col">
          <div className="h-1/2 max-w-lg w-1/2">
            <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-white tracking-wide font-medium">
              STARSHIP SELECTED BY NASA TO SUPPORT SUSTAINED LUNAR EXPLORATION
            </h1>
            <div className="py-4 mt-4">
              <button className="bg-transparent hover:transition hover:duration-700 duration-700 hover:bg-white text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent w-40">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default MainBanner;
