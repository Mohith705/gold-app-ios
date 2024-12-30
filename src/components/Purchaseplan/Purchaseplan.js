"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Storage } from "@capacitor/storage";

const Purchaseplan = () => {
    const [schemeSettlement, setSchemeSettlement] = useState(null);
    const [dailyCollections, setDailyCollections] = useState(null);
    const [memberList, setMemberList] = useState(null);

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

    const today = new Date();

    const [openStatus, setOpenStatus] = useState(new Array(7).fill(false));

    const openAllFaqs = () => {
        setOpenStatus(new Array(7).fill(true));
    };

    const closeAllFaqs = () => {
        setOpenStatus(new Array(7).fill(false));
    };

    const formatRupees = (value) => {
        const roundedValue = parseFloat(value).toFixed(2);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
    }

    const formatWeight = (value) => {
        const roundedValue = parseFloat(value).toFixed(3);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
    }

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

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const [startSelected, setStartSelected] = useState(getFormattedDate());
    const [endSelected, setEndSelected] = useState(getFormattedDate());

    const handleStartDateChange = (event) => {
        setStartSelected(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndSelected(event.target.value);
    };

    const fetchSchemeSettlement = (startDate, endDate) => {
        fetch(
            `https://www.erpser.timeserasoftware.in/api/Erp/GetSchemeSettilment?fromDate=${startDate}&toDate=${endDate}`,
            {
                headers: { tenantName: tenantName },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setSchemeSettlement(data);
            })
            .catch((error) => {
                console.error("Error fetching data in pws:", error);
            });
    }

    const fetchDailyCollections = (startDate, endDate) => {
        fetch(
            `https://www.erpser.timeserasoftware.in/api/Erp/WebGetSchemeReceiptRegisterMast?fromDate=${startDate}&toDate=${endDate}`,
            {
                headers: { tenantName: tenantName },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setDailyCollections(data);
            })
            .catch((error) => {
                console.error("Error fetching data in pws:", error);
            });
    }

    const fetchMemberList = (startDate, endDate) => {
        fetch(
            `https://www.erpser.timeserasoftware.in/api/Erp/GetSchemeMemberList?fromDate=${startDate}&toDate=${endDate}`,
            {
                headers: { tenantName: tenantName },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setMemberList(data);
            })
            .catch((error) => {
                console.error("Error fetching data in pws:", error);
            });
    }

    useEffect(() => {
        fetchSchemeSettlement(startSelected, endSelected);
        fetchDailyCollections(startSelected, endSelected);
        fetchMemberList(startSelected, endSelected);
    }, [startSelected, endSelected, tenantName]);

    // console.log(sales);
    // console.log(schemeSettlement);

    function formatAmount(number) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(number);
    }



    // console.log(sales);


    return (
        <div className="w-full max-h-[5000px] bg-[white]">
            <div className="p-[20px] sm:p-[50px] lg:p-[100px]">
                <div className="w-full flex justify-between items-center pb-[20px]">
                    <div>
                        <h1 className="px-[7px] text-[#162566] text-[14px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm">
                            Purchase Plan
                        </h1>
                    </div>
                    <div className="flex gap-[5px] text-[12px] font-semibold text-[#162566]">
                        <div onClick={() => openAllFaqs()} className='px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer'>Expand All <span className='text-[#52BD91]'>+</span></div>
                        <div
                            onClick={() => closeAllFaqs()}
                            className="px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer"
                        >
                            Collapse All <span className="text-[#52BD91]">-</span>
                        </div>
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


                <div className="flex flex-col gap-[25px]">

                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[0] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(0)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Scheme Settlements</span>
                            {openStatus[0] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[0] === true && (
                            (schemeSettlement?.map((scheme, index) => (<div key={index} className='max-h-[425px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                <div className='h-full flex flex-col rounded-md overflow-hidden'>
                                    <div className='h-[65px] bg-[#162566] p-[10px] flex justify-between items-start '>
                                        <div className='text-[18px] text-white flex flex-col items-start justify-start text-start'>
                                            <p>#{scheme?.recNo}</p>
                                            <p className='text-[14px]'>Rec no</p>
                                        </div>
                                        <div className='flex flex-col justify-center items-end'>
                                            <p className='text-[14px] text-[#69FBBF] font-normal'>Rec Date</p>
                                            <p className='text-[16px] text-[#69FBBF] font-semibold'>{(scheme?.recDate?.substring(0, 10).split('-').reverse().join('-'))}</p>
                                        </div>
                                    </div>
                                    <div className='bg-white p-[10px] pb-[0px]'>
                                        <div className=' border border-b-2 border-[#000] border-t-0 border-r-0 border-l-0 pb-[5px] flex justify-between items-center'>
                                            <div className='text-[18px] text-[#000] flex flex-col items-start justify-start text-start leading-4 '>
                                                <p className='text-[12px] text-[#000] font-normal'>Scheme Name</p>
                                                <p className='text-[18px] font-bold'>{scheme?.schemeName}</p>
                                            </div>

                                            <div className='text-[18px] text-[#000] flex flex-col items-center justify-center text-center leading-5'>
                                                <p className='text-[12px] text-[#000] font-normal'>Scheme Type</p>
                                                <p className='text-[14px] font-bold'>{scheme?.schemeType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='px-[10px] py-[10px] bg-white flex items-start border-2 justify-start w-full h-full'>
                                        <div className='grid grid-cols-1 gap-x-[9px] w-full h-full'>

                                            <div className='grid grid-cols-2 bg-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Card No: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{(scheme?.cardNo)}</p>
                                            </div>


                                            <div className='grid grid-cols-2 bg-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Member Name: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center text-right pr-[10px]'>{(scheme?.schemeMember)} </p>
                                            </div>



                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Phone: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{(scheme?.phno)}</p>
                                            </div>


                                            <div className='grid grid-cols-2 border-2 border-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Scheme Amount: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(scheme?.schemeAmount)}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Bonus Amount: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(scheme?.bonusAmount)}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Duration: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{(scheme?.schemeDuration)}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Gold Wt: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{formatWeight(scheme?.goldWt)}g</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Scheme Value: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(scheme?.totSValue)}</p>
                                            </div>


                                        </div>

                                    </div>

                                    <div className='h-[7px] bg-[#162566]'>

                                    </div>
                                </div>
                            </div>)))
                        )}
                    </div>

                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[1] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(1)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Daily Collections</span>
                            {openStatus[1] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[1] === true && (
                            (dailyCollections?.map((scheme, index) => (<div key={index} className='max-h-[425px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                <div className='h-full flex flex-col rounded-md overflow-hidden'>
                                    <div className='h-[65px] bg-[#162566] p-[10px] flex justify-between items-start '>
                                        <div className='text-[18px] text-white flex flex-col items-start justify-start text-start'>
                                            <p>#{scheme?.recNo}</p>
                                            <p className='text-[14px]'>Rec no</p>
                                        </div>
                                        <div className='flex flex-col justify-center items-end'>
                                            <p className='text-[14px] text-[#69FBBF] font-normal'>Rec Date</p>
                                            <p className='text-[16px] text-[#69FBBF] font-semibold'>{(scheme?.recDate?.substring(0, 10).split('-').reverse().join('-'))}</p>
                                        </div>
                                    </div>
                                    <div className='bg-white p-[10px] pb-[0px]'>
                                        <div className=' border border-b-2 border-[#000] border-t-0 border-r-0 border-l-0 pb-[5px] flex justify-between items-center'>
                                            <div className='text-[18px] text-[#000] flex flex-col items-start justify-start text-start leading-4 '>
                                                <p className='text-[12px] text-[#000] font-normal'>Scheme Name</p>
                                                <p className='text-[18px] font-bold'>{scheme?.schemeName}</p>
                                            </div>

                                            <div className='text-[18px] text-[#000] flex flex-col items-center justify-center text-center leading-5'>
                                                <p className='text-[12px] text-[#000] font-normal'>Scheme Type</p>
                                                <p className='text-[14px] font-bold'>{scheme?.schemeType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='px-[10px] py-[10px] bg-white flex items-start border-2 justify-start w-full h-full'>
                                        <div className='grid grid-cols-1 gap-x-[9px] w-full h-full'>

                                            <div className='grid grid-cols-2 bg-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Card No: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{(scheme?.cardNo)}</p>
                                            </div>


                                            <div className='grid grid-cols-2 bg-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Member Name: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center text-right pr-[10px]'>{(scheme?.schemeMember)} </p>
                                            </div>



                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Phone: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{(scheme?.phno)}</p>
                                            </div>


                                            <div className='grid grid-cols-2 border-2 border-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Paid Amount: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(scheme?.recAmount)}</p>
                                            </div>

                                            {/* <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Bonus Amount: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(scheme?.bonusAmount)}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Duration: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{(scheme?.schemeDuration)}</p>
                                            </div> */}

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Gold Wt: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{formatWeight(scheme?.goldWt)}g</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Installment No: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{(scheme?.instno || 0)}</p>
                                            </div>


                                        </div>

                                    </div>

                                    <div className='h-[7px] bg-[#162566]'>

                                    </div>
                                </div>
                            </div>)))
                        )}
                    </div>

                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[2] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(2)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Member List</span>
                            {openStatus[2] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[2] === true && (
                            (memberList?.map((scheme, index) => (<div key={index} className='max-h-[425px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                <div className='h-full flex flex-col rounded-md overflow-hidden'>
                                    <div className='h-[65px] bg-[#162566] p-[10px] flex justify-between items-start '>
                                        <div className='text-[18px] text-white flex flex-col items-start justify-start text-start'>
                                            <p>#{scheme?.cardNo}</p>
                                            <p className='text-[14px]'>Card no</p>
                                        </div>
                                        <div className='flex flex-col justify-center items-end'>
                                            <p className='text-[14px] text-[#69FBBF] font-normal'>Join Date</p>
                                            <p className='text-[16px] text-[#69FBBF] font-semibold'>{(scheme?.schemeJoinDate?.substring(0, 10).split('-').reverse().join('-'))}</p>
                                        </div>
                                    </div>
                                    <div className='bg-white p-[10px] pb-[0px]'>
                                        <div className=' border border-b-2 border-[#000] border-t-0 border-r-0 border-l-0 pb-[5px] flex justify-between items-center'>
                                            <div className='text-[18px] text-[#000] flex flex-col items-start justify-start text-start leading-4 '>
                                                <p className='text-[12px] text-[#000] font-normal'>Scheme Name</p>
                                                <p className='text-[18px] font-bold'>{scheme?.schemeName}</p>
                                            </div>

                                            <div className='text-[18px] text-[#000] flex flex-col items-center justify-center text-center leading-5'>
                                                <p className='text-[12px] text-[#000] font-normal'>Scheme Type</p>
                                                <p className='text-[14px] font-bold'>{scheme?.schemeType}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='px-[10px] py-[10px] bg-white flex items-start border-2 justify-start w-full h-full'>
                                        <div className='grid grid-cols-1 gap-x-[9px] w-full h-full'>

                                            {/* <div className='grid grid-cols-2 bg-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Card No: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{(scheme?.cardNo)}</p>
                                            </div> */}


                                            <div className='grid grid-cols-2 bg-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Member Name: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center text-right pr-[10px]'>{(scheme?.schemeMember)} </p>
                                            </div>



                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Phone: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{(scheme?.phno)}</p>
                                            </div>


                                            {/* <div className='grid grid-cols-2 border-2 border-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Paid Amount: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(scheme?.recAmount)}</p>
                                            </div> */}
                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Scheme Amount: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(scheme?.schemeAmount)}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Bonus Amount: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(scheme?.bonusAmount)}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Duration: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{(scheme?.schemeDuration)}</p>
                                            </div>

                                            {/* <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Gold Wt: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{formatWeight(scheme?.goldWt)}g</p>
                                            </div> */}

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Scheme Value: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(scheme?.schemeValue)}</p>
                                            </div>


                                        </div>

                                    </div>

                                    <div className='h-[7px] bg-[#162566]'>

                                    </div>
                                </div>
                            </div>)))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Purchaseplan;
