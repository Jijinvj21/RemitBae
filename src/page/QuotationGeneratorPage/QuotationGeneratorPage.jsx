import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import "./QuotationGeneratorPage.scss";
import InputComponent from "../../components/InputComponent/InputComponent";
import ProductInputCard from "../../components/ProductInputCard/ProductDataCard";
import { data } from "../../dummy/productData";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ImageAdd from "../../assets/sideBar/ImageAdd.svg";
import { useEffect, useRef, useState } from "react";
import React from 'react';

import {
  clientDataGetAPI,
  productGetAPI,
  projectGetAPI,
  quotationCreateAPI,
} from "../../service/api/admin";
import { useNavigate } from "react-router-dom";
import { renderToString } from "react-dom/server";
import AddClientDrawer from "../../components/AddClientDrawer/AddClientDrawer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function QuotationGeneratorPage() {

  const tableRef = useRef();
  const exclusionRef = useRef();
  const exclusionData = exclusionRef.current;
  const table = tableRef.current;
  const [clientOptions, setClientOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [productsOptions, setProductsOptions] = useState([]);

  const [img, setImg] = useState("");
  const [projectImg, setProjectImg] = useState("");

  const [inputs, setInputs] = useState([""]); // State to store  Terms and Conditions values
  const [inputsExclusion, setInputsExclusion] = useState([""]); // State to store  Terms and Conditions values
  const [selectedClient, setSelectedClient] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});


  const [leftInputs, setLeftInputs] = useState({
    quantity: "",
    amount: "",
    description: "",
    hardware: "",
    installation: "",
    accessories: "",
    
  });
  const [rightIputs, setRightIputs] = useState({
    quoteamount: "",
    completiontime: "",
    startdate: "",
  });
  // const [formData, setFormData] = useState([]);
  // adding data form local storage
  const [selectedAccessory, setSelectedAccessory] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [accessoriesList, setAccessoriesList] = useState([]);



  const [open, setOpen] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    pinCode: "",
    worktype: "",
    country: "",
    project:"",
  });
  const [toggle, setToggle] = useState(true);
  const [state, setState] = useState({
    right: false,
  });
  const [productData, setProductData] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name,value",name,value)
    setProjectFormData(prevState => ({
      ...prevState,
      [name]: value
    }));}
    const toggleDrawer = (anchor, open) => (event) =>{
      console.log(event)
      console.log("Toggle Drawer:", anchor, open);
      if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };



    const handleAccessoryChange = (event) => {
      const selectedOptionObject = productsOptions.find(option => option.value == event.target.value);
      console.log("event.target",event.target.value,selectedOptionObject)

     
      setSelectedAccessory({ selectedOptionObject });
    };
  
    const handleQuantityChange = (event) => {
      setQuantity(event.target.value);
    };
  const arrOfInputs = [
    {
      handleChange: handleChange,
      intputName: "project",
      label: "Project Name",
      type: "text",
      value:projectFormData.project
    },
    {
      handleChange: handleChange,
      intputName: "name",
      label: "Client Name",
      type: "text",
      value:projectFormData.name
    },
    {
      handleChange: handleChange,
      intputName: "email",
      label: "Email",
      type: "email",
      value:projectFormData.email
    },
    {
      handleChange: handleChange,
      intputName: "mobile",
      label: "Mobile",
      type: "tel",
      value:projectFormData.mobile
    },
    {
      handleChange: handleChange,
      intputName: "address1",
      label: "Address 1",
      type: "text",
      value:projectFormData.address1
    },
    {
      handleChange: handleChange,
      intputName: "address2",
      label: "Address 2",
      type: "text",
      value:projectFormData.address2
    },
    {
      handleChange: handleChange,
      intputName: "pinCode",
      label: "Pin Code",
      type: "text",
      value:projectFormData.pinCode
    },
    
  ];


    const handleAdd = () => {
alert("add")
    }
    const handleprojectImageChange = (e) => {
      const file = e.target.files[0];
      setProjectImg(file);
    };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getCliendData = () => {
    clientDataGetAPI()
      .then((data) => {
        console.log("clientData:", data);
        // setTaxOptions(data);

        // Transform data and set it to state
        const partyData = data.responseData.map((entry) => ({
          value: entry.id,
          label: entry.name,
          project: entry.project_name,

        }));
        partyData.unshift({ value: -2, label: "Add" });
        partyData.unshift({ value: -1, label: "None" });

        console.log(partyData);
        setClientOptions(partyData);
      })
      .catch((err) => {
        console.log("err",err);
      });
      setClientOptions([{ value: -1, label: "None" },{ value: -2, label: "Add" }]);
  };
  const getProjectData = () => {
    projectGetAPI()
      .then((data) => {
        console.log("getProjectData:", data);
        // setTaxOptions(data);

        // Transform data and set it to state
        const projectData = data.responseData.map((entry) => ({
          value: entry.id,
          label: entry.name,
        }));
        projectData.unshift({ value: -2, label: "Add" });
        projectData.unshift({ value: -1, label: "None" });

        console.log(projectData);
        setProjectOptions(projectData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductsData = () => {
    productGetAPI()
      .then((data) => {
        console.log("getProjectData:", data);
        // setTaxOptions(data);

        // Transform data and set it to state
        const productsData = data.responseData.map((entry) => ({
          value: entry.id,
          label: entry.name,
          unit:entry.unit,
          amount:entry.rate,
        }));
        productsData.unshift({ value: -1, label: "None" });

        console.log(productsData);
        setProductsOptions(productsData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductsData();
    getProjectData();
    getCliendData();
  }, []);

  const handleleftIputsChange = (e) => {
    const { name, value } = e.target;
    console.log("name, value",name, value);
    setLeftInputs({
      ...leftInputs,
      [name]: value,
    });
    // handleAddData()
  };
  const handleAddData = () => {
    console.log("firsttest")
    const productDatas = {
      ...leftInputs,
      accessorieslist: accessoriesList,
      product:`${selectedProduct.selectedOptionObject?.value}`,
      productname:selectedProduct.selectedOptionObject?.label,
      productunit:selectedProduct.selectedOptionObject?.unit

    };
    console.log("handleAddData",selectedProduct)
    setProductData([...productData, productDatas]);

  };
  const handlerightIputsChange = (e) => {
    const { name, value } = e.target;
    console.log("first",name, value)
    setRightIputs((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle input value change
  const handleInputChange = (index, value) => {
    console.log(index);
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    console.log(newInputs);
  };

  const handleClientname = (e) => {
    console.log("e.target", e.target.value === "-2");
    if (e.target.value === "-2") {
        toggleDrawer("right", true)();
     }
     const selectedOptionObject = clientOptions.find(option => option.value == e.target.value);
      console.log("event.target",e.target.value,selectedOptionObject)

     
      setSelectedClient({ selectedOptionObject });
  };
  // const handleProjectname = (e) => {
  //   console.log("e.target", e.target.value === "-2");
  //   // alert(e.target.value==="-2")
  //   if (e.target.value === "-2") {
  //     navigate("/admin/projects/add-projects");
  //   }
  // };

  const handleExclusionInputChange = (index, value) => {
    console.log(index);
    const newInputs = [...inputsExclusion];
    newInputs[index] = value;
    setInputsExclusion(newInputs);
    console.log(newInputs);
  };

  // Function to handle adding a new input field
  const handleAddInput = () => {
    setInputs([...inputs, ""]);
  };
  const handleAddInputExclusion = () => {
    setInputsExclusion([...inputsExclusion, ""]);
  };
  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImg(file);
  // };
  const handleImageChange = (e) => {
    console.log("e.target.files",e.target.files)
    const files = e.target.files; // Get all selected files
    const fileList = Array.from(files); // Convert FileList to array
    setImg(fileList); // Update state with array of files
  };


  const handleAddAccessory = async() => {
    console.log(selectedAccessory.selectedOptionObject)
    if (selectedAccessory.selectedOptionObject?.value !== '') {
      const accessory = {
        accessories: `${selectedAccessory.selectedOptionObject?.value}`,
        name: selectedAccessory.selectedOptionObject.label,
        quantity: quantity,
        price:`${selectedAccessory.selectedOptionObject.amount}`,
        unit:selectedAccessory.selectedOptionObject.unit,
      };
      console.log("accessory",[...accessoriesList, accessory])
      setAccessoriesList([...accessoriesList, accessory]);
      setSelectedAccessory({});
      setQuantity(1);
      // handleAddData()
    }
  };
  const handleProductNameChange = (event) => {
    const selectedOptionObject = productsOptions.find(option => option.value == event.target.value);
    console.log("event.target",event.target.value,selectedOptionObject)

   
    setSelectedProduct({ selectedOptionObject });
  };

  const leftArrOfInputs = [
    {
      handleChange:handleProductNameChange,
      intputName: "productname",
      label: " Product Name",
      inputOrSelect: "select",
      options: productsOptions,
    },
    {
      intputName: "quantity",
      label: " Quantity",
      type: "number",
    },
    {
      intputName: "amount",
      label: " Amount",
      type: "number",
    },
    {
      intputName: "description",
      label: "Description",
      type: "text",
    },
    {
      intputName: "hardware",
      label: " Hardware",
      type: "number",
    },
    {
      intputName: "installation",
      label: " Installation",
      type: "number",
    },
    {
      intputName: "accessories",
      label: " Accessories",
      type: "number",
    },
    {
      handleChange:handleAccessoryChange,
      intputName: " accessorieslist",
      label: " Accessories list",
      inputOrSelect: "select",
      options: productsOptions,
    },
    {
      handleChange:handleQuantityChange,
      intputName: "accessoriesQuantity",
      label: " Quantity",
      type: "number",
    },
  ];
  const RightArrOfInputs = [
    {
      handleChange: handleClientname,
      intputName: "clientname",
      label: "Client Name",
      inputOrSelect: "select",
      // value:selectedClient,
      options: clientOptions,
    },
    {
      // handleChange: handleProjectname,
      intputName: "projectdetails",
      label: "Project Details",
      // inputOrSelect: "select",
      // options: projectOptions,
      value:selectedClient?.selectedOptionObject?.project,
      disabled:"disabled"
    },
    {
      handleChange: handlerightIputsChange,
      intputName: "quoteamount",
      label: " Quote amount",
      type: "text",
    },
    {
      handleChange: handlerightIputsChange,
      intputName: "completiontime",
      label: "Completion Time",
      type: "date",
    },
    {
      handleChange: handlerightIputsChange,
      intputName: "startdate",
      label: "Start date",
      type: "date",
    },
  ];
  const handleDelete = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the main div
    alert("You clicked delete!");
  };
  const pageone = renderToString(
    <div
        className="quatationgenerator"
        id="quatationgenerator"
        style={{ fontSize: "12px" }}
      >
        <img
          src="https://res.cloudinary.com/dczou8g32/image/upload/v1714668042/DEV/jw8j76cgw2ogtokyoisi.png"
          alt="logo"
          style={{ marginLeft: "20px", height: "90px", paddingBottom: "50px" }}
        />
        <div style={{ marginLeft: "50px" }}>
          <p style={{ paddingBottom: "5px" }}>To,</p>
          <p>{selectedClient?.selectedOptionObject?.label}</p>
        </div>

        <div style={{ width: "510px", paddingBottom: "50px" }}>
          <p style={{ textAlign: "end", paddingBottom: "5px" }}>
            QUOTATION NO: QT / 24-25/020
          </p>
          <p style={{ textAlign: "end" }}>Date: {new Date().toLocaleDateString()} </p>
        </div>
        <div
          style={{ marginLeft: "50px", width: "500px", paddingBottom: "200px" }}
        >
          <p style={{ paddingBottom: "5px" }}>
            {" "}
            We thank you for giving us an opportunity to quote for the mentioned
            subject. With reference to your enquiry, please find.
          </p>
          <p style={{ paddingBottom: "5px" }}>Sir,</p>
          <p style={{ paddingBottom: "5px" }}>
            Biltree was founded on the principle of providing quality work with
            an emphasis on cost- effectiveness and the highest quality work for
            its prospective clients in the quickest way possible. Our strength
            is in achieving recognition for our ability to analyze the client's
            requirements in collaboration with architects and consultants, as
            well as developing an understanding of architectural and interior
            concepts. We specialize in providing solutions’ that blend
            aesthetically with interiors and exteriors, without sacrificing any
            functional attributes. As a company, our goal is to ensure customer
            satisfaction with the quality of our aesthetic. We also intend to
            achieve fluency from design to design and installation. We will
            maintain our loyalty and plough to build good and fair relationships
            with our clients, founded on trust and loyalty.
          </p>
        </div>
        <div
          style={{ marginLeft: "50px", width: "500px", textAlign: "center" }}
        >
          <h5 style={{ paddingBottom: "10px" }}>
            BILTREE -1ST FLOOR MANGHAT ARCADE, KALOOR KADAVANTRA ROAD,
            KADAVANTRA -20{" "}
          </h5>
          <h5>PHONE: +91 9447519770 </h5>
        </div>
      </div>

  )

  const handleGenerate = async () => {
    const pdftable = document.querySelector("#ALLPRODUCTtable");
    const pdflastpage = document.querySelector("#exclusion-terms-and-condition");
  
    const pdf = new jsPDF("p", "pt", "a4", true);
    pdf.html(pageone, {
      callback: async () => { // Make the callback function async
        pdf.addPage();
        pdf.addImage(
          "https://res.cloudinary.com/dczou8g32/image/upload/v1714668042/DEV/jw8j76cgw2ogtokyoisi.png",
          30,
          0,
          100, // Width
          50 // Height
        );
        pdf.autoTable({
          html: pdftable, // Pass the HTML structure directly
        
          
        });
  
        // pdf.addPage();
        // pdf.addImage(
        //   "https://res.cloudinary.com/dczou8g32/image/upload/v1714668042/DEV/jw8j76cgw2ogtokyoisi.png",
        //   30,
        //   0,
        //   100, // Width
        //   50 // Height
        // );
        // pdf.autoTable({
        //   html: "#accessoriestable", // Pass the HTML structure directly
        //   useCss: true,
        //   startY: 50,
        //   theme: "grid",
        //   bodyStyles: { minCellHeight: 15 },
        //   columnStyles: {
        //     2: {
        //       cellWidth: 100,
        //       valign: "center",
        //       halign: "center",
        //       minCellHeight: 50,
        //       fontSize: 1,
        //       textColor: "white",
        //     },
        //   },
        //   didDrawCell: function (data) {
        //     console.log("didDrawCell", data.cell);
        //     if (data.column.index === 2 && data.cell.section === "body") {
        //       var td = data.cell.raw;
        //       var img = td.getElementsByTagName("img")[0];
        //       var imageSize = 35; // Increase image size here
        //       console.log("img.src",img.src)
        //       pdf.addImage(
        //         img.src,
        //         data.cell.x + 35,
        //         data.cell.y + 10,
        //         imageSize, // Width
        //         imageSize // Height
        //       );
        //     }
        //   },
        // });
  
        // pdf.addPage();
        // pdf.addImage(
        //   "https://res.cloudinary.com/dczou8g32/image/upload/v1714668042/DEV/jw8j76cgw2ogtokyoisi.png",
        //   30,
        //   0,
        //   100, // Width
        //   50 // Height
        // );
        // pdf.autoTable({
        //   html: "#tablethree", // Pass the HTML structure directly
        //   useCss: true,
        //   startY: 50,
        //   theme: "grid",
        // });
  
        if (img) {
          const imageUrls = img.map((file) => URL.createObjectURL(file));
          pdf.addPage();
  
          const addImageProcess = async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const reader = new FileReader();
            return new Promise((resolve) => {
              reader.onloadend = () => {
                resolve(reader.result);
              };
              reader.readAsDataURL(blob);
            });
          };
  
          const imageWidth = 575; // Set the width of the image
          const imageHeight = 820; // Set the height of the image
          const paddingX = 10; // Set the horizontal padding
          const paddingY = 10; // Set the vertical padding
          const marginLeft = 0; // Set the left margin
          const marginTop = 0; // Set the top margin
  
          for (const [i, url] of imageUrls.entries()) {
            const image = await addImageProcess(url); // Await here
            pdf.addImage(
              image,
              "png",
              marginLeft + paddingX,
              marginTop + paddingY,
              imageWidth,
              imageHeight
            );
            if (i !== imageUrls.length - 1) {
              pdf.addPage();
            }
          }
        }
        console.log("inputsExclusion",inputsExclusion[0]!=='',inputsExclusion.length)

  
        inputsExclusion[0]!=='' || inputs[0]!==''? pdf.addPage():""
        inputsExclusion[0]!=='' || inputs[0]!==''? pdf.addImage(
          "https://res.cloudinary.com/dczou8g32/image/upload/v1714668042/DEV/jw8j76cgw2ogtokyoisi.png",
          30,
          0,
          100, // Width
          50 // Height
        ):""
  
        const width = 305;
        const padding = 40;
        const maxWidth = width - 2 * padding;


        pdf.setFontSize(15);

        inputsExclusion[0]!==''&& pdf.text("EXCLUSIONS ", padding, 80, {
    maxWidth,
    lineHeightFactor: 1.5,
  });
pdf.setFontSize(12);
console.log("inputsExclusion",inputsExclusion.length)
const inputText1 = inputsExclusion.join("\n"); // Convert the inputs array to a newline-separated string
pdf.text(`${inputText1}`, 50, 100, {
  maxWidth,
  lineHeightFactor: 1.5,
  align: "left",
});

        pdf.setFontSize(15);
  console.log("TERMS AND CONDITIONS",inputs[0]=='',inputs.length)
  inputs[0]!=='' && pdf.text("TERMS AND CONDITIONS", padding, ((inputsExclusion.length)*(inputsExclusion.length<5?25:20))+70, {
          maxWidth,
          lineHeightFactor: 1.5,
        });
        pdf.setFontSize(12);
        const inputText = inputs.join("\n"); // Convert the inputs array to a newline-separated string
        pdf.text(`${inputText}`, 50, ((inputsExclusion.length)*(inputsExclusion.length<5?25:20))+90, {
          maxWidth,
          lineHeightFactor: 1.5,
          align: "left",
        });
  
        const blobURL = pdf.output("bloburl");
        window.open(blobURL, "_blank");
      },
    });
  };

  const hanldeAddDataToApi=()=>{
  console.log(productData)
   const quotationData= {
      id:selectedClient?.selectedOptionObject.value,
      client:selectedClient?.selectedOptionObject.project,
      quote_amount:rightIputs.quoteamount,
      completation_time: rightIputs.completiontime,
      start_date:rightIputs.startdate,
      terms_and_conditions: inputs,
      product_info: productData,
      
  }
  console.log("quotationData",productData)
    quotationCreateAPI(quotationData).then((data)=>{
console.log(data)
})
.catch((err)=>{
  console.log(err)
})
  }
  
  return (
    <Box className="quotation-generator-page">
      <h2> Quotation Generator</h2>
      <h4> Enter the product details to create a new quotation </h4>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box className="input-box">
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ width: "100%" }}>
              {RightArrOfInputs.slice(0, 3).map((input, index) => {
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
                    disabled={input.disabled}
                    value={input.value}


                  />
                );
              })}
            </Box>
            <Box sx={{ width: "100%" }}>
              {RightArrOfInputs.slice(3).map((input, index) => {
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
              <Button
                disableRipple
                sx={{
                  mt: 3,
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
                  sx={{
                    pl: 1,
                  }}
                >
                  Add plan
                </Typography>
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
          </Box>

          {/* EXCLUSIONS */}
          <Box
            sx={{
            }}
          >
            <Typography
              className="Terms-label"
              variant="string"
              sx={{
                pl: 1,
              }}
            >
              Exclusion
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "end" }}>
              <Box
                sx={{
                  my: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "100%",
                }}
              >
                {inputsExclusion.map((input, index) => (
    <InputComponent
        key={index}
        handleChange={(e) => handleExclusionInputChange(index, e.target.value)} // Pass index and value
        label={input.label}
        type={input.type}
        intputName={input.intputName}
    />
))}

              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  height: "45px",
                  my: 1,
                  // mx:"auto",
                  fontWeight: "bold",
                  textTransform: "none",
                  bgcolor: "var(--black-button)",
                  "&:hover": {
                    background: "var(--button-hover)",
                  },
                }}
                onClick={handleAddInputExclusion}
              >
                
                Add
              </Button>
            </Box>
          </Box>  

          <Box>
            <Typography
              className="Terms-label"
              variant="string"
              sx={{
                pl: 1,
              }}
            >
              Add Terms and Conditions
            </Typography>
            {/* Render input fields based on state */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "end" }}>
              <Box
                sx={{
                  my: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "100%",
                }}
              >
                {inputs.map((input, index) => (
                  <InputComponent
                    key={index}
                    handleChange={(e) =>
                      handleInputChange(index, e.target.value)
                    } // Pass index and value
                    label={input.label}
                    type={input.type}
                    intputName={input.intputName}
                  />
                ))}
              </Box>
              {/* Button to add more input fields */}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  height: "45px",
                  my: 1,
                  // mx:"auto",
                  fontWeight: "bold",
                  textTransform: "none",
                  bgcolor: "var(--black-button)",
                  "&:hover": {
                    background: "var(--button-hover)",
                  },
                }}
                onClick={handleAddInput}
              >
                {/* <FiPlus size={20} /> */}
                {/* Add more Terms and Conditions */}
                Add
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              fontWeight: "700",
            }}
          >
            <p style={{ cursor: "pointer" }} onClick={handleGenerate}>
              Preview
            </p>
          </Box>
        </Box>

        <Box className="input-box" sx={{ gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {leftArrOfInputs.slice(0, 1).map((input, index) => (
              <InputComponent
                key={index}
                handleChange={input.handleChange}
                label={input.label}
                type={input.type}
                // value={leftInputs[input.intputName]} // Ensure the value is correctly passed
                intputName={input.intputName}
                inputOrSelect={input.inputOrSelect}
                options={input.options}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {leftArrOfInputs.slice(1, 3).map((input, index) => (
              <InputComponent
                key={index}
                handleChange={(e) => handleleftIputsChange(e, input.intputName)}
                label={input.label}
                type={input.type}
                value={leftInputs[input.intputName]} // Ensure the value is correctly passed
                intputName={input.intputName}
                inputOrSelect={input.inputOrSelect}
                options={input.options}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {leftArrOfInputs.slice(3, 4).map((input, index) => (
              <InputComponent
                key={index}
                handleChange={(e) => handleleftIputsChange(e, input.intputName)}
                label={input.label}
                type={input.type}
                value={leftInputs[input.intputName]} // Ensure the value is correctly passed
                intputName={input.intputName}
                inputOrSelect={input.inputOrSelect}
                options={input.options}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {leftArrOfInputs.slice(4,7).map((input, index) => (
              <InputComponent
                key={index}
                handleChange={(e) => handleleftIputsChange(e, input.intputName)}
                label={input.label}
                type={input.type}
                value={leftInputs[input.intputName]} // Ensure the value is correctly passed
                intputName={input.intputName}
                inputOrSelect={input.inputOrSelect}
                options={input.options}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex",alignItems:"center", gap: 2 }}>
            {leftArrOfInputs.slice(7,9).map((input, index) => (
              <InputComponent
                key={index}
                handleChange={input.handleChange}
                label={input.label}
                type={input.type}
                value={leftInputs[input.intputName]} // Ensure the value is correctly passed
                intputName={input.intputName}
                inputOrSelect={input.inputOrSelect}
                options={input.options}
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
              // onClick={handleOpen}
              // onClick={() => {
              //   toggleDrawer("right", true)();
              // }}
              onClick={handleAddAccessory}
            >
              Add
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
         
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 1,
                fontWeight: "bold",
                textTransform: "none",
                bgcolor: "var(--black-button)",
                "&:hover": {
                  background: "var(--button-hover)",
                },
              }}
              onClick={handleAddData}
            >
              Add Product
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            // mt: 1,
            pb: 2,
            py: 2,
            bgcolor: "var(--bgwhite)",
            borderRadius: 5,
            msScrollRails: "none",
            gap: 1,
            display: "flex",
            flexFlow: "row wrap",
          }}
        >
          <Box
            sx={{
              height: "57vh", // Height of the inner container, larger than the outer container
              overflowY: "auto", // Enable scrolling
              width: "100%", // Ensure full width
              flexGrow: 1,
            }}
          >
            {/* // {productData?.map((data, index) => { */}
            {productData.map((product, productIndex) => (
  <div key={productIndex}>
    {/* Render Product Input Card for the main product */}
    <Grid
      md={4}
      item
      sx={{
        mx: "auto",
        px: "10px",
        py: 1,
      }}
    >
      <ProductInputCard
        handleDelete={handleDelete}
        heading={product.productname}
        image={product.img} // Assuming you have an image property in productData
        qty={product.quantity}
        unit={product.unit}
        rate={product.amount}
        amount={product.amount}
      />
    </Grid>

    {/* Map over accessorieslist of the current product */}
    {product.accessorieslist.map((accessory, accessoryIndex) => (
      <Grid
        md={4}
        item
        key={`${productIndex}-${accessoryIndex}`} // Use a unique key combining productIndex and accessoryIndex
        sx={{
          mx: "auto",
          px: "10px",
          py: 1,
        }}
      >
        <ProductInputCard
          handleDelete={handleDelete}
          heading={accessory.name}
          image={accessory.img} // Assuming you have an image property in accessorieslist
          qty={accessory.quantity}
          unit={accessory.unit}
          rate={accessory.price}
          amount={accessory.amount}
        />
      </Grid>
    ))}
  </div>
))}


          </Box>
        </Box>
      </Box>
      {/* <p className="added-item"> Added Items</p> */}
      {/* there are table data for the pdf  */}

      {/* EXCLUSIONS */}
      {/* <div ref={exclusionRef}>
      <p style={{padding:"0"}}>EXCLUSIONS</p>
      {inputsExclusion.map((line, index) => (
        <p style={{paddingLeft:"15px",paddingTop:"10px"}} key={index} >{line}</p>
      ))}
    </div> */}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: "2rem",
            // mx:"auto",
            fontWeight: "bold",
            textTransform: "none",
            bgcolor: "var(--black-button)",
            "&:hover": {
              background: "var(--button-hover)",
            },
          }}
          // onClick={handleDownloadPdf}
          onClick={hanldeAddDataToApi}
        >
          Create
        </Button>
      </Box>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <h4 style={{ textAlign: "center" }}>Add Accessories</h4>
            </div>
          </Box>
        </Modal>
        <AddClientDrawer 
         setToggle={setToggle}
         toggle={toggle}
         handleAdd={handleAdd}
         handleImageChange={handleprojectImageChange}
                 arrOfInputs={arrOfInputs}
                 projectFormData={projectFormData}
        state={state}
        toggleDrawer={toggleDrawer}


        />
      </div>
      

      <table id='ALLPRODUCTtable'>
  <thead>
    <tr>
      <th>Product Name</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Unit</th>
      <th>Image</th>
    </tr>
  </thead>
  <tbody>
    {productData.map((item, index) => (
      <React.Fragment key={index}>
        <tr>
          <td>{item.productname}</td>
          <td>{item.quantity}</td>
          <td>{item.amount}</td>
          <td>{item.productunit}</td>
          <td></td> 
        </tr>
        {item.accessorieslist.map((accessory, i) => (
          <tr key={`${index}-${i}`}>
            <td>{accessory.name}</td>
            <td>{accessory.quantity}</td>
            <td>{accessory.price}</td>
            <td>{accessory.unit}</td>
            <td></td> 
          </tr>
        ))}
      </React.Fragment>
    ))}
  </tbody>
</table>



      
      <div>
        <table id="tablethree" style={{ backgroundColor: "white",display:"none"  }}>
          <thead style={{ backgroundColor: "yellow" }}>
            <tr>
              <th style={{ border: "2px solid" }}>Area of Work</th>
              <th style={{ border: "2px solid" }}>Specification</th>
              <th style={{ border: "2px solid" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="2" style={{ padding: "10px" }}>
                Field 1
              </td>
              <td style={{ padding: "10px" }}>
                {" "}
                typesetting industry. ever since the 1500s
              </td>
              <td style={{ padding: "10px" }}> 123,222.00</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>
                {" "}
                typesetting industry. ever since the 1500s
              </td>
              <td style={{ padding: "10px" }}> 123,222.00</td>
            </tr>
            <tr></tr>
            <tr>
              <td rowspan="2" style={{ padding: "10px" }}>
                Field 2
              </td>
              <td style={{ padding: "10px" }}>
                {" "}
                typesetting industry. ever since the 1500s
              </td>
              <td style={{ padding: "10px" }}> 123,222.00</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>
                {" "}
                typesetting industry. ever since the 1500s
              </td>
              <td style={{ padding: "10px" }}> 123,222.00</td>
            </tr>
            <tr>
              <td rowspan="2" style={{ padding: "10px" }}>
                Field 3
              </td>
              <td style={{ padding: "10px" }}>
                {" "}
                typesetting industry. ever since the 1500s
              </td>
              <td style={{ padding: "10px" }}> 123,222.00</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>
                {" "}
                typesetting industry. ever since the 1500s
              </td>
              <td style={{ padding: "10px" }}> 123,222.00</td>
            </tr>
            <tr style={{ backgroundColor: "green" }}>
              <td colspan="2" style={{ textAlign: "end" }}>
                TOTAL
              </td>
              <td style={{ textAlign: "center" }}>321</td>
            </tr>
            <tr style={{ backgroundColor: "red" }}>
              <td colspan="2" style={{ textAlign: "end" }}>
                GRAND TOTAL
              </td>
              <td style={{ textAlign: "center" }}>321</td>
            </tr>
          </tbody>
        </table>
      </div>
     
    </Box>
  );
}

export default QuotationGeneratorPage;
