"use client";

import React, { useEffect, useState } from "react";
import VerticalBarChart from "@/components/Charts/VerticalBar";
import { Storage } from "@capacitor/storage";

const VerticalBar = () => {
    const [salesData, setSalesData] = useState([]);
    const [tenantName, setTenantName] = useState("");

    useEffect(() => {
        // Retrieve tenantName from storage
        const getStoredTenantName = async () => {
            try {
                const { value } = await Storage.get({ key: "tenantName" });
                if (value) {
                    setTenantName(value);
                }
            } catch (error) {
                console.error("Error getting tenantName:", error);
            }
        };
        getStoredTenantName();
    }, []);

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const date = getFormattedDate();

    const fetchSales = (date) => {
        fetch(
            `https://www.erpser.timeserasoftware.in/api/DashBoard/GetTotalSaleValue?billDate=${date}`,
            {
                headers: { tenantName },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setSalesData(data);
            })
            .catch((error) => {
                console.error("Error fetching data in dashboard todayRates:", error);
            });
    };

    useEffect(() => {
        if (tenantName) {
            fetchSales(date);
        }
    }, [date, tenantName]);

    // Calculate total sales
    const totalSales = salesData.reduce((sum, sale) => sum + sale.netAmt, 0);

    // Prepare data for the chart dynamically
    const data = {
        labels: salesData.map((sale) => sale.jewelType),
        datasets: [
            {
                label: "Amount Of Sales",
                data: salesData.map((sale) => sale.netAmt),
                backgroundColor: salesData.map((_, index) => {
                    // Assign dynamic colors based on index
                    const colors = [
                        "rgba(255, 206, 86, 1)", // Gold
                        "rgba(192, 192, 192, 1)", // Silver
                        "rgba(54, 162, 235, 1)", // Diamond
                        "rgba(75, 192, 192, 1)", // Additional colors for more types
                        "rgba(153, 102, 255, 1)", // Violet
                    ];
                    return colors[index % colors.length];
                }),
                borderColor: salesData.map((_, index) => {
                    const colors = [
                        "rgba(255, 206, 86, 1)",
                        "rgba(192, 192, 192, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                    ];
                    return colors[index % colors.length];
                }),
                borderWidth: 1,
            },
        ],
    };

    // Options for the chart
    const stepSize = Math.ceil(totalSales / 5); // Divide the total sales range into 5 equal parts
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                stepSize, // Set the step size for y-axis ticks
            },
        },
    };

    // Changing label color to dark blue
    const labelColor = "rgba(0, 0, 139, 1)"; // Dark blue color

    return (
        <div className="p-[20px]">
            <h1 className="font-semibold">Total Sales</h1>
            <VerticalBarChart data={data} options={options} labelColor={labelColor} />
        </div>
    );
};

export default VerticalBar;
