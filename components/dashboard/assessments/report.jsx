'use client'
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ReportGraph from "./report-graph";
import GaugeMeter from "../shared/GuageMeter";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report = () => {
    const barData = {
        labels: [
            "Cybersecurity Awareness",
            "Internet Safety",
            "Protecting Your Online Account",
            "Secure Home Computer",
            "Secure Mobile Device",
            "Secure Home Network",
            "Smart Device Security Risk",
            "Saahing Password"
        ],
        datasets: [
            {
                label: "Score",
                data: [600, 750, 500, 800, 850, 700, 650, 900],
                backgroundColor: "#CF9FFF",
            },
        ],
    };

    const barOptions = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 900,
            },
        },
        legend: {
            display: false
        }
    };

    return (
        <div className="p-8  min-h-screen">
            <div className="flex lg:flex-row flex-col justify-between items-center min-h-[210px] h-full mb-6 gap-6">
                <div className="border border-bordered bg-[#FCAE6603] flex flex-col gap-4 h-full rounded-xl p-4">
                    <h2 className=" text-gray">Your Inturity Score Report</h2>
                    <div className="bg-[#FCAE660A] border w-fit border-darkPurple rounded-full px-6 py-3" >
                        <h1 className="lg:text-3xl sm:text-2xl text-xl font-medium text-darkPurple">888 Very Good</h1>
                    </div>

                    <p className="text-gray text-xs mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod amet, consectetur adipiscing elit, sed do eiusmod...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod amet, consectetur adipiscing elit, sed do eiusmod...r adipiscing elit, sed do eiusmod amet, consectetur adipiscing elit, sed do eiusmod...
                    </p>
                </div>

                {/* Gauge Section */}
                <div className="border lg:w-fit w-full justify-center items-center border-bordered h-full flex rounded-xl p-4">
                    <GaugeMeter value={75} />
                </div>
            </div>

            <div className="border border-bordered rounded-xl p-4 py-8">
                <ReportGraph />
            </div>
        </div>
    );
};

export default Report;
