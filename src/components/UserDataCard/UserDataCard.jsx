import { Box } from "@mui/material"
import ImageAdd from "../../assets/sideBar/ImageAdd.svg";


function UserDataCard({name,employeeDesigination,employeeMobile,clientLocation,product}) {
  return (
    <Box sx={{bgcolor:"var(--product-card)",p:2,borderRadius:5, display:"flex",flexDirection:"row", alignItems:"center",gap:2}}>
      <Box>

<img src={ImageAdd} alt="user-img" width={40} />
      </Box>
      <Box sx={{display:"flex",flexDirection:"column", gap:1}}>

<p style={{fontWeight:"bold"}}>{name}</p>
<p>{employeeDesigination||product}</p>
<p>{employeeMobile||clientLocation}</p>

      </Box>

    </Box>
  )
}

export default UserDataCard