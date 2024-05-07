import { Autocomplete, Box, Button, Typography } from "@mui/material";
import "./CreditNotePage.scss";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useState } from "react";
import ImageAdd from "../../assets/sideBar/ImageAdd.svg";
import { AiOutlineFileAdd } from "react-icons/ai";
import TransactionTable from "../../components/TransactionTable/TransactionTable";

function CreditNotePage() {
  const [partyOptions, setPartytOptions] = useState([]);
  const [textValue, setTextValue] = useState("");
  

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };
  const topleftsideinput = [
    {
      intputName: "receiptno",
      label: "Recipes No",
      type: "number",
    },
    {
      intputName: "invoiceno",
      label: "Invoice Number",
      type: "number",
    },
    {
      intputName: "invoicedate",
      label: "Invoice Date",
      type: "date",
    },
    {
      intputName: "data",
      label: "Date",
      type: "date",
    },
    {
      intputName: "stateofsupply",
      label: "State of supply",
      inputOrSelect: "select",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "Account", label: "Account" },
      ],
    },
  ];
  return (
    <div className="creaditnotepage">
      <h2>Creadit Note</h2>
      <div className="inner-section">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "20px",
          }}
        >
          <div
            className="top-section"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div className="right">
              <div style={{ display: "flex" }}>
                <div style={{ width: "100%", marginBottom: "10px" }}>
                  <p className="party-name">Party</p>

                  <Autocomplete
                    style={{
                      display: "inline-block",
                      "& input": {
                        width: "100%",

                        border: "none",
                        bgcolor: "var(--inputbg-color) !important",
                        color: (theme) =>
                          theme.palette.getContrastText(
                            theme.palette.background.paper
                          ),
                      },
                    }}
                    id="custom-input-demo"
                    options={partyOptions}
                    //   value={selectedProduct}
                    //   onChange={handleSelectedProductChange}
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
                          style={{ height: "41px" }}
                        />
                      </div>
                    )}
                  />
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    BAL: 63660
                  </p>
                </div>

                <InputComponent
                  label="Phone No"
                  type="tel"
                  intputName="phoneno"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ fontSize: "12px" }} htmlFor="textarea">
                  Billing Address
                </label>
                <textarea
                  id="textarea"
                  value={textValue}
                  onChange={handleTextChange}
                  rows={5} // Set the number of visible rows
                  cols={30} // Set the number of visible columns
                />
              </div>
            </div>
            <div className="left" style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{display:"flex", gap:10}}>

              {topleftsideinput.slice(0,2).map((input, index) => {
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
                </div>
                <div style={{display:"flex", gap:10}}>

              {topleftsideinput.slice(2,4).map((input, index) => {
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
                </div>
                <InputComponent
                    handleChange={topleftsideinput[0].handleChange}
                    state={topleftsideinput[0].state}
                    label={topleftsideinput[0].label}
                    type={topleftsideinput[0].type}
                    intputName={topleftsideinput[0].intputName}
                    inputOrSelect={topleftsideinput[0].inputOrSelect}
                    options={topleftsideinput[0].options}
                    />
            </div>
          </div>
          <div className="center-section">
            <TransactionTable />
          </div>
          <div
            className="bottom-section"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              className="left"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                gap: 1,
                alignItems: "flex-start",
              }}
            >
              <div>
                <InputComponent
                  intputName="paymenttype"
                  label="Payment type"
                  inputOrSelect="select"
                  options={[
                    { value: "None", label: "None" },
                    { value: "Cash", label: "Cash" },
                    { value: "UPI", label: "UPI" },
                  ]}
                />
              </div>
              

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ fontSize: "12px" }} htmlFor="textarea">
                  Description
                </label>
                <textarea
                  id="descriptiontextarea"
                  // value={textValue}
                  // onChange={handleTextChange}
                  rows={2} // Set the number of visible rows
                  cols={50} // Set the number of visible columns
                />
              </div>

              <Button
                disableRipple
                style={{
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
                  style={{
                    pl: 1,
                  }}
                >
                  Add Photo
                </Typography>
                <input
                  type="file"
                  hidden
                  // onChange={handleImageChange}
                />
              </Button>
            </div>
            <div
              className="right"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                gap: 1,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <InputComponent type="checkbox" />
                <InputComponent
                  label="Round off"
                  type="number"
                  intputName="roundoff"
                />
                <InputComponent
                  label="total"
                  type="number"
                  intputName="total"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <InputComponent type="checkbox" />
                <InputComponent
                  label="Paid amount"
                  type="number"
                  intputName="paidamount"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "45%",
                  fontWeight: 700,
                }}
              >
                <p>Balance:</p>
                <p>5284</p>
              </div>
            </div>
          </div>
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
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreditNotePage;
