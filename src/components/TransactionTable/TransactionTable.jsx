import { Box } from "@mui/material"
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
              acc[key] = (acc[key] || 0) + row[key];
            }
          }
          // Calculate the amount for each row based on qty, price, discount, and tax
          row.amount = (row.qty * row.price) - row.discount + row.tax;
          acc.amount = (acc.amount || 0) + row.amount;
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
          tax: 0, 
          amount:0 , 
          unit: 'nos' 
        };
        setRows([newRow, ...rows]);
      };
      // Handle cell edits
      const handleEdit = (newRow) => {
        console.log("first")
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
      
      const handleValueChange = (id, field, value) => {
        console.log(id, field ,value)
      }
      
    const columns=[
        { field: 'id', headerName: 'id', hideable: false, flex: 1 },
        { field: 'item', headerName: 'Item', hideable: false, flex: 1, editable: true },
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
            <div>{params.row.discount}</div> : 
            <div style={{ display: 'flex', justifyContent: "space-evenly",gap:5}}>
              <input
               style={{width:"100%", outline:"none",border:"none", height: "50px",paddingLeft:"5px", bgcolor: "transprant !imporatant" }}
                // style={{width:"100%"}}
                type="text"
                // value={params.row.discount}
                // onChange={(e) => handleValueChange(params.row.id, 'discount', e.target.value)}
              />
              <input
               style={{width:"100%", outline:"none",border:"none", height: "50px",paddingLeft:"5px", bgcolor: "transprant !imporatant" }}
                // style={{width:"100%"}}
                type="text"
                // value={params.row.amountafterdescount
                // onChange={(e) => handleValueChange(params.row.id, 'amountafterdescount', e.target.value)}
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
            <div>{params.row.tax}</div> : 
            <div style={{ display: 'flex', justifyContent: "space-evenly",gap:5}}>
              <input
               style={{width:"100%", outline:"none",border:"none", height: "50px",paddingLeft:"5px", bgcolor: "transprant !imporatant" }}
                // style={{width:"100%"}}
                type="text"
                // value={params.row.tax}
                // onChange={(e) => handleValueChange(params.row.id, 'tax', e.target.value)}
              />
              <input
               style={{width:"100%", outline:"none",border:"none", height: "50px",paddingLeft:"5px", bgcolor: "transprant !imporatant" }}
                // style={{width:"100%"}}
                type="text"
                // value={params.row.amountafterdescount
                // onChange={(e) => handleValueChange(params.row.id, 'amountafterdescount', e.target.value)}
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