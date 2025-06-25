'use client';
import React from 'react';
import Gauge from 'react-gauge-component'; // Corrected import

const GaugeMeter = ({ value }) => {
    // Ensure the value is within the range 0-100
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
        <div className="flex justify-center items-center">
            <Gauge
                value={clampedValue} // Current value
                minValue={0} // Minimum value
                maxValue={100} // Maximum value
                arc={{
                    // Define the arcs with their respective colors
                    subArcs: [
                        { limit: 33, color: '#EF4444' }, // Red (0-33%)
                        { limit: 66, color: '#9333EA' }, // Purple (34-66%)
                        { limit: 100, color: '#22C55E' }, // Green (67-100%)
                    ],
                    padding: 0.02, // Padding between arcs
                    width: 0.3, // Width of the arcs
                }}
                labels={{
                    // Customize the labels
                    valueLabel: {
                        style: { fontSize: '24px', fill: '#000' }, // Style for the value label
                        formatTextValue: (value) => `${value}%`, // Format the value label
                    },
                    tickLabels: {
                        // Customize the tick labels (e.g., 0, 33, 66, 100)
                        type: 'outer', // Position of the tick labels
                        defaultTickValueConfig: {
                            style: { fontSize: '14px', fill: '#000' }, // Style for tick labels
                        },
                        ticks: [
                            { value: 0 }, // Start of the gauge
                            { value: 33 }, // End of the red arc
                            { value: 66 }, // End of the purple arc
                            { value: 100 }, // End of the green arc
                        ],
                    },
                }}
                pointer={{
                    // Customize the pointer
                    type: 'blob', // Type of pointer (blob, arrow, etc.)
                    color: '#000', // Color of the pointer
                    length: 0.7, // Length of the pointer
                    width: 10, // Width of the pointer
                }}
            />
        </div>
    );
};

export default GaugeMeter;