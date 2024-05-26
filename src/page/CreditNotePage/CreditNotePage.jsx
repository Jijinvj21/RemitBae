import { Autocomplete, Box, Button, Typography } from "@mui/material";
import "./CreditNotePage.scss";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useEffect, useState } from "react";
import ImageAdd from "../../assets/sideBar/ImageAdd.svg";
// import { AiOutlineFileAdd } from "react-icons/ai";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import { categeryGetAPI, creditDataAddAPI, gstOptionsGetAPI, partyDataGetAPI, productAddAPI, productGetAPI, projectGetAPI, unitsDataGetAPI } from "../../service/api/admin";
import AddProductDrawer from "../../components/AddProductDrawer/AddProductDrawer";

function CreditNotePage() {
  const [partyOptions, setPartytOptions] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [billingTextValue, setBillingTextValue] = useState("");

  const [selectedProductDetails, setSelectedProductDetails] = useState(null); // State to hold selected product
  const [totalValues, setTotalValues] = useState([]);
  const [rows, setRows] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product
  const [tableRows, setTableRows] = useState([]); // State to hold table rows
  const [state, setState] = useState({
    right: false,
  });
  const [selectedValue, setSelectedValue] = useState('');
  const [categoryOptions,setCategoryOptions]=useState([])
  const [projectOptions,setProjectOptions]=useState([])
  const [unitOptions,setUnitOptions]=useState([])
  const [taxRateValue, setTaxRateValue] = useState({});
  const [ProductDrawerFormData, setProductDrawerFormData] = useState({
    name:"",
    quantity:"",
    rate:0,
    hsn:"",
  });
  const [projectValue, setProjectValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [img, setImg] = useState(null);
  const [taxOptions,setTaxOptions]=useState([])
  const [toggle, setToggle] = useState(true);
  const [partySelect, setPartySelect] = useState();
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [receiptNo, setReceiptNo] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [date, setDate] = useState("");
    const [stateOfSupply, setStateOfSupply] = useState("");

    const [paymentSelect, setPaymentSelect] = useState(0);

    const handlepaymenttype = (e) => {
      setPaymentSelect(e.target.value);
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
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Problem in adding product");
      });
  };



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
      setPartytOptions(partyData);
    })
    .catch((err) => {
      console.log(err);
    });
  }



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
  partyDataGet()
  fetchData();
  setProductOptions([{ value: -2, label: "Add" }])
  getTaxOptionsFormAPI()
    getCategeryOptionsFormAPI()
    getClientOptionsFormAPI()
    getUnitOptionsFormAPI()

}, []);

const toggleDrawer = (anchor, open) => (event) =>{
  console.log(event)
  console.log("Toggle Drawer:", anchor, open);
  if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
    return;
  }
  setState({ ...state, [anchor]: open });
};

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };
  const handleBillingTextChange = (event) => {
    setBillingTextValue(event.target.value);
  }
  
const handleReceiptNoChange = (event) => {
  setReceiptNo(event.target.value);
};

const handleInvoiceNoChange = (event) => {
  setInvoiceNo(event.target.value);
};

const handleInvoiceDateChange = (event) => {
  setInvoiceDate(event.target.value);
};

