"use client";

import { Storage } from '@capacitor/storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TotalSales = () => {
    const [header, setHeader] = useState("");
    const [totalSales, setTotalSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const [tenantName, setTenantName] = useState("");

    useEffect(() => {
        // Retrieve tenantName from storage
        const getStoredTenantName = async () => {
            try {
                const { value } = await Storage.get({ key: 'tenantName' });
                if (value) {
                    setTenantName(value);
                }
            } catch (error) {
                console.error('Error getting tenantName:', error);
            }
        };
        getStoredTenantName();
    }, []);

    

    const formatRupees = (value) => {
        const roundedValue = parseFloat(value).toFixed(2);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
    }

    const formatWeight = (value) => {
        const roundedValue = parseFloat(value).toFixed(3);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
    }

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getFormattedDate();

    const fetchSales = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetTotalSaleValue?billDate=${date}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setTotalSales(data) }).catch((error) => { console.error('Error fetching data in dashboard todayRates:', error); })
    }

    useEffect(() => {
        fetchSales(date);
    }, [date, totalSales, tenantName]);

    return (
        <div className='w-full max-h-[1500px] block md:hidden'>
            <div className='px-[20px] sm:px-[50px] lg:px-[100px] py-[5px] sm:py-[10px] w-full h-full flex flex-col gap-[20px]'>
                {totalSales.map((sales, index) => (
                    <div key={index} className='w-full max-h-[140px] rounded-md overflow-hidden' >
                        <div className='h-[40px] bg-[#000000] flex items-center justify-start bg-opacity-80'>
                            <h1 className='px-[7px] text-[white] text-[14px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm'>{sales?.jewelType}</h1>
                        </div>
                        <div className={`min-h-[100px] h-full w-full ${sales?.jewelType === "DIAMOND SALES" ? "bg-[#d9ebf4]" : (sales?.jewelType === "SILVER SALES" ? "bg-[#ACACAC]" : "bg-[#ECDCC1]")} px-[10px] py-[5px] flex items-center justify-center flex-col gap-[5px]`}>
                            <div className='basis-[70%] flex w-full h-full'>
                                <div className='flex-1 text-[14px] w-full flex flex-col item-start justify-center gap-[3px]'>
                                    <p>Bills: <span className='font-semibold'>{sales?.billCount}</span></p>
                                    <p>Pieces: <span className='font-semibold'>{sales?.totPieces}</span> </p>
                                </div>
                                <div className='flex-1 text-[14px] flex flex-col w-full items-end justify-center gap-[3px]'>
                                    <p>Gwt: <span className='font-semibold'>{formatWeight(sales?.totGwt)}g</span></p>
                                    <p>Nwt: <span className='font-semibold'>{formatWeight(sales?.totNwt)}g</span></p>
                                </div>
                            </div>
                            <div className='basis-[30%] px-[20px] w-full h-full flex items-start justify-center'>
                                Value: <span className='font-semibold'>₹{formatRupees(sales?.netAmt)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default TotalSales;
