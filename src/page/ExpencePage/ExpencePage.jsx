import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Modal,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import "./ExpencePage.scss";
import { useEffect, useState } from "react";
import InputComponent from "../../components/InputComponent/InputComponent";
// import TransactionTable from "../../components/TransactionTable/TransactionTable";
import {
  expenceGetAPI,
  expensesDataAddAPI,
  expensesTypeAddAPI,
 
  partyDataGetAPI,
 
  projectGetAPI,
} from "../../service/api/admin";
import ImageAdd from "../../assets/sideBar/ImageAdd.svg";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import ExpenceTable from "../../components/ExpenceTable/ExpenceTable";

function ExpencePage() {

  const [rows, setRows] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected products



  const [description, setDescription] = useState("");
  const [imgExpense, setImgExpense] = useState(null);
  const [roundOff, setRoundOff] = useState(0);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState(false);
  const [expenseOPtions, setExpenseOPtions] = useState([]);
  const [selectedExpence, setSelectedExpence] = useState({});
  const [selectedParty, setSelectedParty] = useState({});

  const [open, setOpen] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState("");

  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenetype, setExpenetype] = useState("None");
  const [paymentSelect, setPaymentSelect] = useState(0);
  const [expenceNo, setExpenceNo] = useState("");
    // const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product
    const [partyOptions, setPartyOptions] = useState([]);



  const handlepaymenttype = (e) => {
    setPaymentSelect(e.target.value);
  };

  const handleExpenseCategoryChange = (e) => {
    setExpenseCategory(e.target.value);
  };

  const handleExpenetypeChange = (e) => {
    setExpenetype(e.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "0px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgExpense(file);
  };

  const handleRoundOffChange = (e) => {
    setRoundOff(e.target.value);
  };

  const handleTotalChange = (e) => {
    setTotal(e.target.value);
  };





 

  const expenceGetAPIGET = () => {
    // Make both API calls concurrently
    Promise.all([expenceGetAPI(), projectGetAPI()])
      .then(([expenceDataResponse, projectDataResponse]) => {
        console.log("expenceGetAPI", expenceDataResponse);
        console.log("projectGetAPI", projectDataResponse);

        // Process expense data
        const expenceData = expenceDataResponse.responseData.map((entry) => ({
          value: entry.id,
          label: entry.name,
          isProjectExpance: false,
        }));

        // Process project data
        const projectData = projectDataResponse.responseData.map((entry) => ({
          value: entry.id,
          label: entry.name,
          isProjectExpance: true,
        }));

        // Combine both datasets
        const combinedData = [...expenceData, ...projectData];

        // Add additional options
        combinedData.unshift({ value: -2, label: "Add" });
        combinedData.unshift({ value: -1, label: "None" });

        // Update state
        setExpenseOPtions(combinedData);
      })
      .catch((err) => {
        console.log(err);
        // In case of an error, set the default options
        setExpenseOPtions([
          { value: -1, label: "None" },
          { value: -2, label: "Add" },
        ]);
      });
  };

  useEffect(() => {
    expenceGetAPIGET();
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
      partyData.unshift({ value: -2, label: "None" })

      setPartyOptions(partyData);
    })
    .catch((err) => {
      console.log(err);
    });

   
  }, []);

  const inputformodal = [
    {
      handleChange: handleExpenseCategoryChange,
      inputName: "expensecategory",
      label: "Expense Category",
      type: "text",
    },
    {
      handleChange: handleExpenetypeChange,
      inputName: "expenetype",
      label: "Expense Type",
      inputOrSelect: "select",
      options: [
        { value: "None", label: "None" },
        { value: "Indirect Expense", label: "Indirect Expense" },
        { value: "Direct Expense", label: "Direct Expense" },
      ],
    },
  ];




  const handleInvoiceDateChange = (e) => {
    setInvoiceDate(e.target.value);
  };

  const handleExpenceNoChange = (e) => {
    setExpenceNo(e.target.value);
  };
  const toprightinput = [
    {
      intputName: "expenseno",
      label: "Expense No",
      type: "text",
      handleChange: handleExpenceNoChange,
      // value: challanNo,
    },
    {
      handleChange: handleInvoiceDateChange,
      label: "Invoice Date",
      type: "date",
      // value: invoiceDate,
    },
  ];

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  const handleExpencename = (e) => {
    console.log("e.target", e.target.value === "-2");
    if (e.target.value === "-2") {
      handleOpen();
    }
    const selectedOptionObject = expenseOPtions.find(
      (option) => option.value == e.target.value
    );
    console.log("event.target", e.target.value, selectedOptionObject);

    setSelectedExpence({ selectedOptionObject });
  };

  const handlePartyName= (e) => {
    console.log("e.target", e.target.value === "-2");
    // if (e.target.value === "-2") {
    //   handleOpen();
    // }
   
    console.log("event.target", e.target.value);

    setSelectedParty( e.target.value );
  };

  const handleexpensesadd = () => {
    const expenses = {
      name: expenseCategory,
      type: expenetype,
    };
    expensesTypeAddAPI(expenses)
      .then((data) => {
        console.log(data);
        setExpenseCategory("");
        setExpenetype("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateReceipt = (row) => {
    const string = renderToString(
      <div id="recept-pdf">
        <div
          className="header-of-receipt"
          style={{ display: "flex", marginBottom: "30px", marginTop: "10px" }}
        >
          <img
            src="https://res.cloudinary.com/dczou8g32/image/upload/v1714668042/DEV/jw8j76cgw2ogtokyoisi.png"
            alt="logo"
            style={{ height: "50px" }}
          />
          <div
            className="address"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              marginLeft: "25px",
            }}
          >
            <h5 style={{ fontSize: "13px", width: "300px" }}>
              BILTREE FY204-25
            </h5>
            <p style={{ fontSize: "13px", width: "300px" }}>
              54/3175, MANGHAT ARCADE <br /> 1ST FLOOR, KALOOR-KADAVANTHRA ROAD{" "}
              <br /> ERANAKLAM
            </p>
            <p style={{ fontSize: "13px", width: "300px" }}>
              StateName:Kerala, Code:32
            </p>
            <p style={{ fontSize: "13px", width: "300px" }}>
              E-Mail:info@biltree.in
            </p>
          </div>
        </div>
        <h5
          className="resceipt-text"
          style={{ fontSize: "13px", width: "600px", textAlign: "center" }}
        >
          Receipt voucher
        </h5>
        <div
          className="date-no"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "950px",
          }}
        >
          <p style={{ fontSize: "13px", width: "600px", marginLeft: "10px" }}>
            No:{expenceNo}
          </p>
          <p style={{ fontSize: "13px", width: "600px" }}>
            Date:{new Date(invoiceDate)?.toLocaleDateString()}
          </p>
        </div>

        <div>
          <div
            style={{
              marginTop: "20px",
              width: "950px",
              marginLeft: "10px",
              display: "flex",
            }}
          >
            <div style={{ width: "300px", borderRight: "1px solid" }}>
              <hr style={{ width: "300px" }} />
              <p style={{ marginLeft: "20px" }}>Particulars</p>
              <hr style={{ width: "300px" }} />
              <p style={{ fontSize: "13px", width: "600px" }}>{rows[0].item}</p>
              <p style={{ fontSize: "13px", width: "600px" }}>gst</p>
              <p style={{ fontSize: "13px", width: "600px" }}>gst</p>

              <p
                style={{ marginLeft: "20px", fontSize: "13px", width: "600px" }}
              >
                {row?.party_id}
              </p>
            </div>
            <div
              style={{
                width: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ borderRight: "1px solid black" }}>
                  <hr style={{ width: "135px" }} />
                  <p style={{ marginLeft: "20px", textAlign: "end" }}>
                    Debit
                  </p>
                  <hr style={{ width: "135px" }} />
                </div>
                <div>
                  <hr style={{ width: "135px" }} />
                  <p style={{ marginLeft: "20px", textAlign: "end" }}>Credit</p>
                  <hr style={{ width: "135px" }} />
                </div>
              </div>
<div  style={{
                width: "50%",
                display: "flex",
                justifyContent: "space-between",
              }}>

              <div
                style={{
                  display: "flex",
                  flexDirection:"column",
                  borderRight: "1px solid black",
                  height: "200px",
                  width: "350.5px",
                  textAlign:"end"
                }}
              >
                <p>2250</p>
                <p>202.50</p>
                <p>202.50</p>
              </div>
              <div
                style={{
                  display: "flex",
                  // borderRight: "1px solid black",
                  height: "20px",
                  width: "136.5px",
                }}
              >
                <p>2655</p>
              </div>
</div>

              <div>
                <hr style={{ width: "270px" }} />
                <div style={{ display: "flex",marginLeft:"100px"}}> 

                <p style={{ margin:"0px" }}>
                  2566
                </p>
                <p style={{ marginLeft:"100px" }}>
                  2566
                </p>
                </div>
                <hr style={{ width: "270px", marginTop:"10px"}} />
              </div>
            </div>
          </div>
          <p
            className="resceipt-text"
            style={{
              fontSize: "13px",
              width: "580px",
              textAlign: "end",
              marginTop: "90px",
            }}
          >
            Authorised Signatory
          </p>
          <div style={{ display: "flex", width: "580px", marginTop: "20px" }}>
            <p style={{ marginLeft: "20px", fontSize: "13px", width: "580px" }}>
              Prepared by
            </p>
            <p
              style={{ fontSize: "13px", width: "580px", textAlign: "center" }}
            >
              Checked by
            </p>
            <p style={{ fontSize: "13px", width: "580px", textAlign: "end" }}>
              Verified by
            </p>
          </div>
        </div>
      </div>
    );

    const pdf = new jsPDF("p", "pt", "a4", true);
    pdf.html(string, {
      callback: () => {
        const blobURL = pdf.output("bloburl");
        window.open(blobURL, "_blank");
      },
    });
  };

  const handleExpenseAdd = async () => {
    // Transform the rows array
    const newArray = rows.map(item => ({
      party_id:item.item,
      unit_id:item.unit,
      quantity: item.qty,
      rate: item.price,
      discount: item.discount,
      tax_rate_id:`${item.taxId}`,
      taxvalueinpercentage: item.taxvalueinpercentage?.replace("%", "")
    }));
  
    
    console.log(rows,selectedParty)
  
    const formData = new FormData();
    formData.append('project_id', selectedExpence.selectedOptionObject.value);
    formData.append('party_id', selectedParty);
    formData.append('expenses_category_id', selectedExpence.selectedOptionObject.value);
    formData.append('is_project_expense', selectedExpence.selectedOptionObject.isProjectExpance);
    formData.append('date', invoiceDate);
    formData.append('payment_type', paymentSelect);
    formData.append('description', description);
    formData.append('serial_no', expenceNo);
    formData.append('expenses', JSON.stringify(newArray));

    console.log(formData)
  
    expensesDataAddAPI(formData)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  


  return (
    <div className="expence-page">
      <div style={{ display: "flex" }}>
        <h2>Expense</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            marginLeft: "20px",
          }}
        >
          <h4>GST</h4>
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ ml: 2 }}
                checked={checked}
                onChange={handleChange}
              />
            }
          />
        </div>
      </div>
      <div className="inner-section">
        <div className="top-section">
          <div style={{ display:"flex",gap:"10px" }}>
          <InputComponent
              label="Expense Category"
              handleChange={handleExpencename}
              // intputName={input.intputName}
              inputOrSelect="select"
              // value={input.value}
              options={expenseOPtions}
            />
            <InputComponent
              label="Party"
              handleChange={handlePartyName}
              // intputName={input.intputName}
              inputOrSelect="select"
              // value={input.value}
              options={partyOptions}
            />
          
          </div>

          <div className="rightinputs">
            {toprightinput.map((input, index) => {
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
                  options={input.options}
                />
              );
            })}
          </div>
        </div>

        <div className="middle-section">
          
          <ExpenceTable rows={rows} setRows={setRows} setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct} />
        
        </div>
        <div className="bottom-section">
          <div>
            <div style={{ paddingBottom: "10px" }}>
              <InputComponent
                intputName="paymenttype"
                label="Payment type"
                inputOrSelect="select"
                handleChange={handlepaymenttype}
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
                paddingBottom: "10px",
              }}
            >
              <label style={{ fontSize: "12px" }} htmlFor="descriptiontextarea">
                Description
              </label>
              <textarea
                id="descriptiontextarea"
                value={description}
                onChange={handleDescriptionChange}
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
                  paddingLeft: 1,
                }}
              >
                Add Photo
              </Typography>
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              width: "40%",
            }}
          >
            <InputComponent type="checkbox" />
            <InputComponent
              label="Round off"
              type="number"
              intputName="roundoff"
              value={roundOff}
              onChange={handleRoundOffChange}
            />
            <InputComponent
              label="total"
              type="number"
              intputName="total"
              value={total}
              onChange={handleTotalChange}
            />
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
            onClick={handleCreateReceipt}
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
            onClick={handleExpenseAdd}
          >
            Save
          </Button>
        </div>
      </div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <h4>Add Expense Category</h4>
            <div
              style={{
                width: "95%",
                display: "flex",
                gap: "20px",
                flexDirection: "column",
              }}
            >
              {inputformodal.map((input, index) => (
                <InputComponent
                  key={index}
                  label={input.label}
                  type={input.type}
                  handleChange={input.handleChange}
                  inputName={input.inputName}
                  inputOrSelect={input.inputOrSelect}
                  // value={formState.expensecategory}
                  options={input.options}
                />
              ))}
            </div>
            <div
              style={{ display: "flex", justifyContent: "end", width: "100%" }}
            >
              <Button
                variant="contained"
                sx={{
                  height: 40,
                  my: 2,
                  marginRight: 2,
                  textTransform: "none",
                  bgcolor: "var(--black-button)",
                }}
                onClick={handleClose}
              >
                Cancel
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
                onClick={() => {
                  handleexpensesadd();
                  expenceGetAPIGET();
                  handleClose();
                }}
              >
                Save
              </Button>
            </div>
          </div>{" "}
        </Box>
      </Modal>
    </div>
  );
}

export default ExpencePage;