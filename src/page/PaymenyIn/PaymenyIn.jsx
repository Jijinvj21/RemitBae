import { Autocomplete, Box, Button } from "@mui/material"
import "./PaymenyIn.scss"
import { useState } from "react";
import InputComponent from "../../components/InputComponent/InputComponent";
import ImageAdd from "../../assets/sideBar/ImageAdd.svg"

function PaymenyIn() {
    const [partyOptions, setPartytOptions] = useState([]);
    const [textValue, setTextValue] = useState('');
    const [img, setImg] = useState(null);

    const handleTextChange = (event) => {
        setTextValue(event.target.value);
      };
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
      };
      const leftsideinput=[{
        intputName: "receiptno",
        label: "Receipy No",
        type: "number",
      },
    {
      type: "date",
    },
    {
        intputName: "received",
        label: "Received",
        type: "number",
      },
    ]
  return (
    <div className="payment-in-section">
        <h2>Payment In</h2>
        <div className="inner-section">
            <div style={{display:"flex" ,gap: "84px",padding:"20px"}}>

<Box sx={{width:"50%"}}>

<Box sx={{ width: "100%",marginBottom:"10px" }}>
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
                    style={{ height: "38px" }}
                  />
                </div>
              )}
            />
          </Box>
          <p style={{color:"red", fontSize:"12px",fontWeight:"600"}}>BAL: 63660</p>
          <Box sx={{ display: "flex", justifyContent: "space-between",my:1,alignItems:"center" }}>
            <InputComponent 
            intputName="paymenttype"
            label="Payment type"
            inputOrSelect="select"
            options={[
                { value: 'None', label: 'None' },
                { value: 'Cash', label: 'Cash' },
                { value: 'UPI', label: 'UPI' }
              ]}

            />

          </Box>
             <div style={{
                display:"flex",
                flexDirection:"column"
             }}>
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
                mt:2,
              textTransform:"none",
              color:"var(--black-button)",
              "&:hover": {
                background: "transparent",
              },
            }}
            component="label"
            >
            
             <img src={ImageAdd} alt="add img"  />
            
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
</Box>





<Box sx={{width:"50%", display:"flex",flexDirection:"column"}} className="leftsectioninputs">
<Box sx={{width:"50%", display:"flex",flexDirection:"column", gap:5}}>
{
    leftsideinput.slice(0, 2).map((input, index) => {
        return (
          <InputComponent
            key={index}
            label={input.label}
            type={input.type}
            intputName={input.intputName}
            inputOrSelect={input.inputOrSelect}
          />
        );
      })}

</Box>
<Box sx={{width:"50%", marginTop:10 }} >
{
    leftsideinput.slice(2).map((input, index) => {
        return (
          <InputComponent
            key={index}
            label={input.label}
            type={input.type}
            intputName={input.intputName}
            inputOrSelect={input.inputOrSelect}
          />
        );
      })}

</Box>
</Box>
</div>
        <hr />
        <div style={{display:"flex",justifyContent:"end"}}>
            <Button  variant="contained"
          sx={{
            height: 40,
            my:2,
            marginRight: 2,
            textTransform: "none",
            bgcolor: "var(--black-button)",
          }}>
                Print
            </Button>
            <Button  variant="contained"
          sx={{
            height: 40,
            my:2,
            marginRight: 2,
            textTransform: "none",
            bgcolor: "var(--black-button)",
          }}>
                Save
            </Button>
        </div>
        </div>

    </div>
  )
}

export default PaymenyIn