import Banner from '@/components/Dashboard/Banner'
import Inventory from '@/components/Inventory/Inventory'
import Navbar from '@/components/Navbar/Navbar'
import NavbarV2 from '@/components/Navbar/NavbarV2'
import React from 'react'

const page = () => {
    return (
        <div>
            <NavbarV2 title={"inventory"} />
            <Banner title={"Inventory"} />
            <Inventory />
        </div>
    )
}

export default page
