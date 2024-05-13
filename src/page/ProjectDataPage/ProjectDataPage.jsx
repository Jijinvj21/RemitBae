import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProjectDataPage.scss";
import { Box, Modal, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { projectDataByIdAPI ,quotationGetAPI } from "../../service/api/admin";
import jsPDF from "jspdf";
import "jspdf-autotable";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function ProjectDataPage() {
  const [toggle, setToggle] = useState(true);
  const [projectData, setProjectData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0); // State to hold the total amount
  const [quotationGetData, setQuotationGetData] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();

  useEffect(() => {

    quotationGetAPI({ id: location?.state }).then((data)=>{
console.log("location",data.data.responseData[0])
setQuotationGetData(data.data.responseData)
    })
    .catch((err)=>{
      console.log(err)
    }
    )



    projectDataByIdAPI({ id: location?.state })
      .then((data) => {
        setProjectData(data.data.responseData);
        // Calculate total amount when project data is fetched
        const totalWithoutTax = data.data.responseData?.transaction.reduce(
          (acc, curr) =>
            acc + (curr.amount - (curr.igst + curr.cgst + curr.sgst)),
          0
        );
        const total = data.data.responseData?.transaction.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );
        setTotalAmount(toggle ? total : totalWithoutTax);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location, toggle]);
  const quotatiaddress = "BILTREE -1ST FLOOR MANGHAT ARCADE,  ";
  const phone = "PHONE: +91 9447519770 ";
  const width = 405;
  const padding = 20;
  const maxWidth = width - 2 * padding;
  const locmaxWidth = 1000 - 2 * padding;
  const generatePDF = () => {
    const pdf = new jsPDF("p", "pt", "a4", true);
    const imageWidth = 200; // Width in millimeters

    const imageHeight = 100; // Height in millimeters
    pdf.addImage(
      "https://res.cloudinary.com/dczou8g32/image/upload/v1714668042/DEV/jw8j76cgw2ogtokyoisi.png",

      15,
      0,
      imageWidth, // Width
      imageHeight // Height
    );
    pdf.setFontSize(10);

    pdf.text(quotatiaddress, 333, 50, { locmaxWidth, lineHeightFactor: 1.5 });
    pdf.text("KALOOR KADAVANTRA ROAD, ", 390, 65, {
      locmaxWidth,
      lineHeightFactor: 1.5,
    });

    pdf.text(" KADAVANTRA -20", 448, 80, {
      locmaxWidth,
      lineHeightFactor: 1.5,
    });

    pdf.text(phone, 420, 100, { maxWidth, lineHeightFactor: 1.5 });

    pdf.autoTable({
      head: [
        [
          "ID",
          "Data",
          "particular",
          toggle && "IGST",
          toggle && "CGST",
          toggle && "SGST",
          "Total",
        ],
      ],
      body: projectData?.transaction.map((val, i) => [
        i + 1,
        new Date(val.date).toLocaleDateString(),
        val.particular,
        toggle ? val.igst : "0", 
        toggle ? val.cgst : "0",
        toggle ? val.sgst : "0", 
        toggle
          ? val.amount
          : val.amount - (val.igst + val.cgst + val.sgst),
      ]),
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 100 },
        2: { cellWidth: 100 },
        3: { cellWidth: 50 },
        4: { cellWidth: 50 },
        5: { cellWidth: 50 },
        6: { cellWidth: 50 },
      },
      theme: "grid",
      headStyles: {
        fillColor: "black",
        textColor: "white",
        halign: "center",
      },
      margin: { top: 120, left: 40 },
    });

    const blobURL = pdf.output("bloburl");
    window.open(blobURL, "_blank");
  };


  // Function to convert table data to CSV format
// Function to convert table data to CSV format
// Function to convert table data to CSV format
// Function to convert table data to CSV format
const convertTableToCSV = () => {
  let csv = [];
  // Header row
  let headerRow = ["ID", "Date", "Particular", "IGST", "CGST", "SGST", "Total"];
  csv.push(headerRow.join(","));
  // Data rows
  projectData?.transaction.forEach((row, index) => {
    let date = new Date(row.date);
    let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    let rowData = [
      index + 1,
      formattedDate,
      row.particular,
      toggle ? row.igst : 0,
      toggle ? row.cgst : 0,
      toggle ? row.sgst : 0,
      toggle ? row.amount : row.amount - (row.igst + row.cgst + row.sgst)
    ];
    csv.push(rowData.join(","));
  });
  // Join rows with newline characters
  return csv.join("\n");
};



// Function to handle CSV download
const downloadCSV = () => {
  const csvContent = convertTableToCSV();
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "project_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Rest of your code

  return (
    <div className="projectDatapage-section">
      <div className="top-section">
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div className="data_show_card">
            <p>Quotation Cost</p>
            {quotationGetData && (
  <div className="quotation-data">
    {quotationGetData.map((quotation, index) => (
      <div key={index}>
        <p>{quotation.quote_amount}</p>
      </div>
    ))}
  </div>
)}
          </div>
          <div className="data_show_card">
            <p>Expence</p>
            <h6>{projectData?.total_expenses||0}</h6>
          </div>
          <div className="data_show_card">
            <p>Total</p>
            <h6>{totalAmount}</h6> {/* Display total amount */}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center",gap:"20px",paddingRight:"60px" }}>
          <div className="toggle_button ">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>With Tax</h4>
              <p>|</p>
              <h4>Without Tax</h4>
            </div>

            <ToggleButtonGroup
              value={toggle ? "true" : "false"}
              exclusive
              onChange={(e, value) => setToggle(value === "true")}
              aria-label="text alignment"
            >
              <ToggleButton
                value="true"
                aria-label="left aligned"
                sx={{
                  fontSize: "12px",
                  borderRadius: "35px",
                  width: "90px",
                  height: "35px",
                  textAlign: "center",
                  marginTop: "5px",
                  marginLeft: "10px",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "#8cdb7e",
                  },
                }}
              >
                <p>yes</p>
              </ToggleButton>
              <ToggleButton
                value="false"
                aria-label="centered"
                sx={{
                  fontSize: "12px",
                  borderRadius: "35px",
                  width: "90px",
                  height: "35px",
                  textAlign: "center",
                  marginTop: "5px",
                  marginLeft: "10px",
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: "#8cdb7e",
                  },
                }}
              >
                <p>no</p>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <button
            // className="data_show_card"
            style={{
              border: "none",
              cursor: "pointer",
              backgroundColor: "white",
            }}
            onClick={() => generatePDF()}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <SimCardDownloadOutlinedIcon style={{ fontSize: "40px" }} />
              <h6>Download</h6>
            </div>
          </button>


          <button
        // className="data_show_card"
        style={{
          border: "none",
          cursor: "pointer",
          backgroundColor: "white",
        }}
        onClick={downloadCSV}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <SimCardDownloadOutlinedIcon style={{ fontSize: "40px" }} />
          <h6>Download CSV</h6>
        </div>
      </button>




      <button
        // className="data_show_card"
        style={{
          border: "none",
          cursor: "pointer",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
            fontSize:"20px"
          }}
          onClick={handleOpen}
        >
          <h6 >view</h6>
        </div>
      </button>
        </div>
      </div>
      {projectData?.transaction ? (
        <div className="table">
          <TableContainer component={Paper} id="pdf-content">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>particular</TableCell>
                  {toggle && <TableCell>IGST</TableCell>}
                  {toggle && <TableCell>CGST</TableCell>}
                  {toggle && <TableCell>SGST</TableCell>}
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projectData?.transaction.map((row, index) => (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {new Date(row.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{row.particular}</TableCell>
                    {toggle && <TableCell>{toggle ? row.igst : 0}</TableCell>}
                    {toggle && <TableCell>{toggle ? row.cgst : 0}</TableCell>}
                    {toggle && <TableCell>{toggle ? row.sgst : 0}</TableCell>}
                    <TableCell>
                      {toggle
                        ? row.amount
                        : row.amount - (row.igst + row.cgst + row.sgst)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "10px" }}>
          <p>NO DATA</p>
        </div>
      )}

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <h4>Quotation</h4>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TableContainer component={Paper} id="pdf-content">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Completion Time</TableCell>
              <TableCell>Approved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotationGetData?.map((row, index) => (
              <TableRow key={index + 1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.project}</TableCell>
                <TableCell>
                  {new Date(row.start_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(row.completion_time).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {row.approved ? "Approved" : "Not Approved"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Box>
</Modal>

    </div>
  );
}

export default ProjectDataPage;
