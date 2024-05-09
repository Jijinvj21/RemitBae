import { Autocomplete, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./PaymenyIn.scss";
import { useEffect, useState } from "react";
import InputComponent from "../../components/InputComponent/InputComponent";
import ImageAdd from "../../assets/sideBar/ImageAdd.svg";
import { useLocation } from "react-router-dom";
import { partyDataGetAPI, paymentDataGetAPI, paymentInAPI } from "../../service/api/admin";
import { generateRandom6Digit } from "../../utils/randomWithDate";
function PaymenyIn() {
  const location = useLocation();
  const [textValue, setTextValue] = useState("");
  const [img, setImg] = useState(null);
  const [partyOptions, setPartyOptions] = useState([]);
  const [partySelect, setPartySelect] = useState(0);
  const [paymentSelect, setPaymentSelect] = useState(0);
  const [date, setDate] = useState("");
  const [recived, setRecived] = useState("");
  const [ReceptNo, setReceptNo] = useState("");
  const [toggle, setToggle] = useState(true);
  const [paymentData, setPaymenData] = useState([]);



const getpaymentDataGetAPI=()=>{
  paymentDataGetAPI({payment_mode:toggle ?"IN":"OUT",project_id: 3}).then((data)=>{
    console.log(data.data.responseData)
    setPaymenData(data.data.responseData)
        })
        .catch((err)=>{
    console.log(err)
        })
}



  useEffect(() => {
    const currentDate = new Date();
    const random6Digit = generateRandom6Digit(currentDate);
    console.log(random6Digit);
    setReceptNo(random6Digit);

    getpaymentDataGetAPI()



  }, [toggle]);


  useEffect(() => {
    partyDataGetAPI()
      .then((data) => {
        console.log("partyData:", data);
        // setTaxOptions(data);

        // Transform data and set it to state
        const partyData = data.responseData.map((entry) => ({
          value: entry.id,
          label: entry.name,
        }));
        console.log(partyData);
        setPartyOptions(partyData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };
  const handleSetParty = (e, data) => {
    setPartySelect(data.value);
  };
  const handlepaymenttype = (e) => {
    setPaymentSelect(e.target.value);
  };
  const handleDate = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };
  const handleRecived = (e) => {
    console.log(e.target.value);
    setRecived(e.target.value);
  };

  const leftsideinput = [
    {
      intputName: "receiptno",
      label: "Recipes No",
      type: "text",
      value: ReceptNo,
      disabled: "disabled",
    },
    {
      handleChange: handleDate,
      label: "Date",
      type: "date",
    },
    {
      handleChange: handleRecived,
      intputName: "received",
      label: "Received",
      type: "number",
    },
  ];
  const handleSave = () => {
    const data = {
      date: date,
      payment_type: parseInt(paymentSelect),
      party_id: partySelect,
      project_id: 3,
      amount: parseInt(recived),
      payment_mode:toggle ?"IN":"OUT",
      description: textValue,
      ref_no: ReceptNo,
    };
    console.log(data);
    paymentInAPI(data)
      .then((data) => {
        console.log(data);

        getpaymentDataGetAPI()
        const currentDate = new Date();
    const random6Digit = generateRandom6Digit(currentDate);
    console.log(random6Digit);
    setReceptNo(random6Digit);
    setDate("")
    setPaymentSelect("")
    setPartySelect(0)
    setRecived("")
    setTextValue("")
    setTextValue("")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="payment-in-section">
      {toggle ? (
        <h2>Payment In</h2>
      ) : (
        <h2>Payment Out</h2>
      )}


<div className="toggle_button ">
        

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
                <p>IN</p>
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
                <p>Out</p>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>




      <div className="inner-section">
        <div style={{ display: "flex", gap: "84px", padding: "20px" }}>
          <Box sx={{ width: "50%" }}>
            <Box sx={{ width: "100%", marginBottom: "10px" }}>
              <p className="party-name">Party</p>

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
                options={partyOptions}
                //   value={selectedProduct}
                onChange={handleSetParty}
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
                      style={{ height: "38px" }}
                    />
                  </div>
                )}
              />
            </Box>
            {/* <p style={{ color: "red", fontSize: "12px", fontWeight: "600" }}>
              BAL: 63660
            </p> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: 1,
                alignItems: "center",
              }}
            >
              <InputComponent
                intputName="paymenttype"
                label="Payment type"
                inputOrSelect="select"
                handleChange={handlepaymenttype}
                options={[
                  { value: "None", label: "None" },
                  { value: "5", label: "Cash" },
                  { value: "23", label: "UPI" },
                ]}
              />
            </Box>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="textarea">Description</label>
              <textarea
                id="textarea"
                value={textValue}
                onChange={handleTextChange}
                rows={5} // Set the number of visible rows
                cols={50} // Set the number of visible columns
              />
            </div>
            <Button
              disableRipple
              sx={{
                mt: 2,
                textTransform: "none",
                color: "var(--black-button)",
                "&:hover": {
                  background: "transparent",
                },
              }}
              component="label"
            >
              <img src={ImageAdd} alt="add img" />

              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </Box>

          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
            className="leftsectioninputs"
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              {leftsideinput.slice(0, 2).map((input, index) => {
                return (
                  <InputComponent
                    key={index}
                    label={input.label}
                    type={input.type}
                    handleChange={input.handleChange}
                    intputName={input.intputName}
                    inputOrSelect={input.inputOrSelect}
                    value={input.value}
                    disabled={input.disabled}
                  />
                );
              })}
            </Box>
            <Box sx={{ width: "50%", marginTop: 10 }}>
              {leftsideinput.slice(2).map((input, index) => {
                return (
                  <InputComponent
                    key={index}
                    label={input.label}
                    type={input.type}
                    handleChange={input.handleChange}
                    intputName={input.intputName}
                    inputOrSelect={input.inputOrSelect}
                  />
                );
              })}
            </Box>
          </Box>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            sx={{
              height: 40,
              my: 2,
              marginRight: 2,
              textTransform: "none",
              bgcolor: "var(--black-button)",
            }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            sx={{
              height: 40,
              my: 2,
              marginRight: 2,
              textTransform: "none",
              bgcolor: "var(--black-button)",
            }}
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="table">
      <TableContainer component={Paper} id="pdf-content">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                   
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentData?.map((row, index) => (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                    <TableCell>{row.description}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                     
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </div>
    </div>
  );
}

export default PaymenyIn;