const handleDateChange = (event) => {
  setDate(event.target.value);
};
  const topleftsideinput = [
    {handleChange:handleReceiptNoChange,
      intputName: "receiptno",
      label: "Recipes No",
      type: "number",
      value:receiptNo,
    },
    {handleChange:handleInvoiceNoChange,
      intputName: "invoiceno",
      label: "Invoice Number",
      type: "number",
      value:invoiceNo,
    },
    {handleChange:handleInvoiceDateChange,
      intputName: "invoicedate",
      label: "Invoice Date",
      type: "date",
      value:invoiceDate,
    },
    {handleChange:handleDateChange,
      intputName: "data",
      label: "Date",
      type: "date",
      value:date,
    },
    {
      intputName: "stateofsupply",
      label: "State of supply",
      inputOrSelect: "select",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "Account", label: "Account" },
      ],
    },
  ];
  const handleDrawerChange = (e) => {
    const { name, value } = e.target;
    setProductDrawerFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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





  const handleSelectedProductChange = async (event, newValue) => {
    if (!newValue) {
      // Handle the case where newValue is not defined
      return;
    }
    if(newValue.value===-2){
      console.log(newValue.value===-2);
      toggleDrawer("right", true)();
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
      setTableRows([...tableRows, newRow]);
    }
  }
  };


  const handleDrawerSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };
  const handleSelectedPartyChange=(event, newValue)=>{
    setPartySelect(newValue)
  }
  const handlePhoneNumber=(e)=>{
    console.log(e.target.value)
    setPhoneNumber(e.target.value)
   }

  const addCreditData= async ()=>{
    const newArray = await rows.map((item) => ({
      product_id: item.id,
      quantity: item.qty,
      Price: item.qty * item.rate,
      discount: parseFloat(item?.descountvalue||0),
      tax_rate:{id:item.taxId||1}

    }));
    const creditdata={
      party:partySelect,
      billing_address:billingTextValue,
      date:date,
      invoice_date:invoiceDate,
      invoice_no:invoiceNo,
      total_amount:"",
      payment_type:paymentSelect,
      description:textValue,
      product_details:newArray,
    }
    creditDataAddAPI().then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  return (
    <div className="creaditnotepage">
      <h2>Creadit Note</h2>
      <div className="inner-section">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "20px",
          }}
        >
          <div
            className="top-section"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div className="right">
              <div style={{ display: "flex" }}>
                <div style={{ width: "100%", marginBottom: "10px" }}>
                  <p className="party-name">Party</p>

                  <Autocomplete
                    style={{
                      display: "inline-block",
                      "& input": {
                        width: "100%",

                        border: "none",
                        bgcolor: "var(--inputbg-color) !important",
                        color: (theme) =>
                          theme.palette.getContrastText(
                            theme.palette.background.paper
                          ),
                      },
                     
                    }}
                    id="custom-input-demo"
                    options={partyOptions}
                    value={partySelect}
                    onChange={handleSelectedPartyChange}
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
                          style={{ height: "41px" }}
                        />
                      </div>
                    )}
                  />
                  {/* <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    BAL: 63660
                  </p> */}
                </div>

                <InputComponent
                  label="Phone No"
                  type="tel"
                  intputName="phoneno"
                  handleChange={handlePhoneNumber}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ fontSize: "12px" }} htmlFor="textarea">
                  Billing Address
                </label>
                <textarea
                  id="textarea"
                  value={billingTextValue}
                  onChange={handleBillingTextChange}
                  rows={5} // Set the number of visible rows
                  cols={30} // Set the number of visible columns
                />
              </div>
            </div>
            <div className="left" style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{display:"flex", gap:10}}>

              {topleftsideinput.slice(0,2).map((input, index) => {
                return (
                  <InputComponent
                    key={index}
                    handleChange={input.handleChange}
                    state={input.state}
                    label={input.label}
                    type={input.type}
                    intputName={input.intputName}
                    inputOrSelect={input.inputOrSelect}
                    options={input.options}
                    />
                  );
                })}
                </div>
                <div style={{display:"flex", gap:10}}>

              {topleftsideinput.slice(2,4).map((input, index) => {
                return (
                  <InputComponent
                    key={index}
                    handleChange={input.handleChange}
                    state={input.state}
                    label={input.label}
                    type={input.type}
                    intputName={input.intputName}
                    inputOrSelect={input.inputOrSelect}
                    options={input.options}
                    />
                  );
                })}
                </div>
                <InputComponent
                    handleChange={topleftsideinput[4].handleChange}
                    state={topleftsideinput[4].state}
                    label={topleftsideinput[4].label}
                    type={topleftsideinput[4].type}
                    intputName={topleftsideinput[4].intputName}
                    inputOrSelect={topleftsideinput[4].inputOrSelect}
                    options={topleftsideinput[4].options}
                    />
            </div>
          </div>
          <div className="center-section">
          <Box sx={{ width: "100%", marginBottom: "10px", "& .css-g6k71e-MuiAutocomplete-root":{
                        width: "100% !important",
                        paddingTop:"10px",
                      },
                      "& .css-6oxs1k-MuiAutocomplete-root":{
                        width: "100% !important"
                      },
                      // "& .css-74bi4q-MuiDataGrid-overlayWrapper":{
                      //   height: "60px",
                      // },
                      
                      }}>
          <p className="party-name">products</p>

          <Autocomplete
            sx={{
              display: "inline-block",
              "& input": {
                width: "100% !important ",
                height:"41px",
                
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
            <TransactionTable  
            selectedProductData={selectedProductDetails}
            totalValues={totalValues}
            rows={rows}
            setRows={setRows}
            />
          </div>
          <div
            className="bottom-section"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              className="left"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                gap: 1,
                alignItems: "flex-start",
              }}
            >
              <div>
                <InputComponent
                  intputName="paymenttype"
                  label="Payment type"
                  inputOrSelect="select"
                  handleChange={handlepaymenttype}

                  options={[
                    { value: "None", label: "None" },
                    { value: "Cash", label: "Cash" },
                    { value: "UPI", label: "UPI" },
                  ]}
                />
              </div>
              

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ fontSize: "12px" }} htmlFor="textarea">
                  Description
                </label>
                <textarea
                  id="descriptiontextarea"
                  value={textValue}
                  onChange={handleTextChange}
                  rows={2} // Set the number of visible rows
                  cols={50} // Set the number of visible columns
                />
              </div>

              <Button
                disableRipple
                style={{
                  textTransform: "none",
                  color: "var(--black-button)",
                  "&:hover": {
                    background: "transparent",
                  },
                }}
                component="label"
              >
                <img src={ImageAdd} alt="add img" />
                <Typography
                  variant="string"
                  style={{
                    pl: 1,
                  }}
                >
                  Add Photo
                </Typography>
                <input
                  type="file"
                  hidden
                  // onChange={handleImageChange}
                />
              </Button>
            </div>
            <div
              className="right"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                gap: 1,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <InputComponent type="checkbox" />
                <InputComponent
                  label="Round off"
                  type="number"
                  intputName="roundoff"
                />
                <InputComponent
                  label="total"
                  type="number"
                  intputName="total"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <InputComponent type="checkbox" />
                <InputComponent
                  label="Paid amount"
                  type="number"
                  intputName="paidamount"
                />
              </div>

              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "45%",
                  fontWeight: 700,
                }}
              >
                <p>Balance:</p>
                <p>5284</p>
              </div> */}
            </div>
          </div>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            sx={{
              height: 40,
              my: 2,
              marginRight: 2,
              textTransform: "none",
              bgcolor: "var(--black-button)",
            }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            sx={{
              height: 40,
              my: 2,
              marginRight: 2,
              textTransform: "none",
              bgcolor: "var(--black-button)",
            }}
          >
            Save
          </Button>
        </div>
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

export default CreditNotePage;
