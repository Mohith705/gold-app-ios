"use client";

import { Storage } from '@capacitor/storage';
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const Topfive = () => {

    const [data, setData] = useState(null);
    const [invoices, setInvoices] = useState(null);
    const [products, setProducts] = useState(null);
    const [dealers, setDealers] = useState(null);
    const [sales, setSales] = useState(null);
    const [counters, setCounters] = useState(null);

    const [tenantName, setTenantName] = useState('');

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

    const [openStatus, setOpenStatus] = useState(
        new Array(5).fill(false)
    );

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getFormattedDate();

    // console.log(date);

    const formatRupees = (value) => {
        const roundedValue = parseFloat(value).toFixed(2);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
    }

    const formatWeight = (value) => {
        const roundedValue = parseFloat(value).toFixed(3);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
    }
    const openAllFaqs = () => {
        setOpenStatus(new Array(5).fill(true));
    };

    const closeAllFaqs = () => {
        setOpenStatus(new Array(5).fill(false));
    };

    const toggleAccordion = (index) => {
        const newOpenStatus = [...openStatus];
        for (let i = 0; i < newOpenStatus.length; i++) {
            if (i !== index) {
                newOpenStatus[i] = false;
            }
        }
        newOpenStatus[index] = !newOpenStatus[index];
        setOpenStatus(newOpenStatus);
    };

    const fetchData = (url, startDate, endDate) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/${url}?fromDate=${startDate}&toDate=${endDate}`, {
            headers: { 'tenantname': tenantName }
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchInvoices = (startDate, endDate) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetTopFiveBills?fromDate=${startDate}&toDate=${endDate}`, {
            headers: { 'tenantname': tenantName }
        })
            .then((res) => res.json())
            .then((data) => {
                setInvoices(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const fetchProducts = (startDate, endDate) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetTopFiveProducts?fromDate=${startDate}&toDate=${endDate}`, {
            headers: { 'tenantname': tenantName }
        })
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const fetchDealers = (startDate, endDate) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetTopFiveDealera?fromDate=${startDate}&toDate=${endDate}`, {
            headers: { 'tenantname': tenantName }
        })
            .then((res) => res.json())
            .then((data) => {
                setDealers(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const fetchSales = (startDate, endDate) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetTopFiveSalesMan?fromDate=${startDate}&toDate=${endDate}`, {
            headers: { 'tenantname': tenantName }
        })
            .then((res) => res.json())
            .then((data) => {
                setSales(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const fetchCounters = (startDate, endDate) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetTopFiveCounters?fromDate=${startDate}&toDate=${endDate}`, {
            headers: { 'tenantname': tenantName }
        })
            .then((res) => res.json())
            .then((data) => {
                setCounters(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetchInvoices(date, date);
        fetchProducts(date, date);
        fetchSales(date, date);
        fetchDealers(date, date);
        fetchCounters(date, date);
    }, [date, tenantName]);

    function formatAmount(number) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(number);
    }
    
    // console.log("Invoices:"+invoices);

    return (
        <div className='w-full max-h-[5000px] bg-[white]'>
            <div className='p-[20px] sm:p-[50px] lg:p-[100px]'>
                <div className='w-full flex justify-between items-center pb-[20px]'>
                    <div>
                        <h1 className='px-[7px] text-[#162566] text-[16px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm'>Top 5 </h1>
                    </div>
                    <div className='flex gap-[5px] text-[12px] font-semibold text-[#162566]'>
                        <div onClick={() => openAllFaqs()} className='px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer'>Expand All +</div>
                        <div onClick={() => closeAllFaqs()} className='px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer'>Collapse All -</div>

                    </div>
                </div>
                <div className='flex flex-col gap-[25px]'>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[0] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => { toggleAccordion(0) }}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Top 5 Invoices</span>
                            {openStatus[0] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[0] === true && (
                            <div className='max-h-[400px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {invoices?.slice(0, 5).map((item, index) => (

                                    <div className='h-full w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[30%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[70%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[16px] text-[#000]'>{item?.custName}</h1>
                                                <p className='text-[14px]'>Invoice #: <span className='font-semibold'> {item?.billNo} </span></p>
                                            </div>
                                            <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                #{index + 1}
                                            </div>
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.netAmt)}</p>
                                                <p className='text-[14px] font-normal'>Amount</p>
                                            </div>
                                            <div className='flex flex-col h-full'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item.totPieces}</p>
                                                <p className='text-[14px] font-normal'>Pieces</p>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <p className='text-[14px] font-normal'>Jewel Type: <span className='font-semibold'>{item?.jewelType}</span> </p>
                                        </div>
                                        <div className='basis-[20%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-normal'>GWT: <span className='font-semibold'>{formatWeight(item?.totGwt)} g</span> </p>
                                            <p className='flex-1 text-[14px] font-normal'>NWT: <span className='font-semibold'>{formatWeight(item?.totNwt)} g</span> </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[1] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => { toggleAccordion(1) }}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Top 5 Products</span>
                            {openStatus[1] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[1] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {products?.slice(0, 5).map((item, index) => (

                                    <div className='h-full w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[70%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[16px] text-[#000]'>{item?.productName}</h1>
                                                <p className='text-[14px]'>Jewel Type: {item?.jewelType}</p>
                                            </div>
                                            <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                #{index + 1}
                                            </div>
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>{formatAmount(item?.totamt)}</p>
                                                <p className='text-[14px] font-normal'>Amount</p>
                                            </div>
                                            <div className='flex flex-col h-full'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item.pieces}</p>
                                                <p className='text-[14px] font-normal'>Pieces</p>
                                            </div>
                                        </div>
                                        <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-normal'>GWT: <span className='font-semibold'>{formatWeight(item?.gwt)} g</span> </p>
                                            <p className='flex-1 text-[14px] font-normal'>NWT: <span className='font-semibold'>{formatWeight(item?.nwt)} g</span> </p>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[2] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => { toggleAccordion(2) }}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Top 5 Dealers</span>
                            {openStatus[2] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[2] === true && (
                            <div className='max-h-[350px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {dealers?.slice(0, 5).map((item, index) => (

                                    <div className='h-full w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[70%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[16px] text-[#000]'>{item?.dealername}</h1>
                                                <p className='text-[14px]'>Jewel Type: {item?.jewelType}</p>
                                            </div>
                                            <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                #{index + 1}
                                            </div>
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>{formatAmount(item?.totamt)}</p>
                                                <p className='text-[14px] font-normal'>Amount</p>
                                            </div>
                                            <div className='flex flex-col h-full'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item.pieces}</p>
                                                <p className='text-[14px] font-normal'>Pieces</p>
                                            </div>
                                        </div>
                                        <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-normal'>GWT: <span className='font-semibold'>{formatWeight(item?.gwt)} g</span> </p>
                                            <p className='flex-1 text-[14px] font-normal'>NWT: <span className='font-semibold'>{formatWeight(item?.nwt)} g</span> </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[3] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => { toggleAccordion(3) }}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Top 5 Sales Man</span>
                            {openStatus[3] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[3] === true && (
                            <div className='max-h-[350px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {sales?.slice(0, 5).map((item, index) => (

                                    <div className='h-full w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[70%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[16px] text-[#000]'>{item?.smcode}</h1>
                                                <p className='text-[14px]'>Jewel Type: {item?.jewelType}</p>
                                            </div>
                                            <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                #{index + 1}
                                            </div>
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>{formatAmount(item?.totamt)}</p>
                                                <p className='text-[14px] font-normal'>Amount</p>
                                            </div>
                                            <div className='flex flex-col h-full'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item.pieces}</p>
                                                <p className='text-[14px] font-normal'>Pieces</p>
                                            </div>
                                        </div>
                                        <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-normal'>GWT: <span className='font-semibold'>{formatWeight(item?.gwt)} g</span> </p>
                                            <p className='flex-1 text-[14px] font-normal'>NWT: <span className='font-semibold'>{formatWeight(item?.nwt)} g</span> </p>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[4] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => { toggleAccordion(4) }}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Top 5 Counters</span>
                            {openStatus[4] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[4] === true && (
                            <div className='max-h-[350px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {counters?.slice(0, 5).map((item, index) => (

                                    <div className='h-full w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[70%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[16px] text-[#000]'>{item?.countername}</h1>
                                            </div>
                                            <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                #{index + 1}
                                            </div>
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>{formatAmount(item?.totamt)}</p>
                                                <p className='text-[14px] font-normal'>Amount</p>
                                            </div>
                                            <div className='flex flex-col h-full'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item.pieces}</p>
                                                <p className='text-[14px] font-normal'>Pieces</p>
                                            </div>
                                        </div>
                                        <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-normal'>GWT: <span className='font-semibold'>{formatWeight(item?.gwt)}g</span> </p>
                                            <p className='flex-1 text-[14px] font-normal'>NWT: <span className='font-semibold'>{formatWeight(item?.nwt)}g</span> </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topfive
