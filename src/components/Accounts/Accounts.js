"use client";

import { Storage } from '@capacitor/storage';
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const Accounts = () => {

    const [data, setData] = useState(null);
    const [orders, setOrders] = useState(null);
    const [advances, setAdvances] = useState(null);
    const [register, setRegister] = useState(null);
    const [scheme, setScheme] = useState(null);
    const [gold, setGold] = useState(null);
    const [silver, setSilver] = useState(null);
    const [journals, setJournals] = useState(null);
    const [cashTransactions, setCashTransactions] = useState(null);

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

    const [openStatus, setOpenStatus] = useState(
        new Array(10).fill(false)
    );

    const openAllFaqs = () => {
        setOpenStatus(new Array(8).fill(true));
    };

    const closeAllFaqs = () => {
        setOpenStatus(new Array(8).fill(false));
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

    const fetchData = () => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetOutStandingCustomer?filterName=&cityName=&custName=&mobileNum=`, {
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

    const fetchOrders = () => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetOrderAdvance?todayDate=${date}&filter=ALL`, {
            headers: { 'tenantname': tenantName }
        })
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchAdvances = () => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetCustomerAdvance?todayDate=${date}&filter=ALL`, {
            headers: { 'tenantname': tenantName }
        })
            .then((res) => res.json())
            .then((data) => {
                setAdvances(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchReceipts = () => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetReceipt?todayDate=${date}&filter=ALL`, {
            headers: { 'tenantname': tenantName }
        })
            .then((res) => res.json())
            .then((data) => {
                setRegister(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchScheme = () => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetScheme?todayDate=${date}&filter=ALL`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json())
            .then((data) => {
                setScheme(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const fetchGold = () => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetURDPurchaseGold?todayDate=${date}&filter=ALL`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json())
            .then((data) => {
                setGold(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const fetchSilver = () => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetURDPurchaseSilver?todayDate=${date}&filter=ALL`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json())
            .then((data) => {
                setSilver(data);
            })
            .catch((error) => {
                console.error("Error in fetching data in urd silver: ", error);
            });
    }

    const fetchJournals = (startDate, endDate) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/WebGetJournalEntryRegister?fromDate=${startDate}&toDate=${endDate}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json())
            .then((data) => {
                setJournals(data);
            })
            .catch((error) => {
                console.error("Error in fetching data in urd silver: ", error);
            });
    }

    const fetchTransactions = (startDate, endDate) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetCashBook?billStartDate=${startDate}&billEndDate=${endDate}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json())
            .then((data) => {
                setCashTransactions(data);
            })
            .catch((error) => {
                console.error("Error in fetching data in urd silver: ", error);
            });
    }

    const [startSelected, setStartSelected] = useState(getFormattedDate());
    const [endSelected, setEndSelected] = useState(getFormattedDate());

    const handleStartDateChange = (event) => {
        setStartSelected(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndSelected(event.target.value);
    };

    const formatRupees = (value) => {
        const roundedValue = parseFloat(value).toFixed(2);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
    }

    const formatWeight = (value) => {
        const roundedValue = parseFloat(value).toFixed(3);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
    }

    useEffect(() => {
        fetchData();
        fetchOrders();
        fetchAdvances();
        fetchReceipts();
        fetchScheme();
        fetchGold();
        fetchSilver();
    }, [tenantName]);

    useEffect(() => {
        fetchJournals(startSelected, endSelected);
        fetchTransactions(startSelected, endSelected);
    }, [startSelected, endSelected, tenantName])

    return (
        <div className='w-full max-h-[5000px] bg-[white]'>
            <div className='p-[20px] sm:p-[50px] lg:p-[100px]'>
                <div className='w-full flex justify-between items-center pb-[20px]'>
                    <div>
                        <h1 className='px-[7px] text-[#162566] text-[18px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm'>Accounts</h1>
                    </div>
                    <div className='flex gap-[5px] text-[12px] font-semibold text-[#162566]'>
                        <div onClick={() => openAllFaqs()} className='px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer'>Expand All <span className='text-[#52BD91]'>+</span></div>
                        <div onClick={() => closeAllFaqs()} className='px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer'>Collapse All <span className='text-[#52BD91]'>-</span></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 my-[15px] gap-[12px] sm:gap-[18px]">
                    <div className="border  border-[#162566] p-[2px] rounded-md w-full">
                        <input type="date" className="w-full" value={startSelected} onChange={handleStartDateChange} />
                    </div>



                    <div className="border border-[#162566] p-[2px] rounded-md w-full">
                        <input type="date" value={endSelected} onChange={handleEndDateChange} className="w-full" />
                    </div>
                </div>

                <div className='flex flex-col gap-[25px]'>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[0] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(0)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Cash Transactions</span>
                            {openStatus[0] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[0] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {cashTransactions?.map((item, index) => (

                                    <div className='w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[100%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[16px] text-[#000] font-semibold'>{item?.productname}</h1>
                                                <p className='text-[14px]'>Particulars: <span className='font-semibold'>{item?.particulars}</span></p>
                                                <p className='text-[15px]'>Date: {(item?.billdate?.substring(0, 10)?.split('-')?.reverse()?.join('-'))}</p>
                                            </div>
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.debit)}</p>
                                                <p className='text-[14px] font-normal'>Debit</p>
                                            </div>
                                            <div className='flex flex-col h-full items-center justify-center'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold px-2'>#{item?.billno}</p>
                                                <p className='text-[14px] font-normal'>Bill.No</p>
                                            </div>
                                        </div>
                                        <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-semibold'>Desc: {(item?.description)} </p>
                                            {/* <p className='flex-1 text-[14px] font-semibold'>NWT: {formatWeight(item?.nwt)} g</p> */}
                                        </div>
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[1] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(1)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Outstanding Customers</span>
                            {openStatus[1] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white" />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary" />
                            )}
                        </button>
                        {openStatus[1] === true && (
                            <div className='max-h-[950px] overflow-auto w-full flex flex-col gap-[15px] bg-[#D6D6D6] p-[15px]'>
                                {
                                    data?.map((out, index) => (
                                        <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>
                                            <div className='basis-[40%] flex justify-between items-center w-full h-full font-semibold gap-[10px]'>
                                                <h1 className='flex-1 text-[14px] text-[#000]'>{out?.custname}</h1>
                                                <p className='flex-1 text-[14px] flex items-center justify-center bg-[#52bd91bf] px-[5px] py-[5px] rounded-xl text-black'>Due: ₹ {(out?.debit - out?.credit)}</p>
                                            </div>
                                            <div className='basis-[30%] flex justify-between items-center w-full h-full'>
                                                <p className='flex-1 text-[14px] font-normal'>Place: <span className=''>{out?.cityname}</span> </p>
                                                {/* <p className='flex-1 text-[12px] font-semibold'>Total Amt: {}</p> */}
                                            </div>
                                            <div className='basis-[20%] flex justify-start items-center py-[3px] border border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                                <p className='text-[14px] font-semibold'>Mobile: {out?.mobilenum}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[2] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(2)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Orders</span>
                            {openStatus[2] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[2] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {orders?.map((item, index) => (

                                    <div className='h-full w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[47%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[70%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[14px] text-[#000] font-semibold'>{item?.custName}</h1>
                                                <p className='text-[15px]'>Mobile: {item?.mobileNo}</p>
                                                <p className='text-[15px]'>Date: {item?.recDate.substring(0, 10).split('-').reverse().join('-')}</p>
                                            </div>
                                            <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                <div className='flex flex-col h-full'>
                                                    <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item?.recNo}</p>
                                                    <p className='text-[14px] font-normal'>RecNo</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='basis-[53%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            {/* <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.totWorth)}</p>
                                                <p className='text-[15px] font-normal'>Amount</p>
                                            </div> */}
                                            {/* <div className='flex flex-col h-full'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item?.netAmt}</p>
                                                <p className='text-[12px] font-normal'>Net Amt</p>
                                            </div> */}
                                            <div className='flex items-center justify-center gap-[10px]'>
                                                <p className='text-[14px] font-normal'>Paid Amt: </p>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.totalamt)}</p>
                                            </div>
                                        </div>
                                        {/* <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-normal'>GWT: <span className='font-semibold'>{formatWeight(item?.totGwt)} g</span></p>
                                            <p className='flex-1 text-[14px] font-normal'>NWT: <span className='font-semibold'>{formatWeight(item?.totNwt)} g</span></p>
                                        </div> */}
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[3] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(3)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Advances</span>
                            {openStatus[3] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[3] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {advances?.map((item, index) => (

                                    <div className='h-full w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[47%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[70%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[14px] text-[#000] font-semibold'>{item?.custName}</h1>
                                                <p className='text-[15px]'>Mobile: {item?.mobilenum}</p>
                                                <p className='text-[15px]'>Date: {item?.recDate.substring(0, 10).split('-').reverse().join('-')}</p>
                                            </div>
                                            <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                <div className='flex flex-col h-full'>
                                                    <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item?.recno}</p>
                                                    <p className='text-[14px] font-normal'>RecNo</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='basis-[53%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            {/* <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.totWorth)}</p>
                                                <p className='text-[15px] font-normal'>Amount</p>
                                            </div> */}
                                            {/* <div className='flex flex-col h-full'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item?.netAmt}</p>
                                                <p className='text-[12px] font-normal'>Net Amt</p>
                                            </div> */}
                                            <div className='flex items-center justify-center gap-[10px]'>
                                                <p className='text-[14px] font-normal'>Paid Amt</p>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.paidAmt)}</p>
                                            </div>
                                        </div>
                                        {/* <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-normal'>GWT: <span className='font-semibold'>{formatWeight(item?.totGwt)} g</span></p>
                                            <p className='flex-1 text-[14px] font-normal'>NWT: <span className='font-semibold'>{formatWeight(item?.totNwt)} g</span></p>
                                        </div> */}
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[4] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(4)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Receipts</span>
                            {openStatus[4] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[4] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {register?.map((item, index) => (

                                    <div className='h-full w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[47%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[70%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[14px] text-[#000] font-semibold'>{item?.custName}</h1>
                                                <p className='text-[15px]'>Mobile: {item?.mobilenum}</p>
                                                <p className='text-[15px]'>Date: {item?.recDate.substring(0, 10).split('-').reverse().join('-')}</p>
                                            </div>
                                            <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                <div className='flex flex-col h-full'>
                                                    <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item?.recno}</p>
                                                    <p className='text-[14px] font-normal'>RecNo</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='basis-[53%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            {/* <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.totWorth)}</p>
                                                <p className='text-[15px] font-normal'>Amount</p>
                                            </div> */}
                                            {/* <div className='flex flex-col h-full'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold'>{item?.netAmt}</p>
                                                <p className='text-[12px] font-normal'>Net Amt</p>
                                            </div> */}
                                            <div className='flex items-center justify-center gap-[10px]'>
                                                <p className='text-[14px] font-normal'>Paid Amt</p>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.paidAmt)}</p>
                                            </div>
                                        </div>
                                        {/* <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-normal'>GWT: <span className='font-semibold'>{formatWeight(item?.totGwt)} g</span></p>
                                            <p className='flex-1 text-[14px] font-normal'>NWT: <span className='font-semibold'>{formatWeight(item?.totNwt)} g</span></p>
                                        </div> */}
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>
                    {/* <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[5] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(5)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Scheme</span>
                            {openStatus[5] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[5] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {scheme?.map((item, index) => (

                                    <div className='h-full w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[70%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[14px] text-[#000]'>{item?.custName}</h1>
                                                <p className='text-[14px]'>Mobile: {item?.mobilenum}</p>
                                            </div>
                                            <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                #{item?.recno}
                                            </div>
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.totWorth)}</p>
                                                <p className='text-[14px] font-normal'>Amount</p>
                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.paidAmt)}</p>
                                                <p className='text-[14px] font-normal'>Paid Amt</p>
                                            </div>
                                        </div>
                                        <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-semibold'>GWT: {formatWeight(item?.totGwt)} g</p>
                                            <p className='flex-1 text-[14px] font-semibold'>NWT: {formatWeight(item?.totNwt)} g</p>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        )}
                    </div> */}
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[6] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(6)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">URD Gold</span>
                            {openStatus[6] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[6] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {gold?.map((item, index) => (

                                    <div className='w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[100%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[16px] text-[#000] font-semibold'>{item?.productname}</h1>
                                                <p className='text-[14px]'>Customer: <span className='font-semibold'> {item?.dealername} </span></p>
                                                <p className='text-[15px]'>Date: {item?.pdate.substring(0, 10).split('-').reverse().join('-')}</p>
                                            </div>
                                            {/* <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                #{item?.pno}
                                            </div> */}
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.total)}</p>
                                                <p className='text-[14px] font-normal'>Amount</p>
                                            </div>
                                            <div className='flex flex-col h-full items-center justify-center'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold px-2'>#{item?.pno}</p>
                                                <p className='text-[14px] font-normal'>P.No</p>
                                            </div>
                                        </div>
                                        <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-semibold'>GWT: {formatWeight(item?.gwt)} g</p>
                                            <p className='flex-1 text-[14px] font-semibold'>NWT: {formatWeight(item?.nwt)} g</p>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[7] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(7)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">URD Silver</span>
                            {openStatus[7] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[7] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {silver?.map((item, index) => (

                                    <div className='w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[100%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[16px] text-[#000] font-semibold'>{item?.productname}</h1>
                                                <p className='text-[14px]'>Customer: <span className='font-semibold'> {item?.dealername} </span></p>
                                                <p className='text-[15px]'>Date: {item?.pdate.substring(0, 10).split('-').reverse().join('-')}</p>
                                            </div>
                                            {/* <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                                                #{item?.pno}
                                            </div> */}
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.total)}</p>
                                                <p className='text-[14px] font-normal'>Amount</p>
                                            </div>
                                            <div className='flex flex-col h-full items-center justify-center'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold px-2'>#{item?.pno}</p>
                                                <p className='text-[14px] font-normal'>P.No</p>
                                            </div>
                                        </div>
                                        <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-semibold'>GWT: {formatWeight(item?.gwt)} g</p>
                                            <p className='flex-1 text-[14px] font-semibold'>NWT: {formatWeight(item?.nwt)} g</p>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>

                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[8] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(8)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Journal Payment</span>
                            {openStatus[8] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[8] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {journals?.filter(item => item.mainhead === 'JOURNAL PAYMENT')?.map((item, index) => (

                                    <div className='w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[100%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[16px] text-[#000] font-semibold'>{item?.productname}</h1>
                                                <p className='text-[14px]'>Particulars: <span className='font-semibold'>{item?.particulars}</span></p>
                                                <p className='text-[15px]'>Date: {(item?.sdate.substring(0, 10).split('-').reverse().join('-'))}</p>
                                            </div>
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.debiT_PAYMENT)}</p>
                                                <p className='text-[14px] font-normal'>Debit</p>
                                            </div>
                                            <div className='flex flex-col h-full items-center justify-center'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold px-2'>#{item?.entryno}</p>
                                                <p className='text-[14px] font-normal'>Entry.No</p>
                                            </div>
                                        </div>
                                        <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-semibold'>GWT: {formatWeight(item?.isS_GWT)} g</p>
                                            <p className='flex-1 text-[14px] font-semibold'>NWT: {formatWeight(item?.isS_NWT)} g</p>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        )}
                    </div>


                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[9] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(9)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Journal Receipt</span>
                            {openStatus[9] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[9] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                {journals?.filter(item => item.mainhead === 'JOURNAL RECEIPT')?.map((item, index) => (

                                    <div className='w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                                        <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                                            <div className='basis-[100%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                                                <h1 className='text-[16px] text-[#000] font-semibold'>{item?.productname}</h1>
                                                <p className='text-[14px]'>Particulars: <span className='font-semibold'>{item?.particulars}</span></p>
                                                <p className='text-[15px]'>Date: {(item?.sdate.substring(0, 10).split('-').reverse().join('-'))}</p>
                                            </div>
                                        </div>
                                        <div className='basis-[40%] w-full h-full rounded-xl flex items-center justify-between bg-[#d9d9d963] p-[5px]'>
                                            <div className='flex flex-col'>
                                                <p className='text-[16px] font-semibold'>₹ {formatRupees(item?.debiT_PAYMENT)}</p>
                                                <p className='text-[14px] font-normal'>Debit</p>
                                            </div>
                                            <div className='flex flex-col h-full items-center justify-center'>
                                                <p className='bg-[#52bd91bf] text-center py-[5px] rounded-lg font-semibold px-2'>#{item?.entryno}</p>
                                                <p className='text-[14px] font-normal'>Entry.No</p>
                                            </div>
                                        </div>
                                        <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                                            <p className='flex-1 text-[14px] font-semibold'>GWT: {formatWeight(item?.reC_GWT)} g</p>
                                            <p className='flex-1 text-[14px] font-semibold'>NWT: {formatWeight(item?.reC_NWT)} g</p>
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

export default Accounts;
