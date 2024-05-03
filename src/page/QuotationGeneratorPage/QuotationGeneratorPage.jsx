import { Box, Button, Grid, Typography } from "@mui/material";
import "./QuotationGeneratorPage.scss";
import InputComponent from "../../components/InputComponent/InputComponent";
import ProductInputCard from "../../components/ProductInputCard/ProductDataCard";
import { data } from "../../dummy/productData";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ImageAdd from "../../assets/sideBar/ImageAdd.svg";
import { useEffect, useRef, useState } from "react";

function QuotationGeneratorPage() {
  const tableRef = useRef();
  const exclusionRef=useRef()
  const exclusionData=exclusionRef.current
  const table = tableRef.current;

  const [img, setImg] = useState("");
  const [inputs, setInputs] = useState([""]); // State to store  Terms and Conditions values
  const [inputsExclusion, setInputsExclusion] = useState([""]); // State to store  Terms and Conditions values

  const [leftInputs, setLeftInputs] = useState({
    productname: "",
    quantity: "",
    amount: "",
    description: "",
    hardware: "",
    installation: "",
    accessories: "",
  });
  const [rightIputs, setRightIputs] = useState({
    clientname: "",
    projectdetails: "",
    quoteamount: "",
    completiontime: "",
    startdate: "",
  });
  const [formData, setFormData] = useState([]);
  // adding data form local storage 
  const [myArray, setMyArray] = useState([]);

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

  const handleleftIputsChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setLeftInputs({
      ...leftInputs,
      [name]: value,
    });
  };
  const handleAddData = () => {
    setFormData([...formData, leftInputs]);
    setLeftInputs({
      productname: "",
      quantity: "",
      amount: "",
      description: "",
      hardware: "",
      installation: "",
      accessories: "",
    });
  };
  const handlerightIputsChange = (e) => {
    const { name, value } = e.target;
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
 const handleExclusionInputChange= (index, value) => {
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
    const files = e.target.files; // Get all selected files
    const fileList = Array.from(files); // Convert FileList to array
    setImg(fileList); // Update state with array of files
  };

  const longText =
    " We thank you for giving us an opportunity to quote for the mentioned subject. With reference to your enquiry, please find. ";
  const longText2 =
    "Biltree was founded on the principle of providing quality work with an emphasis on cost- effectiveness and the highest quality work for its prospective clients in the quickest way possible. Our strength is in achieving recognition for our ability to analyze the client's requirements in collaboration with architects and consultants, as well as developing an understanding of architectural and interior concepts. We specialize in providing solutions’ that blend aesthetically with interiors and exteriors, without sacrificing any functional attributes. As a company, our goal is to ensure customer satisfaction with the quality of our aesthetic. We also intend to achieve  fluency from design to design and installation. We will maintain our loyalty and plough to build good and fair relationships with our clients, founded on trust and loyalty.";
  const quotationno = "BT0184";
  // const quotatinodate = "21/10/2023";
  const quotatiaddress =
    "BILTREE -1ST FLOOR MANGHAT ARCADE, KALOOR KADAVANTRA ROAD, KADAVANTRA -20 ";
  const phone = "PHONE: +91 9447519770 ";
  const doc = new jsPDF();
  const width = 205;
  const padding = 20;
  const maxWidth = width - 2 * padding;
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  const pdfCommonPart = (doc, img, inputs, width, padding, maxWidth) => {
    doc.setFont(undefined, "bold"); // Set font to bold
    // doc.setFont("bold");
    doc.setTextColor("#a2846b");
    doc.setFontSize(30);
    // doc.text("BILTREE", 15, 20);
    const imageWidth = 100; // Width in millimeters
const imageHeight = 30; // Height in millimeters
    doc.addImage(
      "https://res.cloudinary.com/dczou8g32/image/upload/v1714668042/DEV/jw8j76cgw2ogtokyoisi.png",
    
      1,0,
      imageWidth, // Width
      imageHeight // Height
    );
    doc.setFont(undefined, "normal"); // Set font to bold
    doc.setTextColor("BLACK");
    doc.setFontSize(12);
    doc.text("To,", padding, 40, {
      maxWidth,
      lineHeightFactor: 1.5,
      align: "left",
    });
    doc.text(`${rightIputs.clientname},`, padding, 50, {
      maxWidth,
      lineHeightFactor: 1.5,
      align: "left",
    });
    doc.text(`QUOTATION NO:${quotationno} `, 175, 50, {
      maxWidth,
      lineHeightFactor: 1.5,
      align: "right",
    });
    doc.text(` DATE: ${formattedDate} `, 138, 60, {
      maxWidth,
      lineHeightFactor: 1.5,
      align: "left",
    });

    doc.text(longText, padding, 80, {
      maxWidth,
      lineHeightFactor: 1.5,
      align: "left",
    });
    doc.text("Sr,", padding, 100, {
      maxWidth,
      lineHeightFactor: 1.5,
      align: "left",
    });

    doc.text(longText2, padding, 110, {
      maxWidth,
      lineHeightFactor: 1.5,
      align: "left",
    });
    doc.setFont(undefined, "bold"); // Set font to bold
    doc.setFontSize(10);
    doc.text(quotatiaddress, padding, 250, { maxWidth, lineHeightFactor: 1.5 });
    doc.text(phone, 80, 259, { maxWidth, lineHeightFactor: 1.5 });
    doc.addPage();
    doc.autoTable({
      head: [["Id", "Name", "Qty", "Unit", "Rate", "Img"]],
      body: myArray.map((val, i) => [
        i + 1,
        val.name,
        val.quantity,
        val.unit,
        val.rate,
         "https://images.unsplash.com/photo-1614424428282-b2b1e72c6a4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]),
      columnStyles: {
        0: { cellWidth: 10, valign: "center", halign: "center" },
        1: { cellWidth: 45, valign: "center", halign: "center" },
        2: { cellWidth: 25, valign: "center", halign: "center" },
        3: { cellWidth: 25, valign: "center", halign: "center" },
        4: { cellWidth: 25, valign: "center", halign: "center" },
        5: {
          cellWidth: 25,
          valign: "center",
          halign: "center",
          minCellHeight: 20,
          fontSize: 1,
          textColor: "white",
        },
      },
      theme: "grid",
      headStyles: {
        fillColor: "black",
        textColor: "white",
        halign: "center",
      },
      didDrawCell: function (data) {
        if (data.column.index === 5 && data.cell.section === "body") {
          var img = new Image();
          img.src = data.cell.raw;
          var textPos = data.cell;
          var dim =
            20 - (data.cell.padding("top") + data.cell.padding("bottom"));
          var padding = {
            left: data.cell.padding("left"),
            top: data.cell.padding("top"),
          };
          doc.addImage(
            img,
            textPos.x + padding.left,
            textPos.y + padding.top,
            dim,
            dim
          );
        }
      },
      didParseCell: function (data) {
        if (data.column.index === 5 && data.cell.section === "body") {
          var imgHeight =
            20 - (data.cell.padding("top") + data.cell.padding("bottom"));
          data.cell.height = Math.max(
            imgHeight,
            data.row.raw.minCellHeight || 0
          );
        }
      },
    });
  };
  const handleGenerate = async () => {
    pdfCommonPart(doc, img, inputs, width, padding, maxWidth);
    // pdfCommonPart(doc, img, inputs, width, padding, maxWidth); // This line generates the common part of the PDF

    doc.addPage();

    doc.autoTable({
      html: table, // Pass the HTML structure directly
      startY: 25,
      theme: "grid",
      headStyles: {
        fillColor: "black",
        textColor: "white",
      },
    });

    if (img) {
      const imageUrls = img.map((file) => URL.createObjectURL(file));
      doc.addPage();

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

      const imageWidth = 188; // Set the width of the image
      const imageHeight = 275; // Set the height of the image
      const paddingX = 10; // Set the horizontal padding
      const paddingY = 10; // Set the vertical padding
      const marginLeft = 0; // Set the left margin
      const marginTop = 0; // Set the top margin

      for (const [i, url] of imageUrls.entries()) {
        const image = await addImageProcess(url);
        doc.addImage(
          image,
          "png",
          marginLeft + paddingX,
          marginTop + paddingY,
          imageWidth,
          imageHeight
        );
        if (i !== imageUrls.length - 1) {
          doc.addPage();
        }
      }

   // Inside the handleGenerate function
if (inputs.length > 0) {
  // doc.addPage();

//   !(inputsExclusion == "") &&
//   doc.text("EXCLUSIONS ", padding, 20, {
//     maxWidth,
//     lineHeightFactor: 1.5,
//   });
// doc.setFontSize(12);
// const inputText1 = inputsExclusion.join("\n"); // Convert the inputs array to a newline-separated string
// doc.text(`${inputText1}`, 30, 30, {
//   maxWidth,
//   lineHeightFactor: 1.5,
//   align: "left",
// });


!(inputs == "") &&
doc.addPage();


// const exclusionTextHeight =inputsExclusion.length<=1?45:20+(inputsExclusion.length*1.5)+20; // Assuming each entry takes 20 units of space vertically
  !(inputs == "") &&
  
  doc.text("TERMS AND CONDITIONS", padding, 20, {
      maxWidth,
      lineHeightFactor: 1.5,
  });
  
  
  doc.setFontSize(12);
  const inputText = inputs.join("\n"); // Convert the inputs array to a newline-separated string
  doc.text(`${inputText}`, 30, 30, {
    maxWidth,
    lineHeightFactor: 1.5,
    align: "left",
  });
}
const blobURL = doc.output('bloburl');
      window.open(blobURL, "_blank");
    } else {
      {
        // !(inputs == "") && doc.addPage();
        doc.setFontSize(15);

        // !(inputsExclusion == "") &&
        // doc.html(exclusionData,{
        //   margin: 10,
        //   html2canvas: {
        //     scale: 0.65
        //   },
        // });
      //   !(inputsExclusion == "") &&
      //   doc.text("EXCLUSIONS ", padding, 20, {
      //     maxWidth,
      //     lineHeightFactor: 1.5,
      //   });
      // doc.setFontSize(12);
      // const inputText1 = inputsExclusion.join("\n"); // Convert the inputs array to a newline-separated string
      // doc.text(`${inputText1}`, 30, 30, {
      //   maxWidth,
      //   lineHeightFactor: 1.5,
      //   align: "left",
      // });


      !(inputs == "") &&
      doc.addPage();


      // const exclusionTextHeight =inputsExclusion.length<=1?45:20+(inputsExclusion.length*1.5)+20; // Assuming each entry takes 20 units of space vertically
        !(inputs == "") &&
        
        doc.text("TERMS AND CONDITIONS", padding, 20, {
            maxWidth,
            lineHeightFactor: 1.5,
        });
        
        
        doc.setFontSize(12);
        const inputText = inputs.join("\n"); // Convert the inputs array to a newline-separated string
        doc.text(`${inputText}`, 30, 30, {
          maxWidth,
          lineHeightFactor: 1.5,
          align: "left",
        });
      }
      const blobURL = doc.output('bloburl');
      window.open(blobURL, "_blank");
    }
  };

  const handleDownloadPdf = async () => {
    pdfCommonPart(doc, img, inputs, width, padding, maxWidth);
    // pdfCommonPart(doc, img, inputs, width, padding, maxWidth); // This line generates the common part of the PDF

    doc.addPage();

    doc.autoTable({
      html: table, // Pass the HTML structure directly
      startY: 25,
      theme: "grid",
      headStyles: {
        fillColor: "black",
        textColor: "white",
      },
    });

    if (img) {
      const imageUrls = img.map((file) => URL.createObjectURL(file));
      doc.addPage();

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

      const imageWidth = 188; // Set the width of the image
      const imageHeight = 275; // Set the height of the image
      const paddingX = 10; // Set the horizontal padding
      const paddingY = 10; // Set the vertical padding
      const marginLeft = 0; // Set the left margin
      const marginTop = 0; // Set the top margin

      for (const [i, url] of imageUrls.entries()) {
        const image = await addImageProcess(url);
        doc.addImage(
          image,
          "png",
          marginLeft + paddingX,
          marginTop + paddingY,
          imageWidth,
          imageHeight
        );
        if (i !== imageUrls.length - 1) {
          doc.addPage();
        }
      }

   // Inside the handleGenerate function
if (inputs.length > 0) {
  // doc.addPage();

//   !(inputsExclusion == "") &&
//   doc.text("EXCLUSIONS ", padding, 20, {
//     maxWidth,
//     lineHeightFactor: 1.5,
//   });
// doc.setFontSize(12);
// const inputText1 = inputsExclusion.join("\n"); // Convert the inputs array to a newline-separated string
// doc.text(`${inputText1}`, 30, 30, {
//   maxWidth,
//   lineHeightFactor: 1.5,
//   align: "left",
// });


!(inputs == "") &&
doc.addPage();


// const exclusionTextHeight =inputsExclusion.length<=1?45:20+(inputsExclusion.length*1.5)+20; // Assuming each entry takes 20 units of space vertically
  !(inputs == "") &&
  
  doc.text("TERMS AND CONDITIONS", padding, 20, {
      maxWidth,
      lineHeightFactor: 1.5,
  });
  
  
  doc.setFontSize(12);
  const inputText = inputs.join("\n"); // Convert the inputs array to a newline-separated string
  doc.text(`${inputText}`, 30, 30, {
    maxWidth,
    lineHeightFactor: 1.5,
    align: "left",
  });
}
     doc.save("download.pdf"); // Save the PDF with the specified filename

    } else {
      {
        // !(inputs == "") && doc.addPage();
        doc.setFontSize(15);

        // !(inputsExclusion == "") &&
        // doc.html(exclusionData,{
        //   margin: 10,
        //   html2canvas: {
        //     scale: 0.65
        //   },
        // });
      //   !(inputsExclusion == "") &&
      //   doc.text("EXCLUSIONS ", padding, 20, {
      //     maxWidth,
      //     lineHeightFactor: 1.5,
      //   });
      // doc.setFontSize(12);
      // const inputText1 = inputsExclusion.join("\n"); // Convert the inputs array to a newline-separated string
      // doc.text(`${inputText1}`, 30, 30, {
      //   maxWidth,
      //   lineHeightFactor: 1.5,
      //   align: "left",
      // });


      !(inputs == "") &&
      doc.addPage();


      // const exclusionTextHeight =inputsExclusion.length<=1?45:20+(inputsExclusion.length*1.5)+20; // Assuming each entry takes 20 units of space vertically
        !(inputs == "") &&
        
        doc.text("TERMS AND CONDITIONS", padding, 20, {
            maxWidth,
            lineHeightFactor: 1.5,
        });
        
        
        doc.setFontSize(12);
        const inputText = inputs.join("\n"); // Convert the inputs array to a newline-separated string
        doc.text(`${inputText}`, 30, 30, {
          maxWidth,
          lineHeightFactor: 1.5,
          align: "left",
        });
      }
                  doc.save("download.pdf"); // Save the PDF with the specified filename

    }
  };





  const leftArrOfInputs = [
    {
      intputName: "productname",
      label: " Product Name",
      type: "text",
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
  ];
  const RightArrOfInputs = [
    {
      handleChange: handlerightIputsChange,
      intputName: "clientname",
      label: "Client Name",
      type: "text",
    },
    {
      handleChange: handlerightIputsChange,
      intputName: "projectdetails",
      label: "Project Details",
      type: "text",
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
      type: "text",
    },
    {
      handleChange: handlerightIputsChange,
      intputName: "startdate",
      label: "Start date",
      type: "text",
    },
  ];
  const handleDelete = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the main div
    alert("You clicked delete!");
  };

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
           {/* <Box
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
          </Box>  */}

          <Box
         
          >
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
        handleChange={(e) => handleInputChange(index, e.target.value)} // Pass index and value
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
          <Box sx={{display:'flex', gap:2}}>

          {leftArrOfInputs.slice(0,1).map((input, index) => (
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


          <Box sx={{display:'flex', gap:2}}>

          {leftArrOfInputs.slice(1,3).map((input, index) => (
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

          
          <Box sx={{display:'flex', gap:2}}>

          {leftArrOfInputs.slice(3,4).map((input, index) => (
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



          <Box sx={{display:'flex', gap:2}}>

          {leftArrOfInputs.slice(4).map((input, index) => (
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



          <Box sx={{
            display:"flex",
            justifyContent:"flex-end"
          }}>

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
            {data.map((data, index) => (
              <Grid
                md={4}
                item
                key={index}
                sx={{
                  mx: "auto",
                  px: "10px",
                  py: 1,
                }}
              >
                <ProductInputCard
                  // handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  heading={data.heading}
                  image={data.img}
                  qty={data.qty}
                  unit={data.unit}
                  rate={data.rate}
                  amount={data.amount}
                />
              </Grid>
            ))}
          </Box>
        </Box>
      </Box>
      {/* <p className="added-item"> Added Items</p> */}
{/* there are table data for the pdf  */}
      <table align="center" ref={tableRef} style={{ display: "none" }}>
        <thead>
          <tr>
            <th>SL NO</th>
            <th>SCOPE OF WORK</th>
            <th>SPECIFICATIONS</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item, index) => (
            <>
              <tr>
                <td rowspan="4">{index + 1}</td>
                <td rowspan="4">{item.productname}</td>
                <td>{item.description}</td>
                <td>{item.amount}</td>
              </tr>
              <tr>
                <td>hardware</td>
                <td>{item.hardware}</td>
              </tr>
              <tr>
                <td>installation</td>
                <td>{item.installation} </td>
              </tr>
              <tr>
                <td>accessories</td>
                <td>{item.accessories}</td>
              </tr>
            </>
          ))}
          <tr>
            <td colspan="3" style={{ textAlign: "end" }}>
              TOTAL
            </td>
            <td>
              {/* Calculate the total */}
              {formData.reduce(
                (acc, curr) =>
                  acc +
                  parseInt(curr.amount) +
                  parseInt(curr.hardware) +
                  parseInt(curr.installation) +
                  parseInt(curr.accessories),
                0
              )}
            </td>
          </tr>
        </tbody>
      </table>

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
          onClick={handleDownloadPdf}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}

export default QuotationGeneratorPage;
