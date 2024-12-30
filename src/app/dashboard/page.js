import VerticalBar2 from '@/components/Charts/VerticalBar2'
import Banner from '@/components/Dashboard/Banner'
import CheckBox from '@/components/Dashboard/CheckBox'
import Collections from '@/components/Dashboard/Collections'
import Invoices from '@/components/Dashboard/Invoices'
import Others from '@/components/Dashboard/Others'
import TodayRates from '@/components/Dashboard/TodayRates'
import TotalSales from '@/components/Dashboard/TotalSales'
import VerticalBar from '@/components/Graphs/VerticalBar'
import Navbar from '@/components/Navbar/Navbar'
import NavbarBottom from '@/components/Navbar/NavbarBottom'
import NavbarV2 from '@/components/Navbar/NavbarV2'
import React from 'react'

const page = () => {

    
    return (
        <div>
            <NavbarV2 title={"home"} />
            <NavbarBottom />
            <TodayRates  />
            <Banner title={"Swastik"} />
            <TotalSales  />
            <CheckBox />
            <VerticalBar />
            <VerticalBar2 />
            <Others  />
            <Collections />
            <Invoices  />
        </div>
    )
}

export default page
