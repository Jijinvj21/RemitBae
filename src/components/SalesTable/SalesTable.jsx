import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem
} from '@mui/x-data-grid-generator';
import { Autocomplete } from '@mui/material';

const roles = ['Market', 'Finance', 'Development'];

const randomRole = () => {
  return randomArrayItem(roles);
};



const initialRows = Array.from({ length: 5 }, () => ({
  id: randomId(),
  itemCode: Math.floor(Math.random() * 50) + 18,
  itemName: "test",
  qty: Math.floor(Math.random() * 50) + 18,
  unit: "Nos",
  price:21,
  discount:54,
  taxApplied:645,
  total:1441,
}));

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  // return (
  //   <GridToolbarContainer>
  //     <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
  //       Add record
  //     </Button>
  //   </GridToolbarContainer>
  // );
}

export default function FullFeaturedCrudGrid({selectedProductData,totalValues,setTotalValues }) {
  // const [rows, setRows] = React.useState(initialRows);
  const [rows, setRows] = React.useState([]);




  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    if (selectedProductData) {
      const newRow = {
        id: randomId(),
        itemCode: selectedProductData.itemCode,
        name: selectedProductData.name,
        unit: selectedProductData.unit,
        rate: selectedProductData.rate,
      };
      setRows((prevRows) => [...prevRows, newRow]);
    }
  }, [selectedProductData]);

  React.useEffect(() => {
    const updatedTotalValues = rows.map((row) => {
      const quantity = parseInt(row.qty) || 0;
      const rate = parseInt(row.rate) || 0;
      const discount = parseFloat(row.discount) || 0;
      const total = quantity * rate;
      let discountedTotal = quantity ? total : rate;

      if (quantity > 0 && discount > 0) {
        discountedTotal = total-((total * discount) / 100);
      }
      return discountedTotal;
    });
    let total = updatedTotalValues.reduce((sum, value) => sum + value, 0);
    setTotalValues(total);
  }, [rows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {

    console.log(newRow)
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  

  const columns = [
    { field: 'id', headerName: 'Item Code', width: 60, editable: false},
    {
      field: 'name',
      headerName: 'Item Name',
      type: 'number',
      width: 100,
    
      editable: false,
    },
  
    {
      field: 'qty',
      headerName: 'Qty',
      width: 50,
      editable: true,
      type: 'number',
      
    },
    {
        field: 'unit',
        headerName: 'Unit',
        width: 80,
        editable: false,
        type: 'number',
        
      },
      {
        field: 'rate',
        headerName: 'rate',
        width: 80,
        editable: false,
        type: 'number',
        
      },
      {
        field: 'price',
        headerName: 'price(without tax)',
        width: 80,
        editable: false,
        type: 'number',
        renderCell: (params) => {
          const quantity = parseInt(params.row.qty) || 0; // Default to 0 if quantity is not provided
          const rate = parseInt(params.row.rate) || 0; // Default to 0 if rate is not provided
          const discount = parseFloat(params.row.discount) || 0; // Default to 0 if discount is not provided
        
          const total = quantity * rate; // Calculate total without discount
          let discountedTotal = quantity?total:rate; // Initialize discounted total with total
          // setTotalValues((pre)=>[...pre,discountedTotal])
  
          // Check if quantity is provided and discount is applicable
          if (quantity > 0 && discount > 0) {
            // Calculate discounted total
                      discountedTotal =  total-((total * discount) / 100) ;
  
          }
        
          return discountedTotal; // Display the discounted total
        }
        
      },
      {
        field: 'discount',
        headerName: 'Discount %',
        width: 120,
        editable: true,
        type: 'number',
        
      },
      {
        field: 'taxApplied',
        headerName: 'Tax Applied',
        width: 120,
        editable: true,
        type: 'text',
        valueOptions: ['Credit card', 'Wire transfer', 'Cash'],
        renderCell: (params) => (
          

            <Autocomplete
            className='tabel-autocomplete'

              sx={{
                display: "inline-block",
                "& input": {
                  width: "100%",
                  fontSize:"14px",
                  border: "none",
                  bgcolor: "transprant",
                  color: (theme) =>
                    theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
                },

                
              }}
              id="custom-input-demo"
              options={[
                { value: 'none', label: 'None' },
                { value: '0', label: 'IGST @0%' },
                { value: '0', label: 'CGST @0%' },
                { value: '0.25', label: 'IGST @0.25%' },
                { value: '0.25', label: 'CGST @0.25%' },
                { value: '3', label: 'IGST @3%' },
                { value: '3', label: 'CGST @3%' },
                { value: '5', label: 'IGST @5%' },
                { value: '5', label: 'CGST @5%' },
                { value: '12', label: 'IGST @12%' },
                { value: '12', label: 'CGST @12%' },
                { value: '18', label: 'IGST @18%' },
                { value: '18', label: 'CGST @18%' },
                { value: '28', label: 'IGST @28%' },
                { value: '28', label: 'CGST @28%' },
        
        
              ]}

            
              componentsProps={{
                paper: {
                  sx: {
                    width: 150,
                    fontSize:"14px"
                  }
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
                    style={{ height: "10xp",bgcolor:"transprant !imporatant" }}
                  />
                </div>
              )}
            />
        ),
        
      },
    {
      field: 'total',
      type: 'number',
      headerName: 'Total',
      width: 120,
     
      
      }
  ];

  return (
    <Box
      sx={{
        height: "100%",
        // width: '53.4%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
            background: "var(--bgwhite)",
            '& .MuiDataGrid-columnsContainer .': {
                borderRight:"1px solid rgba(224, 224, 224, 1)",
                // color: 'text.primary',
              },
              '&  .MuiDataGrid-cell': {
                borderRight: "1px solid rgba(224, 224, 224, 1)"
                
              },
              '&.MuiDataGrid-row': {
                borderBottomColor: "none"
              },
              "& .MuiDataGrid-columnHeader":{
                borderRight:"1px solid rgba(224, 224, 224, 1)",
            },
            "& .css-yrdy0g-MuiDataGrid-columnHeaderRow" :{
bgcolor:"#f3f6f9 !important"
            },
            
            
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={{
            '& .MuiDataGrid-footerContainer':{
              display: 'none !important'
            },
            "& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper ": {
              maxHeightheight: "calc(5% - 96px) !important"
           }
          }}
      />
    </Box>
  );
}
