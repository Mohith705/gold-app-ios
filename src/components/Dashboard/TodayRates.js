"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Autoplay } from "swiper/modules";
import { Storage } from '@capacitor/storage';

const TodayRates = () => {
    const [todayRates, setTodayRates] = useState([]);
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

    const fetchRates = (date) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetDailyRates?date=${date}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setTodayRates(data) }).catch((error) => { console.error('Error fetching data in dashboard todayRates:', error); })
    }

    useEffect(() => {
        fetchRates(date);
    }, [date, tenantName]);

    return (
        <div className='w-full max-h-[1500px] flex md:hidden -z-10 mt-[10px]'>
            <div className='basis-[40%] pl-[20px] sm:pl-[50px] lg:px-[100px] py-[10px] sm:py-[40px] flex gap-[10px]'>
                <h1 className='pl-[7px] text-[#162566] underline text-[14px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm'>Today Rates</h1>
            </div>
            <div className='basis-[60%] border-2 border-black w-[300px] bg-gradient-to-r from-[#162566] to-[#000] rounded-md  overflow-hidden text-white mr-[15px]'>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{
                        delay: 1000
                    }}
                    centeredSlides={true}
                    onSlideChange={() => { }}
                    modules={[Autoplay]}
                    onSwiper={(swiper) => { }}
                >
                    {
                        todayRates.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='w-full min-h-[40px] text-[14px] flex items-center justify-center text-center'>
                                    <p>{item?.prefix + " " + item?.mainproduct + " - " + "₹" + formatRupees(item?.rate)}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default TodayRates;