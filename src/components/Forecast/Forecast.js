import { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import "./Forecast.css";

function Forecast({ city }) {
    const [chart, setChart] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [date, setDate] = useState(new Date());  
    const [isChartLoaded, setIsChartLoaded] = useState(false);    

    useEffect(() => {
        const now = new Date();
        const isToday = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
        
        const parseForecast = (data) => {
        let filteredData = data.list;
        if (!isToday) {
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            filteredData = data.list.filter((item) => item.dt_txt.includes(formattedDate));
        }
        
        const parsedData = filteredData.map((item) => ({
            time: new Date(item.dt_txt).toLocaleString('en-US', { weekday: 'short', hour: 'numeric', hour12: true }),
            temp: Math.round(item.main.temp),
            icon: item.weather[0].main,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
        }));

        if (isToday) {
            const nowHour = now.getHours();
            const maxHours = 24 - nowHour;
            parsedData.splice(maxHours);
        }
        return parsedData;
        };    

        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&dt=${date}&appid=${process.env.REACT_APP_APIKEY}`,
        )
            .then(res => res.json())
            .then(result => {
            if (result.cod === '200') {
                const parsedData = parseForecast(result);
                setForecast(parsedData);
            }
            });
        }, [city, date])
    
    useEffect(() => {

        if (forecast.length > 0) {
        const labels = forecast.map((forecastItem) => forecastItem.time);
        const data = forecast.map((forecastItem) => forecastItem.temp);
        const humidityData = forecast.map((forecastItem) => forecastItem.humidity);
        const pressureData = forecast.map((forecastItem) => forecastItem.pressure);
            
        if (chart) {
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.data.datasets[0].humidityData = humidityData;
            chart.data.datasets[0].pressureData = pressureData;
            chart.update();
        } else {
            const ctx = document.getElementById("chart").getContext("2d");
            const newChart = new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [
                {
                    pressureData,
                    humidityData,
                    data,
                    borderColor: "rgba(75, 192, 192, 0.5)",
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    pointRadius: 20,
                    pointBorderColor: function(context) {
                        var temp = context.dataset.data[context.dataIndex];
                        if (temp < 0) {
                            return "rgba(0, 123, 255, 0.8)"; // Blue for very cold temperatures
                        } else if (temp < 10) {
                            return "rgba(40, 167, 69, 0.8)"; // Green for cool temperatures
                        } else if (temp < 20) {
                            return "rgba(255, 193, 7, 0.8)"; // Yellow for warm temperatures
                        } else {
                            return "rgba(220, 53, 69, 0.8)"; // Red for hot temperatures
                        }
                        
                    },
                    fill: false,
                    borderWidth: 3,
                    hoverBorderColor: function(context) {
                        var temp = context.dataset.data[context.dataIndex];
                        if (temp < 0) {
                            return "rgba(0, 123, 255, 0.5)"; // Blue for very cold temperatures
                        } else if (temp < 10) {
                            return "rgba(40, 167, 69, 0.5)"; // Green for cool temperatures
                        } else if (temp < 20) {
                            return "rgba(255, 193, 7, 0.5)"; // Yellow for warm temperatures
                        } else {
                            return "rgba(220, 53, 69, 0.5)"; // Red for hot temperatures
                        }
                        
                    },
                    pointHoverBackgroundColor: function(context) {
                        var temp = context.dataset.data[context.dataIndex];
                        if (temp < 0) {
                            return "rgba(0, 123, 255, 0.3)"; // Blue for very cold temperatures
                        } else if (temp < 10) {
                            return "rgba(40, 167, 69, 0.3)"; // Green for cool temperatures
                        } else if (temp < 20) {
                            return "rgba(255, 193, 7, 0.3)"; // Yellow for warm temperatures
                        } else {
                            return "rgba(220, 53, 69, 0.3)"; // Red for hot temperatures
                        }
                        
                    },
                    pointHoverRadius: 30,
                    hoverBorderWidth: 30,
                    fill: false,
                    pointBackgroundColor: function(context) {
                        var temp = context.dataset.data[context.dataIndex];
                        if (temp < 0) {
                            return "rgba(0, 123, 255, 0.7)"; // Blue for very cold temperatures
                        } else if (temp < 10) {
                            return "rgba(40, 167, 69, 0.7)"; // Green for cool temperatures
                        } else if (temp < 20) {
                            return "rgba(255, 193, 7, 0.7)"; // Yellow for warm temperatures
                        } else {
                            return "rgba(220, 53, 69, 0.7)"; // Red for hot temperatures
                        }
                        
                    }
                    },
                    ],
            },
            options: {
                animations: {
                    tension: {
                      duration: 1000,
                      easing: 'linear',
                      from: 1,
                      to: 0,
                      loop: true
                    }
                  },
                responsive: true,
                scales: {
                y: {
                    grid: {borderColor: "rgba(75, 192, 192, 1)",borderWidth: 5,},
                    ticks: {
                        callback: function(value, index, ticks) {
                            return value.toFixed(1) + " °C";
                        },
                        color: function(context) {
                            const temp = context.tick.value
                            if (temp < 0) {
                                return "rgba(0, 123, 255, 0.7)"; // Blue for very cold temperatures
                            } else if (temp < 10) {
                                return "rgba(40, 167, 69, 0.7)"; // Green for cool temperatures
                            } else if (temp < 20) {
                                return "rgba(255, 193, 7, 0.7)"; // Yellow for warm temperatures
                            } else {
                                return "rgba(220, 53, 69, 0.7)"; // Red for hot temperatures
                            }
                        }, 
                        font: {
                            size: 20,
                            weight: "bold",
                          },
                        }
                    },
                    x: {
                        grid: {borderColor: "rgba(75, 192, 192, 1)",borderWidth: 5,},
                        ticks: {
                        color: "blue",
                        font: {
                            size: 20,
                            weight: "bold",
                          },
                        },}
                    },
    
                plugins: {
                tooltip: {
                    enabled: false,
    
                    external: (context) => {
                        let tooltipEl = document.getElementById('chartjs-tooltip');
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            tooltipEl.innerHTML = '<table></table>';
                            document.body.appendChild(tooltipEl);
                        }
                        const tooltipModel = context.tooltip;
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = '0';
                            return;
                        }
                        tooltipEl.classList.remove('below', 'no-transform');
                        if (tooltipModel.body) {
                            const dataFromCurrentElement = tooltipModel.dataPoints[0];
                            const currentElement = dataFromCurrentElement.dataIndex;
                            const temp = dataFromCurrentElement.formattedValue
                            const time = dataFromCurrentElement.label
                            const humidityLine = `Humidity: ${context.chart.data.datasets[0].humidityData[currentElement]}%`;
                            const pressureLine = `Pressure: ${context.chart.data.datasets[0].pressureData[currentElement]} hPa`; 
                            const borderColor = tooltipModel.chart.tooltip.labelColors[0].backgroundColor              
                            const innerHtml = `
                            <div style="border-collapse: separate; overflow: hidden; border-radius: 10px; box-shadow: 0 6px 12px rgba(0,0,0,.175);">
                                <div style="background-color: ${borderColor}; padding-top: 5px; padding-bottom: 6px; padding-left: 7px; color: #000; font-family: 'Poppins'; font-size: 14px; border-bottom: solid 1px #DDD">
                                <h3>Wether Forecast<h3>
                                </div>
                                <div style="display: flex; padding: 1.2rem; background-color: rgba(75, 192, 192, 0.5)">
                                <div class="tooltipText" style="display: flex; flex-direction: column; font-family: 'Poppins'; font-size: 14px; justify-content: flex-end;">
                                    <span style="font-weight: 600; color:black;">Time: ${time}</span>
                                    <span style="font-weight: 600;  color:black;">Temp: ${temp} °C</span>
                                    <span style="font-weight: 600;  color:black;">${humidityLine}</span>
                                    <span style="font-weight: 600;  color:black;">${pressureLine}</span>
                                </div>                          
                                </div>
                            </div>
                        `;
    
                            tooltipEl.querySelector('table').innerHTML = innerHtml;
                        }
    
                        const position = context.chart.canvas.getBoundingClientRect();
                        tooltipEl.style.opacity = '1';
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                        tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                        tooltipEl.style.pointerEvents = 'none';
                    }
                },             
                legend: {
                    display: false
                },
                title: {
                    display: false,
                },
            }
            },
            });
            setChart(newChart);
            setIsChartLoaded(!isChartLoaded)
        }
        }
    }, [forecast]);

    return (
        <>
        <div className="Results">
          <h2>Hourly Forecast for {city} - {date.toLocaleDateString()}</h2>
          <input type="datetime-local" value={`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.toTimeString().slice(0, 5)}`}
            min={new Date().toISOString().slice(0, 16)}
            max={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
            onChange={event => setDate(new Date(event.target.value))}/>
          <div className="chart-container">
            {!isChartLoaded && <h2>Reload the page to see the chart!</h2>}
            {forecast.length > 0 && (
              <canvas id="chart"></canvas>
            )}
          </div>
       </div>
        </>
    )
}

export default Forecast;