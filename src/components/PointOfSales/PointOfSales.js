"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Storage } from "@capacitor/storage";

const PointOfSales = () => {
  const [data, setData] = useState(null);
  const [mname, setMname] = useState("GOLD");
  const [mnames, setMnames] = useState(null);
  const [pws, setPws] = useState(null);
  const [cws, setCws] = useState(null);
  const [puws, setPuws] = useState(null);
  const [hsn, setHsn] = useState(null);
  const [emp, setEmp] = useState(null);
  const [sales, setSales] = useState(null);
  const [dealers, setDealers] = useState(null);

  const [tenantName, setTenantName] = useState("");

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


  const today = new Date();

  // console.log(tenantName)

  // const formatteddate = "2024/03/12";

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  // const formattedDate = `${year}/${month}/${date}`

  const smname = mname + " SALES";

  const [openStatus, setOpenStatus] = useState(new Array(7).fill(false));

  const openAllFaqs = () => {
    setOpenStatus(new Array(7).fill(true));
  };

  const closeAllFaqs = () => {
    setOpenStatus(new Array(7).fill(false));
  };

  const formatRupees = (value) => {
    const roundedValue = parseFloat(value).toFixed(2);
    return roundedValue.includes('.') ? roundedValue : `${roundedValue}.00`;
  }

  const formatWeight = (value) => {
    const roundedValue = parseFloat(value).toFixed(3);
    return roundedValue.includes('.') ? roundedValue : `${roundedValue}.000`;
  }

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

  const fetchData = (url, startDate, endDate) => {
    fetch(
      `https://www.erpser.timeserasoftware.in${url}?${startDate}&${endDate}`,
      {
        headers: { tenantname: tenantName },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchMnames = () => {
    fetch(
      "https://www.erpser.timeserasoftware.in/api/Erp/GetTagGenerationDetails?filterName=MNAME",
      {
        headers: { tenantname: tenantName },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMnames(data);
      })
      .catch((error) => {
        console.error("Error fetching data in inventory:", error);
      });
  };

  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [startSelected, setStartSelected] = useState(getFormattedDate());
  const [endSelected, setEndSelected] = useState(getFormattedDate());

  const handleStartDateChange = (event) => {
    setStartSelected(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndSelected(event.target.value);
  };

  const fetchPWS = (startDate, endDate) => {
    fetch(
      `https://www.erpser.timeserasoftware.in/api/DashBoard/GetProductSummary?fromDate=${startDate}&toDate=${endDate}`,
      {
        headers: { tenantName: tenantName },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPws(data);
      })
      .catch((error) => {
        console.error("Error fetching data in pws:", error);
      });
  }

  const fetchCWS = (startDate, endDate) => {
    fetch(
      `https://www.erpser.timeserasoftware.in/api/Erp/GetCounterWiseSales?billStartDate=${startDate}&billEndDate=${endDate}`,
      {
        headers: { tenantName: tenantName },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCws(data);
      })
      .catch((error) => {
        console.error("Error fetching data in pws:", error);
      });
  }

  const fetchPUWS = (startDate, endDate) => {
    fetch(
      `https://www.erpser.timeserasoftware.in/api/DashBoard/GetPurityWiseSale?fromDate=${startDate}&toDate=${endDate}`,
      {
        headers: { tenantName: tenantName },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPuws(data);
      })
      .catch((error) => {
        console.error("Error fetching data in pws:", error);
      });
  }

  const fetchHSNWise = (startDate, endDate) => {
    fetch(
      `https://www.erpser.timeserasoftware.in/api/DashBoard/GetHSNWiseSale?billStartDate=${startDate}&billEndDate=${endDate}`,
      {
        headers: { tenantName: tenantName },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setHsn(data);
      })
      .catch((error) => {
        console.error("Error fetching data in pws:", error);
      });
  }

  const fetchEmpWise = (startDate, endDate) => {
    fetch(
      `https://www.erpser.timeserasoftware.in/api/DashBoard/GetEMPWiseSale?fromDate=${startDate}&toDate=${endDate}`,
      {
        headers: { tenantName: tenantName },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEmp(data);
      })
      .catch((error) => {
        console.error("Error fetching data in emp:", error);
      });
  }

  const fetchSalesRegister = (startDate, endDate) => {
    fetch(
      `https://www.erpser.timeserasoftware.in/api/Erp/GetTopFiveBills?fromDate=${startDate}&toDate=${endDate}`,
      {
        headers: { tenantName: tenantName },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
      })
      .catch((error) => {
        console.error("Error fetching data in sales:", error);
      });
  }

  const fetchDealers = (startDate, endDate) => {
    fetch(
      `https://www.erpser.timeserasoftware.in/api/DashBoard/GetDealerWiseSale?fromDate=${startDate}&toDate=${endDate}`,
      {
        headers: { tenantName: tenantName },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDealers(data);
      })
      .catch((error) => {
        console.error("Error fetching data in sales:", error);
      });
  }

  useEffect(() => {
    fetchData("/api/DashBoard/GetProductSummary", "2024/03/12", "2024/03/12");
    fetchMnames();
    fetchPWS(startSelected, endSelected);
    fetchCWS(startSelected, endSelected);
    fetchPUWS(startSelected, endSelected);
    fetchHSNWise(startSelected, endSelected);
    fetchEmpWise(startSelected, endSelected);
    fetchSalesRegister(startSelected, endSelected);
    fetchDealers(startSelected, endSelected);
  }, [startSelected, endSelected, mname, tenantName]);

  // console.log(sales);

  function formatAmount(number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(number);
  }

  const UpdatedData = data?.filter(
    (item) => item.mname === mname || item.jewelType === smname
  );

  // console.log(sales);

  // console.log(pws);


  return (
    <div className="w-full max-h-[5000px] bg-[white]">
      <div className="p-[20px] sm:p-[50px] lg:p-[100px]">
        <div className="w-full flex justify-between items-center pb-[20px]">
          <div>
            <h1 className="px-[7px] text-[#162566] text-[14px] font-serif font-bold border-[7px] inline-block border-[#52BD91] border-t-0 border-r-0 border-b-0 rounded-sm">
              Point Of Sales
            </h1>
          </div>
          <div className="flex gap-[5px] text-[12px] font-semibold text-[#162566]">
            <div onClick={() => openAllFaqs()} className='px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer'>Expand All <span className='text-[#52BD91]'>+</span></div>
            <div
              onClick={() => closeAllFaqs()}
              className="px-[5px] py-[2px] border-2 border-[#52BD91] cursor-pointer"
            >
              Collapse All <span className="text-[#52BD91]">-</span>
            </div>
          </div>
        </div>
        <div className=" border w-full mx-auto relative border-[#162566] rounded-sm">
          <select
            name="mname"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
            className="text-[14px] w-full h-full p-[5px]"
          >
            {mnames?.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 my-[15px] gap-[12px] sm:gap-[18px]">
          <div className="border  border-[#162566] p-[2px] rounded-md w-full">
            <input type="date" className="w-full" value={startSelected} onChange={handleStartDateChange} />
          </div>



          <div className="border border-[#162566] p-[2px] rounded-md w-full">
            <input type="date" value={endSelected} onChange={handleEndDateChange} className="w-full" />
          </div>
        </div>


        <div className="flex flex-col gap-[25px]">
          <div className={`w-full h-full  `}>
            <button
              className={`w-full text-left  ${openStatus[0] === true
                ? "bg-[#52BD91] text-[white]"
                : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"
                } h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`}
              onClick={() => {
                toggleAccordion(0)
              }}
            >
              <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">
                Product Wise Sales
              </span>
              {openStatus[0] === true ? (
                <AiOutlineMinus className="w-5 h-5 text-white " />
              ) : (
                <AiOutlinePlus className="w-5 h-5 text-primary " />
              )}
            </button>
            {openStatus[0] === true && (
              <div className="max-h-[350px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]">
                {pws?.map((item, index) => (
                  <>
                    {(item?.mname === mname) ? (
                      <div
                        className="h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[5px]"
                        key={index}
                      >
                        <div className="basis-[40%]  flex justify-between items-center w-full h-full font-semibold">
                          <h1 className="text-[14px] text-[#000]">
                            {item?.productName}
                          </h1>
                          <p className="text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white">
                            Pieces: <span className="font-semibold text-[14px]">{item?.pieces}</span>
                          </p>
                        </div>
                        <div className="basis-[30%] flex justify-between items-center w-full h-full">
                          <p className="flex-1 text-[14px] font-normal">
                            GWT: <span className="font-semibold text-[14px]">{formatWeight(item?.gwt)} g</span>
                          </p>
                          <p className="flex-1 text-[14px] font-normal">
                            NWT: <span className="font-semibold text-[14px]">{formatWeight(item?.nwt)} g</span>
                          </p>
                        </div>
                        <div className="basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full pt-[5px]">
                          <p className="text-[14px] font-normal">Mname: <span className="font-semibold text-[14px]">{item?.mname}</span> </p>

                          {/* <p className="text-[14px] font-normal">Amt: <span className="font-semibold text-[14px]">{item?.amount}</span> </p> */}
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}
              </div>
            )}
          </div>
          <div className={`w-full h-full  `}>
            <button
              className={`w-full text-left  ${openStatus[1] === true
                ? "bg-[#52BD91] text-[white]"
                : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"
                } h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`}
              onClick={() => {
                toggleAccordion(1)
              }}
            >
              <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">
                Counter Wise Sales
              </span>
              {openStatus[1] === true ? (
                <AiOutlineMinus className="w-5 h-5 text-white" />
              ) : (
                <AiOutlinePlus className="w-5 h-5 text-primary" />
              )}
            </button>
            {openStatus[1] === true && (
              <div className="max-h-[250px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]">
                {cws?.map((item, index) => (
                  <div className="h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]">
                    <div className="basis-[40%] flex justify-between items-center w-full h-full font-semibold">
                      <h1 className="text-[19px] text-[#000]">
                        {item.counterName}
                      </h1>
                      <p className="text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white">
                        Pieces: {item.pieces}
                      </p>
                    </div>
                    <div className="basis-[30%] flex justify-between items-center w-full h-full">
                      <p className="flex-1 text-[14px] font-normal">
                        GWT: <span className="font-semibold text-[14px]">{formatWeight(item?.gwt)} g</span>
                      </p>
                      <p className="flex-1 text-[14px] font-normal">
                        NWT: <span className="font-semibold text-[14px]">{formatWeight(item?.nwt)} g</span>
                      </p>
                    </div>
                    <div className="basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full">
                      <p className="text-[14px] font-semibold">
                        Total Amount: ₹{formatRupees(item.totamt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={`w-full h-full  `}>
            <button
              className={`w-full text-left  ${openStatus[2] === true
                ? "bg-[#52BD91] text-[white]"
                : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"
                } h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`}
              onClick={() => {
                toggleAccordion(2)
              }}
            >
              <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">
                Purity Wise Sales
              </span>
              {openStatus[2] === true ? (
                <AiOutlineMinus className="w-5 h-5 text-white " />
              ) : (
                <AiOutlinePlus className="w-5 h-5 text-primary " />
              )}
            </button>
            {openStatus[2] === true && (
              <div className="max-h-[250px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]">
                {puws?.map((item, index) => (
                  <div
                    className="h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]"
                    key={index}
                  >
                    <div className="basis-[40%] flex justify-between items-center w-full h-full font-semibold">
                      <h1 className="text-[16px] text-[#000]">{item.prefix}</h1>
                      <p className="text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white">
                        Pieces: {item.pieces}
                      </p>
                    </div>
                    <div className="basis-[30%] flex justify-between items-center w-full h-full">
                      <p className="flex-1 text-[14px] font-normal">
                        GWT: <span className="font-semibold text-[14px]">{formatWeight(item?.gwt)}g</span>
                      </p>
                      <p className="flex-1 text-[14px] font-normal">
                        NWT: <span className="font-semibold text-[14px]">{formatWeight(item?.nwt)}g</span>
                      </p>
                    </div>
                    <div className="basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full">
                      <p className="text-[14px] font-semibold">
                        Total Amount: ₹{formatRupees(item.totamt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <div className={`w-full h-full  `}>
            <button
              className={`w-full text-left  ${openStatus[3] === true
                ? "bg-[#52BD91] text-[white]"
                : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"
                } h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`}
              onClick={() => {
                toggleAccordion(3)
              }}
            >
              <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">
                HSN Wise Sales
              </span>
              {openStatus[3] === true ? (
                <AiOutlineMinus className="w-5 h-5 text-white " />
              ) : (
                <AiOutlinePlus className="w-5 h-5 text-primary " />
              )}
            </button>
            {openStatus[3] === true && (
              <div className="max-h-[250px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]">
                {hsn?.map((item, index) => (
                  <div
                    className="h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]"
                    key={index}
                  >
                    <div className="basis-[40%] flex justify-between items-center w-full h-full font-semibold">
                      <h1 className="text-[16px] text-[#000]">
                        {item.hsncode}
                      </h1>
                      <p className="text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white">
                        Pieces: {item.pieces}
                      </p>
                    </div>
                    <div className="basis-[30%] flex justify-between items-center w-full h-full">
                      <p className="flex-1 text-[14px] font-normal">
                        GWT: <span className="font-semibold text-[14px]">{formatWeight(item?.gwt)}g</span>
                      </p>
                      <p className="flex-1 text-[14px] font-normal">
                        NWT: <span className="font-semibold text-[14px]">{formatWeight(item?.nwt)}g</span>
                      </p>
                    </div>
                    <div className="basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full">
                      <p className="text-[14px] font-semibold">
                        Total Amount: ₹{formatRupees(item.totamt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div> */}
          <div className={`w-full h-full  `}>
            <button
              className={`w-full text-left  ${openStatus[4] === true
                ? "bg-[#52BD91] text-[white]"
                : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"
                } h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`}
              onClick={() => {
                toggleAccordion(4)
              }}
            >
              <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">
                Employee Wise Sales
              </span>
              {openStatus[4] === true ? (
                <AiOutlineMinus className="w-5 h-5 text-white " />
              ) : (
                <AiOutlinePlus className="w-5 h-5 text-primary " />
              )}
            </button>
            {openStatus[4] === true && (
              <div className="max-h-[250px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]">
                {emp?.map((item, index) => (
                  <div className="h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]">
                    <div className="basis-[40%] flex justify-between items-center w-full h-full font-semibold">
                      <h1 className="text-[16px] text-[#000]">{item.smcode}</h1>
                      <p className="text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white">
                        Pieces: {item.pieces}
                      </p>
                    </div>
                    <div className="basis-[30%] flex justify-between items-center w-full h-full">
                      <p className="flex-1 text-[14px] font-normal">
                        GWT: <span className="font-semibold text-[14px]">{formatWeight(item?.gwt)}g</span>
                      </p>
                      <p className="flex-1 text-[14px] font-normal">
                        NWT: <span className="font-semibold text-[14px]">{formatWeight(item?.nwt)}g</span>
                      </p>
                    </div>
                    <div className="basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full">
                      <p className="text-[14px] font-semibold">
                        Total Amount: ₹{formatRupees(item.totamt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={`w-full h-full  `}>
            <button
              className={`w-full text-left  ${openStatus[5] === true
                ? "bg-[#52BD91] text-[white]"
                : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"
                } h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`}
              onClick={() => {
                toggleAccordion(5),
                  fetchData(
                    "/api/Erp/GetTopFiveBills",
                    `fromDate=${startSelected}`,
                    `toDate=${endSelected}`
                  );
              }}
            >
              <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">
                Sales Register
              </span>
              {openStatus[5] === true ? (
                <AiOutlineMinus className="w-5 h-5 text-white " />
              ) : (
                <AiOutlinePlus className="w-5 h-5 text-primary " />
              )}
            </button>
            {openStatus[5] === true && (
              <div className="max-h-[280px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]">
                {sales?.map((item, index) => (
                  <div className='h-full w-full bg-white rounded-xl shadow-lg flex flex-col gap-[8px] p-[10px] mb-[20px]' key={index}>
                    <div className='basis-[35%] w-full h-full flex gap-[15px] justify-between'>
                      <div className='basis-[70%] w-full h-full flex flex-col items-start justify-center gap-[2px]'>
                        <h1 className='text-[16px] text-[#000]'>{item?.custName}</h1>
                        {/* <p className='text-[14px]'>Invoice #: <span className='font-semibold'> {item?.billNo} </span></p> */}
                      </div>
                      <div className='basis-[30%] w-full h-full flex items-center justify-center text-[20px] font-medium text-[#162566]'>
                        <p className='text-[14px]'>Invoice #: <span className='font-semibold'> {item?.billNo} </span></p>
                      </div>
                    </div>
                    <div className='basis-[40%] w-full h-full rounded-xl flex flex-col items-center justify-between bg-[#d9d9d963] p-[5px]'>
                      <div className="w-full flex justify-between items-center">
                        <div className='flex flex-col'>
                          <p className='text-[16px] font-semibold'>{formatWeight(item?.totGwt)} g</p>
                          <p className='text-[14px] font-normal'>GWT</p>
                        </div>
                        <div className='flex flex-col h-full'>
                          <p className='text-center py-[5px] rounded-lg font-semibold'>{formatWeight(item?.totNwt)} g</p>
                          <p className='text-[14px] font-normal'>NWT</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center flex-row-reverse">
                        <p className='text-[16px] font-semibold'> ₹{formatRupees(item?.netAmt)}</p>
                        <p className='text-[14px] font-normal'>Amount:</p>
                      </div>
                    </div>
                    <div className='basis-[25%] w-full h-full flex items-center justify-center'>
                      <p className='flex-1 text-[14px] font-normal'>Jewel: <span className='font-semibold'>{item?.jewelType}</span> </p>
                      <p className='flex-1 text-[14px] font-normal'>Date: <span className='font-semibold'>{item?.billDate?.substring(0, 10)}</span> </p>
                    </div>
                  </div>
                ))}


              </div>
            )}
          </div>
          <div className={`w-full h-full  `}>
            <button
              className={`w-full text-left  ${openStatus[6] === true
                ? "bg-[#52BD91] text-[white]"
                : "bg-[#D6D6D6] text-black border-2 border-[#52BD91]"
                } h-full flex items-center justify-between py-[12px] px-[14px] sm:py-[18px] sm:px-[24px] lg:px-[36px] lg:py-[25px]`}
              onClick={() => {
                toggleAccordion(6)
              }}
            >
              <span className="text-[16px] sm:text-[18px] font-semibold font-Emilio ">
                Delear Wise Sales
              </span>
              {openStatus[6] === true ? (
                <AiOutlineMinus className="w-5 h-5 text-white " />
              ) : (
                <AiOutlinePlus className="w-5 h-5 text-primary " />
              )}
            </button>
            {openStatus[6] === true && (
              <div className="max-h-[250px] flex flex-col gap-[15px] overflow-auto w-full bg-[#D6D6D6] p-[15px]">
                {dealers?.map((item, index) => (
                  <div
                    className="h-full border-8 border-t-0 shadow-lg border-l-[#162566] border-r-0 border-b-0 w-full bg-white flex flex-col gap-[5px] px-[10px] py-[15px]"
                    key={index}
                  >
                    <div className="basis-[40%] flex justify-between items-center w-full h-full font-semibold">
                      <h1 className="text-[16px] text-[#000]">
                        {item.dealerName}
                      </h1>
                      <p className="text-[14px] bg-[#52bd91bf] px-[20px] py-[5px] rounded-xl text-white">
                        Pieces: {item.pieces}
                      </p>
                    </div>
                    <div className="basis-[30%] flex justify-between items-center w-full h-full">
                      <p className="flex-1 text-[14px] font-normal">
                        GWT: <span className="font-semibold text-[14px]">{formatWeight(item?.gwt)}g</span>
                      </p>
                      <p className="flex-1 text-[14px] font-normal">
                        NWT: <span className="font-semibold text-[14px]">{formatWeight(item?.nwt)}g</span>
                      </p>
                    </div>
                    <div className="basis-[20%] flex justify-between items-center border-2 border-black border-l-0 border-r-0 border-b-0 w-full h-full">
                      <p className="text-[14px] font-semibold">
                        Total Amount: ₹{formatRupees(item.totamt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointOfSales;
