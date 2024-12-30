"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import axios from "axios";
import { Storage } from "@capacitor/storage";

function convertTime(timeStr) {
  const date = new Date(timeStr);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

const Invoices = () => {
  const [header, setHeader] = useState("");
  const [invoicesData, setInvoicesData] = useState([]);
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

  const [slides, setSlides] = useState(1);

  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const startDate = getFormattedDate();
  const endDate = getFormattedDate();

  const fetchInvoices = (startDate, endDate) => {
    fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetSaleRegister?name=&billStartDate=${startDate}&billEndDate=${endDate}&custName=&jewelType=`, {
      headers: { 'tenantName': tenantName }
    }).then((res) => res.json()).then((data) => { setInvoicesData(data) }).catch((error) => { console.error('Error fetching data in dashboard invoices:', error); })
  }

  useEffect(() => {
    fetchInvoices(startDate, endDate);
  }, [startDate, endDate, tenantName]);

  useEffect(() => {
    invoicesData?.length === 1 ? setSlides(1) : setSlides(1.25);
  }, [invoicesData, tenantName]);

  const formatRupees = (value) => {
    const roundedValue = parseFloat(value).toFixed(2);
    return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
  }

  const formatWeight = (value) => {
    const roundedValue = parseFloat(value).toFixed(3);
    return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
  }

  // console.log(invoicesData);

  return (
    <div className="w-full max-h-[1500px] -z-10 block md:hidden">
      <div className="px-[20px] sm:px-[50px] lg:px-[100px] py-[20px] sm:py-[40px]">
        <h1 className="px-[7px] text-[#162566] text-[14px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm">
          INVOICES
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={slides}
          loop={true}
          loopedslides={4}
          centeredSlides={true}
          onSwiper={(swiper) => { }}
          onSlideChange={() => { }}
          className="z-10"
        >
          {invoicesData.map((invoice, index) => (
            <SwiperSlide className="rounded-[20px]" key={index}> {/* Move key attribute to SwiperSlide */}
              <div
                className={`h-[170px] min-h-[170px] rounded-[20px]  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${invoice.jewelType === "SILVER SALES"
                  ? "bg-gradient-to-b from-[#FDFDFD] to-[#D6D6D6]"
                  : invoice.jewelType === "GOLD SALES"
                    ? "bg-gradient-to-b from-[#FFFCF7] to-[#ECDCC1]"
                    : "bg-gradient-to-b from-[#ebf7fd] to-[#d9ebf4]"
                  }  p-[10px]`}
              >
                <div className="w-full h-full flex flex-col gap-[10px]">
                  <div className="w-full h-full flex gap-[10px] basis-[60%]">
                    <div className="basis-[70%] flex flex-col items-start justify-between text-[14px]">
                      <h1>Invoice No: <span className="font-semibold"> {invoice.billNo} </span></h1>
                      <h1>Name: <span className="font-semibold"> {invoice.custName} </span></h1>
                      <h1>Peices: <span className="font-semibold"> {invoice.totPieces} </span></h1>
                    </div>
                    <div className="basis-[30%] w-full h-full relative ">
                      <div className="w-full max-h-[80px]  relative h-full ">
                        <Image
                          src={`${invoice.jewelType === "SILVER SALES"
                            ? "/silver.png"
                            : invoice.jewelType === "GOLD SALES"
                              ? "/gold.png"
                              : "/diamond.png"
                            }`}
                          fill
                          alt="gold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full basis-[40%]  flex flex-col">
                    <div className="basis-[40%]  flex justify-between gap-[10px] pb-[5px] text-[14px]">
                      <p>Nwt: <span className="font-semibold"> {formatWeight(invoice?.totNwt)}g </span></p>
                      <p>Gwt: <span className="font-semibold"> {formatWeight(invoice?.totGwt)}g </span></p>
                    </div>
                    <div className="basis-[60%] border border-t-2 border-t-black border-b-0 border-l-0 border-r-0 w-full h-full flex items-center justify-between font-bold">
                      <p className="text-[14px]">Amount: ₹{formatRupees(invoice?.billAmt)}</p>
                      <p className="text-[12px]">Time: {convertTime(`${invoice.billTime}`)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Invoices;
