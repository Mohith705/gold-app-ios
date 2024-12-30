"use client";

import { Storage } from '@capacitor/storage';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CheckBox = () => {

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

    const [birthdays, setBirthdays] = useState(null);
    const [anniversarys, setAnniversarys] = useState(null);
    const [todayDues, setTodayDues] = useState(null);
    const [totalDues, setTotalDues] = useState(null);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalDueBalance, setTotalDueBalance] = useState(0);

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



    useEffect(() => {
        fetchBirthdays(date);
        fetchAnniversarys(date);
        fetchDues(date);
        fetchTotalDues(date);
    }, [tenantName]);


    useEffect(() => {
        // Calculate total balance amount
        let total = 0;
        todayDues?.customerLedgers?.forEach(ledger => {
            total += ledger.balanceAmt;
        });
        setTotalBalance(total);
    }, [todayDues, tenantName]);

    useEffect(() => {
        // Calculate total balance amount
        let total = 0;
        totalDues?.customerLedgers?.forEach(ledger => {
            total += ledger.balanceAmt;
        });
        setTotalDueBalance(total);
    }, [totalDues, tenantName]);

    // console.log(totalBalance);

    const formatRupees = (value) => {
        const roundedValue = parseFloat(value).toFixed(2);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
    }

    const formatWeight = (value) => {
        const roundedValue = parseFloat(value).toFixed(3);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
    }

    return (
        <div className='w-full max-h-[1000px]'>
            <div className='w-full h-full flex gap-[8px] justify-center items-center p-[20px]'>
                <div style={{ background: "radial-gradient(50% 50% at 50% 50%, #F9F9F9 81.83%, #F2F4FF 100%)" }} className='flex-1 w-full  rounded-2xl h-[200px] flex items-center justify-center relative overflow-hidden shadow-lg'>

                    {/* <div className='absolute top-0 right-0'>
                        <svg xmlns="https://www.w3.org/2000/svg" width="37" height="54" viewBox="0 0 37 54" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M36.0982 1.11304C36.8682 0.776065 37.7351 0.733407 38.5345 0.993157C39.3338 1.25291 40.0101 1.797 40.4349 2.52223L40.618 2.8804L41.9942 6.02396L48.2813 3.27155C49.8672 2.57665 51.6572 2.50689 53.2924 3.07624C54.9277 3.6456 56.2873 4.812 57.0987 6.34161L57.3208 6.80627L73.8352 44.529C74.5301 46.1149 74.5999 47.9049 74.0305 49.5401C73.4612 51.1754 72.2948 52.5349 70.7652 53.3464L70.3005 53.5685L26.2907 72.8353C24.7047 73.5302 22.9147 73.6 21.2795 73.0306C19.6443 72.4613 18.2847 71.2949 17.4733 69.7653L17.2512 69.3006L0.73674 31.5779C0.0418397 29.992 -0.0279251 28.202 0.541431 26.5667C1.11079 24.9315 2.27718 23.5719 3.8068 22.7605L4.27145 22.5384L10.5586 19.786L9.18237 16.6424C8.83249 15.8408 8.80191 14.9358 9.09688 14.1124C9.39185 13.289 9.99009 12.6093 10.7694 12.2122C11.5487 11.8151 12.4502 11.7305 13.2898 11.9758C14.1293 12.2211 14.8435 12.7777 15.2865 13.5318L15.4695 13.89L16.8457 17.0336L35.707 8.77636L34.3308 5.6328C33.9658 4.79908 33.947 3.85451 34.2784 3.00689C34.6099 2.15927 35.2645 1.47803 36.0982 1.11304ZM51.0337 9.55867L7.02386 28.8255L23.5383 66.5482L67.5481 47.2814L51.0337 9.55867ZM41.563 20.7323C45.9505 21.239 50.1015 24.2691 52.0345 28.967C54.4324 34.795 52.2041 41.4195 47.5575 48.1588L46.9892 48.9657C46.0527 50.2748 45.0792 51.7049 43.5546 52.3723C42.4103 52.8733 41.1634 52.8573 39.9345 52.7285L38.7217 52.5851C30.1538 51.5224 23.3676 48.6682 20.6052 42.7263C18.4647 38.1192 19.0542 33.0138 21.658 29.4465C23.8918 26.3857 27.5342 24.6001 31.6614 25.2057C34.013 21.7638 37.7989 20.2974 41.563 20.7323ZM40.7755 27.5503C39.2814 27.3802 37.8278 27.9192 36.9452 29.7366L36.7408 30.2194C36.4107 31.0746 35.7765 31.7779 34.9598 32.1942C34.143 32.6105 33.2013 32.7106 32.3153 32.4752L31.8997 32.3387C29.7039 31.4645 28.1616 32.1771 27.203 33.4958C26.1227 34.9727 25.7032 37.4115 26.8304 39.8324C27.9573 42.261 31.2228 44.5775 38.621 45.6466L39.5673 45.7717C39.9521 45.8206 40.3382 45.8725 40.7251 45.9092L41.0702 45.4397L41.4095 44.9653C46.1445 38.3596 46.7464 34.1553 45.6855 31.578C44.6714 29.1075 42.5949 27.7614 40.7755 27.5503Z" fill="#162566" fillOpacity="0.3" />
                        </svg>
                    </div>

                    <div className='absolute bottom-5 left-0'>
                        <svg xmlns="https://www.w3.org/2000/svg" width="32" height="52" viewBox="0 0 32 52" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M35.5148 40.311C38.57 40.497 41.4387 41.8434 43.5339 44.0747C45.6291 46.3061 46.7924 49.2537 46.7859 52.3145L46.763 53.0184L46.0334 64.9962C45.8778 67.5515 44.2432 69.4517 42.1795 70.2396L41.697 70.3986L40.8248 84.716C40.7028 86.7307 39.8237 88.6247 38.3639 90.0184C36.9041 91.4122 34.9714 92.2026 32.9533 92.2314L32.3532 92.2148L-15.558 89.2964C-17.5726 89.1744 -19.4666 88.2953 -20.8603 86.8355C-22.2541 85.3757 -23.0446 83.443 -23.0733 81.4249L-23.0568 80.8248L-22.1849 66.5114C-23.2399 66.0703 -24.1456 65.3348 -24.7939 64.3929C-25.4421 63.4509 -25.8055 62.3422 -25.8407 61.1993L-25.8334 60.6186L-25.1038 48.6408C-24.9178 45.5856 -23.5715 42.717 -21.3401 40.6218C-19.1088 38.5266 -16.1611 37.3633 -13.1003 37.3698L-12.3964 37.3926L35.5148 40.311ZM33.6179 67.0452C33.0268 66.5427 32.3024 66.2229 31.5328 66.1248C30.7632 66.0267 29.9817 66.1545 29.2835 66.4926L28.8268 66.7533L27.7161 67.4872C25.6673 68.838 23.2537 69.5282 20.8005 69.4647C18.3473 69.4013 15.9725 68.5872 13.9963 67.1323L13.3427 66.6116L12.3254 65.7482C11.7343 65.2457 11.0098 64.9259 10.2403 64.8278C9.47068 64.7297 8.68917 64.8575 7.99094 65.1956L7.53424 65.4563L6.41958 66.1899C4.37123 67.5399 1.95835 68.2296 -0.49401 68.1662C-2.94637 68.1028 -5.32039 67.2893 -7.29624 65.8354L-7.95379 65.3144L-8.96718 64.4512C-9.55824 63.9487 -10.2827 63.6289 -11.0523 63.5308C-11.8219 63.4327 -12.6034 63.5605 -13.3016 63.8986L-13.7583 64.1594L-14.038 64.3427L-15.0716 81.3112L32.8396 84.2296L33.8732 67.2611L33.6179 67.0452ZM35.0284 48.2962L-12.8828 45.3778C-13.9417 45.3133 -14.9828 45.6721 -15.7772 46.3753C-16.5716 47.0784 -17.0541 48.0683 -17.1186 49.1272L-17.6062 57.1324C-15.4597 55.8802 -12.9774 55.3253 -10.502 55.5442C-8.02661 55.7632 -5.68027 56.7453 -3.78694 58.3549L-2.77355 59.2181C-2.11401 59.7785 -1.2905 60.1099 -0.426624 60.1625C0.437255 60.2152 1.2949 59.9862 2.01757 59.5099L3.13224 58.7763C5.30027 57.3477 7.8732 56.6607 10.4648 56.8185C13.0565 56.9764 15.527 57.9706 17.5056 59.6519L18.523 60.5153C19.1825 61.0757 20.006 61.4071 20.8699 61.4598C21.7338 61.5124 22.5914 61.2834 23.3141 60.8072L24.4248 60.0733C26.4995 58.7055 28.9477 58.0154 31.4313 58.0985C33.915 58.1816 36.3116 59.0337 38.2902 60.5372L38.7778 52.532C38.8423 51.4731 38.4836 50.432 37.7804 49.6376C37.0773 48.8433 36.0873 48.3607 35.0284 48.2962ZM15.6086 11.8481C17.1806 13.238 18.6258 14.765 19.9271 16.4111C21.876 18.8902 24.5451 23.0321 24.2666 27.6036C24.0731 30.7804 22.6256 33.7501 20.2425 35.8595C17.8594 37.969 14.736 39.0453 11.5592 38.8518C8.38253 38.6583 5.4128 37.2108 3.30335 34.8277C1.19391 32.4446 0.117541 29.3212 0.311043 26.1444C0.589508 21.5729 3.74561 17.7858 5.97698 15.5614C7.46848 14.0854 9.08835 12.7451 10.8174 11.5562C11.5401 11.08 12.3978 10.851 13.2616 10.9036C14.1255 10.9563 14.949 11.2877 15.6086 11.8481ZM12.694 20.2224C12.3259 20.5481 11.9674 20.8844 11.6187 21.2309C9.58788 23.2551 8.38258 25.2135 8.29624 26.6308C8.23174 27.6897 8.59053 28.7309 9.29368 29.5253C9.99683 30.3196 10.9867 30.8021 12.0456 30.8666C13.1045 30.9311 14.1457 30.5724 14.9401 29.8692C15.7344 29.1661 16.2169 28.1762 16.2814 27.1172C16.3678 25.6999 15.4131 23.61 13.639 21.3539C13.3349 20.9677 13.0198 20.5904 12.694 20.2224Z" fill="#162566" fillOpacity="0.3" />
                        </svg>
                    </div> */}

                    <Link href={"/birthdays"} className='flex-1 flex flex-col items-center justify-center w-full h-[60%] border border-[#000] border-t-0 border-l-0 border-b-0'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='w-[53px] h-[53px] flex items-center justify-center bg-[#D9D9D9] rounded-[50%]'>
                                <svg xmlns="https://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18 9C18.7652 8.99996 19.5015 9.29233 20.0583 9.81728C20.615 10.3422 20.9501 11.0601 20.995 11.824L21 12V15C21 15.64 20.621 16.139 20.118 16.367L20 16.414V20C20.0002 20.5046 19.8096 20.9906 19.4665 21.3605C19.1234 21.7305 18.6532 21.9572 18.15 21.995L18 22H6C5.49542 22.0002 5.00943 21.8096 4.63945 21.4665C4.26947 21.1234 4.04284 20.6532 4.005 20.15L4 20V16.415C3.73003 16.321 3.49284 16.1512 3.31676 15.926C3.14067 15.7008 3.03314 15.4297 3.007 15.145L3 15V12C2.99996 11.2348 3.29233 10.4985 3.81728 9.94174C4.34224 9.38499 5.06011 9.04989 5.824 9.005L6 9H18ZM17.933 15.7C17.7779 15.5836 17.5922 15.5148 17.3987 15.502C17.2052 15.4892 17.0121 15.533 16.843 15.628L16.733 15.7L16.467 15.9C15.9763 16.2682 15.3845 16.4771 14.7713 16.4986C14.1582 16.5201 13.5533 16.353 13.038 16.02L12.867 15.9L12.6 15.7C12.4449 15.5836 12.2592 15.5148 12.0657 15.502C11.8722 15.4892 11.6791 15.533 11.51 15.628L11.4 15.7L11.133 15.9C10.6424 16.268 10.0508 16.4768 9.43784 16.4982C8.82492 16.5197 8.22015 16.3528 7.705 16.02L7.533 15.9L7.267 15.7C7.11187 15.5836 6.92623 15.5148 6.7327 15.502C6.53917 15.4892 6.3461 15.533 6.177 15.628L6.067 15.7L6 15.75V20H18V15.75L17.933 15.7ZM18 11H6C5.73478 11 5.48043 11.1054 5.29289 11.2929C5.10536 11.4804 5 11.7348 5 12V14.005C5.5166 13.6599 6.12759 13.4837 6.74862 13.5007C7.36965 13.5177 7.97008 13.7271 8.467 14.1L8.733 14.3C8.9061 14.4298 9.11663 14.5 9.333 14.5C9.54937 14.5 9.7599 14.4298 9.933 14.3L10.2 14.1C10.7193 13.7105 11.3509 13.5 12 13.5C12.6491 13.5 13.2807 13.7105 13.8 14.1L14.067 14.3C14.2401 14.4298 14.4506 14.5 14.667 14.5C14.8834 14.5 15.0939 14.4298 15.267 14.3L15.533 14.1C16.0299 13.7271 16.6304 13.5177 17.2514 13.5007C17.8724 13.4837 18.4834 13.6599 19 14.005V12C19 11.7348 18.8946 11.4804 18.7071 11.2929C18.5196 11.1054 18.2652 11 18 11ZM12.6 2.2C13.0134 2.52294 13.3972 2.88202 13.747 3.273C14.271 3.862 15 4.855 15 6C15 6.79565 14.6839 7.55871 14.1213 8.12132C13.5587 8.68393 12.7956 9 12 9C11.2044 9 10.4413 8.68393 9.87868 8.12132C9.31607 7.55871 9 6.79565 9 6C9 4.855 9.73 3.862 10.253 3.273C10.6028 2.88202 10.9866 2.52294 11.4 2.2C11.5731 2.07018 11.7836 2 12 2C12.2164 2 12.4269 2.07018 12.6 2.2ZM12 4.334C11.9131 4.42088 11.8287 4.51025 11.747 4.602C11.271 5.138 11 5.645 11 6C11 6.26522 11.1054 6.51957 11.2929 6.70711C11.4804 6.89464 11.7348 7 12 7C12.2652 7 12.5196 6.89464 12.7071 6.70711C12.8946 6.51957 13 6.26522 13 6C13 5.645 12.73 5.138 12.253 4.602C12.1713 4.51025 12.0869 4.42088 12 4.334Z" fill="#a2a832" />
                                </svg>
                            </div>
                            <p className='text-[12px] font-medium underline text-[#000]'>Birthday</p>
                        </div>
                        <p className='text-[28px] font-semibold text-[#000]'>{birthdays?.count}</p>
                        <div className='flex items-center justify-end w-full pt-[5px]'>
                            <Link href={"/birthdays"} className='w-fit flex gap-[5px] px-[10px] mr-[5px] rounded-md items-center justify-end bg-[#52BD91]'>
                                <p className='text-[12px] text-white font-normal '>Check </p>
                                <svg xmlns="https://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                    <path d="M1 1L5 5L1 9" stroke="#F8F8F8" strokeWidth="0.8" />
                                </svg>
                            </Link>
                        </div>
                    </Link>
                    <Link href={"/anniversaries"} className='flex-1 flex flex-col items-center justify-center w-full h-[60%]'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='w-[53px] h-[53px] flex items-center justify-center bg-[#D9D9D9] rounded-[50%]'>
                                <svg xmlns="https://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 18 18" fill="#FFC0CB">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13 0C13.2449 3.23106e-05 13.4813 0.0899562 13.6644 0.252715C13.8474 0.415475 13.9643 0.639749 13.993 0.883L14 1V2H16C16.5046 1.99984 16.9906 2.19041 17.3605 2.5335C17.7305 2.87659 17.9572 3.34684 17.995 3.85L18 4V16C18.0002 16.5046 17.8096 16.9906 17.4665 17.3605C17.1234 17.7305 16.6532 17.9572 16.15 17.995L16 18H2C1.49542 18.0002 1.00943 17.8096 0.639452 17.4665C0.269471 17.1234 0.0428434 16.6532 0.00500021 16.15L1.00268e-07 16V4C-0.000159579 3.49542 0.190406 3.00943 0.533497 2.63945C0.876588 2.26947 1.34684 2.04284 1.85 2.005L2 2H4V1C4.00028 0.74512 4.09788 0.499968 4.27285 0.314632C4.44782 0.129296 4.68695 0.017765 4.94139 0.00282788C5.19584 -0.0121092 5.44638 0.0706746 5.64183 0.234265C5.83729 0.397855 5.9629 0.629904 5.993 0.883L6 1V2H12V1C12 0.734784 12.1054 0.48043 12.2929 0.292893C12.4804 0.105357 12.7348 0 13 0ZM16 4H2V16H16V4ZM12.166 5.876C13.278 6.524 14.032 7.818 13.999 9.298C13.958 11.134 12.589 12.642 10.561 13.898L10.315 14.047C9.912 14.287 9.485 14.555 9 14.555C8.636 14.555 8.305 14.405 7.992 14.227L7.685 14.047C5.522 12.762 4.044 11.207 4.001 9.298C3.968 7.818 4.722 6.524 5.834 5.876C6.788 5.32 7.969 5.269 9 5.913C10.03 5.269 11.212 5.32 12.166 5.876ZM11.159 7.604C10.78 7.384 10.329 7.358 9.881 7.74L9.77 7.845C9.58194 8.03473 9.33045 8.14834 9.06377 8.16403C8.79709 8.17971 8.53401 8.09637 8.325 7.93L8.23 7.845C7.746 7.355 7.251 7.365 6.841 7.605C6.38 7.873 5.983 8.475 6.001 9.253C6.018 10.033 6.619 11.033 8.469 12.183L8.707 12.327C8.804 12.385 8.901 12.444 9 12.499L9.147 12.414L9.293 12.327C11.329 11.117 11.981 10.065 11.999 9.253C12.017 8.475 11.62 7.873 11.159 7.604Z" fill="#a83297" />
                                </svg>
                            </div>
                            <p className='text-[12px] font-medium underline text-[#000]'>Anniversary</p>
                        </div>
                        <p className='text-[28px] font-semibold text-[#000]'>{anniversarys?.count}</p>
                        <div className='flex items-center justify-end w-full pt-[5px]'>
                            <Link href={"/anniversaries"} className='w-fit flex gap-[5px] px-[10px] mr-[5px] rounded-md items-center justify-end bg-[#52BD91]'>
                                <p className='text-[12px] text-white font-normal'>Check </p>
                                <svg xmlns="https://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                    <path d="M1 1L5 5L1 9" stroke="#F8F8F8" strokeWidth="0.8" />
                                </svg>
                            </Link>
                        </div>
                    </Link>

                </div>


                <div className='flex-1 w-full h-full flex flex-col gap-[5px]'>
                    <Link href={"/todaydue"} style={{ background: "radial-gradient(50% 50% at 50% 50%, #F9F9F9 81.83%, #F2F4FF 100%)" }} className=' flex flex-col gap-[2px] py-[10px] px-[15px] rounded-2xl relative'>

                        <div className='absolute top-0 right-0'>
                            <svg xmlns="https://www.w3.org/2000/svg" width="25" height="31" viewBox="0 0 55 61" fill="none">
                                <path d="M1.468 9.39868L36.1481 -6.37036L35.6452 1.72758L24.3395 6.86829C26.864 8.00248 29.1206 9.65194 30.946 11.7336L42.0783 6.67171L41.5754 14.7697L34.6394 17.9235C36.058 22.1839 35.912 26.8472 34.2252 31.1567C32.5384 35.4662 29.4096 39.1691 25.3465 41.6648L25.4058 41.7952L22.9782 42.899L54.1641 56.2612L45.4941 60.2035L14.3081 46.8413L11.343 40.3202L20.013 36.378C26.1167 33.6026 29.2527 27.0617 27.5647 21.1403L6.89535 30.5387L7.39824 22.4408L23.5591 15.0924C19.8676 12.128 14.4903 11.3467 9.63513 13.5544L0.965118 17.4966L1.468 9.39868Z" fill="#162566" fillOpacity="0.3" />
                            </svg>
                        </div>

                        <div className='flex gap-[3px] items-center justify-start'>
                            <svg xmlns="https://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                                <path d="M9.86364 8.15818L11.4164 9.05545L10.9391 9.88273L8.90909 8.71182V6.36364H9.86364V8.15818ZM14 8.27273C14 10.7355 12.0082 12.7273 9.54545 12.7273C7.08273 12.7273 5.09091 10.7355 5.09091 8.27273C5.09091 8.05636 5.11 7.84636 5.14182 7.63636H0V0H11.4545V4.25091C12.9564 4.97 14 6.49727 14 8.27273ZM5.52364 6.36364C5.63818 6.13455 5.75909 5.91818 5.90545 5.70818C5.84818 5.72727 5.79091 5.72727 5.72727 5.72727C4.67091 5.72727 3.81818 4.87455 3.81818 3.81818C3.81818 2.76182 4.67091 1.90909 5.72727 1.90909C6.78364 1.90909 7.63636 2.76182 7.63636 3.81818C7.63636 3.97727 7.61091 4.13636 7.57273 4.28273C8.17091 3.99 8.83909 3.81818 9.54545 3.81818C9.76182 3.81818 9.97182 3.83727 10.1818 3.86909V2.54545C9.84427 2.54545 9.52055 2.41136 9.28186 2.17268C9.04318 1.934 8.90909 1.61028 8.90909 1.27273H2.54545C2.54545 1.97909 1.97909 2.54545 1.27273 2.54545V5.09091C1.61028 5.09091 1.934 5.225 2.17268 5.46368C2.41136 5.70236 2.54545 6.02609 2.54545 6.36364H5.52364ZM12.7273 8.27273C12.7273 6.51636 11.3018 5.09091 9.54545 5.09091C7.78909 5.09091 6.36364 6.51636 6.36364 8.27273C6.36364 10.0291 7.78909 11.4545 9.54545 11.4545C11.3018 11.4545 12.7273 10.0291 12.7273 8.27273Z" fill="#162566" />
                            </svg>

                            <p className='text-[14px] text-[#162566] font-medium'>Today's Due: </p>
                        </div>

                        <div>
                            <p className='text-[16px] font-semibold'>₹ {formatRupees(totalBalance)}</p>
                        </div>

                        <div className='flex items-center justify-end w-full pt-[5px]'>
                            <Link href={"/todaydue"} className='w-fit flex gap-[5px] px-[10px] rounded-md items-center justify-end bg-[#52BD91]'>
                                <p className='text-[12px] text-white font-normal'>Check </p>
                                <svg xmlns="https://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                    <path d="M1 1L5 5L1 9" stroke="#F8F8F8" strokeWidth="0.8" />
                                </svg>
                            </Link>

                        </div>
                    </Link>


                    <Link href={"/totaldue"} style={{ background: "radial-gradient(50% 50% at 50% 50%, #F9F9F9 81.83%, #F2F4FF 100%)" }} className=' flex flex-col gap-[2px] py-[10px] px-[15px]  rounded-2xl relative'>
                        <div className='absolute top-0 right-0'>
                            <svg xmlns="https://www.w3.org/2000/svg" width="25" height="31" viewBox="0 0 55 61" fill="none">
                                <path d="M1.468 9.39868L36.1481 -6.37036L35.6452 1.72758L24.3395 6.86829C26.864 8.00248 29.1206 9.65194 30.946 11.7336L42.0783 6.67171L41.5754 14.7697L34.6394 17.9235C36.058 22.1839 35.912 26.8472 34.2252 31.1567C32.5384 35.4662 29.4096 39.1691 25.3465 41.6648L25.4058 41.7952L22.9782 42.899L54.1641 56.2612L45.4941 60.2035L14.3081 46.8413L11.343 40.3202L20.013 36.378C26.1167 33.6026 29.2527 27.0617 27.5647 21.1403L6.89535 30.5387L7.39824 22.4408L23.5591 15.0924C19.8676 12.128 14.4903 11.3467 9.63513 13.5544L0.965118 17.4966L1.468 9.39868Z" fill="#162566" fillOpacity="0.3" />
                            </svg>
                        </div>
                        <div className='flex gap-[3px] items-center justify-start'>
                            <svg xmlns="https://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none">
                                <path d="M6.47059 2.64706C6.47059 3.81706 5.41765 4.76471 4.11765 4.76471C2.81765 4.76471 1.76471 3.81706 1.76471 2.64706C1.76471 1.47706 2.81765 0.529412 4.11765 0.529412C5.41765 0.529412 6.47059 1.47706 6.47059 2.64706ZM6.47059 6.20471V9H0V7.94118C0 6.77118 1.84118 5.82353 4.11765 5.82353C5 5.82353 5.80588 5.96647 6.47059 6.20471ZM14.1176 9H7.64706V0H14.1176V9ZM9.41177 4.5C9.41177 4.14898 9.5667 3.81233 9.84249 3.56412C10.1183 3.31591 10.4923 3.17647 10.8824 3.17647C11.2724 3.17647 11.6464 3.31591 11.9222 3.56412C12.198 3.81233 12.3529 4.14898 12.3529 4.5C12.3529 4.85102 12.198 5.18767 11.9222 5.43588C11.6464 5.68409 11.2724 5.82353 10.8824 5.82353C10.4923 5.82353 10.1183 5.68409 9.84249 5.43588C9.5667 5.18767 9.41177 4.85102 9.41177 4.5ZM12.9412 2.11765C12.6292 2.11765 12.3299 2.00609 12.1093 1.80752C11.8887 1.60896 11.7647 1.33964 11.7647 1.05882H10C10 1.64647 9.47647 2.11765 8.82353 2.11765V6.88235C9.13555 6.88235 9.43479 6.99391 9.65542 7.19248C9.87605 7.39104 10 7.66036 10 7.94118H11.7647C11.7647 7.35882 12.2941 6.88235 12.9412 6.88235V2.11765Z" fill="#162566" />
                            </svg>

                            <p className='text-[14px] text-[#162566] font-medium'>Total Due: </p>
                        </div>

                        <div>
                            <p className='text-[16px] font-semibold'>₹ {formatRupees(totalDueBalance)}</p>
                        </div>

                        <div className='flex items-center justify-end w-full pt-[5px]'>
                            <Link href={"/totaldue"} className='w-fit flex gap-[5px] px-[10px] rounded-md items-center justify-end bg-[#52BD91]'>
                                <p className='text-[12px] text-white font-normal'>Check </p>
                                <svg xmlns="https://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                    <path d="M1 1L5 5L1 9" stroke="#F8F8F8" strokeWidth="0.8" />
                                </svg>
                            </Link>

                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CheckBox
