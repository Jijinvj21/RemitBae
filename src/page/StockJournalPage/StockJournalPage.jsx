import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import "./StockJournalPage.scss";
import InputComponent from "../../components/InputComponent/InputComponent";
import ProductInputCard from "../../components/ProductInputCard/ProductDataCard";
import ImageAdd from "../../assets/sideBar/ImageAdd.svg";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useState } from "react";
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';


function StockJournalPage() {
  const navigate = useNavigate();
  const [productOptions, setProductOptions] = useState([]);
  const [leftArrOfInputs, setLeftArrOfInputs] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product
  const [selectedProductDetails, setSelectedProductDetails] = useState(null); // State to hold selected product
  const [totalAmout, setTotalAmout] = useState(); // State to hold selected product
  const [quantity, setQuantity] = useState(); // State to hold quantity
  const [myArray, setMyArray] = useState([]);
  const [createdProducts, setCreatedProducts] = useState({
    productname: "",
    unit: "",
    amount: "",
  });


  const getArrayFromLocalStorage = () => {
    const storedArray = localStorage.getItem('stockJournal');
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

    // Update leftArrOfInputs with dynamic options
    const updatedLeftArrOfInputs = [
      {
        intputName: "quantity",
        label: "Quantity",
        type: "number",
        value:quantity
      },
      {
        intputName: "amount",
        label: "Amount",
        type: "number",
        value: totalAmout,
        disabled:"disabled"
      },
    ];

    setLeftArrOfInputs(updatedLeftArrOfInputs);
  }, [totalAmout]);

  const RightArrOfInputs = [
    {
      intputName: "productname",
      label: " Product Name",
      type: "text",
      value:createdProducts.productname

    },
    {
      intputName: "unit",
      label: "Unit",
      type: "text",
      value:createdProducts.unit
    },
    {
      intputName: "amount",
      label: "  Amount",
      type: "text",
      value:createdProducts.amount
    },
  ];
  const handleDelete = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the main div
    alert("You clicked delete!");
  };

// handle right input change
const handleRightInputChange = (e) => {
  const { name, value } = e.target;
  setCreatedProducts(prevState => ({
    ...prevState,
    [name]: value
  }));
};

  // select prodect from local storage
  const handleSelectedProductChange = (event, newValue) => {
    setSelectedProduct(newValue);

    if (newValue) {
      // Set the amount based on the selected product
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const selectedProductData = storedProducts.find(
        (product) => product.name === newValue.label
      );
      setSelectedProductDetails(selectedProductData);
    }
  };
  // add quantity
  const handleQtyChange = (e) => {
    console.log(e.target.value);
    setQuantity(e.target.value)
    const totalvalue = selectedProductDetails.rate * e.target.value;
    setTotalAmout(totalvalue);
    console.log(totalvalue);
  };

