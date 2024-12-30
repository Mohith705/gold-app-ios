"use client";

import Banner from '@/components/Dashboard/Banner';
import NavbarV2 from '@/components/Navbar/NavbarV2';
import { Storage } from '@capacitor/storage';
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const page = () => {

    const [dailyCollections, setDailyCollections] = useState(null);
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

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getFormattedDate();

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

    const [openStatus, setOpenStatus] = useState(
        new Array(5).fill(true)
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


    useEffect(() => {
        fetchDailyCollections(date, date);
    }, [date, tenantName]);

    return (
        <div>
            <NavbarV2 />
            <Banner title={"Scheme"} />
            <div className='p-[20px]'>
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
    )
}

export default page
