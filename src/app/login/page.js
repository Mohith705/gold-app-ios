"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const page = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [tenantName, setTenantName] = useState('');

    const { push } = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://www.erpser.timeserasoftware.in/api/Tenant/CheckValidTenant?userName=${userName}&password=${password}`)
            .then(response => response.json())
            .then(data => {

                if (!data || data.tenantName === null) {
                    alert('Wrong credentials');
                } else {
                    // Store login credentials and tenantName in cookies
                    Cookies.set('userName', userName, { expires: 7 });
                    Cookies.set('password', password, { expires: 7 });
                    Cookies.set('tenantName', data.tenantName, { expires: 7 });
                    push('/dashboard'); // Use push from useRouter
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    useEffect(() => {
        // Check if the tenantName cookie exists
        const tenantName = Cookies.get('tenantName');

        // If the tenantName cookie exists, redirect to the dashboard
        if (tenantName) {
            router.push('/dashboard');
        }
    }, []);


    return (
        // <div className='w-full h-[100vh] bg-gradient-to-br from-[#162566] to-[#000]'>
        //     <div className='w-full h-full flex flex-col justify-center items-center gap-[5px]'>
        //         <div className='max-w-[40px] h-[30px] flex items-center justify-center relative w-full'>
        //             <Image src={"/tlogo.png"} alt='' fill className='' />
        //         </div>
        //         <div className='max-w-[150px] h-[30px] flex items-center justify-center relative w-full ml-[7px]'>
        //             <Image src={"/textLogo.png"} alt='' fill />
        //         </div>

        //         <div className='pt-[20px]'>
        //             <form className='flex flex-col gap-[10px]'>
        //                 <div className='flex flex-col gap-[2px] text-white  font-semibold'>
        //                     <label htmlFor="username" className='text-[18px]'>Username: </label>
        //                     <input type="text" name='username' placeholder='Enter your username...' className='text-[14px] p-[10px] rounded-md' />
        //                 </div>
        //                 <div className='flex flex-col gap-[2px] text-white  font-semibold'>
        //                     <label htmlFor="password" className='text-[18px]'>Password: </label>
        //                     <input type="password" name='password' placeholder='Enter your password...' className='text-[14px] p-[10px] rounded-md' />
        //                 </div>
        //                 <button type='submit' className='py-[10px] px-[10px] mt-[5px] inline-block font-bold bg-white rounded-md'>Login</button>
        //             </form>
        //         </div>
        //     </div>
        // </div>

        <div className='w-full h-[100vh] overflow-hidden'>
            <div className='bg-[#52BD91] h-[40vh] relative w-full flex items-center justify-center'>
                <div className=' absolute top-0 left-2'>
                    <Image src={"/leaf1.png"} width={80} height={100} alt='' />
                </div>
                <div className=' absolute top-0 right-0'>
                    <Image src={"/leaf2.png"} width={72} height={87} alt='' />
                </div>
                <div className=' absolute bottom-6 left-0'>
                    <Image src={"/leaf3.png"} width={72} height={87} alt='' />
                </div>
                <div className=' absolute bottom-8 right-0'>
                    <Image src={"/leaf4.png"} width={128} height={103} alt='' />
                </div>

                <div className='max-w-[240px] mx-auto w-full h-[235px] relative -mt-[25px]'>
                    <Image src={"/loginbanner.png"} fill alt='' />
                </div>
            </div>
            <div className='h-[17vh] w-full -mt-[65px] z-10 relative flex items-start py-[15px] justify-center text-center' style={{ background: "linear-gradient(305deg, #121E4F 36.76%, #192C7C 92.83%)", borderRadius: "70px 70px 0px 0px" }}>
                <div className='max-w-[150px] mx-auto flex items-center justify-center gap-[5px] pl-[15px]'>
                    <img
                        src="/tlogo.png"
                        alt="Logo"
                    />
                    <img src="/textLogo.png" alt="" />
                </div>

            </div>
            <div className='h-[600px] w-full relative -mt-[65px] z-20 flex flex-col p-[20px] gap-[20px]' style={{ background: "linear-gradient(305deg, #090F29 36.76%, #132057 92.83%)", borderRadius: "70px 70px 0px 0px" }}>
                <p className='text-[22px] text-white font-medium mx-auto'>Login to your account</p>
                <div className=''>
                    <form className='flex flex-col gap-[20px] max-w-[250px] mx-auto pt-[20px]' onSubmit={handleSubmit}>
                        <input type="text" placeholder='Enter your username' className='p-[15px] rounded-md border border-white bg-transparent focus:border-[#52BD91] text-white focus:outline-0' value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                        <input type="password" placeholder='Enter your password' className='p-[15px] rounded-md border border-white bg-transparent focus:border-[#52BD91] text-white focus:outline-0' value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" className=' p-[15px] text-white w-[150px] mx-auto rounded-md bg-[#52BD91]' value="Submit" />
                    </form>
                </div>
            </div>
        </div >
    )
}

export default page
