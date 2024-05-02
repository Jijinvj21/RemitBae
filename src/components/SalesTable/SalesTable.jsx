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
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = randomId();
//     setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'itemCode', headerName: 'Item Code', width: 130, editable: true},
    {
      field: 'itemName',
      headerName: 'Item Name',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
  
    {
      field: 'qty',
      headerName: 'Qty',
      width: 80,
      editable: true,
      type: 'number',
      
    },
    {
        field: 'unit',
        headerName: 'Unit',
        width: 80,
        editable: true,
        type: 'number',
        
      },
      {
        field: 'price',
        headerName: 'price',
        width: 80,
        editable: true,
        type: 'number',
        
      },
      {
        field: 'discount',
        headerName: 'Discount',
        width: 120,
        editable: true,
        type: 'number',
        
      },
      {
        field: 'taxApplied',
        headerName: 'Tax Applied',
        width: 120,
        editable: true,
        type: 'number',
        
      },
    {
      field: 'total',
      type: 'number',
      headerName: 'Total',
      width: 120,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`save-${id}`}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`cancel-${id}`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
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
            }

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
           
          }}
      />
    </Box>
  );
}
