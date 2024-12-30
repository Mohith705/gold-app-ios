"use client";

import React, { useState } from 'react'
import axios from 'axios';

async function getData() {
    try {
        const userName = 'VJ';
        const password = 'VJ';

        const startDate = "2024/03/09";
        const endDate = "2024/03/09";

        const response = await axios.get(`https://www.erpser.timeserasoftware.in/api/Tenant/CheckValidTenant?userName=${userName}&password=${password}`);
        const data = await response.data;

        const tenantName = await data.tenantName;

        const headers = {
            'tenantName': await data.tenantName
        }

        const response2 = await axios.get(`https://www.erpser.timeserasoftware.in/api/Erp/GetSaleRegister?name=&billStartDate=${startDate}&billEndDate=${endDate}&custName=&jewelType=`, { headers })

        const data2 = await response2.data;

        // return data2;

        const response3 = await axios.get(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetDailyRates?date=${startDate}`, { headers })

        const data3 = await response3.data;
        // return data3;

        const response4 = await axios.get(`https://www.erpser.timeserasoftware.in/api/DashBoard/GetTotalSaleValue?billDate=${startDate}`, { headers });
        const data4 = await response4.data;
        // return data4;

    } catch (error) {
        console.error('Error fetching tenant data: ', error);
    }
}

const page = async () => {

    const data = await getData();

    // console.log(data);

    return (
        <div>
            {data?.length}
        </div>
    )
}

export default page
