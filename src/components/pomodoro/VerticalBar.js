import React, { useEffect, useState } from "react";
import Chart from "chart.js";

import { Bar } from "react-chartjs-2";
import auth from "../../auth/auth-helper";

const baseUrl = "https://focusedmode-1ee71-default-rtdb.firebaseio.com/users/";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var d = new Date();
var today = weekday[d.getDay()];

function VerticalBar() {
  const [data, setData] = useState({});
  const [dataProps, setDataProps] = useState({});

  const loadData = () => {
    fetch(baseUrl + auth.isAuthenticated() + "/pomodoro.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let pomodoros = data[weekday[d.getDay()]];
        let pomodoroCount = new Array(pomodoros);
        pomodoroCount.fill(1);
        setData(pomodoroCount);

        const currentData = weekdays.map((label) => data[label]);
        setDataProps({
          labels: weekdays,
          datasets: [
            {
              label: "# of Pomodoros",
              data: currentData,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        });
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="stats">
      <Bar
        data={dataProps}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default VerticalBar;
