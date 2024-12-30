"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Storage } from '@capacitor/storage';

const page = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [tenantName, setTenantName] = useState('');

  

  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://www.erpser.timeserasoftware.in/api/Tenant/CheckValidTenant?userName=${userName}&password=${password}`);
      const data = await response.json();

      if (!data || data.tenantName === null) {
        alert('Wrong credentials');
      } else {
        // Store login credentials and tenantName in storage
        await Storage.set({ key: 'userName', value: userName });
        await Storage.set({ key: 'password', value: password });
        await Storage.set({ key: 'tenantName', value: data.tenantName });

        push('/dashboard'); // Redirect to the dashboard
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Check if the tenantName exists in storage
    const checkStorage = async () => {
      try {
        const { value: tenantName } = await Storage.get({ key: 'tenantName' });
        if (tenantName) {
          push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking storage:', error);
      }
    };
    checkStorage();
  }, []);


  return (

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
