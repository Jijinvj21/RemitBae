import SalesTable from "../../components/SalesTable/SalesTable";
import "./SalesPage.scss";
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function SalesPage() {
  return (
    <div className="sales-table-container">
      <Box sx={{ width: "75%", mx: 1 }}>
        <FormControl
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
        </FormControl>
        <Box>
          <SalesTable />
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
            height: "60%",
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


      </Box>
    </div>
  );
}

export default SalesPage;
