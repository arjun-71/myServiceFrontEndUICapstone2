import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
// import { getLookUpData, getLookUpDataWithParentId } from "../api/CommonApi";  // ❌ Commented out API calls
import { handleOnChangeList } from "../utils/CommonFunctions";
// import { postData } from "../api/FetchData";  // ❌ Commented out API calls
import DescriptionAlerts from "../utils/alerts";
import ViewServices from "./ViewServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function MyService() {
  const [steps, setSteps] = React.useState([
    { id: '1', labelNo: 1, labelName: 'Discovery Call', labelDetails: '' },
    { id: '2', labelNo: 2, labelName: 'Request for Proposal (RFP)', labelDetails: '' },
    { id: '3', labelNo: 3, labelName: 'Request Date of Entry (RDE)', labelDetails: '' },
    { id: '4', labelNo: 4, labelName: 'Edit Content', labelDetails: '' },
    { id: '5', labelNo: 5, labelName: 'Invoice', labelDetails: '' }
  ]);

  const [activeStep, setActiveStep] = React.useState(steps.length);
  const [selectCategory, setSelectCategory] = React.useState('');
  const [selectSubCategory, setSelectSubCategory] = React.useState('');
  const [selectVersion, setSelectVersion] = React.useState('');
  const [categoryList, setCategoryList] = React.useState([]);
  const [subCategoryList, setSubCategoryList] = React.useState([]);
  const [serviceName, setServiceName] = React.useState('');
  const [serviceId, setServiceId] = React.useState('');

  const [update, setUpdate] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [open, setOpen] = React.useState(false);
  const [stepName, setStepName] = React.useState('');
  const [stepNumber, setStepNumber] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState({});
  const [stepLabelDetails, setStepLabelDetails] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (key, step) => {
    setOpen(true);
    setStepName(step.labelName);
    setStepNumber(step.labelNo);
    setStepLabelDetails(step.labelDetails);
    setCurrentStep(step);
  };

  const handleAddSteps = (e) => {
    e.preventDefault();
    const newSteps = [...steps];
    newSteps.push({ id: newSteps.length + 1, labelName: '', labelDetails: '', labelNo: newSteps.length + 1, save: true });
    setSteps(newSteps);
  };

  const handleRemoveSteps = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleSubCategory = (parentId) => {
    const newList = [...categoryList];
    newList.forEach((item) => {
      if (item.id === parentId) {
        setServiceName(item.levelData);
      }
    });

    // ❌ API Call Removed – Using Static Data Instead
    // getLookUpDataWithParentId('8', '2', parentId).then((data) => setSubCategoryList(data.data));

    // ✅ Dummy Subcategory Data
    setSubCategoryList([
      { id: '101', parentId: '1', levelData: 'Subcategory 1A' },
      { id: '102', parentId: '1', levelData: 'Subcategory 1B' },
      { id: '201', parentId: '2', levelData: 'Subcategory 2A' },
    ]);
  };

  const handleOnChange = (event, row, nameValue) => {
    const newList = handleOnChangeList(event.target.value, row, steps, nameValue);
    setSteps(newList);
  };

  const handleEditData = (service) => {
    setSteps(service.serviceList);
    setActiveStep(service.serviceList.length);
    setSelectSubCategory(service.subCategoryId);
    setSelectCategory(service.categoryId);
    setSelectVersion(service.version);
    setServiceName(service.service);
    setUpdate(true);
    setServiceId(service.id);
    handleSubCategory(service.categoryId);
  };

  useEffect(() => {
    // ❌ API Call Removed – Using Static Data Instead
    // getLookUpData('8', '1').then((data) => setCategoryList(data.data));

    // ✅ Dummy Category Data
    setCategoryList([
      { id: '1', levelData: 'Category 1' },
      { id: '2', levelData: 'Category 2' },
    ]);
  }, []);

  return (
    <Grid container spacing={4}>
      {openAlert ? <DescriptionAlerts alertType={alertType} message={errorMessage} setOpenAlert={setOpenAlert} /> : null}
      <Grid item md={5} xs={12}>
        <Card style={{ marginTop: '10px' }}>
          <div style={{ borderBottom: '1px solid #ccc' }}>
            <CardHeader title='Add My Service' titleTypographyProps={{ variant: 'h6' }} />
          </div>
          <CardContent>
            <Box sx={{ maxWidth: '100%' }} md={{ maxWidth: '100%' }}>
              <Grid container spacing={4}>
                <Grid item md={12} xs={12}>
                  <Typography component="h7" variant="h7">Service Name</Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField size="small" disabled fullWidth id="serviceName" label="Service Name"
                    value={serviceName} className="disableColor" />
                </Grid>
              </Grid>

              <Stepper orientation="vertical">
                {steps.map((step, key) => (
                  <Step active expanded key={key}>
                    <StepLabel>
                      <TextField onChange={(e) => handleOnChange(e, step, 'labelName')} value={step.labelName}
                        variant="standard" />
                      <CloseIcon onClick={() => handleRemoveSteps(key)} />
                    </StepLabel>
                    <StepContent>
                      <TextField fullWidth variant="filled" value={step.labelDetails || 'Click here to add text *'} />
                    </StepContent>
                  </Step>
                ))}
                <Step active expanded>
                  <StepLabel>
                    <Button onClick={(e) => handleAddSteps(e)} variant="outlined" startIcon={<AddIcon />}>
                      Add a Step
                    </Button>
                  </StepLabel>
                </Step>
              </Stepper>

              <Button type="submit" fullWidth variant="contained">
                {update ? "Update service" : "Add a service"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={7} xs={12}>
        <Card>
          <CardHeader title='View My Service' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <ViewServices step={steps} handleEditData={handleEditData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
