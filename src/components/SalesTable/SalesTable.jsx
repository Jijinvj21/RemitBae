import * as React from "react";
import Box from "@mui/material/Box";

import { DataGrid, GridRowEditStopReasons } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Autocomplete } from "@mui/material";
import { gstOptionsGetAPI } from "../../service/api/admin";

export default function FullFeaturedCrudGrid({
  selectedProductData,
  totalValues,
  setTotalValues,
}) {
  // const [rows, setRows] = React.useState(initialRows);
  const [rows, setRows] = React.useState([]);

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [taxOptions,setTaxOptions]=React.useState([])


  const getTaxOptionsFormAPI = () => {
    gstOptionsGetAPI().then((data) => {
      console.log("tax:", data);
      // setTaxOptions(data);

      // Transform data and set it to state
      const transformedData = data.map(entry => ({
        value: entry.percentage,
        label: entry.name?`${entry.name} ${entry.percentage}` :"none",
        taxlabel: entry.percentage

      }));
      setTaxOptions(transformedData);
    }).catch((err) => {
      console.log(err);
    });
  }
  React.useEffect(() => {
    getTaxOptionsFormAPI()
  }, []);

  React.useEffect(() => {
    if (selectedProductData) {
      console.log(selectedProductData.taxrate?.label);
      const newRow = {
        id: randomId(),
        itemCode: selectedProductData.itemCode,
        name: selectedProductData.name,
        unit: selectedProductData.unit,
        rate: selectedProductData.rate,
        taxApplied: selectedProductData.taxrate?.label,
        qty: 1, // Set quantity to 1 every time a new product is selected
      };
      setRows((prevRows) => [...prevRows, newRow]);
    }
  }, [selectedProductData]);
  
  React.useEffect(() => {
    const updatedRows = rows.map((row) => {
        const quantity = parseInt(row.qty) || 0;
        const rate = parseInt(row.rate) || 0;
        const discount = parseFloat(row.discount) || 0;
        const taxApplied = parseFloat(row.taxApplied?.split("@")[1].replace("%", ""))  || 0;

        // Calculate total amount without tax
        const totalWithoutTax = quantity * rate;

        // Apply discount if applicable
        let discountedTotal = totalWithoutTax;
        if (quantity > 0 && discount > 0) {
            discountedTotal -= (totalWithoutTax * discount) / 100;
        }

        // Apply tax
        const totalWithTax = discountedTotal + (discountedTotal * taxApplied) / 100;

        return { ...row, total:row.amountafterdescount?row.amountafterdescount: totalWithTax };
    });

    // Update the rows with calculated totals
    setRows(updatedRows);

    // Sum up all totalWithTax values
    const totalWithTaxSum = updatedRows.reduce((sum, row) => sum + row.amountafterdescount?row.amountafterdescount: row.total, 0);

    // Update the total values
    setTotalValues(totalWithTaxSum);
}, []);//add rows in the array !important and check the error 




 


// const handleRowEditStop = (params, event) => {
//   if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//     event.defaultMuiPrevented = true;
//   }

//   const updatedRows = rows.map((row) => {
//     if (row.id === params.id) {
//       const quantity = parseInt(params.row.qty) || 0;
//       const rate = parseInt(params.row.rate) || 0;
//       const discount = parseFloat(params.row.discount) || 0;
//       const taxApplied =
//         parseFloat(params.row.taxApplied.split("@")[1].replace("%", "")) || 0;
//       console.log(quantity);
//       const totalWithoutTax = quantity * rate;
//       const discountedTotal =
//         quantity > 0 && discount > 0
//           ? totalWithoutTax - (totalWithoutTax * discount) / 100
//           : totalWithoutTax;
//       const totalWithTax =
//         discountedTotal + (discountedTotal * taxApplied) / 100;
//       setTotalValues(totalWithTax);
//       return { ...row, total: totalWithTax, qty: quantity }; // Update qty here
//     }
//     return row;
//   });

//   setRows(updatedRows);
// };


  const processRowUpdate = (newRow) => {
    console.log(newRow);
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleValueChange = (id, field, value) => {

    const updatedRows = rows.map(row => {
      const quantity = parseInt(row.qty) || 0;
        const rate = parseInt(row.rate) || 0;
      const totalWithoutTax = quantity * rate;

      if (row.id === id) {
        let updatedRow = { ...row, [field]: value };
        if (field === 'descountvalue') {
          // Calculate amount after discount
          console.log(totalWithoutTax)
          updatedRow.amountafterdescount = totalWithoutTax-((totalWithoutTax * value)/100);
        } else if (field === 'amountafterdescount') {
          // Calculate discount value
          updatedRow.descountvalue = 100-((value/totalWithoutTax )*100);
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const columns = [
    { field: "id", headerName: "Item Code", width: 60, editable: false },
    {
      field: "name",
      headerName: "Item Name",
      type: "number",
      width: 100,

      editable: false,
    },

    {
      field: "qty",
      headerName: "Qty",
      width: 50,
      editable: true,
      type: "number",
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 80,
      editable: false,
      type: "number",
    },
    {
      field: "rate",
      headerName: "rate",
      width: 80,
      editable: false,
      type: "number",
    },
    {
      field: "price",
      headerName: "price (without tax)",
      width: 120,
      editable: false,
      type: "number",
      renderHeader: () => (
        <div style={{ width: '100%', display:"flex",flexDirection:"column",}}>
          <div style={{display:"flex",justifyContent:"center"}}>
            <p>price</p>
          </div>
          <hr style={{ width: '100%' }} />
            <div style={{ fontWeight: 'bold' }}>(without tax)</div>
        </div>
      ),
      renderCell: (params) => {
        const quantity = parseInt(params.row.qty) || 0;
        const rate = parseInt(params.row.rate) || 0;
        const discount = parseFloat(params.row.discount) || 0;
        const taxrat = params.row.taxApplied;
    
        // Check if taxrat is a string before splitting
        const taxNumber = typeof taxrat === 'string' ? parseInt(taxrat.split("@")[1].replace("%", "")) : 0;
    
        // Calculate total without tax
        const totalWithoutTax = quantity * rate;
    
        let discountedTotal = quantity ? totalWithoutTax : rate;
    
        // Check if quantity is provided and discount is applicable
        if (quantity > 0 && discount > 0) {
          // Calculate discounted total
          discountedTotal = totalWithoutTax - (totalWithoutTax * discount) / 100;
        }
    
        // Calculate total with tax
        const totalWithTax = discountedTotal + (discountedTotal * taxNumber) / 100;
    
        return totalWithTax; // Display the total with tax
      },
    },
    
    {
      field: "discount",
      headerName: "Discount %",
      width: 180,
      editable: false,
      hideable: false,
      sortable: false,
      filterable: false,
      flex: 1,
      type: "number",
      renderHeader: () => (
        <div style={{ width: '100%', display:"flex",flexDirection:"column" }}>
          <div style={{margin:"auto"}}>Discount %</div>
          <hr style={{ width: '100%' }} />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-evenly' }}>
            <div >%</div>
            
            <div >Amount</div>
          </div>
        </div>
      ),
      renderCell: (params) => (
        <div style={{ display: 'flex',gap:10, justifyContent: "space-evenly"}}>
          <input
          
            style={{width:"100%",bgcolor:"transparent",outline:"none",border:"none",paddingBottom:"20px",paddingTop:"20px"}}
            type="text"
            value={params.row.descountvalue}
            onChange={(e) => handleValueChange(params.row.id, 'descountvalue', e.target.value)}
          />
          <input
          
            style={{width:"100%",bgcolor:"transparent",outline:"none",border:"none",paddingBottom:"20px",paddingTop:"20px"}}
            type="text"
            value={params.row.amountafterdescount}
            onChange={(e) => handleValueChange(params.row.id, 'amountafterdescount', e.target.value)}
          />
        </div>
      ),
     
    },
    {
      field: "taxApplied",
      headerName: "Tax Applied",
      width: 140,
      // editable: true,
      type: "text",
      // valueOptions: ["Credit card", "Wire transfer", "Cash"],
      renderCell: (params) => {
        const handleTaxChange = (event, newValue) => {
          const editedRow = { ...params.row, taxApplied: newValue };
          const updatedRows = rows.map((row) =>
            row.id === params.row.id ? editedRow : row
          );
          setRows(updatedRows);
          console.log(newValue);
        };

        console.log(params);
        return (
          <Autocomplete
            className="tabel-autocomplete"
            value={params.formattedValue}
            onChange={handleTaxChange}
            sx={{
              display: "inline-block",
              "& input": {
                width: "100%",
                fontSize: "14px",
                border: "none",
                bgcolor: "transprant",
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.background.paper),
              },
            }}
            id="custom-input-demo"
            options={taxOptions }
            componentsProps={{
              paper: {
                sx: {
                  width: 150,
                  fontSize: "14px",
                },
              },
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [-45, -20],
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
                  style={{ height: "10xp", bgcolor: "transprant !imporatant" }}
                />
              </div>
            )}
          />
        );
      },
    },
    {
      field: "total",
      type: "number",
      headerName: "Total",
      width: 120,
      renderCell: (params) => {
        // Calculate total based on quantity and rate
        const quantity = parseInt(params.row.qty) || 0;
        const rate = parseInt(params.row.rate) || 0;
        const discount= params.row.amountafterdescount||0
        console.log(parseFloat(params.row.taxApplied?.value.replace("%", "")));
        const tax=parseFloat(params.row.taxApplied?.value.replace("%", "")) ||0
        setTotalValues(((quantity * rate)-discount)+tax)
        return ((quantity * rate)-discount)+tax;
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        // width: '53.4%',
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
        background: "var(--bgwhite)",
        "& .MuiDataGrid-columnsContainer .": {
          borderRight: "1px solid rgba(224, 224, 224, 1)",
          // color: 'text.primary',
        },
        "&  .MuiDataGrid-cell": {
          borderRight: "1px solid rgba(224, 224, 224, 1)",
        },
        "&.MuiDataGrid-row": {
          borderBottomColor: "none",
        },
        "& .MuiDataGrid-columnHeader": {
          borderRight: "1px solid rgba(224, 224, 224, 1)",
        },
        "& .css-yrdy0g-MuiDataGrid-columnHeaderRow": {
          bgcolor: "#f3f6f9 !important",
        },
        "& .css-boxz2p-MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainerContent  ": {
          width:"100%",
        },
       
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        disableColumnMenu
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={{
          "& .MuiDataGrid-footerContainer": {
            display: "none !important",
          },
          "& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper ": {
            maxHeightheight: "calc(5% - 96px) !important",
          },
          
        }}
      />
    </Box>
  );
}
