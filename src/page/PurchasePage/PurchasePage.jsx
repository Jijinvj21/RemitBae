import SalesTable from "../../components/SalesTable/SalesTable";
import "./PurchasePage.scss";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import InputComponent from "../../components/InputComponent/InputComponent";
import {
  categeryGetAPI,
  clientDataGetAPI,
  countryOptionsGetAPI,
  createPartyAPI,
  createPurchaseAPI,
  gstOptionsGetAPI,
  partyDataGetAPI,
  productAddAPI,
  productGetAPI,
  projectGetAPI,
  unitsDataGetAPI,
} from "../../service/api/admin";
import AddProductDrawer from "../../components/AddProductDrawer/AddProductDrawer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)", 
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
function PurchasePage() {
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null); // State to hold selected product
  const [totalValues, setTotalValues] = useState([]);
  const [inputData, setInputData] = useState(0);
  const [rows, setRows] = useState([]);
  const [partyOptions, setPartyOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product

  const [tableRows, setTableRows] = useState([]); // State to hold table rows
  const [inputValue, setInputValue] = useState(""); // State to hold the value of the new input
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("none");
  const [selectedCustomer, setSelectedCustomer] = useState("none");
  const [selectedParty, setSelectedParty] = useState("none");

  const [contryOptions, setContryOptions] = useState([]);
  const [countryValue, setCountryValue] = useState(""); // State to hold the value of the new input

  const [partydataData, setPartyData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address1: "",
    address2: "",
    postalCode: "",
  });
  const [toggle, setToggle] = useState(true);
  const [ProductDrawerFormData, setProductDrawerFormData] = useState({
    name:"",
    quantity:"",
    rate:0,
    hsn:"",
  });
  const [categoryOptions,setCategoryOptions]=useState([])
  const [projectOptions,setProjectOptions]=useState([])
  const [unitOptions,setUnitOptions]=useState([])
  const [taxRateValue, setTaxRateValue] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const [state, setState] = useState({
    right: false,
  });
  const [projectValue, setProjectValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [img, setImg] = useState(null);
  const [taxOptions,setTaxOptions]=useState([])



  const getTaxOptionsFormAPI = () => {
    gstOptionsGetAPI().then((data) => {
      console.log("tax:", data);
      // setTaxOptions(data);

      // Transform data and set it to state
      const transformedData = data.map(entry => ({
        value: entry.percentage,
        label: entry.name?`${entry.name} ${entry.percentage}` :"none",
        taxlabel: entry.percentage,
        id:entry.id

      }));
      console.log(transformedData)
      setTaxOptions(transformedData);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getCategeryOptionsFormAPI = () => {
    categeryGetAPI()
      .then((data) => {
        console.log("category:", data);
        
        // Transform data and set it to state
        const categoryOptions = data?.responseData.map(entry => ({
          value: entry.id,
          label:`${entry.name}`,
          
        }));
        categoryOptions.unshift({ value: 0, label: "None" });
  
        console.log("categoryOptions",categoryOptions);
        setCategoryOptions(categoryOptions);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getClientOptionsFormAPI = () => {
    projectGetAPI()
      .then((data) => {
        console.log("projects:", data);
        
        // Transform data and set it to state
        const projectdData = data?.responseData.map(entry => ({
          value: entry.id,
          label:`${entry.name} ( ${entry.client_name} )`,
          
        }));
        projectdData.unshift({ value: 0, label: "None" });
  
        console.log("projectdData",projectdData);
        setProjectOptions(projectdData);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getUnitOptionsFormAPI = () => {
    unitsDataGetAPI()
      .then((data) => {
        console.log("units:", data);
        
        // Transform data and set it to state
        const unitsdData = data?.responseData.map(entry => ({
          value: entry.id,
          label: entry.name ,
          
        }));
        unitsdData.unshift({ value: 0, label: "None" })
        console.log("unitsdData",unitsdData);
        setUnitOptions(unitsdData);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const partyDataGet=()=>{
    partyDataGetAPI()
    .then((data) => {
      console.log("partyData:", data);
      // setTaxOptions(data);

      // Transform data and set it to state
      const partyData = data.responseData.map((entry) => ({
        value: entry.id,
        label: entry.name,
      }));
      console.log(partyData);
      setPartyOptions(partyData);
    })
    .catch((err) => {
      console.log(err);
    });
  }


  useEffect(() => {
    partyDataGet()
    getTaxOptionsFormAPI()
    getCategeryOptionsFormAPI()
    getClientOptionsFormAPI()
    getUnitOptionsFormAPI()
  }, [])
  




  // Function to handle input change for all fields
  const handlePartyFormChange = (e) => {
    const { name, value } = e.target;
    setPartyData({ ...partydataData, [name]: value });
  };

  const handleAddParty = () => {
    const data = {
      name: partydataData.name,
      phonenumber: partydataData.phoneNumber,
      email: partydataData.email,
      address1: partydataData.address1,
      address2: partydataData.address2,
      country: parseInt(countryValue),
      postalCode: partydataData.postalCode,
    };
    console.log(data);
    createPartyAPI(data)
      .then((data) => {
        console.log(data);
alert("Party Added")
partyDataGet()
        setOpen(false)
        setPartyData({
          name: "",
          phoneNumber: "",
          email: "",
          address1: "",
          address2: "",
          postalCode: "",
        })


      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    countryOptionsGetAPI()
      .then((data) => {
        // console.log("country:", data);

        const countryData = data.map((entry) => ({
          value: entry.id,
          label: entry.name,
        }));
        setContryOptions(countryData);
      })
      .catch((err) => {
        console.log(err);
      });

  

    clientDataGetAPI()
      .then((data) => {
        console.log("clientData:", data);
        // setTaxOptions(data);

        // Transform data and set it to state
        const partyData = data.responseData.map((entry) => ({
          value: entry.id,
          label: entry.name,
        }));
        console.log(partyData);
        setClientOptions(partyData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to handle changes in the new input value
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionSelect = (e) => {
    console.log(e.target.value);

    setSelectedCustomer(e.target.value);
    // Handle selection of other options
  };
  const handlePartySelect = (e) => {
    console.log(e.target.value);
    const selectedOption = e.target.value;
    if (selectedOption === "addNew") {
      setOpen(true);
    } else {
      setOpen(false);
      setSelectedParty(e.target.value);
      // Handle selection of other options
    }
  };

  // const getArrayFromLocalStorage = () => {
  //   const storedArray = localStorage.getItem('products');
  //   if (storedArray) {
  //     setMyArray(JSON.parse(storedArray));
  //   }
  // };

  const fetchData = async () => {
    const response = await productGetAPI();
    const products = response.responseData;
    const productNames = products.map((product) => product.name);
    const options = productNames.map((name, index) => ({
      value: `option${index + 1}`,
      label: name,
    }));
    options.unshift({ value: -2, label: "Add" });
    setProductOptions(options);
  };
  useEffect(() => {
    fetchData();
    setProductOptions([{ value: -2, label: "Add" }])

  }, []);

  useEffect(() => {
    const updatedRows = rows.map((row) => {
      const quantity = parseInt(row.qty) || 0; // Parsing quantity to integer, defaulting to 0 if NaN
      const rate = parseInt(row.rate) || 0; // Parsing rate to integer, defaulting to 0 if NaN

      const totalWithoutTax = quantity * rate;

      const totalWithTax = totalWithoutTax - (row.amountafterdescount || 0); // Subtracting discount amount from totalWithoutTax

      let taxAppliedamount = 0; // Initializing taxAppliedamount variable
      if (row.taxAppliedamount) {
        taxAppliedamount =
          parseFloat(row.taxAppliedamount.replace("%", "")) || 0; // Parsing taxAppliedamount to float, defaulting to 0 if NaN
      } else if (row.taxApplied?.value) {
        taxAppliedamount =
          parseFloat(row.taxApplied.value.replace("%", "")) || 0; // Parsing taxApplied.value to float, defaulting to 0 if NaN
      } else if (row.taxApplied) {
        taxAppliedamount =
          parseFloat(row.taxApplied.split("@")[1].replace("%", "")) || 0; // Parsing taxApplied to float, defaulting to 0 if NaN
      }

      const total = (
        (totalWithTax * taxAppliedamount) / 100 +
        totalWithTax
      ).toFixed(2); // Calculating total with tax and rounding to 2 decimal places

      return {
        ...row,
        total: total,
      };
    });

    const grandTotal = updatedRows.reduce(
      (sum, row) => sum + parseFloat(row.total),
      0
    ); // Summing up all row totals

    setTotalValues(grandTotal);
  }, [rows]); // Update when rows change


  const handleSelectedProductChange = async (event, newValue) => {
    if (!newValue) {
      // Handle the case where newValue is not defined
      return;
    }
    if(newValue.value===-2){
      console.log(newValue.value===-2);
      toggleDrawer("right", true)();
      setSelectedProduct()

    }else{

   

    setSelectedProduct(newValue);

    if (newValue) {
      console.log(newValue.label);
      // Set the amount based on the selected product
      const response = await productGetAPI();
      console.log(response);
      const products = response.responseData;

      const selectedProductData = products.find(
        (product) => product.name === newValue?.label
      );
      console.log(selectedProductData);
      setSelectedProductDetails(selectedProductData);
      console.log(selectedProductData);
      // Add selected product to the table rows
      const newRow = {
        id: 1,
        itemName: selectedProductData.name,
        qty: 1, // You can set default quantity here
        unit: selectedProductData.unit, // Assuming selectedProductData has a unit property
        price: selectedProductData.price, // Assuming selectedProductData has a price property
        discount: 0, // Assuming default discount is 0
        taxApplied: 0, // Assuming default tax applied is 0
        total: selectedProductData.price, // Assuming total is initially equal to price
      };
      setSelectedProduct()

      setTableRows([...tableRows, newRow]);
    }
  }
  };
  const handleChangeAmout = (e) => {
    setInputData(e.target.value);
  };
  const handleClose = () => setOpen(false);

  const hanldecountrychange = (e) => {
    setCountryValue(e.target.value);
    console.log(e.target.value);
  };

  const addPartyInputArrat = [
    {
      handleChange: handlePartyFormChange,
      intputName: "name",
      label: "Name",
      type: "text",
    },
    {
      handleChange: handlePartyFormChange,
      intputName: "phoneNumber",
      label: "Phone number",
      type: "text",
    },
    {
      handleChange: handlePartyFormChange,
      intputName: "email",
      label: "Email",
      type: "text",
    },
    {
      handleChange: handlePartyFormChange,
      intputName: "address1",
      label: "Address1",
      type: "text",
    },
    {
      handleChange: handlePartyFormChange,
      intputName: "address2",
      label: "Address2",
      type: "text",
    },
    {
      handleChange: hanldecountrychange,
      intputName: "country",
      label: "country",
      type: "text",
      inputOrSelect: "select",
      option: contryOptions,
    },
    {
      handleChange: handlePartyFormChange,
      intputName: "postalCode",
      label: "Pin code",
      type: "text",
    },
  ];
  const handleAddVoucher = async () => {
    const newArray = await rows.map((item) => ({
      product_id: item.id,
      quantity: item.qty,
      Price: item.qty * item.rate,
      discount: parseFloat(item?.descountvalue||0),
      tax_rate:{id:item.taxId||1}

    }));
    const salesVoucher = {
      credit_sale: false,
      payment_type: selectedOption === "cash" ? 5 : 10,
      billing_address: "",
      client: parseInt(selectedCustomer),
      party: parseInt(selectedParty),
      total: parseFloat(totalValues),
      product_details: newArray,
    };

    // console.log(salesVoucher);
    console.log(rows);
    createPurchaseAPI(salesVoucher)
      .then((data) => {
        console.log(data);
        alert("Bill created")
        setRows([])
        selectedCustomer({})
        setSelectedParty({})
        setSelectedProduct()
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleDrawerSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  const handleDrawerChange = (e) => {
    const { name, value } = e.target;
    setProductDrawerFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const toggleDrawer = (anchor, open) => (event) =>{
    console.log(event)
    console.log("Toggle Drawer:", anchor, open);
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const handleDrawerImageChange = (e) => {
    const file = e.target.files[0];

    setImg(file);
  };
  const handleTaxRateChange = (event) => {
    console.log(event.target.value)
    const selectedOptionObject = taxOptions.find(option => option.taxlabel == event.target.value);
    console.log(selectedOptionObject);
    // setTaxRateValue({
    //   label: selectedOptionObject ? selectedOptionObject.label : "", // Handle case where selectedOptionObject is undefined
    //   value: event.target.value
    // });
    setTaxRateValue(selectedOptionObject)
  };
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  const handleSelectProject = (event) => {
    setProjectValue(event.target.value);
    console.log(event.target.value)
  };

  const handleSelectCatogary = (event) => {
    setCategoryValue(event.target.value);
    console.log(event.target.value)
  };


  const handleDrawerAddProducts = () => {
    const formData = new FormData();
  
    formData.append('name', ProductDrawerFormData.name);
    formData.append('hsn', ProductDrawerFormData.hsn);
    formData.append('rate', parseInt(ProductDrawerFormData.rate));
    formData.append('quantity', parseInt(ProductDrawerFormData.quantity));
    formData.append('unit', selectedValue);
    formData.append('projectid', parseInt(projectValue));
    formData.append('is_master_product', toggle);
    formData.append('category_id', categoryValue);
    // formData.append('gst', ((parseInt(ProductDrawerFormData.rate) * parseInt(ProductFormData.quantity)) * (taxRateValue.value?.replace("%", ""))) / 100);
    formData.append('tax_rate', taxRateValue.id);
    formData.append('image', img);
  
    productAddAPI(formData)
      .then((data) => {
        fetchData()
        if (data.status === 200) {
          setProductDrawerFormData({
            name: "",
            qate: "",
            quantity: "",
            rate: "",
            taxvalue: "",
            hsn: "",
          });
          setSelectedValue("");
          setTaxRateValue("");
          alert("Product added successfully");
          fetchData()
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Problem in adding product");
      });
  };
  const arrOfDrawerInputs = [
    {
      handleChange: handleDrawerChange,
      intputName: "name",
      label: " Product Name",
      type: "text",
      
      
    },
    {
      handleChange: handleDrawerChange,
      intputName: "rate",
      label: "Rate",
      type: "number",
    },
    {
      handleChange: handleDrawerChange,
      intputName: "quantity",
      label: "Quantity",
      type: "number",
    },
    {handleChange:handleTaxRateChange,
      intputName: "taxrate",
      label: "Tax Rate",
      

      inputOrSelect:"select",
      options:taxOptions 
    },
    {
      intputName: "taxvalue",
      label: " Tax Value",
      // type: "number",
      value: (((parseFloat(ProductDrawerFormData.rate || 0)) * parseFloat(ProductDrawerFormData.quantity || 0)) * (parseFloat(taxRateValue.value?.replace("%", "")) || 0) / 100),

      disabled:"disabled"
      
    },
    {
      handleChange: handleDrawerChange,
      intputName: "hsn",
      label: "HSN",
      type: "text",
    },
    {
      handleChange: handleSelectChange,
      intputName: "unit",
      label: "Unit",
      // type: "text",

      inputOrSelect:"select",
      options: unitOptions,
      
      
    },
    {
      handleChange: handleSelectProject,
      intputName: "project",
      label: "Projects",
      // type: "text",
      // value:selectedValue,

      inputOrSelect:"select",
      options: projectOptions,
      
      
    },
    {
      handleChange: handleSelectCatogary,
      intputName: "categery",
      label: "Categerys",
      // type: "text",
      // value:selectedValue,

      inputOrSelect:"select",
      options: categoryOptions,
      
      
    },
    
  ];






  return (
    <div className="sales-table-container">
      <Box sx={{ width: "75%", mx: 1 }}>
        <Box sx={{ width: "100%", marginBottom: "10px" }}>
          <p className="product-name">products</p>

          <Autocomplete
            sx={{
              display: "inline-block",
              "& input": {
                width: "100%",
                border: "none",
                bgcolor: "var(--inputbg-color)",
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.background.paper),
              },
            }}
            id="custom-input-demo"
            options={productOptions}
            value={selectedProduct}
            onChange={handleSelectedProductChange}
            componentsProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -20],
                    },
                  },
                ],
              },
            }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input
                  type="text"
                  {...params.inputProps}
                  style={{ height: "10xp" }}
                />
              </div>
            )}
          />
        </Box>
        <div style={{ overflow: "auto" }}>
          <Box>
            <SalesTable
              selectedProductData={selectedProductDetails}
              setTotalValues={setTotalValues}
              totalValues={totalValues}
              rows={rows}
              setRows={setRows}
            />{" "}
            {/* Pass tableRows as props to SalesTable */}
          </Box>
        </div>
      </Box>
      <Box
        sx={{
          border: "1px solid #bbbdbf",
          width: "30%",
          mt: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            margin: "2px",
            p: "3px",
            borderRadius: 1,
            border: "1px solid #bbbdbf",
          }}
        >
          <p className="head-p-tag">Clinet Details</p>
          <select value={selectedCustomer} style={{ width: "100%" }} onChange={handleOptionSelect}>
          <option value="" label="None">
                  None
                </option>
            {clientOptions.map((option, index) => {
              return (
                <option key={index} value={option.value} label={option.label}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </Box>

        <Box
          sx={{
            margin: "2px",
            p: "3px",
            borderRadius: 1,
            border: "1px solid #bbbdbf",
          }}
        >
          <p className="head-p-tag">party Details</p>
          <select style={{ width: "100%" }} onChange={handlePartySelect}>
            <option value="select">Select</option>

            <option value="addNew">Add New</option>

            {partyOptions.map((option, index) => {
              return (
                <option key={index} value={option.value} label={option.label}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </Box>

        <Box
          sx={{
            margin: "2px",
            p: "3px",
            borderRadius: 1,
            border: "1px solid #bbbdbf",
            height: "42%",
          }}
        >
          <p className="head-p-tag">Bill Details</p>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <p>sub Total:</p>
            <p> &#8377; {totalValues}</p>
          </Box>
          <hr
            style={{
              margin: "8px",
              color: "#bbbdbf",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="head-p-tag">
              Total amount :
              {/* <span style={{fontWeight:"lighter", fontSize:"12px"}}>(items:2,Quantity:2)</span>: */}
            </p>
            <p> &#8377; {totalValues}</p>
          </Box>
        </Box>

        <Box
          sx={{
            margin: "2px",
            p: "3px",
            borderRadius: 1,
            border: "1px solid #bbbdbf",
            // height: "100%",
          }}
        >
          <p className="head-p-tag">Cash/UPI</p>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: 1,
              alignItems: "center",
            }}
          >
            <p>Payment Method:</p>
            <select
              style={{ width: "50%" }}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="none" label="None"></option>
              <option value="cash" label="Cash"></option>
              <option value="upi" label="UPI"></option>
            </select>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 1,
            }}
          >
            <p>Amount Received:</p>
            <FormControl
              sx={{
                my: 1,
                width: "50%",
                background: "#F3F6F9",
                borderRadius: 2,
              }}
            >
              <OutlinedInput
                onChange={handleChangeAmout}
                sx={{
                  p: "0 !important",
                }}
                id="standard-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <CurrencyRupeeOutlinedIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
            <p>Change to Return:</p>
            <p>&#8377;{totalValues - inputData}</p>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              bgcolor: "var(--black-button)",
              "&:hover": {
                background: "var(--button-hover)",
              },
            }}
            onClick={handleAddVoucher}
          >
            Save and Print Bill
          </Button>
        </Box>
      </Box>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <h4> Add new Party</h4>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
                gap: 1,
              }}
            >
              {addPartyInputArrat.map((data, index) => (
                <InputComponent
                  key={index}
                  label={data.label}
                  intputName={data.intputName}
                  type={data.type}
                  value={partydataData[data.intputName]}
                  handleChange={data.handleChange}
                  inputOrSelect={data.inputOrSelect}
                  options={data.option}
                />
              ))}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  fontWeight: "bold",
                  textTransform: "none",
                  bgcolor: "var(--black-button)",
                  "&:hover": {
                    background: "var(--button-hover)",
                  },
                }}
                onClick={handleAddParty}
              >
                Add party
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <AddProductDrawer
        handleSelectChange={handleDrawerSelectChange}
        arrOfInputs={arrOfDrawerInputs}
        toggleDrawer={toggleDrawer}
        state={state}
        ProductFormData={ProductDrawerFormData}
        handleImageChange={handleDrawerImageChange}
        handleAdd={handleDrawerAddProducts}
        setToggle={setToggle}
        toggle={toggle}
        
      />
    </div>
  );
}

export default PurchasePage;
