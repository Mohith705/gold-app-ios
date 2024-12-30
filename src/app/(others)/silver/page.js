"use client";

import Banner from '@/components/Dashboard/Banner';
import NavbarV2 from '@/components/Navbar/NavbarV2';
import { Storage } from '@capacitor/storage';
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const page = () => {

    const [birthdays, setBirthdays] = useState(null);

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

    // console.log(tenantName);

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const date = getFormattedDate();

    const fetchBirthdays = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetURDPurchaseSilver?todayDate=${date}&filter=ALL`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setBirthdays(data) }).catch((error) => { console.error('Error fetching data in crm crm birthdays:', error); })
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
        fetchBirthdays(date);
    }, [date, tenantName]);

    return (
        <div>
            <NavbarV2 />
            <Banner title={"URD Silver"} />
            <div className={`w-full h-full px-[20px] py-[20px]`}>
                {
                    ((<div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[2] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(2)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">URD Silver</span>
                            {openStatus[2] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[2] === true && (
                            <div className='max-h-[950px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]'>
                                {birthdays?.map((item, index) => (

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
                    </div>))
                }
            </div>
        </div>
    )
}

export default page
