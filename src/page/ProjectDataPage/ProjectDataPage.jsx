import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import "./ProjectDataPage.scss"
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';

function ProjectDataPage() {
    const [toggle, setToggle] = useState(true);

    const location = useLocation();
    console.log(location.state)

  return (
    <div className='projectDatapage-section'>
<div className='top-section'>
    <div className='data_show_card'>
        <p>Income</p>
        <h6>10</h6>
    </div>
    <div className='data_show_card'>
        <p>Expence</p>
        <h6>10</h6>
    </div><div className='data_show_card'>
        <p>Total</p>
        <h6>10</h6>
    </div>

    <div className='toggle_button '>
     <div style={{display:"flex",justifyContent:'space-between'}}>
     <h4>With Tax</h4>
      <h4>Without Tax</h4>
     </div>

                  <ToggleButtonGroup
                    value={toggle ? "true" : "false"} // Convert toggle state to string value
                    exclusive
                    onChange={(e, value) => setToggle(value === "true")}
                    aria-label="text alignment"
                  >
                    <ToggleButton
                      value="true"
                      aria-label="left aligned"
                      sx={{
                        fontSize: "12px",
                        borderRadius: "35px",
                        width: "90px",
                        height: "35px",
                        textAlign: "center",
                        marginTop: "5px",
                        marginLeft: "10px",
                        "&.Mui-selected, &.Mui-selected:hover": {
                          color: "white",
                          backgroundColor: "#8cdb7e",
                        },
                      }}
                    >
                      <p>yes</p>
                    </ToggleButton>
                    <ToggleButton
                      value="false"
                      aria-label="centered"
                      sx={{
                        fontSize: "12px",
                        borderRadius: "35px",
                        width: "90px",
                        height: "35px",
                        textAlign: "center",
                        marginTop: "5px",
                        marginLeft: "10px",
                        "&.Mui-selected, &.Mui-selected:hover": {
                          color: "white",
                          backgroundColor: "#8cdb7e",
                        },
                      }}
                    >
                      <p>no</p>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className='data_show_card'>
        <SimCardDownloadOutlinedIcon />
    </div>


    
</div>
    </div>
  )
}

export default ProjectDataPage