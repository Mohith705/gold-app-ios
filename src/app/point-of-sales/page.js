import Banner from '@/components/Dashboard/Banner'
import Navbar from '@/components/Navbar/Navbar'
import NavbarV2 from '@/components/Navbar/NavbarV2'
import PointOfSales from '@/components/PointOfSales/PointOfSales'
import React from 'react'

const page = () => {
    return (
        <div>
            <NavbarV2 title={"pointofsales"} />
            <Banner title={"Point Of Sales"}/>
            <PointOfSales />
        </div>
    )
}

export default page
