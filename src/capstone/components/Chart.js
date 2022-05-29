import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Chart = () => {
  const authinfo = sessionStorage.getItem("auth");
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let count = [];
    let issueId = [];
    axios
      .get("http://localhost:3001/issues")
      .then((res) => {
        for (const dataObj of res.data) {
          count.push(parseInt(dataObj.viewcount));
          issueId.push(parseInt(dataObj.id));
        }
        setChartData({
          labels: issueId,
          datasets: [
            {
              label: "Ticket Viewed",
              data: count,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  if (!authinfo) {
    return <Redirect to="/signin" />;
  }
  return (
    <div className="container chart-info">
      <h1 className="text-center">Chart</h1>
      <div className="container chart-content">
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
