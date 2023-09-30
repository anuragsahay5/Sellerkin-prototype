import React, { useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { Space, Table, Tag } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Product",
    dataIndex: "title",
    key: "title",
    render: (text) => (
      <p className="text-ellipsis whitespace-nowrap w-96 overflow-hidden">
        {text}
      </p>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => (
      <p>
        {" "}
        {text.amount} {text.currency_code}{" "}
      </p>
    ),
  },
  {
    title: "Views",
    dataIndex: "views",
    key: "views",
  },
  {
    title: "Favorites",
    dataIndex: "num_favorers",
    key: "favorites",
  },
];

export default function ProductFinder() {
  const [isSearching, setSearching] = useState(0);
  const [getListData, setListData] = useState([]);

  const minRef = useRef();
  const maxRef = useRef();

  const fetchData = async (search_keyword, min_range, max_range) => {
    const params = {
      keywords: search_keyword,
      min_price: min_range,
      max_price: max_range,
    };

    setSearching(1);
    setListData([]);
    try {
      const result = await axios.get("/api/listings/active", {
        params: params,
        headers: {
          "x-api-key": "0aa6qx7gfy3cds87hvijwe40",
        },
      });
      setListData(result.data.results);
    } catch (error) {
      console.log(error);
    }
    setSearching(0);
  };

  const searchFunc = (search_keyword) => {
    fetchData(search_keyword, minRef.current.value, maxRef.current.value);
  };

  return (
    <div className="ProductFinder w-full">
      <div className="w-full">
        <SearchBar isSearching={isSearching} searchFunc={searchFunc} />
        <div className="bg-slate-100 p-2 m-2 rounded">
          <details className="cursor-pointer">
            <summary>Filter</summary>
            <div className="p-2">
              <div className="space-x-2">
                Price:{"  "}
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Min Price"
                  className="border-2 border-black rounded-md w-20 p-1 outline-none"
                  ref={minRef}
                />{" "}
                -
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Max Price"
                  className="border-2 border-black rounded-md w-20 p-1 outline-none"
                  ref={maxRef}
                />
              </div>
            </div>
          </details>
        </div>
        <div>
          <h3 className="font-semibold text-xl">Listings</h3>
          {isSearching ? (
            <img
              className="h-24 w-24 m-auto"
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--ckZ0w-hG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1epski7rjxo5dqd0kjdv.gif"
            ></img>
          ) : (
            <Table columns={columns} dataSource={getListData} />
          )}
        </div>
      </div>
    </div>
  );
}
