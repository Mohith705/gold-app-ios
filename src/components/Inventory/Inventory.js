"use client";

import { Storage } from '@capacitor/storage';
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const Inventory = () => {

    const [mname, setMnames] = useState(null);
    const [selectedMname, setSelectedMname] = useState("GOLD");
    const [selectedMPS, setSelectedMPS] = useState(null);
    const [selectedPWS, setSelectedPWS] = useState(null);
    const [selectedCWS, setSelectedCWS] = useState(null);
    const [selectedPuWS, setSelectedPuWS] = useState(null);
    const [selectedDS, setSelectedDS] = useState(null);
    const [barCode, setBarCode] = useState([]);
    const [productinfo, setProductInfo] = useState([]);

    const [tenantName, setTenantName] = useState("");

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    }

    const [startSelected, setStartSelected] = useState(getFormattedDate());

    useEffect(() => {
        // Retrieve tenantName from storage
        const getStoredTenantName = async () => {
            try {
                const { value } = await Storage.get({ key: 'tenantName' });
                if (value) {
                    setTenantName(value);
                }
            } catch (error) {
                console.error('Error getting tenantName:', error);
            }
        };
        getStoredTenantName();
    }, []);

    const [tagData, setTagData] = useState(null);
    const [tagNo, setTagNo] = useState(null);

    const fetchMnames = () => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetTagGenerationDetails?filterName=MNAME`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setMnames(data) }).catch((error) => { console.error('Error fetching data in inventory:', error); })
    }

    const fetchMPS = () => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetInventoryMainProductStock?mName=a`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setSelectedMPS(data) }).catch((error) => { console.error("Error in fetching data in MPS: ", error); })
    }

    const fetchPWS = (mname) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetInventoryProductWiseStock?mName=${mname}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setSelectedPWS(data) }).catch((error) => { console.error("Error in fetching data in PWS: ", error); })
    }

    const fetchCWS = (mname) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetInventoryCounterStock?mName=${mname}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setSelectedCWS(data) }).catch((error) => { console.error("Error in fetching data in PWS: ", error); })
    }

    const fetchPuWS = (mname) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetInventoryPurityWiseStock?mName=${mname}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setSelectedPuWS(data) }).catch((error) => { console.error("Error in fetching data in PuWS: ", error); })
    }

    const fetchDS = (mname) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetDealerSummary?filterName=""&mName=${mname}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setSelectedDS(data) }).catch((error) => { console.error("Error in fetching data in PuWS: ", error); })
    }

    const handleTagNoChange = (event) => {
        setTagNo(parseInt(event.target.value));
    };

    const handleSubmit = () => {
        fetchTags(tagNo);
        const newOpenStatus = [...openStatus];

        newOpenStatus[8] = true;
        setOpenStatus(newOpenStatus);
    };

    const fetchTags = (tagNo) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetTagDetails?tagNo=${tagNo}`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => { setTagData(data) }).catch((error) => { console.error('Error fetching data in crm tags:', error); })
    }

    const fetchBarCodeEntry = (date, mname) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetBarCodeEntry?date=${date}`, {
            headers: { 'tenantName': tenantName }
        })
            .then((res) => res.json())
            .then((data) => {
                const filteredData = data.filter(item => item.mname === mname);
                setBarCode(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching data in CRM tags:', error);
            });
    };

    const fetchProductInfo = (mname) => {
        fetch(`https://www.erpser.timeserasoftware.in/api/Erp/GetProductMaster`, {
            headers: { 'tenantName': tenantName }
        }).then((res) => res.json()).then((data) => {
            const filteredData = data.filter(item => item.mname === mname);
            setProductInfo(filteredData); 
        }).catch((error) => { console.error('Error fetching data in inventory:', error); })
    }

    useEffect(() => {
        fetchMnames();
        fetchMPS();
    }, [tenantName]);

    useEffect(() => {
        fetchPWS(selectedMname);
        fetchCWS(selectedMname);
        fetchPuWS(selectedMname);
        fetchDS(selectedMname);
        fetchBarCodeEntry(startSelected, selectedMname);
        fetchTags(tagNo);
        fetchProductInfo(selectedMname);
    }, [selectedMname, tagNo, tenantName, startSelected]);

    const handleSelectChange = (value) => {
        setSelectedMname(value);
    }

    const [openStatus, setOpenStatus] = useState(
        new Array(8).fill(false)
    );

    const openAllFaqs = () => {
        setOpenStatus(new Array(8).fill(true));
    };

    const closeAllFaqs = () => {
        setOpenStatus(new Array(8).fill(false));
    };

    const toggleAccordion = (index) => {
        const newOpenStatus = [...openStatus];

        for (let i = 0; i < newOpenStatus.length; i++) {
            if (i !== index) {
                newOpenStatus[i] = false;
            }
        }

        newOpenStatus[index] = !newOpenStatus[index];
        setOpenStatus(newOpenStatus);
    };

    const formatRupees = (value) => {
        const roundedValue = parseFloat(value).toFixed(2);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
    }

    const formatWeight = (value) => {
        const roundedValue = parseFloat(value).toFixed(3);
        return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
    }

    // console.log(barCode);

    return (
        <div className='w-full max-h-[5000px] bg-[white]'>
            <div className='p-[20px] sm:p-[50px] lg:p-[100px]'>
                <div className='w-full flex justify-between items-center pb-[20px]'>
                    <div>
                        <h1 className='px-[7px] text-[#162566] text-[16px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm'>Inventory</h1>
                    </div>
                    <div className='flex gap-[5px] text-[12px] font-semibold text-[#162566]'>
                        <div onClick={() => openAllFaqs()} className='px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer'>Expand All <span className='text-[#52BD91]'>+</span></div>
                        <div onClick={() => closeAllFaqs()} className='px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer'>Collapse All <span className='text-[#52BD91]'>-</span></div>
                    </div>
                </div>
                <div className='mb-[20px] w-full h-full border border-black'>
                    <select name="mname" value={selectedMname} onChange={(e) => handleSelectChange(e.target.value)} className='w-full h-full py-2'>
                        {mname?.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex items-center justify-center gap-[5px] text-[16px] font-semibold text-[#162566] pb-[20px]'>
                    <input
                        type="number"
                        value={tagNo || ''}
                        onChange={handleTagNoChange}
                        placeholder="Enter Tag No"
                        className="px-1 py-2 border border-gray-300 rounded"
                    />
                    <button onClick={handleSubmit} className="px-2 py-2 bg-[#52BD91] text-white rounded">Submit</button>
                </div>
                <div className='flex flex-col gap-[25px]'>

                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[6] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(6)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Tag Check</span>
                            {openStatus[6] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[6] === true && (
                            (tagData !== null) ? (<div className='max-h-[425px] overflow-auto w-full bg-[#D9D9D9] p-[15px]'>
                                <div className='h-full flex flex-col rounded-md overflow-hidden'>
                                    <div className='h-[65px] bg-[#162566] p-[10px] flex justify-between items-start '>
                                        <div className='text-[18px] text-white flex flex-col items-start justify-start text-start'>
                                            <p>#{tagData?.tagno}</p>
                                            <p className='text-[14px]'>Tag no</p>
                                        </div>
                                        <div className='flex flex-col justify-center items-end'>
                                            <p className='text-[14px] text-[#69FBBF] font-normal'>Amount</p>
                                            <p className='text-[18px] text-[#69FBBF] font-semibold'>₹ {formatRupees(tagData?.netamt)}</p>
                                        </div>
                                    </div>
                                    <div className='bg-white p-[10px] pb-[0px]'>
                                        <div className=' border border-b-2 border-[#000] border-t-0 border-r-0 border-l-0 pb-[5px] flex justify-between items-center'>
                                            <div className='text-[18px] text-[#000] flex flex-col items-start justify-start text-start leading-4 '>
                                                <p className='text-[12px] text-[#000] font-normal'>Product Name</p>
                                                <p className='text-[18px] font-bold'>{tagData?.productname}</p>
                                            </div>

                                            <div className='text-[18px] text-[#000] flex flex-col items-center justify-center text-center leading-5'>
                                                <p className='text-[16px] p-[7px] rounded-md font-semibold bg-[#52BD91] text-[#000]'>{tagData?.pieces}</p>
                                                <p className='text-[14px] font-normal'>pieces</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='px-[10px] py-[10px] bg-white flex items-start border-2 justify-start w-full h-full'>
                                        <div className='grid grid-cols-1 gap-x-[9px] w-full h-full'>
                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Purity: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{tagData?.prefix}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Gwt: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{formatWeight(tagData?.gwt)}g</p>
                                            </div>


                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Stone Wt: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{tagData?.stonewt === null ? formatWeight(0) : formatWeight(tagData?.stonewt)} g</p>
                                            </div>



                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Nwt: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{formatWeight(tagData?.nwt)}g</p>
                                            </div>



                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[12px] '>Wastage: <span className='font-semibold'>({formatRupees(tagData?.wastage)}%)</span> </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{formatWeight(tagData?.cattotwast)}g</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[12px] '>MC/Amt: <span className='font-semibold'>({formatWeight(tagData?.makingcharges)}g)</span></p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹ {formatRupees(tagData?.cattotmc)}</p>
                                            </div>

                                            <div className='grid grid-cols-2 border-2 border-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Stone Cost: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(tagData?.iteM_TOTAMT)}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Dealer: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{tagData?.dealername}</p>
                                            </div>

                                            <div className='grid grid-cols-2 justify-center items-center'>
                                                <p className='text-[14px] '>Counter: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>{tagData?.countername}</p>
                                            </div>

                                            <div className='grid grid-cols-2 border-2 border-[#69FBBF] justify-center items-center'>
                                                <p className='text-[14px] '>Today Rate: </p>
                                                <p className='text-[14px] font-semibold w-full flex justify-end items-center pr-[10px]'>₹{formatRupees(tagData?.rate)}</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='h-[7px] bg-[#162566]'>

                                    </div>
                                </div>
                            </div>) : (
                                <div className='h-full border py-[20px] text-[20px] border-[#52BD91] font-semibold flex items-center justify-center'>
                                    Enter Tag No
                                </div>
                            )
                        )}
                    </div>
                    <div className='w-full h-full'>
                        <button className={`w-full text-left  ${openStatus[7] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(7)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Today Stock Entry</span>
                            {openStatus[7] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[7] === true && (
                            <div className='max-h-[950px] overflow-auto w-full flex flex-col gap-[15px] bg-[#D6D6D6] p-[15px]'>
                                {
                                    barCode?.map((barcode, index) => (
                                        <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>
                                            <div className='basis-[60%] flex justify-between items-center w-full h-full font-semibold'>
                                                <h1 className='text-[16px] text-[#000]'>{barcode?.mname}</h1>
                                                <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Pieces: {barcode?.pieces}</p>
                                            </div>
                                            <div className='basis-[40%] flex justify-between items-center w-full h-full'>
                                                <p className='flex-1 text-[14px] font-semibold'>Gwt: {formatWeight(barcode?.gwt)} g</p>
                                                <p className='flex-1 text-[14px] font-semibold'>Nwt: {formatWeight(barcode?.nwt)} g</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[0] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(0)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Main Product Stock</span>
                            {openStatus[0] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[0] === true && (
                            <div className='max-h-[950px] overflow-auto w-full flex flex-col gap-[15px] bg-[#D6D6D6] p-[15px]'>
                                {
                                    selectedMPS?.map((mps, index) => (
                                        <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>
                                            <div className='basis-[60%] flex justify-between items-center w-full h-full font-semibold'>
                                                <h1 className='text-[16px] text-[#000]'>{mps?.mname}</h1>
                                                <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Pieces: {mps?.pieces}</p>
                                            </div>
                                            <div className='basis-[40%] flex justify-between items-center w-full h-full'>
                                                <p className='flex-1 text-[14px] font-semibold'>Gwt: {formatWeight(mps?.gwt)} g</p>
                                                <p className='flex-1 text-[14px] font-semibold'>Nwt: {formatWeight(mps?.nwt)} g</p>
                                            </div>
                                            {/* <div className='basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                                <p className='text-[12px] font-semibold'>Date: </p>
                                            </div> */}
                                        </div>
                                    ))
                                }
                                {/* <div className='min-h-[80px] h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px]'>
                                    <div className='basis-[40%] flex justify-between items-center w-full h-full font-semibold'>
                                        <h1 className='text-[19px] text-[#000]'>Vijay Kumar</h1>
                                        <p className='text-[12px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Pieces: 28</p>
                                    </div>
                                    <div className='basis-[30%] flex justify-between items-center w-full h-full'>
                                        <p className='flex-1 text-[14px] font-semibold'>GWT: </p>
                                        <p className='flex-1 text-[14px] font-semibold'>NWT: </p>
                                    </div>
                                    <div className='basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                        <p className='text-[14px] font-semibold'>Date: </p>
                                    </div>
                                </div> */}
                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[1] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(1)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Product Wise Stock</span>
                            {openStatus[1] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white" />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary" />
                            )}
                        </button>
                        {openStatus[1] === true && (
                            <div className='max-h-[950px] overflow-auto flex flex-col gap-[15px] w-full bg-[#D6D6D6] p-[15px]'>
                                {
                                    (selectedPWS.length === 0 ? (
                                        <h1 className='w-full text-center'>Select Mname</h1>
                                    ) : (
                                        selectedPWS?.map((pws, index) => (
                                            <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>

                                                <div className='basis-[60%] flex justify-between items-center w-full h-full font-semibold'>
                                                    <h1 className='text-[16px] text-[#000]'>{pws?.productName}</h1>
                                                    <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Pieces: {pws?.pieces}</p>
                                                </div>
                                                <div className='basis-[40%] flex justify-between items-center w-full h-full'>
                                                    <p className='flex-1 text-[14px] font-semibold'>GWT: {formatWeight(pws?.gwt)} g</p>
                                                    <p className='flex-1 text-[14px] font-semibold'>NWT: {formatWeight(pws?.nwt)} g</p>
                                                </div>
                                                {/* <div className='basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                                    <p className='text-[14px] font-semibold'>Date: </p>
                                                </div> */}
                                            </div>
                                        ))
                                    ))
                                }
                                {/* <div className='min-h-[80px] h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px]'>
                                    
                                    <div className='basis-[40%] flex justify-between items-center w-full h-full font-semibold'>
                                        <h1 className='text-[19px] text-[#000]'>Vijay Kumar</h1>
                                        <p className='text-[12px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Pieces: 28</p>
                                    </div>
                                    <div className='basis-[30%] flex justify-between items-center w-full h-full'>
                                        <p className='flex-1 text-[14px] font-semibold'>GWT: </p>
                                        <p className='flex-1 text-[14px] font-semibold'>NWT: </p>
                                    </div>
                                    <div className='basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                        <p className='text-[14px] font-semibold'>Date: </p>
                                    </div>
                                </div> */}
                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[2] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(2)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Counter Wise Stock</span>
                            {openStatus[2] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[2] === true && (
                            <div className='max-h-[950px] overflow-auto w-full flex flex-col gap-[15px] bg-[#D6D6D6] p-[15px]'>
                                {
                                    (selectedCWS.length === 0 ? (
                                        <h1 className='w-full text-center'>Select Mname</h1>
                                    ) : (
                                        selectedCWS?.map((cws, index) => (
                                            <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>

                                                <div className='basis-[60%] flex justify-between items-center w-full h-full font-semibold'>
                                                    <h1 className='text-[16px] text-[#000]'>{cws?.counterName}</h1>
                                                    <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Pieces: {cws?.pieces}</p>
                                                </div>
                                                <div className='basis-[40%] flex justify-between items-center w-full h-full'>
                                                    <p className='flex-1 text-[14px] font-semibold'>Gwt: {formatWeight(cws?.gwt)} g</p>
                                                    <p className='flex-1 text-[14px] font-semibold'>Nwt: {formatWeight(cws?.nwt)} g</p>
                                                </div>
                                                {/* <div className='basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                                    <p className='text-[12px] font-semibold'>Date: </p>
                                                </div> */}
                                            </div>
                                        ))
                                    ))
                                }
                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[3] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(3)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Purity Wise Stock</span>
                            {openStatus[3] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[3] === true && (
                            <div className='max-h-[950px] overflow-auto w-full flex flex-col gap-[15px] bg-[#D6D6D6] p-[15px]'>
                                {
                                    (selectedPuWS.length === 0 ? (
                                        <h1 className='w-full text-center'>Select Mname</h1>
                                    ) : (
                                        selectedPuWS?.map((puws, index) => (
                                            <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>

                                                <div className='basis-[60%] flex justify-between items-center w-full h-full font-semibold'>
                                                    <h1 className='text-[16px] text-[#000]'>{puws?.prefix}</h1>
                                                    <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Pieces: {puws?.pieces}</p>
                                                </div>
                                                <div className='basis-[40%] flex justify-between items-center w-full h-full'>
                                                    <p className='flex-1 text-[14px] font-semibold'>Gwt: {formatWeight(puws?.gwt)} G</p>
                                                    <p className='flex-1 text-[14px] font-semibold'>Nwt: {formatWeight(puws?.nwt)} g</p>
                                                </div>
                                                {/* <div className='basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                                    <p className='text-[14px] font-semibold'>Date: </p>
                                                </div> */}
                                            </div>
                                        ))
                                    ))
                                }
                            </div>
                        )}
                    </div>
                    <div className={`w-full h-full  `}>
                        <button className={`w-full text-left  ${openStatus[4] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(4)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Dealer Summary</span>
                            {openStatus[4] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[4] === true && (
                            <div className='max-h-[950px] overflow-auto w-full flex flex-col gap-[15px] bg-[#D6D6D6] p-[15px]'>
                                {
                                    (selectedDS.length === 0 ? (
                                        <h1 className='w-full text-center'>Select Mname</h1>
                                    ) : (
                                        selectedDS?.map((ds, index) => (
                                            <div key={index} className=' h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>

                                                <div className='basis-[40%] flex justify-between items-center w-full h-full font-semibold'>
                                                    <h1 className='text-[16px] text-[#000]'>{ds?.dealername}</h1>
                                                    <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Pieces: {ds?.pieces}</p>
                                                </div>
                                                <div className='basis-[40%] flex justify-between items-center w-full h-full'>
                                                    <p className='flex-1 text-[14px] font-semibold'>Gwt: {formatWeight(ds?.gwt)} g</p>
                                                    <p className='flex-1 text-[14px] font-semibold'>Nwt: {formatWeight(ds?.nwt)} g</p>
                                                </div>
                                                {/* <div className='basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full'>
                                                    <p className='text-[14px] font-semibold'>Date: </p>
                                                </div> */}
                                            </div>
                                        ))
                                    ))
                                }
                            </div>
                        )}
                    </div>
                    <div className='w-full h-full'>
                        <button className={`w-full text-left  ${openStatus[8] === true ? "bg-[#52BD91] text-[white]" : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"} h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`} onClick={() => toggleAccordion(8)}>
                            <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">Product Info</span>
                            {openStatus[8] === true ? (
                                <AiOutlineMinus className="w-5 h-5 text-white " />
                            ) : (
                                <AiOutlinePlus className="w-5 h-5 text-primary " />
                            )}
                        </button>
                        {openStatus[8] === true && (
                            <div className='max-h-[950px] overflow-auto w-full flex flex-col gap-[15px] bg-[#D6D6D6] p-[15px]'>
                                {
                                    productinfo?.map((product, index) => (
                                        <div key={index} className='h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]'>
                                            <div className='w-full flex items-center justify-center'>
                                                <p className='text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white'>Code: {product?.productcode}</p>
                                            </div>
                                            <div className='basis-[40%] flex flex-col justify-start items-between w-full h-full'>
                                                <p className='flex-1 text-[14px] font-semibold'>Mname: {(product?.mname)} </p>
                                                <p className='flex-1 text-[14px] font-semibold'>Category: {(product?.productcategory)} </p>
                                            </div>
                                            <div className='basis-[60%] flex flex-col justify-start items-between w-full h-full font-semibold'>
                                                <h1 className='text-[16px] text-[#000]'>{product?.productname}</h1>
                                            </div>
                                            <div className='basis-[40%] flex justify-between items-center w-full h-full'>
                                                <p className='flex-1 text-[14px] font-semibold'>HSN Code: {(product?.hsncode)} </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inventory
