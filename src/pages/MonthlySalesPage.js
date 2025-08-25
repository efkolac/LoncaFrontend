import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlySalesPage = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          "https://loncabackend.onrender.com/api/vendors"
        );
        setVendors(response.data);
        if (response.data.length > 0) {
          setSelectedVendor(response.data[0]._id);
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
            `https://loncabackend.onrender.com/api/sales/vendors/${selectedVendor}/monthly`
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

  const chartData = {
    labels: salesData.map((item) => item.period),
    datasets: [
      {
        label: "Total Sales",
        data: salesData.map((item) => item.salesValue),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Trend",
      },
    },
  };

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
          <option key={vendor._id} value={vendor._id}>
            {vendor.name}
          </option>
        ))}
      </select>

      {salesData.length > 0 ? (
        <div>
          <div style={{ marginBottom: "2rem", marginTop: "1rem" }}>
            <Line options={chartOptions} data={chartData} />
          </div>
          <table>
            <thead>
              <tr>
                <th>Year - Month</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item) => (
                <tr key={item.period}>
                  <td>{item.period}</td>
                  <td>{item.salesValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
