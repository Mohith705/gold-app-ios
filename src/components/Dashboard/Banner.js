"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Storage } from "@capacitor/storage";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Banner = ({ title }) => {
  const [tenantName, setTenantName] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [isSwiperReady, setIsSwiperReady] = useState(false);

  useEffect(() => {
    const checkStorage = async () => {
      try {
        const { value: storedTenantName } = await Storage.get({
          key: "tenantName",
        });
        if (storedTenantName) {
          setTenantName(storedTenantName);
        }
      } catch (error) {
        console.error("Error retrieving tenantName from storage:", error);
      }
    };
    checkStorage();
  }, []);

  useEffect(() => {
    const fetchFirmDetails = async (tenantName) => {
      try {
        const response = await fetch(
          `https://www.erpser.timeserasoftware.in/api/Erp/GetUserAddress`,
          {
            method: "GET",
            headers: { tenantName },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`
          );
        }

        const data = await response.json();

        // Replace 'http://' with 'https://' in all URLs
        const replaceHttpWithHttps = (url) =>
          url.startsWith("http://") ? url.replace("http://", "https://") : url;

        // Ensure 'epasS1' exists and is valid
        if (data.epasS1) {
          const urls = data.epasS1
            .split(",")
            .map((url) => replaceHttpWithHttps(url.trim()));

          // Set image URLs (duplicate if smoother looping is required)
          setImageUrls([...urls, ...urls]);
          setIsSwiperReady(true); // Indicate that Swiper can be initialized
        } else {
          console.warn("No 'epasS1' field found in the response data.");
        }
      } catch (error) {
        console.error("Error fetching firm details:", error.message);
      }
    };

    if (tenantName) {
      fetchFirmDetails(tenantName);
    }
  }, [tenantName]);

//   console.log("imageUrls", imageUrls);

  return (
    <div>
      {isSwiperReady && (
        <Swiper
          autoplay={{
            delay: 3000, // 3 seconds delay
            disableOnInteraction: false, // Continue autoplay after interaction
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          onInit={(swiper) => swiper.autoplay.start()} // Force autoplay to start on initialization
          className="z-10"
        >
          {imageUrls?.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-[150px] z-10 my-[5px] relative bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${url})`,
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[24px] font-serif text-white">
                  {/* <p>{title}</p> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Banner;
