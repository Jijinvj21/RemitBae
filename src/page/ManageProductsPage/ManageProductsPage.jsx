import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import "./ManageProductsPage.scss";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useEffect, useState } from "react";
import ProductDataCard from "../../components/ProductInputCard/ProductDataCard";
import AddProductDrawer from "../../components/AddProductDrawer/AddProductDrawer";
import AddSquare from "../../assets/products/AddSquare.svg";
import { Link } from "react-router-dom";
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';

function ManageProductsPage() {
  const [myArray, setMyArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Initialize searchQuery as an empty string

  const getArrayFromLocalStorage = () => {
    const storedArray = localStorage.getItem('products');
    if (storedArray) {
      setMyArray(JSON.parse(storedArray));
    }
  };
  useEffect(() => {
    // Function to retrieve array from local storage
    getArrayFromLocalStorage(); 
  }, []);
  const [updateData,setUpdateData]=useState({ heading:"",
    qty:"",
    unit:"",
    rate:"",})
    const [selectedValue, setSelectedValue] = useState('');
    const [taxRateValue, setTaxRateValue] = useState({});

  const [ProductFormData, setProductFormData] = useState({
    name:"",
    qate:"",
    quantity:"",
    rate:"",
    taxvalue:"",
    hsn:"",
    // unit:"",
  });
  const [img, setImg] = useState(null);
  // const [selectTabs, setSelectTabs] = useState("add");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  // const handleTaxRateChange = (event) => {
  //   setTaxRateValue(event.target.value);
  //   console.log(event.targe.value);
  // };


  const options = [
    { value: 'none', label: 'None' },
    { value: '0_igst', label: 'IGST @0%' },
    { value: '0_cgst', label: 'CGST @0%' },
    { value: '0.25_igst', label: 'IGST @0.25%' },
    { value: '0.25_cgst', label: 'CGST @0.25%' },
    { value: '3_igst', label: 'IGST @3%' },
    { value: '3_cgst', label: 'CGST @3%' },
    { value: '5_igst', label: 'IGST @5%' },
    { value: '5_cgst', label: 'CGST @5%' },
    { value: '12_igst', label: 'IGST @12%' },
    { value: '12_cgst', label: 'CGST @12%' },
    { value: '18_igst', label: 'IGST @18%' },
    { value: '18_cgst', label: 'CGST @18%' },
    { value: '28_igst', label: 'IGST @28%' },
    { value: '28_cgst', label: 'CGST @28%' },
  ];
  const handleTaxRateChange = (event) => {
    const selectedValue = event.target.value;
    // setTaxRateValue(selectedValue);
    const selectedOptionObject = options.find(option => option.value === selectedValue);
    setTaxRateValue(selectedOptionObject);

    console.log('Selected Label:', selectedOptionObject.label);
    console.log('Selected Value:', selectedOptionObject.value);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedValue)
    console.log(img);
    console.log(ProductFormData); // Test to see the form data in console
    // Add logic to submit form data
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  };

  const handleSearchButtonClick = () => {
    // Retrieve the array of products from local storage
    const storedArray = JSON.parse(localStorage.getItem('products')) || [];
  
    // Filter the array based on the search query
    const filteredProducts = storedArray.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredProducts)
  
    // Update state with the filtered results
    setMyArray(filteredProducts);
  };


    const handlePagination = (event, page) => {
    console.log(page);
  };

  const arrOfInputs = [
    {
      handleChange: handleChange,
      intputName: "name",
      label: " Product Name",
      type: "text",
      value:updateData?.heading||ProductFormData.name
      
      
    },
    {
      handleChange: handleChange,
      intputName: "rate",
      label: "Rate",
      type: "number",
      value:updateData.rate||ProductFormData.rate
    },
    {
      handleChange: handleChange,
      intputName: "quantity",
      label: "Quantity",
      type: "number",
      value:updateData.qty||ProductFormData.quantity
    },
    {
      handleChange:handleTaxRateChange,
      intputName: "taxrate",
      label: "Tax Rate",
      // type: "number",
      value:taxRateValue.value,

      inputOrSelect:"select",
      options:options    },
    {
      handleChange: handleChange,
      intputName: "taxvalue",
      label: " Tax Value",
      type: "number",
      value:""
    },
    {
      handleChange: handleChange,
      intputName: "hsn",
      label: "HSN",
      type: "text",
      value:""
    },
    {
      handleChange: handleSelectChange,
      intputName: "unit",
      label: "Unit",
      // type: "text",
      value:selectedValue,

      inputOrSelect:"select",
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ],
      
      
    },
  ];

  // draw
  const [state, setState] = useState({
    right: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) =>{
    console.log(event)
    console.log("Toggle Drawer:", anchor, open);
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  
  const handleUpdate = (data) => {
    console.log("Updating data:", data);
    setUpdateData(data)
    toggleDrawer("right", true)(); // Check if "right" is the correct anchor value
    // alert("You clicked the main div!");
  };
  
  

  const handleDelete = (event, indexToDelete) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the main div
    console.log("Deleting item at index:", indexToDelete);
    
    try {
      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
      console.log("Existing products:", existingProducts);
  
      // Remove the item at the specified index
      existingProducts.splice(indexToDelete, 1);
      console.log("Updated products:", existingProducts);
  
      // Update local storage with the modified array
      localStorage.setItem("products", JSON.stringify(existingProducts));
  
      // Update state or perform any other necessary actions
      // For example, if you're displaying the products in a list, you may want to update the list state here
      getArrayFromLocalStorage();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  
  

  const handleAdd = () => {
    console.log(taxRateValue)
    const dataToStore = { ...ProductFormData, unit: selectedValue, taxrate: taxRateValue };
  
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
  
    const updatedProducts = [...existingProducts, dataToStore];
  
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  
    // Reset form fields and selected values
    setProductFormData({
      name: "",
      qate: "",
      quantity: "",
      rate: "",
      taxvalue: "",
      hsn: "",
    });
    setSelectedValue("");
    setTaxRateValue(""); // Reset the tax rate value
  
    alert("Product added successfully");
    getArrayFromLocalStorage();
  };
  
  
  return (
    <div className="manage-prodect-page">
      <div className="product-add-text">
        <div>
          <h2> Stocks </h2>
          <h4> Manage Products to the inventory </h4>
        </div>
        <Box sx={{display:"flex",flexDirection:"column"}}>
          <Button
            disableRipple
            sx={{
              textTransform: "none",
              "&:hover": {
                background: "transparent",
              },
            }}
            // onClick={toggleDrawer("right", true)}
            onClick={() => {
              toggleDrawer("right", true)();
              setUpdateData("");
            }}
            
          >
            <img src={AddSquare} alt="AddSquare" />
            <Typography
              variant="string"
              sx={{ color: "black", fontWeight: "700 ", paddingLeft: 1 }}
            >
              {" "}
              Add stock
            </Typography>
          </Button>
          <Link
            to={"/admin/stock-journal"}
            style={{display: "flex",
              textDecoration: "none",fontSize:"14px",marginLeft:"9px",marginTop:"10px",fontWeight:500}}
          >
            <img src={AddSquare} alt="AddSquare"  />
            <Typography
              variant="string"
              sx={{ color: "black", fontWeight: "700 ", paddingLeft: 1,paddingTop:"2px" }}
            >
              {" "}
              Stock Journal
            </Typography>
          </Link>
        </Box>
      </div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <InputComponent
          handleChange={handleSearch}
          label="Product Search"
          intputName="product-search"
          type="text"
        />
        <Button
          variant="contained"
          sx={{
            height: 40,
            marginTop: 3,
            marginLeft: 2,
            textTransform: "none",
            bgcolor: "var(--black-button)",
          }}
          onClick={handleSearchButtonClick}

        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          mt: 4,
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
            // height: 500, // Height of the inner container, larger than the outer container
            overflowY: "auto", // Enable scrolling
            width: "100%", // Ensure full width
            display: "flex",
            // alignItems:"flex-start"
            // justifyContent:"flex-start"
            flexWrap: "wrap",
     }}
        >
          {myArray.length===0 ?
          <Box sx={{my:2, mx:"auto",display:"flex",flexDirection:"column",
          alignItems:"center"}}>
          <PlaylistAddRoundedIcon sx={{mx:"auto"}} style={{fontSize:"40px"}}/>
          <p style={{textAlign:"center"}}>No products available</p>
          </Box>:myArray.map((data, index) => (
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
              <ProductDataCard
                handleUpdate={handleUpdate}
                handleDelete={ (e)=>handleDelete(e,index)}
                heading={data.name}
                image={data.img}
                qty={data.quantity}
                unit={data.unit}
                rate={data.rate}
                amount={data.amount}
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={30}
              variant="outlined"
              shape="rounded"
              onChange={handlePagination}
            />
          </Stack>
        </Box>
      </Box>

      <AddProductDrawer
        handleSubmit={handleSubmit}
        handleSelectChange={handleSelectChange}
        selectedValue={selectedValue}
        arrOfInputs={arrOfInputs}
        toggleDrawer={toggleDrawer}
        state={state}
        ProductFormData={ProductFormData}
        handleImageChange={handleImageChange}
        handleAdd={handleAdd}
        // updateData={updateData}
      />
    </div>
  );
}

export default ManageProductsPage;
