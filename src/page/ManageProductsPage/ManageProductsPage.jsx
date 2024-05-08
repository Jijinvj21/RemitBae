import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import "./ManageProductsPage.scss";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useEffect, useState } from "react";
import ProductDataCard from "../../components/ProductInputCard/ProductDataCard";
import AddProductDrawer from "../../components/AddProductDrawer/AddProductDrawer";
import AddSquare from "../../assets/products/AddSquare.svg";
import { Link } from "react-router-dom";
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import { gstOptionsGetAPI, productAddAPI, productDeleteAPI, productGetAPI, productUpdateAPI, projectGetAPI, unitsDataGetAPI } from "../../service/api/admin";

function ManageProductsPage() {
  const [myArray, setMyArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Initialize searchQuery as an empty string
const [taxOptions,setTaxOptions]=useState([])
const [updatetrue,setUpdateTrue]=useState(false)
const [unitOptions,setUnitOptions]=useState([])
const [projectOptions,setProjectOptions]=useState([])





const getUnitOptionsFormAPI = () => {
  unitsDataGetAPI()
    .then((data) => {
      console.log("units:", data);
      
      // Transform data and set it to state
      const unitsdData = data?.responseData.map(entry => ({
        value: entry.id,
        label: entry.name ,
        
      }));
      console.log(unitsdData);
      setUnitOptions(unitsdData);
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
      console.log(projectdData);
      setProjectOptions(projectdData);
    })
    .catch(err => {
      console.log(err);
    });
};


  const getDataFromAPI = () => {
    productGetAPI().then((data) => {
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
  useEffect(() => {
    getClientOptionsFormAPI()
    getUnitOptionsFormAPI()
    getUnitOptionsFormAPI()
    getDataFromAPI()
    getTaxOptionsFormAPI()
  }, []);
  const [updateData,setUpdateData]=useState({ name:"",
    qty:"",
    unit:"",
    hsn:"",
    rate:0,
  })
    const [selectedValue, setSelectedValue] = useState('');
    const [projectValue, setProjectValue] = useState('');

    const [taxRateValue, setTaxRateValue] = useState({});

  const [ProductFormData, setProductFormData] = useState({
    name:"",
    quantity:"",
    rate:0,
    hsn:"",
    // unit:"",
  });
  const [img, setImg] = useState(null);
  // const [selectTabs, setSelectTabs] = useState("add");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  const handleSelectProject = (event) => {
    setProjectValue(event.target.value);
    console.log(event.target.value)
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
      value:updateData?.name||ProductFormData.name
      
      
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
      // value:taxRateValue.label,

      inputOrSelect:"select",
      options:taxOptions    },
    {
      intputName: "taxvalue",
      label: " Tax Value",
      // type: "number",
      value: (((parseFloat(ProductFormData.rate || 0)) * parseFloat(ProductFormData.quantity || 0)) * (parseFloat(taxRateValue.value?.replace("%", "")) || 0) / 100),
      disabled:"disabled"
      
    },
    {
      handleChange: handleChange,
      intputName: "hsn",
      label: "HSN",
      type: "text",
    },
    {
      handleChange: handleSelectChange,
      intputName: "unit",
      label: "Unit",
      // type: "text",
      value:selectedValue,

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
    setUpdateTrue(true)
    setUpdateData(data)
    toggleDrawer("right", true)(); // Check if "right" is the correct anchor value
  alert("update")
  };
   const handleUpdateData=()=>{
    alert("update")
    const productUpdate={
      name:updateData.name,
      hsn:updateData.hsn,
      rate: parseInt(updateData.rate),
      quantity: parseInt(updateData.qty),
      unit:selectedValue,
      taxvalue: taxRateValue?.label
    }
    productUpdateAPI(productUpdate).then((data)=>{
console.log(data)
setUpdateTrue(false)
getDataFromAPI()
    }).catch((err)=>{
      console.log(err)
    })
   }
  

  const handleDelete = (event, indexToDelete) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the main div
    
    try {
     productDeleteAPI(indexToDelete).then((res)=>{
        if(res.status==200){

          getDataFromAPI();
          console.log("deleted")
        }
      })
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  
  

  const handleAdd = () => {
    const productadd = {
      name: ProductFormData.name,
      hsn: ProductFormData.hsn,
      rate: parseInt(ProductFormData.rate),
      quantity: parseInt(ProductFormData.quantity),
      unit: selectedValue,
      projectValue:parseInt(projectValue),
      // gst: ((parseInt(ProductFormData.rate) * parseInt(ProductFormData.quantity)) * (taxRateValue.value?.replace("%", ""))) / 100
      tax_rate:{
        id:taxRateValue?.id
      }
    };
    productAddAPI(productadd).then((data) => {
      if (data.status === 200) {
        setProductFormData({
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
        getDataFromAPI();
      }
    })
      .catch((err) => { console.log(err) });
    alert("problem in add product");
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
          {myArray?.length===0 ?
          <Box sx={{my:2, mx:"auto",display:"flex",flexDirection:"column",
          alignItems:"center"}}>
          <PlaylistAddRoundedIcon sx={{mx:"auto"}} style={{fontSize:"40px"}}/>
          <p style={{textAlign:"center"}}>No products available</p>
          </Box>:myArray?.map((data, index) => {
            return(
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
                handleDelete={ (e)=>handleDelete(e,data.id)}
                heading={data.name}
                image={data.img}
                qty={data.quantity}
                unit={data.unit}
                rate={data.rate}
                amount={data.amount}
              />
            </Box>
          )})}
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
        updatetrue={updatetrue}
        handleUpdateData={handleUpdateData}
        
        // updateData={updateData}
      />
    </div>
  );
}

export default ManageProductsPage;
