'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportGraph = () => {
    const data = {
        labels: [
            'Cybersecurity Awareness',
            'Internet Safety',
            'Protecting Your Online Account',
            'Secure Home Computer',
            'Secure Mobile Device',
            'Secure Home Network',
            'Smart Device Security Risk',
            'Sharing Password',
        ],
        datasets: [
            {
                label: 'Score',
                data: [600, 750, 500, 800, 850, 700, 650, 900],
                backgroundColor: '#CF9FFF',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 12,
                    },
                    padding: 10,
                    // Custom callback to split labels into multiple lines
                    callback: function (value, index, values) {
                        const maxCharsPerLine = 15; // Maximum characters per line
                        const label = this.getLabelForValue(value).toString();

                        // Split the label into multiple lines
                        const words = label.split(' ');
                        let lines = [];
                        let currentLine = '';

                        for (const word of words) {
                            if ((currentLine + word).length > maxCharsPerLine) {
                                lines.push(currentLine.trim());
                                currentLine = word + ' ';
                            } else {
                                currentLine += word + ' ';
                            }
                        }

                        if (currentLine.trim()) {
                            lines.push(currentLine.trim());
                        }

                        return lines; // Return an array of lines
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                max: 900,
                grid: {
                    display: true,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="w-full h-full">
            <Bar data={data} className="lg:h-[450px] sm:h-[400px] h-[300px]" options={options} />
        </div>
    );
};

export default ReportGraph;