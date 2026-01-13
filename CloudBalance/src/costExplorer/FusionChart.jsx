import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import Loader from "../components/Loader";

// Initialize charts
ReactFC.fcRoot(FusionCharts, Charts);

const FusionChart = ({ typeIndex,xLabel,groupInstances,isLoading}) => {

    const graphType = ["mscolumn2d", "msline", "stackedcolumn2d"]

    const colors=["#2498FE","#61DBFD","#FFA214","#A3DC29","#7AF0CA","#F2CB00"]

    const chartConfigs = {
        type: graphType[typeIndex],
        animateResize: 1,    //resize animation
        animation: 1,
        // plotSpacePercent:"25",
        // minPlotWidth:"60",
        width: "100%",
        height: "60%",
        dataFormat: "json",
        dataSource: {
            chart: {
                xAxisName: "Months",
                yAxisName: "Cost (USD)",
                numberPrefix: "$",
                theme: "fusion",
                drawCrossLine: "1", //1: show helper tooltips , 0: not show helper tooltip
                showValues: "0", //1: show value at top of single bar graph , 0: not showing any value 
                // Smooth transition properties
                animationDuration: "1", // 1 second animation per render
                drawAnchors: "0",       
                showHoverEffect: "0"  ,  

                legendPosition: "bottom",
                legendItemFontSize: "12",
                legendBgAlpha: "0",
                legendBorderAlpha: "0",
                legendIconBorderThickness: "0",
                legendIconAlpha: "100",
                legendShadow: "0",

                baseFontSize: "13",
                bgColor: "#ffffff",

                showShadow: "0",
                usePlotGradientColor: "0",
                plotFillAlpha: "100",
                plotBorderAlpha: "0",

                //for outer border
                borderColor: "#e6e6e6",
                borderThickness: "1",
                borderAlpha: "100",

                //for inner border
                canvasBorderColor: "#e6e6e6",
                canvasBorderThickness: "2",
                canvasBorderAlpha: "100",

            },

            categories: [
                {
                    category:xLabel?xLabel:[
                        { label: "Oct 2024" },
                        { label: "Nov 2024" },
                        { label: "Dec 2024" },
                        { label: "Jan 2025" },
                        { label: "Feb 2025" },
                        { label: "Mar 2025" }
                    ]
                }
            ],

            dataset: groupInstances?Object.keys(groupInstances).slice(0,6).map((instance,index)=>(
                    {
                        seriesname: instance,
                        color:colors[index],
                        data:groupInstances[instance]
                    }
            )) : 
            [
                {
                    seriesname: "Amazon Elastic Compute Cloud",
                    color: "#2498FE",
                    data: [
                        { value: "90000" },
                        { value: "108000" },
                        { value: "106000" },
                        { value: "98000" },
                        { value: "85000" },
                        { value: "76000" }
                    ]
                },
                {
                    seriesname: "Amazon Simple Storage Service",
                    color: "#61DBFD",
                    data: [
                        { value: "42000" },
                        { value: "36000" },
                        { value: "38000" },
                        { value: "45000" },
                        { value: "40000" },
                        { value: "43000" }
                    ]
                },
                {
                    seriesname: "Savings Plans for AWS Compute usage",
                    color: "#FFA214",
                    data: [
                        { value: "35000" },
                        { value: "33000" },
                        { value: "34000" },
                        { value: "36000" },
                        { value: "34000" },
                        { value: "37000" }
                    ]
                },
                {
                    seriesname: "AWS Marketplace",
                    color: "#A3DC29",
                    data: [
                        { value: "52000" },
                        { value: "15000" },
                        { value: "14000" },
                        { value: "35000" },
                        { value: "42000" },
                        { value: "5000" }
                    ]
                },
                {
                    seriesname: "CK Discounts",
                    color: "#7AF0CA",
                    data: [
                        { value: "12000" },
                        { value: "8000" },
                        { value: "9000" },
                        { value: "11000" },
                        { value: "10000" },
                        { value: "7000" }
                    ]
                },
                {
                    seriesname: "Others",
                    color: "#F2CB00",
                    data: [
                        { value: "150000" },
                        { value: "152000" },
                        { value: "155000" },
                        { value: "158000" },
                        { value: "142000" },
                        { value: "160000" }
                    ]
                }
            ]
        }
    };

    return isLoading?<Loader/>:<ReactFC {...chartConfigs}/>;
};

export default FusionChart;
