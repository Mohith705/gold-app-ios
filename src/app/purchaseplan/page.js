import Banner from '@/components/Dashboard/Banner'
import NavbarV2 from '@/components/Navbar/NavbarV2'
import Purchaseplan from '@/components/Purchaseplan/Purchaseplan'
import React from 'react'

const page = () => {
    return (
        <div>
            <NavbarV2 title={"purchaseplan"} />
            <Banner title={"Purchase Plan"} />
            <Purchaseplan />
        </div>
    )
}

export default page