// remove and add the product to local storage
const handleAddProduct = () => {
  if (selectedProduct && quantity > 0) {
    // Retrieve products array from local storage
    let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  
    // Find the index of the selected product in the stored products array
    const index = storedProducts.findIndex(
      (product) => product.name === selectedProduct.label
    );
  
    // If the product is found, update its quantity
    if (index !== -1) {
      storedProducts[index].quantity -= quantity;
      localStorage.setItem("products", JSON.stringify(storedProducts));
  
      // Create a new entry for the stock journal
      // const productData = JSON.parse(localStorage.getItem("products")) || [];
      console.log(storedProducts[index])

      const stockEntry = {
        product: storedProducts[index].name,
        quantity: quantity,
        totalAmount: totalAmout,
        unit:storedProducts[index].unit,
        rate:storedProducts[index].rate
      };
  
      // Retrieve stock journal array from local storage or initialize if it doesn't exist
      const stockJournal = JSON.parse(localStorage.getItem("stockJournal")) || [];
  
      // Add the new entry to the stock journal array
      stockJournal.push(stockEntry);
  
      // Update the stock journal array in local storage
      localStorage.setItem("stockJournal", JSON.stringify(stockJournal));
  
      setQuantity(0); // Reset quantity after adding product
      setSelectedProduct(null); // Reset selected product after adding product
      setTotalAmout(0)
    } else {
      alert("Selected product not found in the inventory!");
    }
  } else {
    alert("Please select a product and enter a valid quantity.");
  }
  
};
// handle create button click
const handleCreateProduct = async () => {
  // Check if stockJournal is available in local storage
  const stockJournalData = JSON.parse(localStorage.getItem("stockJournal")) || [];

  // Retrieve existing data from createStockJournal or initialize as an empty array
  const existingData = JSON.parse(localStorage.getItem("createStockJournal")) || [];

  // Create the new entry
  const newEntry = { createdProducts, products: stockJournalData };

  // Append the new entry to the existing data
  const updatedData = [...existingData, newEntry];

  // Store the updated data in local storage
   localStorage.setItem("createStockJournal", JSON.stringify(updatedData));
  // Reset createdProducts state
  window.location.reload()
 setCreatedProducts({
    productname: "",
    unit: "",
    amount: "",
  });

  // Remove stockJournal from local storage
  localStorage.removeItem("stockJournal");

  // Retrieve updated array from local storage
  getArrayFromLocalStorage();
};





  return (
    <Box className="stockjournl-page">
      <h2> Stock Journal</h2>
      <h4> Enter the product details to create a new product </h4>
      <Button
        disableRipple
        sx={{
          mb: 2,
          textTransform: "none",
          color: "var(--black-button)",
          "&:hover": {
            background: "transparent",
          },
        }}
        component="label"
        onClick={() => navigate(-1)}
      >
        <KeyboardBackspaceIcon />
        Back
      </Button>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box className="input-box">
          <Box sx={{ width: "100%" }}>
            <p className="product-name">product</p>

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

          {leftArrOfInputs.map((input, index) => {
            return (
              <Grid item key={index} xs={6} md={4}>
                <InputComponent
                  handleChange={handleQtyChange}
                  state={input.state}
                  label={input.label}
                  type={input.type}
                  intputName={input.intputName}
                  inputOrSelect={input.inputOrSelect}
                  options={input.options}
                  value={input.value}
                  disabled={input.disabled}
                />
              </Grid>
            );
          })}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: "2rem",
              fontWeight: "bold",
              textTransform: "none",
              bgcolor: "var(--black-button)",
              "&:hover": {
                background: "var(--button-hover)",
              },
            }}
            onClick={handleAddProduct}

          >
            Add Product
          </Button>
        </Box>
        <Box className="input-box">
          <Box sx={{ display: "flex", gap: 5 }}>
            <Box sx={{ width: "100%" }}>
              {RightArrOfInputs.slice(0, 3).map((input, index) => {
                return (
                  <InputComponent
                    key={index}
                    handleChange={handleRightInputChange}
                    state={input.state}
                    label={input.label}
                    type={input.type}
                    intputName={input.intputName}
                    inputOrSelect={input.inputOrSelect}
                    options={input.options}
                  />
                );
              })}
            </Box>
            {/* image array */}
            {/* <div className="image-add-box"> */}
            <Button
              className="image-add-box"
              disableRipple
              sx={{
                bgcolor: "var(--inputbg-color)",
                mt: 3,
                // mb:-5,
                ml: 2,
                color: "var(--black-button)",
                textTransform: "none",
              }}
              component="label"
            >
              <img src={ImageAdd} alt="add ing" />
              <Typography variant="string" sx={{ pl: 1 }}>
                Upload product image
              </Typography>
              <input type="file" hidden />
            </Button>
            {/* </div> */}
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: "2rem",
              fontWeight: "bold",
              textTransform: "none",
              bgcolor: "var(--black-button)",
              "&:hover": {
                background: "var(--button-hover)",
              },
            }}
            onClick={handleCreateProduct}

          >
            {" "}
            Create
          </Button>
        </Box>
      </Box>
      <p className="added-item"> Added Items</p>
      <Box
        sx={{
          mt: 1,
          pb: 2,
          py: 2,
          // mx: 1,
          // height: 500, // Height of the outer container
          bgcolor: "var(--bgwhite)",
          borderRadius: 5,
          msScrollRails: "none",

          gap: 1,
          // overflow: "hidden", // Hide the scrollbar
        }}
      >
        <Box
          sx={{
            maxHeight: 260, // Height of the inner container, larger than the outer container
            overflowY: "auto", // Enable scrolling
            width: "100%", // Ensure full width
            display: "flex",
            flexWrap: "wrap",
          }}
        >
                {myArray.length===0 ?
 <Box sx={{my:2, mx:"auto",display:"flex",flexDirection:"column",
 alignItems:"center"}}>
 <PlaylistAddRoundedIcon sx={{mx:"auto"}} style={{fontSize:"40px"}}/>
 <p style={{textAlign:"center"}}>No products available</p>
 </Box>:
          myArray.map((data, index) => (
            <Box
              item
              key={index}
              sx={{
                // mx: "auto",
                px: "10px",
                py: 1,
                // flex: "1 0 1%", // Equivalent to flex: 1 0 calc(20% - 8px)
                // maxWidth: "15%", // Equivalent to flex-basis: 20%
              }}
            >
              <ProductInputCard
                // handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                heading={data.product}
                image={data.img}
                qty={data.quantity}
                unit={data.unit}
                rate={data.rate}
                amount={data.amount}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
// }

export default StockJournalPage;
