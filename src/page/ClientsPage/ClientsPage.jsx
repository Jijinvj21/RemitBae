import { useState, useEffect } from "react";
import "./ClientsPage.scss";
import { Link } from "react-router-dom";
import AddSquare from "../../assets/products/AddSquare.svg";
import { Box } from "@mui/material";
import UserDataCard from "../../components/UserDataCard/UserDataCard";

function ClientsPage() {
  // State to hold client data
  const [clientsData, setClientsData] = useState([]);

  // Load client data from local storage when the component mounts
  useEffect(() => {
    const storedClientsData = JSON.parse(localStorage.getItem("clients")) || [];
    setClientsData(storedClientsData);
  }, []);

  return (
    <div className="client-page-section">
      <div className="link-div">
        <Link to="/admin/clients/add-client" className="link-to-manage-products">
          <img src={AddSquare} alt="AddSquare" />
          Add Client
        </Link>
      </div>
      <div className="client-inner-section">
        <h2> Clients </h2>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-start" }}>
          {/* Iterate over each client and render a UserDataCard component */}
          {clientsData.map((client, index) => (
            <UserDataCard
              key={index}
              name={client.name}
              clientLocation={client.address1}
              product={client.product}
              // You can pass other client data as props to UserDataCard component as needed
            />
          ))}
        </Box>
      </div>
    </div>
  );
}

export default ClientsPage;
