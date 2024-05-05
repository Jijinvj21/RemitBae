import SalesTable from "../../components/SalesTable/SalesTable";
import "./PurchasePage.scss";
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
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
import Modal from '@mui/material/Modal';
import InputComponent from "../../components/InputComponent/InputComponent";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius:"10px",
    boxShadow: 24,
    p: 4,
  };
function PurchasePage() {


  const [productOptions, setProductOptions] = useState([]);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null); // State to hold selected product
  const[myArray ,setMyArray]=useState([])
  const [totalValues, setTotalValues] = useState([]);
  const [inputData,setInputData]=useState(0)



  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product

  const [tableRows, setTableRows] = useState([]); // State to hold table rows
  const [inputValue, setInputValue] = useState(""); // State to hold the value of the new input
  const [open, setOpen] = useState(false);

  // Function to handle changes in the new input value
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionSelect = (e) => {
    console.log(e.target.value)
    const selectedOption = e.target.value;
    if (selectedOption === "addNew") {
        setOpen(true)
    } else {
        setOpen(false)
      // Handle selection of other options
    }
  };


  const getArrayFromLocalStorage = () => {
    const storedArray = localStorage.getItem('products');
    if (storedArray) {
      setMyArray(JSON.parse(storedArray));
    }
  };

  useEffect(() => {
    getArrayFromLocalStorage()
    // Retrieve products array from local storage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    console.log(selectedProduct)

    // Extract product names from the products array
    const productNames = storedProducts.map((product) => product.name);
    // Generate options using the product names
    const options = productNames.map((name, index) => ({
      value: `option${index + 1}`,
      label: name,
    }));
    // Set the options state
    setProductOptions(options);
  }, []);

  const handleSelectedProductChange = (event, newValue) => {
    setSelectedProduct(newValue);

    if (newValue) {
      // Set the amount based on the selected product
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const selectedProductData = storedProducts.find(
        (product) => product.name === newValue.label
      );
      setSelectedProductDetails(selectedProductData);
console.log(selectedProductData)
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
  };
  const handleChangeAmout=(e)=>{
    setInputData(e.target.value)
  }
  const handleClose = () => setOpen(false);
  return (
    <div className="sales-table-container">
      <Box sx={{ width: "75%", mx: 1 }}>


<Box sx={{ width: "100%",marginBottom:"10px" }}>
            <p className="product-name">products</p>

            <Autocomplete
              sx={{
                display: "inline-block",
                "& input": {
                  width: "100%",
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
          <div style={{overflow:"auto"}}>
               

        <Box >
        <SalesTable selectedProductData={selectedProductDetails}
        setTotalValues={setTotalValues}
        totalValues={totalValues}
        /> {/* Pass tableRows as props to SalesTable */}
        </Box>
        </div>
      </Box>
      <Box
        sx={{ border: "1px solid #bbbdbf", width: "30%", mt: 4, borderRadius: 2, }}
      >
        
        <Box
          sx={{
            margin: "2px",
            p: "3px",
            borderRadius: 1,
            border: "1px solid #bbbdbf",
          }}
        >
          <p className="head-p-tag">Party Details</p>
          <select style={{ width: "100%" }} onChange={handleOptionSelect}>
          <option value="select">Select</option>

          <option value="addNew">Add New</option>

            {Array(5)
              .fill()
              .map((_, index) => {
                const option = { value: index, label: `Option ${index}` }; // Define your options here
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
            height: "55%",
          }}
        >
          <p className="head-p-tag">Bill Details</p>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <p>sub Total:</p>
            <p> &#8377; {totalValues}</p>
          </Box>
          <hr style={{
            margin:"8px",
            color:"#bbbdbf"
          }} />
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
          <Box sx={{ display: "flex", justifyContent: "space-between",my:1,alignItems:"center" }}>
            <p>Payment Method:</p>
            <select style={{ width: "50%" }}>
            
                  <option value="none" label="None"></option>
                  <option value="cash" label="Cash"></option>
                  <option value="upi" label="UPI"></option>


          </select> 
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between",alignItems:"center",my:1 }}>
            <p>Amount Received:</p>
            <FormControl
          sx={{ my: 1, width: "50%", background: "#F3F6F9", borderRadius: 2 }}
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
          <Box sx={{ display: "flex", justifyContent: "space-between",my:1 }}>
            <p>Change to Return:</p>
            <p>&#8377;{totalValues-inputData }</p>

          </Box>
         
        </Box>
        <Box sx={{display:"flex",justifyContent:"center",mt:1}}>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold",textTransform:"none", bgcolor:"var(--black-button)","&:hover": {
            background: "var(--button-hover)",}}}
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
            <Box sx={{display:"flex",justifyContent:"center",mb:4}}>

            <h4 > Add new Party</h4 > 
            </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
            <InputComponent
            label="Add new "
             value={inputValue}
             handleChange={handleInputChange}
            />

           
          </Box>
        </Box>
      </Modal>
    </div>
    </div>
  );
}

export default PurchasePage;