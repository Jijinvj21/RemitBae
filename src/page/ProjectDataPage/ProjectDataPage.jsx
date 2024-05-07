import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProjectDataPage.scss";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
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
import { projectDataByIdAPI } from "../../service/api/admin";
import jsPDF from 'jspdf';
import "jspdf-autotable";



function ProjectDataPage() {
  const [toggle, setToggle] = useState(true);

  const [projectData, setProjectData] = useState({});

  const location = useLocation();

  useEffect(() => {
    console.log();
    projectDataByIdAPI({ id: location?.state })
      .then((data) => {
        console.log(data.data.responseData);
        setProjectData(data.data.responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);
  const headers = ["ID", "Data", "Particular", "IGST", "CGST", "SGST", "Total"];
  const rows =
    projectData?.transaction?.map((row, index) => [
      index + 1,
      row.date,
      row.particular,
      row.igst,
      row.cgst,
      row.sgst,
      row.amount,
    ]) || [];

   
    const generatePDF = () => {
      console.log("first");
      const pdf = new jsPDF('p', 'pt', 'a4', true);
      // const pdfElement = document.getElementById('pdf-content');
      
      pdf.autoTable({
        head: [["ID", "Data", "particular", "IGST", "CGST", "SGST","Total"]],
        body: projectData?.transaction.map((val, i) => [
          i + 1,
          val.date,
          val.particular,
          val.igst,
          val.cgst,
          val.sgst,
          val.amount
        ]),
        columnStyles: {
          0: { cellWidth: 100,  },
          1: { cellWidth: 100,  },
          2: { cellWidth: 100,  },
          3: { cellWidth: 50,  },
          4: { cellWidth: 50,  },
          5: { cellWidth: 50,  },
          6: { cellWidth: 50,  },
          7: { cellWidth: 50,  },

          
        },
        theme: "grid",
        headStyles: {
          fillColor: "black",
          textColor: "white",
          halign: "center",
        },

      });
    
      const blobURL = pdf.output('bloburl'); // Generate Blob URL
      window.open(blobURL, '_blank'); // Open Blob URL in new window
    };
    

  return (
    <div className="projectDatapage-section" >
      <div className="top-section">
        <div className="data_show_card">
          <p>Income</p>
          <h6>{projectData?.total_income}</h6>
        </div>
        <div className="data_show_card">
          <p>Expence</p>
          <h6>{projectData?.total_expenses}</h6>
        </div>
        <div className="data_show_card">
          <p>Total</p>
          <h6>10</h6>
        </div>

        <div className="toggle_button ">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>With Tax</h4>
            <h4>Without Tax</h4>
          </div>

          <ToggleButtonGroup
            value={toggle ? "true" : "false"} // Convert toggle state to string value
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
          className="data_show_card"
          style={{
            border: "1px solid",
            cursor: "pointer  ",
            background: "white !important",
          }}
          onClick={()=>generatePDF()}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <SimCardDownloadOutlinedIcon style={{ fontSize: "30px" }} />
            <h6>Download </h6>
          </div>
        </button>
      </div>
      {projectData?.transaction ? (
        <div className="table" >
          <TableContainer component={Paper} id="pdf-content">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>particular</TableCell>
                  <TableCell>IGST</TableCell>
                  <TableCell>CGST</TableCell>
                  <TableCell>SGST</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projectData?.transaction?.map((row, index) => (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.particular}</TableCell>
                    <TableCell>{row.igst}</TableCell>
                    <TableCell>{row.cgst}</TableCell>
                    <TableCell>{row.sgst}</TableCell>
                    <TableCell>{row.amount}</TableCell>
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
    </div>
  );
}

export default ProjectDataPage;
