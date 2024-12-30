import Link from 'next/link'
import React from 'react'

const NavbarBottom = () => {
    return (
        <div className='max-h-[1000px] bg-gray-300 w-full hidden md:block'>
            <div className='h-[50px] w-full flex items-center justify-center gap-[25px]'>
                <Link href={"/dashboard"}>Home</Link>
                <Link href={"/dashboard"}>Home</Link>
                <Link href={"/dashboard"}>Home</Link>
                <Link href={"/dashboard"}>Home</Link>
                <Link href={"/dashboard"}>Home</Link>
                <Link href={"/dashboard"}>Home</Link>
                <Link href={"/dashboard"}>Home</Link>
            </div>
        </div>
    )
}

export default NavbarBottom
