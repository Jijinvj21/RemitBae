



import { Autocomplete, Box, Button, FormControlLabel, Modal, Switch, ToggleButton, ToggleButtonGroup, Typography, styled } from "@mui/material";
import "./ExpencePage.scss";
import { useEffect, useState } from "react";
import InputComponent from "../../components/InputComponent/InputComponent";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import {
  categeryGetAPI,
  expenceGetAPI,
  expensesTypeAddAPI,
  gstOptionsGetAPI,
  productAddAPI,
  productGetAPI,
  projectGetAPI,
  unitsDataGetAPI,
} from "../../service/api/admin";
import AddProductDrawer from "../../components/AddProductDrawer/AddProductDrawer";
import ImageAdd from "../../assets/sideBar/ImageAdd.svg";

function ExpencePage() {
  const [selectedProductDetails, setSelectedProductDetails] = useState(null); // State to hold selected product
  const [totalValues, setTotalValues] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product
  const [tableRows, setTableRows] = useState([]); // State to hold table rows
  const [state, setState] = useState({
    right: false,
  });
  const [productOptions, setProductOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [taxRateValue, setTaxRateValue] = useState({});
  const [ProductDrawerFormData, setProductDrawerFormData] = useState({
    name: "",
    quantity: "",
    rate: 0,
    hsn: "",
  });
  const [projectValue, setProjectValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [img, setImg] = useState(null);
  const [taxOptions, setTaxOptions] = useState([]);
  const [toggle, setToggle] = useState(true);

  const [description, setDescription] = useState("");
const [imgExpense, setImgExpense] = useState(null);
const [roundOff, setRoundOff] = useState(0);
const [total, setTotal] = useState(0);
const [checked, setChecked] = useState(false);
const [expenseOPtions, setExpenseOPtions] = useState([]);
const [selectedExpence, setSelectedExpence] = useState({});
const [open, setOpen] = useState(false);


const [expenseCategory, setExpenseCategory] = useState('');
const [expenetype, setExpenetype] = useState('None');

const handleExpenseCategoryChange = (e) => {
  setExpenseCategory(e.target.value);
};

const handleExpenetypeChange = (e) => {
  setExpenetype(e.target.value);
};




const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


const handleChange = (event) => {
  setChecked(event.target.checked);
};


const handleDescriptionChange = (e) => {
  setDescription(e.target.value);
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImgExpense(file);
};

const handleRoundOffChange = (e) => {
  setRoundOff(e.target.value);
};

const handleTotalChange = (e) => {
  setTotal(e.target.value);
};


  const handleDrawerImageChange = (e) => {
    const file = e.target.files[0];

    setImg(file);
  };
  const handleTaxRateChange = (event) => {
    console.log(event.target.value);
    const selectedOptionObject = taxOptions.find(
      (option) => option.taxlabel == event.target.value
    );
    console.log(selectedOptionObject);
    // setTaxRateValue({
    //   label: selectedOptionObject ? selectedOptionObject.label : "", // Handle case where selectedOptionObject is undefined
    //   value: event.target.value
    // });
    setTaxRateValue(selectedOptionObject);
  };
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectProject = (event) => {
    setProjectValue(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectCatogary = (event) => {
    setCategoryValue(event.target.value);
    console.log(event.target.value);
  };

  const handleDrawerAddProducts = () => {
    const formData = new FormData();

    formData.append("name", ProductDrawerFormData.name);
    formData.append("hsn", ProductDrawerFormData.hsn);
    formData.append("rate", parseInt(ProductDrawerFormData.rate));
    formData.append("quantity", parseInt(ProductDrawerFormData.quantity));
    formData.append("unit", selectedValue);
    formData.append("projectid", parseInt(projectValue));
    formData.append("is_master_product", toggle);
    formData.append("category_id", categoryValue);
    // formData.append('gst', ((parseInt(ProductDrawerFormData.rate) * parseInt(ProductFormData.quantity)) * (taxRateValue.value?.replace("%", ""))) / 100);
    formData.append("tax_rate", taxRateValue.id);
    formData.append("image", img);

    productAddAPI(formData)
      .then((data) => {
        fetchData();
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
    gstOptionsGetAPI()
      .then((data) => {
        console.log("tax:", data);
        // setTaxOptions(data);

        // Transform data and set it to state
        const transformedData = data.map((entry) => ({
          value: entry.percentage,
          label: entry.name ? `${entry.name} ${entry.percentage}` : "none",
          taxlabel: entry.percentage,
          id: entry.id,
        }));
        console.log(transformedData);
        setTaxOptions(transformedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategeryOptionsFormAPI = () => {
    categeryGetAPI()
      .then((data) => {
        console.log("category:", data);

        // Transform data and set it to state
        const categoryOptions = data?.responseData.map((entry) => ({
          value: entry.id,
          label: `${entry.name}`,
        }));
        categoryOptions.unshift({ value: 0, label: "None" });

        console.log("categoryOptions", categoryOptions);
        setCategoryOptions(categoryOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getClientOptionsFormAPI = () => {
    projectGetAPI()
      .then((data) => {
        console.log("projects:", data);

        // Transform data and set it to state
        const projectdData = data?.responseData.map((entry) => ({
          value: entry.id,
          label: `${entry.name} ( ${entry.client_name} )`,
        }));
        projectdData.unshift({ value: 0, label: "None" });

        console.log("projectdData", projectdData);
        setProjectOptions(projectdData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUnitOptionsFormAPI = () => {
    unitsDataGetAPI()
      .then((data) => {
        console.log("units:", data);

        // Transform data and set it to state
        const unitsdData = data?.responseData.map((entry) => ({
          value: entry.id,
          label: entry.name,
        }));
        unitsdData.unshift({ value: 0, label: "None" });
        console.log("unitsdData", unitsdData);
        setUnitOptions(unitsdData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

const expenceGetAPIGET=()=>{
  expenceGetAPI().then((data)=>{
    console.log("expenceGetAPI",data)
    const expenceData = data.responseData.map((entry) => ({
      value: entry.id,
      label: entry.name,

    }));
    expenceData.unshift({ value: -2, label: "Add" });
    expenceData.unshift({ value: -1, label: "None" });
    setExpenseOPtions(expenceData)
  }).catch((err)=>{
    console.log(err)

    setExpenseOPtions([{ value: -1, label: "None" },{ value: -2, label: "Add" }]);

  })
}

  useEffect(() => {
    expenceGetAPIGET()

    fetchData();
    setProductOptions([{ value: -2, label: "Add" }]);
    getTaxOptionsFormAPI();
    getCategeryOptionsFormAPI();
    getClientOptionsFormAPI();
    getUnitOptionsFormAPI();
  }, []);
  const handleDrawerSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };
  const handleDrawerChange = (e) => {
    const { name, value } = e.target;
    setProductDrawerFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const inputformodal = [
    {
      handleChange: handleExpenseCategoryChange,
      inputName: "expensecategory",
      label: "Expense Category",
      type: "text"

    },
    {
      handleChange: handleExpenetypeChange,
      inputName: "expenetype",
      label: "Expense Type",
      inputOrSelect: "select",
      options: [
        { value: "None", label: "None" },
        { value: "Indirect Expense", label: "Indirect Expense" },
        { value: "Direct Expense", label: "Direct Expense" }
      ]
    }
  ];

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
    {
      handleChange: handleTaxRateChange,
      intputName: "taxrate",
      label: "Tax Rate",

      inputOrSelect: "select",
      options: taxOptions,
    },
    {
      intputName: "taxvalue",
      label: " Tax Value",
      // type: "number",
      value:
        (parseFloat(ProductDrawerFormData.rate || 0) *
          parseFloat(ProductDrawerFormData.quantity || 0) *
          (parseFloat(taxRateValue.value?.replace("%", "")) || 0)) /
        100,

      disabled: "disabled",
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

      inputOrSelect: "select",
      options: unitOptions,
    },
    {
      handleChange: handleSelectProject,
      intputName: "project",
      label: "Projects",
      // type: "text",
      // value:selectedValue,

      inputOrSelect: "select",
      options: projectOptions,
    },
    {
      handleChange: handleSelectCatogary,
      intputName: "categery",
      label: "Categerys",
      // type: "text",
      // value:selectedValue,

      inputOrSelect: "select",
      options: categoryOptions,
    },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    console.log(event);
    console.log("Toggle Drawer:", anchor, open);
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleSelectedProductChange = async (event, newValue) => {
    if (!newValue) {
      // Handle the case where newValue is not defined
      return;
    }
    if (newValue.value === -2) {
      console.log(newValue.value === -2);
      toggleDrawer("right", true)();
    } else {
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


  const toprightinput = [
    {
      intputName: "expenseno",
      label: "Expense No",
      type: "text",
      // handleChange: handleChallanNoChange,
      // value: challanNo,
    },
    {
      // handleChange: handleInvoiceDateChange,
      label: "Invoice Date",
      type: "date",
      // value: invoiceDate,
    },
  ]

  
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
  
  
}));
const handleExpencename = (e) => {
  console.log("e.target", e.target.value === "-2");
  if (e.target.value === "-2") {
    handleOpen()
   }
   const selectedOptionObject = expenseOPtions.find(option => option.value == e.target.value);
    console.log("event.target",e.target.value,selectedOptionObject)

   
    setSelectedExpence({ selectedOptionObject });
};

const handleexpensesadd=()=>{
const expenses={
  name:expenseCategory,
  type:expenetype
}
  expensesTypeAddAPI(expenses).then((data)=>{
    console.log(data)
    setExpenseCategory("")
    setExpenetype("")
  }).catch((err)=>{
    console.log(err)
  })
}



  return (
    <div className="expence-page">
      <div style={{display:"flex"}}>
        
      <h2>Expense</h2>
      <div style={{display:"flex",alignItems:"center",marginBottom:"10px",marginLeft:"20px"}}>

      <h4>GST</h4>
      <FormControlLabel
        control={<IOSSwitch sx={{ ml: 2 }} checked={checked} onChange={handleChange} />}
        />
        
        </div>
      </div>
      <div className="inner-section">
        <div className="top-section">
          <div style={{width:"20%"}}>
          <InputComponent
              
                label="Expense Category"
                handleChange={handleExpencename}
                // intputName={input.intputName}
                inputOrSelect="select"
                // value={input.value}
                  options={expenseOPtions}
                  />
          {/* <select onChange={(e) => e.target.value === 'add' && openModal()}>

          {expenseOPtions.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
        <option value="add">Add new state</option>
      </select> */}
          </div>

        <div className="rightinputs">
            {toprightinput.map((input, index) => {
              return (
                <InputComponent
                key={index}
                label={input.label}
                type={input.type}
                handleChange={input.handleChange}
                intputName={input.intputName}
                inputOrSelect={input.inputOrSelect}
                value={input.value}
                  disabled={input.disabled}
                  options={input.options}
                  />
                );
              })}
          </div>
        
              </div>
        
        <div className="middle-section">
          <Box
            sx={{
              width: "100%",
              marginBottom: "10px",
              "& .css-g6k71e-MuiAutocomplete-root": {
                width: "100% !important",
                paddingTop: "10px",
              },
              "& .css-6oxs1k-MuiAutocomplete-root": {
                width: "100% !important",
              },
             
            }}
          >
            <p className="products-name">products</p>

            <Autocomplete
              sx={{
                display: "inline-block",
                "& input": {
                  width: "100% !important ",
                  height: "41px",

                  border: "none",
                  bgcolor: "var(--inputbg-color)",
                  color: (theme) =>
                    theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
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
        <div className="bottom-section">
  <div>
  <div style={{paddingBottom:"10px"}}>
                <InputComponent
                  intputName="paymenttype"
                  label="Payment type"
                  inputOrSelect="select"
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
        paddingBottom: "10px",
      }}
    >
      <label style={{ fontSize: "12px" }} htmlFor="descriptiontextarea">
        Description
      </label>
      <textarea
        id="descriptiontextarea"
        value={description}
        onChange={handleDescriptionChange}
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
          paddingLeft: 1,
        }}
      >
        Add Photo
      </Typography>
      <input
        type="file"
        hidden
        onChange={handleImageChange}
      />
    </Button>
  </div>
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      gap: 5,
      width: "40%",
    }}
  >
    <InputComponent type="checkbox" />
    <InputComponent
      label="Round off"
      type="number"
      intputName="roundoff"
      value={roundOff}
      onChange={handleRoundOffChange}
    />
    <InputComponent
      label="total"
      type="number"
      intputName="total"
      value={total}
      onChange={handleTotalChange}
    />
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
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
                <Box sx={style}>

<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
  <h4>Add Expense Category</h4>
  <div style={{ width: "95%", display: "flex", gap: "20px", flexDirection: "column" }}>
      {inputformodal.map((input, index) => (
        <InputComponent
          key={index}
          label={input.label}
          type={input.type}
          handleChange={input.handleChange}
          inputName={input.inputName}
          inputOrSelect={input.inputOrSelect}
          // value={formState.expensecategory}
          options={input.options}
        />
      ))}
    </div>
  <div style={{ display: "flex", justifyContent: "end",width:"100%" }}>
          <Button
            variant="contained"
            sx={{
              height: 40,
              my: 2,
              marginRight: 2,
              textTransform: "none",
              bgcolor: "var(--black-button)",
            }}
            onClick={handleClose}
          >
            Cancel
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
            onClick={()=>{handleexpensesadd();expenceGetAPIGET();handleClose()}}
          >
            Save
          </Button>
        </div>

  </div>                </Box>
        
      </Modal>
    </div>
  );
}

export default ExpencePage;
