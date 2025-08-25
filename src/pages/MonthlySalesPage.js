import React, { useState, useEffect } from "react";
import axios from "axios";

const MonthlySalesPage = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vendors");
        console.error(response.data);
        setVendors(response.data);
        if (response.data.length > 0) {
          setSelectedVendor(response.data[0].id);
        }
      } catch (err) {
        setError("Failed to fetch vendors.");
        console.error(err);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    if (selectedVendor) {
      const fetchSalesData = async () => {
        try {
          setError("");
          setSalesData([]);
          const response = await axios.get(
            `http://localhost:5000/api/sales/vendors/${selectedVendor}/monthly`
          );
          setSalesData(response.data);
        } catch (err) {
          setError(`Failed to fetch sales data for vendor ${selectedVendor}.`);
          console.error(err);
        }
      };
      fetchSalesData();
    }
  }, [selectedVendor]);

  return (
    <div className="page-content">
      <h2>Monthly Sales</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <select
        value={selectedVendor}
        onChange={(e) => setSelectedVendor(e.target.value)}
      >
        <option value="" disabled>
          Select a Vendor
        </option>
        {vendors.map((vendor) => (
          <option key={vendor.id} value={vendor.id}>
            {vendor.name}
          </option>
        ))}
      </select>

      {salesData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((item, index) => (
              <tr key={index}>
                <td>{item.month}</td>
                <td>{item.totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>
          {selectedVendor
            ? "No sales data available for this vendor."
            : "Please select a vendor to see the data."}
        </p>
      )}
    </div>
  );
};

export default MonthlySalesPage;
