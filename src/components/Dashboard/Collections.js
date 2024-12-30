"use client";

import { Storage } from '@capacitor/storage';
import React, { useEffect, useState } from 'react';

const Collections = () => {
    const [tenantName, setTenantName] = useState('');
    const [cash, setCash] = useState(0);
    const [cardAmount, setCardAmount] = useState(0);
    const [chequeAmount, setChequeAmount] = useState(0);
    const [onlineAmount, setOnlineAmount] = useState(0);
    const [upiAmount, setUpiAmount] = useState(0);
    const [gold, setGold] = useState(null); // For Old Gold
    const [silver, setSilver] = useState(null); // For Old Silver

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    }

    const [startSelected, setStartSelected] = useState(getFormattedDate());
    const [endSelected, setEndSelected] = useState(getFormattedDate());

    useEffect(() => {
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
    };

    const formatWeight = (value) => {
        const roundedValue = parseFloat(value).toFixed(3);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
    };

    const fetchCash = async (startDate, endDate) => {
        try {
            const response = await fetch(
                `https://www.erpser.timeserasoftware.in/api/Erp/GetCashBookCreditDebit?fromDate=${startDate}&toDate=${endDate}&saleCode=1`,
                {
                    headers: {
                        tenantName: tenantName,
                    },
                }
            );
            const data = await response.text();
            const cashValue = parseFloat(data);
            setCash(cashValue);
        } catch (error) {
            console.error('Error fetching cash:', error);
        }
    };

    const fetchBankCollection = (startDate, endDate) => {
        fetch(
            `https://www.erpser.timeserasoftware.in/api/Erp/GetBankCollection?fromDate=${startDate}&toDate=${endDate}`,
            {
                headers: {
                    tenantName: tenantName,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                // Map data to individual state variables
                data.forEach(item => {
                    switch (item.mode) {
                        case 'CARD':
                            setCardAmount(item.amount || 0);
                            break;
                        case 'CHEQUE':
                            setChequeAmount(item.amount || 0);
                            break;
                        case 'ONLINE':
                            setOnlineAmount(item.amount || 0);
                            break;
                        case 'UPI':
                            setUpiAmount(item.amount || 0);
                            break;
                    }
                });
            })
            .catch((error) => {
                console.error('Error fetching bank collection:', error);
            });
    };

    const fetchOldGoldSilver = (startDate, endDate) => {
        fetch(
            `https://www.erpser.timeserasoftware.in/api/Erp/GetOldGoldOldSilver?fromDate=${startDate}&toDate=${endDate}`,
            {
                headers: {
                    tenantName: tenantName,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                // Separate OLD GOLD and OLD SILVER into different states
                const goldItem = data.find((item) => item.particulars === 'OLD GOLD') || {};
                const silverItem = data.find((item) => item.particulars === 'OLD SILVER') || {};

                setGold(goldItem);
                setSilver(silverItem);
            })
            .catch((error) => {
                console.error('Error fetching old gold and silver:', error);
            });
    };

    useEffect(() => {
        fetchCash(startSelected, endSelected);
        fetchBankCollection(startSelected, endSelected);
        fetchOldGoldSilver(startSelected, endSelected);
    }, [tenantName, startSelected, endSelected]);

    return (
        <div className='px-[20px] sm:px-[50px] block md:hidden w-full h-full py-[20px] sm:py-[40px]'>
            <h1 className='px-[7px] text-[#162566]  text-[14px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm'>Collections</h1>
            <div className='w-full grid grid-cols-3 gap-[5px] mt-[10px]'>
                <div style={{ background: "radial-gradient(50% 50% at 50% 50%, #F9F9F9 81.83%, #F2F4FF 100%)" }} className=' w-full h-[100px] rounded-md border-[#52BD91] border-2 flex flex-col gap-[2px] items-center justify-center text-center text-[12px]'>
                    <p>Cash</p>
                    <p className='font-semibold text-[14px]'>₹{formatRupees(cash || 0)}</p>
                </div>
                <div style={{ background: "radial-gradient(50% 50% at 50% 50%, #F9F9F9 81.83%, #F2F4FF 100%)" }} className='w-full h-[100px] rounded-md border-[#52BD91] border-2 flex flex-col gap-[2px] items-center justify-center text-center text-[12px]'>
                    <p>Card</p>
                    <p className='font-semibold text-[14px]'>₹{formatRupees(cardAmount || 0)}</p>
                </div>
                <div style={{ background: "radial-gradient(50% 50% at 50% 50%, #F9F9F9 81.83%, #F2F4FF 100%)" }} className='w-full h-[100px] rounded-md border-[#52BD91] border-2 flex flex-col gap-[2px] items-center justify-center text-center text-[12px]'>
                    <p>Online</p>
                    <p className='font-semibold text-[14px]'>₹{formatRupees(onlineAmount || 0)}</p>
                </div>
                <div style={{ background: "radial-gradient(50% 50% at 50% 50%, #F9F9F9 81.83%, #F2F4FF 100%)" }} className='w-full h-[100px] rounded-md border-[#52BD91] border-2 flex flex-col gap-[2px] items-center justify-center text-center text-[12px]'>
                    <p>UPI</p>
                    <p className='font-semibold text-[14px]'>₹{formatRupees(upiAmount || 0)}</p>
                </div>
                {/* Old Gold */}
                <div style={{ background: "radial-gradient(50% 50% at 50% 50%, #F9F9F9 81.83%, #F2F4FF 100%)" }} className='w-full h-[100px] rounded-md border-[#52BD91] border-2 flex flex-col gap-[2px] items-center justify-center text-center text-[12px]'>
                    <p>{"Old Gold"}</p>
                    <p className='font-semibold text-[14px]'>{formatWeight((gold?.jama - gold?.nama) || 0)}g</p>
                    <p className='font-semibold text-[14px]'>₹{formatRupees(gold?.balance || 0)}</p>
                </div>
                {/* Old Silver */}
                <div style={{ background: "radial-gradient(50% 50% at 50% 50%, #F9F9F9 81.83%, #F2F4FF 100%)" }} className='w-full h-[100px] rounded-md border-[#52BD91] border-2 flex flex-col gap-[2px] items-center justify-center text-center text-[12px]'>
                    <p>{"Old Silver"}</p>
                    <p className='font-semibold text-[14px]'>{formatWeight((silver?.jama - silver?.nama) || 0)}g</p>
                    <p className='font-semibold text-[14px]'>₹{formatRupees(silver?.balance || 0)}</p>
                </div>
            </div>
        </div>
    )
}

export default Collections
