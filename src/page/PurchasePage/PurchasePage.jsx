import SalesTable from "../../components/SalesTable/SalesTable";
import "./PurchasePage.scss";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import InputComponent from "../../components/InputComponent/InputComponent";
import {
  clientDataGetAPI,
  countryOptionsGetAPI,
  createPartyAPI,
  createPurchaseAPI,
  partyDataGetAPI,
  productGetAPI,
} from "../../service/api/admin";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
function PurchasePage() {
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null); // State to hold selected product
  const [totalValues, setTotalValues] = useState([]);
  const [inputData, setInputData] = useState(0);
  const [rows, setRows] = useState([]);
  const [partyOptions, setPartyOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product

  const [tableRows, setTableRows] = useState([]); // State to hold table rows
  const [inputValue, setInputValue] = useState(""); // State to hold the value of the new input
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("none");
  const [selectedCustomer, setSelectedCustomer] = useState("none");
  const [selectedParty, setSelectedParty] = useState("none");

  const [contryOptions, setContryOptions] = useState([]);
  const [countryValue, setCountryValue] = useState(""); // State to hold the value of the new input

  const [partydataData, setPartyData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address1: "",
    address2: "",
    postalCode: "",
  });

  // Function to handle input change for all fields
  const handlePartyFormChange = (e) => {
    const { name, value } = e.target;
    setPartyData({ ...partydataData, [name]: value });
  };

  const handleAddParty = () => {
    const data = {
      name: partydataData.name,
      phonenumber: partydataData.phoneNumber,
      email: partydataData.email,
      address1: partydataData.address1,
      address2: partydataData.address2,
      country: parseInt(countryValue),
      postalCode: partydataData.postalCode,
    };
    console.log(data);
    createPartyAPI(data)
      .then((data) => {
        console.log(data);

        setOpen(false)
        setPartyData({
          name: "",
          phoneNumber: "",
          email: "",
          address1: "",
          address2: "",
          postalCode: "",
        })


      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    countryOptionsGetAPI()
      .then((data) => {
        // console.log("country:", data);

        const countryData = data.map((entry) => ({
          value: entry.id,
          label: entry.name,
        }));
        setContryOptions(countryData);
      })
      .catch((err) => {
        console.log(err);
      });

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

    clientDataGetAPI()
      .then((data) => {
        console.log("clientData:", data);
        // setTaxOptions(data);

        // Transform data and set it to state
        const partyData = data.responseData.map((entry) => ({
          value: entry.id,
          label: entry.name,
        }));
        console.log(partyData);
        setClientOptions(partyData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to handle changes in the new input value
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionSelect = (e) => {
    console.log(e.target.value);

    setSelectedCustomer(e.target.value);
    // Handle selection of other options
  };
  const handlePartySelect = (e) => {
    console.log(e.target.value);
    const selectedOption = e.target.value;
    if (selectedOption === "addNew") {
      setOpen(true);
    } else {
      setOpen(false);
      setSelectedParty(e.target.value);
      // Handle selection of other options
    }
  };

  // const getArrayFromLocalStorage = () => {
  //   const storedArray = localStorage.getItem('products');
  //   if (storedArray) {
  //     setMyArray(JSON.parse(storedArray));
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await productGetAPI();
      const products = response.responseData;
      const productNames = products.map((product) => product.name);
      const options = productNames.map((name, index) => ({
        value: `option${index + 1}`,
        label: name,
      }));
      setProductOptions(options);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const calculateItemTotal = (item) => {
      const { qty, rate, amountafterdescount, tax } = item;
      console.log(qty, rate, amountafterdescount, tax);
      const total = qty * rate - (amountafterdescount || 0) + (tax || 0);
      console.log(total);
      return total;
    };
    const itemTotals = rows.map(calculateItemTotal);
    const grandTotal = itemTotals.reduce((acc, curr) => acc + curr, 0);

    setTotalValues(grandTotal);
  }, [rows]);

  const handleSelectedProductChange = async (event, newValue) => {
    if (!newValue) {
      // Handle the case where newValue is not defined
      return;
    }

    setSelectedProduct(newValue);

    if (newValue) {
      console.log(newValue.label);
      // Set the amount based on the selected product
      const response = await productGetAPI();
      console.log(response);
      const products = response.responseData;

      const selectedProductData = products.find(
        (product) => product.name === newValue?.label
      );
      console.log(selectedProductData);
      setSelectedProductDetails(selectedProductData);
      console.log(selectedProductData);
      // Add selected product to the table rows
      const newRow = {
        id: 1,
        itemName: selectedProductData.name,
        qty: 1, // You can set default quantity here
        unit: selectedProductData.unit, // Assuming selectedProductData has a unit property
        price: selectedProductData.price, // Assuming selectedProductData has a price property
        discount: 0, // Assuming default discount is 0
        taxApplied: 0, // Assuming default tax applied is 0
        total: selectedProductData.price, // Assuming total is initially equal to price
      };
      setTableRows([...tableRows, newRow]);
    }
  };
  const handleChangeAmout = (e) => {
    setInputData(e.target.value);
  };
  const handleClose = () => setOpen(false);

  const hanldecountrychange = (e) => {
    setCountryValue(e.target.value);
    console.log(e.target.value);
  };

  const addPartyInputArrat = [
    {
      handleChange: handlePartyFormChange,
      intputName: "name",
      label: "Name",
      type: "text",
    },
    {
      handleChange: handlePartyFormChange,
      intputName: "phoneNumber",
      label: "Phone number",
      type: "text",
    },
    {
      handleChange: handlePartyFormChange,
      intputName: "email",
      label: "Email",
      type: "text",
    },
    {
      handleChange: handlePartyFormChange,
      intputName: "address1",
      label: "Address1",
      type: "text",
    },
    {
      handleChange: handlePartyFormChange,
      intputName: "address2",
      label: "Address2",
      type: "text",
    },
    {
      handleChange: hanldecountrychange,
      intputName: "country",
      label: "country",
      type: "text",
      inputOrSelect: "select",
      option: contryOptions,
    },
    {
      handleChange: handlePartyFormChange,
      intputName: "postalCode",
      label: "Pin code",
      type: "text",
    },
  ];
  const handleAddVoucher = async () => {
    const newArray = await rows.map((item) => ({
      product_id: item.id,
      quantity: item.qty,
      Price: item.qty * item.rate,
      discount: item.amountafterdescount,
    }));
    const salesVoucher = {
      credit_sale: false,
      payment_type: selectedOption === "cash" ? 5 : 10,
      billing_address: "",
      customer: parseInt(selectedCustomer),
      party: parseInt(selectedParty),
      total: parseFloat(totalValues),
      product_details: newArray,
    };

    console.log(salesVoucher);
    console.log(rows);
    createPurchaseAPI(salesVoucher)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="sales-table-container">
      <Box sx={{ width: "75%", mx: 1 }}>
        <Box sx={{ width: "100%", marginBottom: "10px" }}>
          <p className="product-name">products</p>

          <Autocomplete
            sx={{
              display: "inline-block",
              "& input": {
                width: "100%",
                border: "none",
                bgcolor: "var(--inputbg-color)",
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.background.paper),
              },
            }}
            id="custom-input-demo"
            options={productOptions}
            value={selectedProduct}
            onChange={handleSelectedProductChange}
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
                  style={{ height: "10xp" }}
                />
              </div>
            )}
          />
        </Box>
        <div style={{ overflow: "auto" }}>
          <Box>
            <SalesTable
              selectedProductData={selectedProductDetails}
              totalValues={totalValues}
              rows={rows}
              setRows={setRows}
            />{" "}
            {/* Pass tableRows as props to SalesTable */}
          </Box>
        </div>
      </Box>
      <Box
        sx={{
          border: "1px solid #bbbdbf",
          width: "30%",
          mt: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            margin: "2px",
            p: "3px",
            borderRadius: 1,
            border: "1px solid #bbbdbf",
          }}
        >
          <p className="head-p-tag">Clinet Details</p>
          <select style={{ width: "100%" }} onChange={handleOptionSelect}>
          <option value="" label="None">
                  None
                </option>
            {clientOptions.map((option, index) => {
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
          }}
        >
          <p className="head-p-tag">party Details</p>
          <select style={{ width: "100%" }} onChange={handlePartySelect}>
            <option value="select">Select</option>

            <option value="addNew">Add New</option>

            {partyOptions.map((option, index) => {
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
            height: "42%",
          }}
        >
          <p className="head-p-tag">Bill Details</p>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <p>sub Total:</p>
            <p> &#8377; {totalValues}</p>
          </Box>
          <hr
            style={{
              margin: "8px",
              color: "#bbbdbf",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="head-p-tag">
              Total amount :
              {/* <span style={{fontWeight:"lighter", fontSize:"12px"}}>(items:2,Quantity:2)</span>: */}
            </p>
            <p> &#8377; {totalValues}</p>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: 1,
              alignItems: "center",
            }}
          >
            <p>Payment Method:</p>
            <select
              style={{ width: "50%" }}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="none" label="None"></option>
              <option value="cash" label="Cash"></option>
              <option value="upi" label="UPI"></option>
            </select>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 1,
            }}
          >
            <p>Amount Received:</p>
            <FormControl
              sx={{
                my: 1,
                width: "50%",
                background: "#F3F6F9",
                borderRadius: 2,
              }}
            >
              <OutlinedInput
                onChange={handleChangeAmout}
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
          <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
            <p>Change to Return:</p>
            <p>&#8377;{totalValues - inputData}</p>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              bgcolor: "var(--black-button)",
              "&:hover": {
                background: "var(--button-hover)",
              },
            }}
            onClick={handleAddVoucher}
          >
            Save and Print Bill
          </Button>
        </Box>
      </Box>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <h4> Add new Party</h4>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
                gap: 1,
              }}
            >
              {addPartyInputArrat.map((data, index) => (
                <InputComponent
                  key={index}
                  label={data.label}
                  intputName={data.intputName}
                  type={data.type}
                  value={partydataData[data.intputName]}
                  handleChange={data.handleChange}
                  inputOrSelect={data.inputOrSelect}
                  options={data.option}
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
                onClick={handleAddParty}
              >
                Add party
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default PurchasePage;
