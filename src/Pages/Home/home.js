import React from "react";
import LayoutComponent from "../../Components/LayoutComponentUsual/layoutComponent";
import BarChart from "./Grafics/barChart";
import LineCharts from "./Grafics/lineChart";
import PieCharts from "./Grafics/pieChart";
import "./home.css"

function Home(){
    return(
        <LayoutComponent title="Home">
            <div className="wrap-charts">
                <div className="lineChart">
                    <LineCharts />
                </div>

                <div className="small-charts">
                    <div className="pie-chart">
                        <span>Contas a Pagar</span>
                        <PieCharts />
                    </div>

                    <div className="bar-chart">
                        <BarChart />
                    </div>
                </div>
            </div>
        </LayoutComponent>
    )
}

export default Home