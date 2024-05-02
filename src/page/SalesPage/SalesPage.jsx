import SalesTable from "../../components/SalesTable/SalesTable";
import "./SalesPage.scss";
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

import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

function SalesPage() {
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null); // State to hold selected product
  const[myArray ,setMyArray]=useState([])

  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product

  const [tableRows, setTableRows] = useState([]); // State to hold table rows

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

  return (
    <div className="sales-table-container">
      <Box sx={{ width: "75%", mx: 1 }}>
        {/* <FormControl
          sx={{ my: 1, width: "100%", background: "#F3F6F9", borderRadius: 2 }}
        >
          <OutlinedInput
            sx={{
              p: "0 !important",
            }}
            id="standard-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl> */}

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
        <Box>
        <SalesTable selectedProductData={selectedProductDetails}/> {/* Pass tableRows as props to SalesTable */}
        </Box>
      </Box>
      <Box
        sx={{ border: "1px solid #bbbdbf", width: "100%", my: 1, borderRadius: 2 }}
      >
        
        <Box
          sx={{
            margin: "2px",
            p: "3px",
            borderRadius: 1,
            border: "1px solid #bbbdbf",
          }}
        >
          <p className="head-p-tag">Customer Details</p>
          <select style={{ width: "100%" }}>
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
            <p> &#8377;6,800.00</p>
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
              Total amount <span style={{fontWeight:"lighter", fontSize:"12px"}}>(items:2,Quantity:2)</span>:
            </p>
            <p> &#8377;6,800.00</p>
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
          <Box sx={{ display: "flex", justifyContent: "space-between",alignItems:"center",my:1 }}>
            <p>Amount Received:</p>
            <FormControl
          sx={{ my: 1, width: "50%", background: "#F3F6F9", borderRadius: 2 }}
        >
          <OutlinedInput
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
            <p>&#8377;0.00</p>

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
    </div>
  );
}

export default SalesPage;
