import VerticalBar2 from '@/components/Charts/VerticalBar2'
import Banner from '@/components/Dashboard/Banner'
import VerticalBar from '@/components/Graphs/VerticalBar'
import NavbarV2 from '@/components/Navbar/NavbarV2'
import React from 'react'

const page = () => {
    return (
        <div>
            <NavbarV2 title={"graphs"} />
            <Banner title={"Graphs"} />
            <div className='p-[20px]'>
                <VerticalBar />
                <VerticalBar2 />
            </div>
        </div>
    )
}

export default page
