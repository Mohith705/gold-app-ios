import Crm from '@/components/CRM/Crm'
import Banner from '@/components/Dashboard/Banner'
import NavbarV2 from '@/components/Navbar/NavbarV2'
import React from 'react'

const page = () => {
    return (
        <div>
            <NavbarV2 title={"crm"} />
            <Banner title={"CRM"} />
            <Crm />
        </div>
    )
}

export default page
