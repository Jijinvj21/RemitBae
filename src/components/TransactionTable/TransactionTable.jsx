import { Box, Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react";
const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };
function TransactionTable() {
    const [rows, setRows] = useState([
        // { id: 0, item: "", qty: 0, unit: "", price: 0, discount: 0, tax: 0 },
       
      ]);
    
      // Calculate totals
      const calculateTotals = () => {
        const totals = rows.reduce((acc, row) => {
          for (const key in row) {
            if (key !== 'id' && !isNaN(row[key])) {
              acc[key] = (parseInt(acc[key]) || 0) + parseInt(row[key]);
            }
          }
          // Calculate the amount for each row based on qty, price, discount, and tax


          row.amount = row.qty?(row.qty * row.price) - row.discount + row.tax:row.price;

          
          acc.amount = (acc.amount || 0) + row.amount;
          acc.discountAmount = (acc.discountAmount || 0) + parseInt(row.discountamount||0);
          acc.taxValue = (acc.taxValue || 0) + parseInt(row.taxvalue||0);



          return acc;
        }, {});
        
        return { id: 'total', ...totals };
      };
    
      // Add a new row at the top with a random ID
      const addNewRow = () => {
        const newRow = { 
          id: Math.floor(Math.random() * 1000000), 
          item: '', 
          qty: 0, 
          price: 0, 
          discount: 0, 
          tax: null, 
          amount:0 , 
          unit: 'nos' 
        };
        setRows([...rows, newRow]);
      };
      // Handle cell edits
      const handleEdit = (newRow) => {
        const updatedRows = rows.map((row) => {
          if (row.id === newRow.id) {
            // Recalculate amount if qty, price, discount, or tax are edited
            if (
              row.qty !== newRow.qty ||
              row.price !== newRow.price ||
              row.discount !== newRow.discount ||
              row.tax !== newRow.tax
            ) {
              newRow.amount = (newRow.qty * newRow.price) - newRow.discount + newRow.tax;
              
            }
            return newRow;
          }
          return row;
        });
        console.log(updatedRows)
        setRows(updatedRows);
      };
      
      const handleDiscountPercentageChange = (id, e) => {
        const { name, value } = e;
        setRows(prevRows =>
          prevRows.map(row =>
            row.id === id ? { ...row, [name]: value } : row
          )
        );
      };
      
      const handleDiscountAmountChange = (id, e) => {
        const { name, value } = e;
        console.log(name)
        setRows(prevRows =>
          prevRows.map(row =>
            row.id === id ? { ...row, [name]: value } : row
          )
        );
      };
      
      const handleTaxValueChange = (id, e) => {
        const { name, value } = e;
        console.log(name)
        setRows(prevRows =>
          prevRows.map(row =>
            row.id === id ? { ...row, [name]: value } : row
          )
        );
      };
      
      const handleTaxPercentageChange = (id, e) => {
        const { name, value } = e;
        setRows(prevRows =>
          prevRows.map(row =>
            row.id === id ? { ...row, [name]: value } : row
          )
        );
      };
      
      
    const columns=[
        { field: 'id', headerName: 'id', hideable: false, flex: 1,renderCell: (params) => (
          params.row.id === 'total' &&
          <div style={{display:"flex"}}>
            <button onClick={addNewRow}>
              Add Row

            </button>
            <p>total</p>
          </div>
        )  },
        { field: 'item', headerName: 'Item', hideable: false, flex: 1, editable: true,renderCell: (params) => (
          params.row.id === 'total' && 
          "") },
        { field: 'qty', headerName: 'Qty', hideable: false, flex: 1, editable: true },
        { field: 'unit', headerName: 'Unit', hideable: false, flex: 1 },
        { field: 'price', headerName: 'Price', hideable: false, flex: 1, editable: true, renderHeader: () => (
            <div style={{ width: '100%', display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div>Price/Unit</div>
              <hr style={{ width: '100%' }} />
                <div style={{ fontWeight: 'bold', }}>without tax</div>
            </div>
          ),
},
        { field: 'discount', headerName: 'Discount', hideable: false, flex: 1, editable: false, renderHeader: () => (
            <div style={{ width: '100%', display:"flex",flexDirection:"column",}}>
              <div style={{display:"flex",justifyContent:"center"}}>
                <p>Discount</p>
              </div>
              <hr style={{ width: '100%' }} />
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold', }}>%</div>
                <div style={{ fontWeight: 'bold' }}>Amount</div>
              </div>
            </div>
          ),
          renderCell: (params) => (
            params.row.id === 'total' ? 
            <div>{params.row.discountAmount}</div> : 
            <div style={{ display: 'flex', justifyContent: "space-evenly",gap:5}}>
              <input
               style={{width:"100%", outline:"none",border:"none", height: "50px",paddingLeft:"5px", bgcolor: "transprant !imporatant" }}
                // style={{width:"100%"}}
                type="text"
                name="discountpercentage"
                value={params.row.discountpercentage}
                onChange={(e) => handleDiscountPercentageChange(params.row.id,  e.target)}
              />
              <input
               style={{width:"100%", outline:"none",border:"none", height: "50px",paddingLeft:"5px", bgcolor: "transprant !imporatant" }}
                // style={{width:"100%"}}
                type="text"
                name="discountamount"
                value={params.row.discountamount}
                onChange={(e) => handleDiscountAmountChange(params.row.id, e.target)}
              />
            </div>
          ), },
        { field: 'tax', headerName: 'Tax', hideable: false, flex: 1, renderHeader: () => (
            <div style={{ width: '100%', display:"flex",flexDirection:"column",}}>
              <div style={{display:"flex",justifyContent:"center"}}>
                <p>Tax</p>
              </div>
              <hr style={{ width: '100%' }} />
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold', }}>%</div>
                <div style={{ fontWeight: 'bold' }}>Amount</div>
              </div>
            </div>
          ),
          renderCell: (params) => (
            params.row.id === 'total' ? 
            <div>{params.row.taxValue}</div> : 
            <div style={{ display: 'flex', justifyContent: "space-evenly",gap:5}}>
              <input
               style={{width:"100%", outline:"none",border:"none", height: "50px",paddingLeft:"5px", bgcolor: "transprant !imporatant" }}
                // style={{width:"100%"}}
                type="text"
                name="taxpercentage"
                value={params.row.taxpercentage}
                onChange={(e) => handleTaxPercentageChange(params.row.id, e.target)}
              />
              <input
               style={{width:"100%", outline:"none",border:"none", height: "50px",paddingLeft:"5px", bgcolor: "transprant !imporatant" }}
                // style={{width:"100%"}}
                type="text"
                name="taxvalue"
                value={params.row.taxvalue}
                onChange={(e) => handleTaxValueChange(params.row.id, e.target)}
              />
            </div>
          ), },
        { field: 'amount', headerName: 'Amount', hideable: false, flex: 1 },
      ]
      
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
          <button onClick={addNewRow}>Add Row</button>

    <DataGrid
        rows={[...rows, calculateTotals()]}
        {...other}

        columns={columns}
      editMode="row"
      disableColumnMenu
    //   rowModesModel={rowModesModel}
    //   onRowModesModelChange={handleRowModesModelChange}
    //   onRowEditStop={handleRowEditStop}
      processRowUpdate={handleEdit}
    //   slotProps={{
    //     toolbar: { setRows, setRowModesModel },
    //   }}
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
  )
}

export default TransactionTable