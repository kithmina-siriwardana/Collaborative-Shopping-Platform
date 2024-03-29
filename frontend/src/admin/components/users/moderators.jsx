import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import { getModerators, downgradeUser } from "../../../api/user";
import Header from "../../Layout/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState, useRef } from "react";

const Customers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [moderators, setModerators] = useState(null);

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await getModerators();
        await setModerators(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchModerators();
  }, []);

  useEffect(() => {
    // console.log(customers);
  }, [moderators]);

  const handleButtonClick = (id) => {
    downgradeUser(id);
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "button",

      headerName: "",

      width: 100,

      renderCell: (params) => {
        return (
          <Button
            color="secondary"
            onClick={() => handleButtonClick(params.row.id)}
          >
            Downgrade{" "}
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="0">
      <Box
        m="0 0 0 0"
        height="100vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {moderators ?
        <DataGrid
          rows={moderators}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        : (
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
};

export default Customers;
