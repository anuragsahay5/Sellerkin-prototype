import React, { useRef } from "react";

export default function SearchBar({ isSearching, searchFunc }) {

  const inpRef = useRef();

  const searchFunctionHandler = (e)=>{
    e.preventDefault();
    searchFunc(inpRef.current.value);
  }

  return (
    <div className="KeywordFinder w-full">
      <div className=" bg-[#002239] rounded p-4 h-fit">
        <form onSubmit={searchFunctionHandler} className="p-3 rounded-md bg-white w-fit m-auto">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search any keyword"
            className="outline-none w-72"
            ref={inpRef}
            autoFocus
            required
          />
          <button type="submit"
            className="bg-blue-800 px-2 py-1 text-white rounded active:bg-blue-900"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </div>
  );
}
