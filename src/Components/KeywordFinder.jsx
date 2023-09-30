import React, { useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";

export default function KeywordFinder() {
  const [getStats, setStats] = useState({
    views: 0,
    favs: 0,
    avgp: 0,
    comp: 0,
  });
  const [isSearching, setSearching] = useState(0);

  const fetchData = async (search_keyword) => {
    const params = {
      keywords: search_keyword,
      limit: "100",
    };

    setSearching(1);

    try {
      let result = await axios.get("/api/listings/active", {
        params: params,
        headers: {
          "x-api-key": "0aa6qx7gfy3cds87hvijwe40",
        },
      });

      let total_result = result.data.count;
      let total_test = Math.min(1000, total_result);
      let start_set = 0;
      let tempRes = 0;
      let t_views = 0,
        t_favs = 0,
        avg_price = 0,
        t_comp = 0;
      while (start_set < total_test) {
        result = await axios.get("/api/listings/active", {
          params: {
            keywords: search_keyword,
            limit: "100",
            offset: start_set,
          },
          headers: {
            "x-api-key": "0aa6qx7gfy3cds87hvijwe40",
          },
        });

        tempRes = result.data.results;
        tempRes.forEach((val) => {
          t_views += val.views / total_test;
          t_favs += val.num_favorers / total_test;
          avg_price += val.price.amount / total_test;
        });
        start_set += 100;
      }

      setStats((prev) => ({
        views: parseInt(t_views * (total_result / total_test)),
        favs: parseInt(t_favs * (total_result / total_test)),
        avgp: parseInt(avg_price),
        comp: total_result,
      }));
    } catch (error) {
      console.log(error);
    }
    setSearching(0);
  };

  const searchFunc = (search_keyword) => {
    fetchData(search_keyword);
  };

  return (
    <div className="KeywordFinder w-full">
      <div className="w-full">
        <SearchBar isSearching={isSearching} searchFunc={searchFunc} />
        {isSearching ? (
          <img
            className="h-24 w-24 m-auto"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--ckZ0w-hG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1epski7rjxo5dqd0kjdv.gif"
          ></img>
        ) : (
          <div className="grid grid-cols-4">
            <div className="bg-gray-100 p-2 m-2 text-black shadow">
              <div>Views</div>
              {getStats.views}
            </div>
            <div className="bg-gray-100 p-2 m-2 text-black shadow">
              <div>Favorites</div>
              {getStats.favs}
            </div>
            <div className="bg-gray-100 p-2 m-2 text-black shadow">
              <div>Avg price</div>
              {getStats.avgp}
            </div>
            <div className="bg-gray-100 p-2 m-2 text-black shadow">
              <div>Competing Listings</div>
              {getStats.comp}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
