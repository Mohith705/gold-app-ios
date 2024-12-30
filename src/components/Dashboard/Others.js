"use client";

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Storage } from '@capacitor/storage';

const Others = () => {

    const [data, setData] = useState(null);
    const [order, setOrders] = useState(null);
    const [urdgold, setUrdGold] = useState(null);
    const [urdsilver, setUrdSilver] = useState(null);
    const [receipts, setReceipts] = useState(null);
    const [scheme, setScheme] = useState(null);

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

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getFormattedDate();
    const formatRupees = (value) => {
        const roundedValue = parseFloat(value).toFixed(2);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
    }

    const formatWeight = (value) => {
        const roundedValue = parseFloat(value).toFixed(3);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
    }

    const fetchData = (url, date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/${url}?todayDate=${date}`, { headers: { 'tenantName': tenantName } }).then((res) => res.json()).then((data) => {
            setData(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    };

    const fetchOrder = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetOrderAdvance?todayDate=${date}`, { headers: { 'tenantName': tenantName } }).then((res) => res.json()).then((data) => {
            setOrders(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    const fetchGold = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetURDPurchaseGold?todayDate=${date}`, { headers: { 'tenantName': tenantName } }).then((res) => res.json()).then((data) => {
            setUrdGold(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    const fetchSilver = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetURDPurchaseSilver?todayDate=${date}`, { headers: { 'tenantName': tenantName } }).then((res) => res.json()).then((data) => {
            setUrdSilver(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    const fetchReceipt = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetReceipt?todayDate=${date}`, { headers: { 'tenantName': tenantName } }).then((res) => res.json()).then((data) => {
            setReceipts(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    const fetchScheme = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetScheme?todayDate=${date}`, { headers: { 'tenantName': tenantName } }).then((res) => res.json()).then((data) => {
            setScheme(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    useEffect(() => {
        fetchData("GetCustomerAdvance", date);
        fetchOrder(date);
        fetchGold(date);
        fetchSilver(date);
        fetchReceipt(date);
        fetchScheme(date);
    }, [date, tenantName]);

    return (
        <div className='w-full max-h-[5000px]'>
            <div className='px-[20px] sm:px-[50px] block md:hidden w-full h-full py-[20px] sm:py-[40px]'>
                <h1 className='px-[7px] text-[#162566]  text-[14px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm'>Others</h1>
                <div className='w-full h-full grid grid-cols-3 gap-[9px] items-center justify-center text-center'>
                    <Link href="/advances" className='w-full h-[100px] shadow-lg border-2 border-[#52BD91] text-black text-[12px] font-normal bg-white rounded-[50%] flex flex-col gap-[3px] items-center justify-center'>
                        Advances
                        <p className='font-semibold text-[14px]'>₹ {(data !== null) && (formatRupees(data))}</p>
                    </Link>
                    <Link href={"/orders"} className='w-full h-[100px] shadow-lg border-2 border-[#52BD91] text-black text-[12px] font-normal bg-white rounded-[50%] flex flex-col gap-[3px] items-center justify-center'>
                        Orders
                        <p className='font-semibold text-[14px]'>₹{(order !== null) && formatRupees(order)}</p>
                    </Link>
                    <Link href={"/gold"} className='w-full h-[100px] shadow-lg border-2 border-[#52BD91] text-black text-[12px] font-normal bg-white rounded-[50%] flex flex-col gap-[3px] items-center justify-center'>
                        URD Gold
                        <p className='font-semibold text-[14px]'>{(urdgold !== null) && formatWeight(urdgold)}g</p>
                    </Link>
                    <Link href={"/silver"} className='w-full h-[100px] shadow-lg border-2 border-[#52BD91] text-black text-[12px] font-normal bg-white rounded-[50%] flex flex-col gap-[3px] items-center justify-center'>
                        URD Silver
                        <p className='font-semibold text-[14px]'>{(urdsilver !== null) && formatWeight(urdsilver)}g</p>
                    </Link>
                    <Link href={"/receipts"} className='w-full h-[100px] shadow-lg border-2 border-[#52BD91] text-black text-[12px] font-normal bg-white rounded-[50%] flex flex-col gap-[3px] items-center justify-center'>
                        Receipts
                        <p className='font-semibold text-[14px]'>₹{(receipts !== null) && formatRupees(receipts)}</p>
                    </Link>
                    <Link href={"/scheme"} className='w-full h-[100px] shadow-lg border-2 border-[#52BD91] text-black text-[12px] font-normal bg-white rounded-[50%] flex flex-col gap-[3px] items-center justify-center'>
                        Scheme
                        <p className='font-semibold text-[14px]'>₹{(scheme !== null) && formatRupees(scheme)}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Others
