import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tabindex from "./Components/Tabindex";
import KeywordFinder from "./Components/KeywordFinder";
import ProductFinder from "./Components/ProductFinder"

function App() {
  return (
    <div className="App">
      <div className="flex m-2 gap-2">
        <BrowserRouter>
          <Tabindex />
          <Routes>
            <Route path="/keywordfinder" element={<KeywordFinder />} />
            <Route path="/productfinder" element={<ProductFinder />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
