"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import "./Navbar.css";
import Link from 'next/link';
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { Tb360View } from "react-icons/tb";


const Navbar = () => {

    const [toggleMenu, setToggleMenu] = useState(false);

    const toggleSidebar = () => {
        setsideOpen(!sideOpen);
    };

    const [scrolled, setScrolled] = useState(false);
    const [sideOpen, setsideOpen] = useState(false);


    return (
        <>
            <div
                className={`w-full h-[80px] text-white flex  items-center justify-between px-8 sticky top-0 z-30 bg-[#162566]
                    }`}
            >
                <div className="max-w-[150px]  flex items-center justify-center gap-[5px]">
                    <img
                        src="/tlogo.png"
                        alt="Logo"
                    />
                    <img src="/textLogo.png" alt="" />
                </div>

                <div>
                    <button
                        onClick={toggleSidebar}
                        className="text-white focus:outline-none"
                    >
                        <RxHamburgerMenu
                            size={30}
                            color={"white"}
                        />
                    </button>
                </div>

                <div
                    className={` fixed top-0 left-0 h-auto bg-white w-full transition-transform duration-300 transform ${sideOpen ? "translate-y-0" : "-translate-y-full"
                        }`}
                >

                    <div className="w-full flex justify-between px-8 py-6 bg-[#162566]">
                        <div className='w-[42px] h-[42px] relative'>
                            <Image className="logo" layout='fill' o src='/tlogo.png' />

                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="text-white focus:outline-none"
                        >
                            <RxCross2 size={30} color="white" />
                        </button>
                    </div>

                    <ul className='flex flex-col text-black ml-4 space-y-2 py-3 font-semibold text-[14px]'>
                        <li><Link href="/dashboard">Home</Link></li>
                        <li><Link href="/topfive">Top Five</Link></li>
                        <li><Link href="/point-of-sales">Point Of Sales</Link></li>
                        <li><Link href="/inventory">Inventory</Link></li>
                        <li><Link href="/accounts">Accounts</Link></li>
                        <li><Link href="/crm">CRM</Link></li>
                    </ul>



                </div>



            </div>
        </>





        // <div className='w-full max-h-[1000px] bg-[#162566] '>
        //     <div className='h-[70px] px-[15px] sm:px-[20px] w-full flex justify-between items-center gap-[20px]'>
        //         <div className='w-full relative flex'>
        //             <div className='max-w-[40px] h-[30px] flex items-center justify-center relative w-full'>
        //                 <Image src={"/tlogo.png"} alt='' fill className='' />
        //             </div>
        //             <div className='max-w-[150px] h-[30px] flex items-center justify-center relative w-full ml-[7px]'>
        //                 <Image src={"/textLogo.png"} alt='' fill />
        //             </div>
        //         </div>

        //         <div className="uni_navbar-menu z-50 ">
        //             {
        //                 toggleMenu ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
        //                     : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        //             }
        //             {
        //                 toggleMenu && (
        //                     <div className="uni_navbar-menu_container scale-up-center flex flex-col items-start justify-center ">
        //                         <div className="uni_navbar-menu_container-links ">
        //                             <p><Link href="/dashboard">Home</Link></p>
        //                             <p><Link href="/topfive">Top Five</Link></p>
        //                             <p><Link href="/point-of-sales">Point Of Sales</Link></p>
        //                             <p><Link href="/inventory">Inventory</Link></p>
        //                             <p><Link href="/dashboard">Home</Link></p>
        //                         </div>
        //                         <div className="uni_navbar-menu_container-links">
        //                             <p><Link href="/dashboard">Home</Link></p>
        //                             <p><Link href="/dashboard">Home</Link></p>
        //                         </div>
        //                     </div>
        //                 )
        //             }
        //         </div>
        //     </div>
        // </div>
    )
}

export default Navbar
