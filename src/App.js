import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import AllTimeUnitsPage from "./pages/AllTimeUnitsPage";
import MonthlySalesPage from "./pages/MonthlySalesPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="container">
          <Routes>
            <Route path="/" element={<AllTimeUnitsPage />} />
            <Route path="/monthly-sales" element={<MonthlySalesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
