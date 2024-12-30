"use client";

import React, { useState, useEffect } from "react";
import { Storage } from "@capacitor/storage";
import VerticalBarChart from "@/components/Charts/VerticalBar"; // Import your chart component

const VerticalBar2 = () => {
    const [tenantName, setTenantName] = useState("");
    const [dailyTotals, setDailyTotals] = useState({});
    const [chartData, setChartData] = useState(null);

    const getFormattedDate = (offset = 0) => {
        const date = new Date();
        date.setDate(date.getDate() - offset);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

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

    const fetchSalesRegister = async (date) => {
        try {
            const res = await fetch(
                `https://www.erpser.timeserasoftware.in/api/Erp/GetTopFiveBills?fromDate=${date}&toDate=${date}`,
                {
                    headers: { tenantName: tenantName },
                }
            );
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Error fetching data in sales:", error);
            return [];
        }
    };

    useEffect(() => {
        if (tenantName) {
            const fetchAndProcessData = async () => {
                const totals = {};
                for (let i = 0; i < 4; i++) {
                    const date = getFormattedDate(i);
                    const salesData = await fetchSalesRegister(date);
                    totals[date] = salesData.reduce(
                        (sum, sale) => sum + parseFloat(sale.netAmt || 0),
                        0
                    );
                }
                setDailyTotals(totals);
            };

            fetchAndProcessData();
        }
    }, [tenantName]);

    useEffect(() => {
        if (Object.keys(dailyTotals).length > 0) {
            const labels = Object.keys(dailyTotals).reverse(); // Last 4 days in ascending order
            const data = labels.map((date) => dailyTotals[date]);

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Total Sales (Net Amount)",
                        data,
                        backgroundColor: "rgba(54, 162, 235, 0.8)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [dailyTotals]);

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-[10px]">
            <h1 className="font-bold">Sales Over the Last 4 Days</h1>
            {chartData ? (
                <VerticalBarChart data={chartData} options={options} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default VerticalBar2;
