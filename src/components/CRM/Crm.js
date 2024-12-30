"use client";

import { Storage } from '@capacitor/storage';
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const Crm = () => {

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

    function formatDate(apiDate) {
        const date = new Date(apiDate);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getFormattedDate();

    const [productName, setProductName] = useState(null);
    const [birthdays, setBirthdays] = useState(null);
    const [anniversarys, setAnniversarys] = useState(null);
    const [todayDues, setTodayDues] = useState(null);
    const [totalDues, setTotalDues] = useState(null);
    const [tagData, setTagData] = useState(null);
    const [tagNo, setTagNo] = useState(null);
    const [data, setData] = useState(null);

    const handleTagNoChange = (event) => {
        setTagNo(parseInt(event.target.value));
    };

    const [openStatus, setOpenStatus] = useState(
        new Array(5).fill(false)
    );

    const openAllFaqs = () => {
        setOpenStatus(new Array(6).fill(true));
    };

    const closeAllFaqs = () => {
        setOpenStatus(new Array(6).fill(false));
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

    const handleSubmit = () => {
        fetchTags(tagNo);
        const newOpenStatus = [...openStatus];

        newOpenStatus[0] = true;
        setOpenStatus(newOpenStatus);
    };

    const fetchTags = (tagNo) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetTagDetails?tagNo=${tagNo}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setTagData(data) }).catch((error) => { console.error('Error fetching data in crm tags:', error); })
    }

    const fetchProductNames = () => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetProductName`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setProductName(data) }).catch((error) => { console.error('Error fetching data in crm products:', error); })
    }

    const fetchBirthdays = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetBirthDayWishBoxDetails?date=${date}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setBirthdays(data) }).catch((error) => { console.error('Error fetching data in crm crm birthdays:', error); })
    }

    const fetchAnniversarys = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetAnniversaryWishBoxDetails?date=${date}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setAnniversarys(data) }).catch((error) => { console.error('Error fetching data in crm anniversary:', error); })
    }

    const fetchDues = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetTodayDues?date=${date}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setTodayDues(data) }).catch((error) => { console.error('Error fetching data in crm today dues:', error); })
    }

    const fetchTotalDues = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetTotalDues`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setTotalDues(data) }).catch((error) => { console.error('Error fetching data in crm today dues:', error); })
    }

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

    useEffect(() => {
        fetchProductNames();
        fetchBirthdays(date);
        fetchAnniversarys(date);
        fetchDues(date);
        fetchTotalDues(date);
        fetchTags(tagNo);
        fetchData();
    }, [date, tagNo, tenantName]);

    // console.log(totalDues?.customerLedgers);
    // console.log(tagData);

    return (
        <div className='w-full max-h-[5000px] bg-[white]'>
            <div className='p-[20px] sm:p-[50px] lg:p-[100px]'>

                <div className='w-full flex justify-between items-center pb-[20px]'>
                    <div>
                        <h1 className='px-[7px] text-[#162566] text-[18px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm'>CRM</h1>
                    </div>
                    <div className='flex gap-[5px] text-[12px] font-semibold text-[#162566]'>
                        <div onClick={() => openAllFaqs()} className='px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer'>Expand All <span className='text-[#52BD91]'>+</span></div>
                        <div onClick={() => closeAllFaqs()} className='px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer'>Collapse All <span className='text-[#52BD91]'>-</span></div>
                    </div>
                </div>

                {/* <div className='flex items-center justify-center gap-[5px] text-[16px] font-semibold text-[#162566] pb-[20px]'>
                    <input
                        type="number"
                        value={tagNo || ''}
                        onChange={handleTagNoChange}
                        placeholder="Enter Tag No"
                        className="px-1 py-2 border border-gray-300 rounded"
                    />
                    <button onClick={handleSubmit} className="px-2 py-2 bg-[#52BD91] text-white rounded">Submit</button>
                </div> */}


                <div className='flex flex-col gap-[25px]'>

                    {/* <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[0] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(0)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Tag Check</span>
                            {openStatus[0] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[0] === true && (
                            (tagData !== null) ? (<div className='max-h-[425px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                <div className='h-full flex flex-col rounded-md overflow-hidden'>
                                    <div className='h-[65px] bg-[#162566] p-[10px] flex justify-between items-start '>
                                        <div className='text-[18px] text-white flex flex-col items-start justify-start text-start'>
                                            <p>#{tagData?.tagno}</p>
                                            <p className='text-[14px]'>Tag no</p>
                                        </div>
                                        <div className='flex flex-col justify-center items-end'>
                                            <p className='text-[14px] text-[#69FBBF] font-normal'>Amount</p>
                                            <p className='text-[18px] text-[#69FBBF] font-semibold'>₹ {formatRupees(tagData?.netamt)}</p>
                                        </div>
                                    </div>
                                    <div className='bg-white p-[10px] pb-[0px]'>
                                        <div className=' border border-b-2 border-[#000] border-t-0 border-r-0 border-l-0 pb-[5px] flex justify-between items-center'>
                                            <div className='text-[18px] text-[#000] flex flex-col items-start justify-start text-start leading-4 '>
                                                <p className='text-[12px] text-[#000] font-normal'>Product Name</p>
                                                <p className='text-[18px] font-bold'>{tagData?.productname}</p>
                                            </div>

                                            <div className='text-[18px] text-[#000] flex flex-col items-center justify-center text-center leading-5'>
                                                <p className='text-[16px] p-[7px] rounded-md font-semibold bg-[#52BD91] text-[#000]'>{tagData?.pieces}</p>
                                                <p className='text-[14px] font-normal'>pieces</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='px-[10px] py-[10px] bg-white flex items-start border-2 justify-start w-full h-full'>
                                        <div className='grid grid-cols-1 gap-x-[9px] w-full h-full'>
                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Purity: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{tagData?.prefix}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Gwt: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{formatWeight(tagData?.gwt)}g</p>
                                            </div>


                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Stone Wt: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{tagData?.stonewt === null ? formatWeight(0) : formatWeight(tagData?.stonewt)} g</p>
                                            </div>



                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Nwt: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{formatWeight(tagData?.nwt)}g</p>
                                            </div>



                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[12px] '>Wastage: <span className='font-semibold'>({formatRupees(tagData?.wastage)}%)</span> </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{formatWeight(tagData?.cattotwast)}g</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[12px] '>MC/Amt: <span className='font-semibold'>({formatWeight(tagData?.makingcharges)}g)</span></p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹ {formatRupees(tagData?.cattotmc)}</p>
                                            </div>

                                            <div className='grid grid-cols-2 border-2 border-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Stone Cost: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(tagData?.iteM_TOTAMT)}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Dealer: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{tagData?.dealername}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Counter: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{tagData?.countername}</p>
                                            </div>

                                            <div className='grid grid-cols-2 border-2 border-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Today Rate: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(tagData?.rate)}</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='h-[7px] bg-[#162566]'>

                                    </div>
                                </div>
                            </div>) : (
                                <div className='h-full border py-[20px] text-[20px] border-[#52BD91] font-semibold flex items-center justify-center'>
                                    Enter Tag No
                                </div>
                            )
                        )}
                    </div> */}
                    {/* <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[1] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(1)}>
                            <span className="text-[14px] sm:text-[18px] font-semibold font-Emilio ">Main Product Summary</span>
                            {openStatus[1] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white" />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary" />
                            )}
                        </button>
                        {openStatus[1] === true && (
                            <div className='max-h-[250px] overflow-auto w-full bg-[#D6D6D6] p-[15px]'>
                                <div className='min-h-[100px] h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px]'>
                                    <div className='basis-[40%] flex justify-between items-center w-full h-full font-semibold'>
                                        <h1 className='text-[19px] text-[#000]'>Vijay Kumar</h1>
                                        <p className='text-[12px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Pieces: 28</p>
                                    </div>
                                    <div className='basis-[30%] flex justify-between items-center w-full h-full'>
                                        <p className='flex-1 text-[14px] font-semibold'>GWT: </p>
                                        <p className='flex-1 text-[14px] font-semibold'>NWT: </p>
                                    </div>
                                    <div className='basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                        <p className='text-[14px] font-semibold'>Date: </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> */}
                    <div className={`w-full h-full`}>
                        {
                            ((<div className={`w-full h-full  `}>
                                <button className={`w-full text-left  ${openStatus[2] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(2)}>
                                    <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Today Birthdays</span>
                                    {openStatus[2] === true ? (
                                        <AiOutlineMinus className="w-5 h-5 text-white " />
                                    ) : (
                                        <AiOutlinePlus className="w-5 h-5 text-primary " />
                                    )}
                                </button>
                                {openStatus[2] === true && (
                                    <div className='max-h-[250px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]'>
                                        {
                                            birthdays?.dealerMasters?.map((Today, index) => (
                                                <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>
                                                    <div className='basis-[40%] flex justify-between items-center w-full h-full font-semibold'>
                                                        <h1 className='text-[16px] text-[#000]'>{Today?.dealername}</h1>
                                                        {/* <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Balance: {formatRupees(Today?.balanceAmt)}</p> */}
                                                    </div>
                                                    <div className='basis-[30%] flex justify-between items-center w-full h-full'>
                                                        <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>DATE: {formatDate(Today?.dob)}</p>
                                                    </div>
                                                    <div className='basis-[20%] flex justify-start items-center py-[3px] border border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                                        <p className='text-[14px] font-semibold'>Mobile: {Today?.mobilenum}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>))
                        }
                    </div>
                    {
                        ((<div className={`w-full h-full  `}>
                            <button className={`w-full text-left  ${openStatus[3] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(3)}>
                                <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Today Anniversaries</span>
                                {openStatus[3] === true ? (
                                    <AiOutlineMinus className="w-5 h-5 text-white " />
                                ) : (
                                    <AiOutlinePlus className="w-5 h-5 text-primary " />
                                )}
                            </button>
                            {openStatus[3] === true && (
                                <div className='max-h-[250px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]'>
                                    {
                                        anniversarys?.dealerMasters?.map((Today, index) => (
                                            <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>
                                                <div className='basis-[40%] flex justify-between items-center w-full h-full font-semibold'>
                                                    <h1 className='text-[16px] text-[#000]'>{Today?.dealername}</h1>

                                                </div>
                                                <div className='basis-[30%] flex justify-between items-center w-full h-full'>
                                                    <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>DATE: {formatDate(Today?.annversary)}</p>
                                                </div>
                                                <div className='basis-[20%] flex justify-start items-center py-[3px] border border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                                    <p className='text-[14px] font-semibold'>Mobile: {Today?.mobilenum}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>))
                    }




                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[4] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(4)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Today Dues</span>
                            {openStatus[4] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[4] === true && (
                            <div className='max-h-[450px]  overflow-auto w-full flex flex-col gap-[15px] bg-[#D6D6D6] p-[15px]'>
                                {
                                    todayDues?.customerLedgers?.map((total, index) => (
                                        <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>
                                            <div className='basis-[40%] flex justify-between items-center w-full h-full font-semibold'>
                                                <h1 className='text-[16px] text-[#000]'>{total?.custName}</h1>
                                            </div>
                                            <div className='basis-[30%] flex flex-col justify-center items-start w-full h-full'>
                                                <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl font-semibold text-black'>Bill No: {(total?.billNo)}</p>
                                                <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl font-semibold text-black'>Bill Date: {(total?.billDate?.substring(0, 10).split('-').reverse().join('-'))}</p>
                                                <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl font-semibold text-black'>Due: ₹{formatRupees(total?.balanceAmt)}</p>
                                                <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl font-semibold text-black'>Jewel Type: {(total?.jewelType)}</p>
                                                {/* <p className='flex-1 text-[14px] font-normal'>Paid: <span className='font-semibold'> ₹{formatRupees(total?.paidAmt)}</span></p>
                                                <p className='flex-1 text-[14px] font-normal'>Total: <span className='font-semibold'> ₹{formatRupees(total?.billAmt)}</span></p> */}

                                            </div>
                                            <div className='basis-[20%] flex justify-start items-center py-[3px] border border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                                <p className='text-[14px] font-normal'>Mobile: <span className='font-semibold'>{total?.mobileNum}</span> </p>
                                            </div>
                                        </div>
                                    ))
                                }
                                {/* <div className='min-h-[100px] h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px]'>
                                    <div className='basis-[40%] flex justify-between items-center w-full h-full font-semibold'>
                                        <h1 className='text-[19px] text-[#000]'>Vijay Kumar</h1>
                                        <p className='text-[12px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Pieces: 28</p>
                                    </div>
                                    <div className='basis-[30%] flex justify-between items-center w-full h-full'>
                                        <p className='flex-1 text-[14px] font-semibold'>GWT: </p>
                                        <p className='flex-1 text-[14px] font-semibold'>NWT: </p>
                                    </div>
                                    <div className='basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                        <p className='text-[14px] font-semibold'>Date: </p>
                                    </div>
                                </div> */}
                            </div>
                        )}
                    </div>




                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[5] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(5)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Total Dues</span>
                            {openStatus[5] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white" />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary" />
                            )}
                        </button>
                        {openStatus[5] === true && (
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
                </div>
            </div>
        </div>
    )
}

export default Crm;
