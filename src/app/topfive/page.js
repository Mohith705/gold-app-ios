"use client";

import Banner from '@/components/Dashboard/Banner';
import NavbarV2 from '@/components/Navbar/NavbarV2';
import Topfive from '@/components/TopFive/Topfive';
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const page = () => {
    return (
        <div>
            <NavbarV2 title={"topfive"} />
            <Banner title={"Header"} />
            <Topfive />
        </div>
    )
}

export default page
