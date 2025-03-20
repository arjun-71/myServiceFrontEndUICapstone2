import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ErrorIcon from '@mui/icons-material/Error';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { deleteData, getSingleData, postData } from "../api/FetchData"; // ❌ Commented out API imports
import { styled, alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DOMPurify from 'dompurify';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const ViewServices = (props) => {
  const [savedService, setSavedService] = useState(true); // ✅ Static state set to `true`
  const [serviceList, setServiceList] = useState([
    // ✅ Static service data
    {
      id: "1234",
      service: "SEO Audit",
      categoryId: "101",
      categoryName: "Marketing",
      subCategoryId: "201",
      subCategoryName: "SEO",
      version: "1",
      serviceList: [
        { id: "1", labelNo: 1, labelName: "Discovery Call", labelDetails: "Initial consultation with the client." },
        { id: "2", labelNo: 2, labelName: "Technical Audit", labelDetails: "Perform technical SEO audit." },
      ],
    },
    {
      id: "5678",
      service: "Content Strategy",
      categoryId: "102",
      categoryName: "Consulting",
      subCategoryId: "202",
      subCategoryName: "Content Marketing",
      version: "2",
      serviceList: [
        { id: "1", labelNo: 1, labelName: "Competitor Analysis", labelDetails: "Analyze competitors' content strategy." },
        { id: "2", labelNo: 2, labelName: "Keyword Research", labelDetails: "Identify target keywords." },
      ],
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // ❌ Commented out the API function
  // const getMyServiceData = async () =>{
  //   let userToken = localStorage.getItem("access_token")
  //   return await getSingleData('service/getMyService', '', userToken);
  // }

  // ❌ Commented out API delete function
  // const deleteMyService = async (serviceId) =>{
  //   let userToken = localStorage.getItem("access_token")
  //   const options = {serviceId: serviceId}
  //   const data = await deleteData('service/deleteService', options, userToken);
  //   getMyServiceData().then((data)=>{
  //     setServiceList(data)
  //     setSavedService(data.length !== 0)
  //   })
  // }

  // ❌ Commented out duplicate function
  // const duplicateService = async (service) => {
  //   const options = {service: service.service, categoryId: service.categoryId, subCategoryId: service.subCategoryId,
  //     myServiceDetails: service.serviceList, version: parseInt(service.version) + 1}
  //   const data = await postData('service/saveMyService', options);
  //   if(data.status === 'success') {
  //     getMyServiceData().then((data) => {
  //       setServiceList(data)
  //       setSavedService(data.length !== 0)
  //     })
  //   }
  // }

  useEffect(() => {
    // ❌ Commented out API call, using static data instead
    // getMyServiceData().then((data)=>{
    //   setServiceList(data)
    //   setSavedService(data.length !== 0)
    // })
  }, []);

  return (
    <Grid container spacing={4} style={{ height: '100%' }}>
      {!savedService ? (
        <>
          <Grid item md={2} xs={0} />
          <Grid item md={8} xs={12} style={{ border: '1px solid #ccc', padding: '0px', marginTop: '30px' }}>
            <Grid container spacing={4} style={{ padding: '30px' }}>
              <Grid item md={1} xs={1}>
                <ErrorIcon color="info" />
              </Grid>
              <Grid item md={11} xs={11}>
                <Typography>No services have been added.</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} xs={0} />
        </>
      ) : (
        <>
          <Grid item md={2} xs={0} />
          <Grid item md={8} xs={12} style={{ marginTop: '30px' }}>
            {serviceList.map((service, index) => (
              <Grid container spacing={4} key={index}>
                <Grid item md={11} xs={11}>
                  <Accordion style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
                      <Typography>{service.categoryName} | {service.subCategoryName} | {service.version}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ borderTop: '1px solid #ccc', padding: '20px 30px' }}>
                      <Typography>
                        Steps to be executed:
                        {service.serviceList.map((details, key) => (
                          <li key={key}>Step {key + 1}: {details.labelName}</li>
                        ))}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item md={2} xs={0} />
        </>
      )}
    </Grid>
  );
};

export default ViewServices;
