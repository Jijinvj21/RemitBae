import { useState, useEffect } from "react";
import "./ProjectsPage.scss";
import { Link, useNavigate } from "react-router-dom";
import AddSquare from "../../assets/products/AddSquare.svg";
import { Box } from "@mui/material";
import UserDataCard from "../../components/UserDataCard/UserDataCard";
import { projectGetAPI } from "../../service/api/admin";
projectGetAPI

function ProjectsPage() {

  // State to hold client data
  const [projectData, setProjectData] = useState([]);

  // Load client data from local storage when the component mounts
  useEffect(() => {
    
    
    projectGetAPI().then((data)=>{
      setProjectData(data.responseData)
    })
    .catch((err)=>{
      console.log(err)
    })
    // const storedClientsData = JSON.parse(localStorage.getItem("clients")) || [];
    // setClientsData(storedClientsData);
  }, []);

  return (
    <div className="client-page-section">
      <div className="link-div">
        <Link to="/admin/projects/add-projects" className="link-to-manage-products">
          <img src={AddSquare} alt="AddSquare" />
          Add Project
        </Link>
      </div>
      <div className="client-inner-section">
        <h2> Project </h2>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-start" }}>
          {/* Iterate over each client and render a UserDataCard component */}
          {projectData?.map((project, index) => (
            <UserDataCard
           
              key={index}
              name={project.name}
              clientLocation={project.address1}
              product={project.product}
              id={project.id}

              // You can pass other client data as props to UserDataCard component as needed
            />
          ))}
        </Box>
      </div>
    </div>
  );
}

export default ProjectsPage;
