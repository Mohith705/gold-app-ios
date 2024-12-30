import Accounts from '@/components/Accounts/Accounts'
import Banner from '@/components/Dashboard/Banner'
import NavbarV2 from '@/components/Navbar/NavbarV2'
import React from 'react'

const page = () => {
    return (
        <div>
            <NavbarV2 title="accounts"/>
            <Banner title={"Accounts"}/>
            <Accounts />
        </div>
    )
}

export default page
