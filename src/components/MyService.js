import * as React from 'react';
import { useEffect, useState } from "react";
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
import DescriptionAlerts from "../utils/alerts";
import ViewServices from "./ViewServices";
import { getCategories, getSubCategories, addService, updateService } from "../api/api"; // ✅ Import API calls

export default function MyService() {
  const [steps, setSteps] = useState([
    { id: '1', labelNo: 1, labelName: 'Discovery Call', labelDetails: '' },
    { id: '2', labelNo: 2, labelName: 'Request for Proposal (RFP)', labelDetails: '' },
    { id: '3', labelNo: 3, labelName: 'Request Date of Entry (RDE)', labelDetails: '' },
    { id: '4', labelNo: 4, labelName: 'Edit Content', labelDetails: '' },
    { id: '5', labelNo: 5, labelName: 'Invoice', labelDetails: '' }
  ]);

  const [selectCategory, setSelectCategory] = useState('');
  const [selectSubCategory, setSelectSubCategory] = useState('');
  const [selectVersion, setSelectVersion] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceId, setServiceId] = useState('');

  const [update, setUpdate] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Fetch categories from API on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategoryList(data.data); // ✅ Set categories from API response
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubCategory = async (categoryId) => {
    setSelectCategory(categoryId);
    try {
        const data = await getSubCategories(categoryId); // ✅ Use selected categoryId dynamically
        console.log("Subcategories API Response:", data); // ✅ Debugging step

        if (data && Array.isArray(data.data)) {
            setSubCategoryList(data.data); // ✅ Set only the subcategory list
        } else {
            console.error("Invalid API response:", data);
            setSubCategoryList([]); // ✅ Ensure state is cleared if data is invalid
        }
    } catch (error) {
        console.error("Failed to load subcategories:", error);
        setSubCategoryList([]); // ✅ Ensure UI doesn't break on error
    }
};

  // ✅ Handle service submission (Add / Update)
  const handleSubmitService = async () => {
    if (!selectCategory || !selectSubCategory || !serviceName || steps.length === 0) {
      setAlertType("error");
      setErrorMessage("All fields are required.");
      setOpenAlert(true);
      return;
    }
  
    const serviceData = {
      categoryId: selectCategory,
      subCategoryId: selectSubCategory,
      version: selectVersion,
      service: serviceName,  // ✅ Matches FastAPI
      serviceList: steps.map(step => ({
        id: String(step.id),  // ✅ Ensure "id" is a string
        labelNo: step.labelNo,
        labelName: step.labelName,
        labelDetails: step.labelDetails,
      })),
    };
  
    try {
      if (update) {
        await updateService(serviceId, serviceData);
        setAlertType("success");
        setErrorMessage("Service updated successfully!");
      } else {
        await addService(serviceData);
        setAlertType("success");
        setErrorMessage("Service added successfully!");
      }
      setOpenAlert(true);
    } catch (error) {
      console.error("Error adding service:", error.response ? error.response.data : error);
      setAlertType("error");
      setErrorMessage("Failed to save service.");
      setOpenAlert(true);
    }
  };

  // ✅ Handle Edit Service
  const handleEditData = (service) => {
    setSteps(service.serviceSteps);
    setSelectCategory(service.categoryId);
    setSelectSubCategory(service.subCategoryId);
    setSelectVersion(service.version);
    setServiceName(service.serviceName);
    setUpdate(true);
    setServiceId(service.id);
    handleSubCategory(service.categoryId);
  };

  return (
    <Grid container spacing={4}>
      {openAlert ? <DescriptionAlerts alertType={alertType} message={errorMessage} setOpenAlert={setOpenAlert} /> : null}

      {/* LEFT SECTION: ADD SERVICE */}
      <Grid item md={5} xs={12}>
        <Card style={{ marginTop: '10px' }}>
          <CardHeader title='Add My Service' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Box sx={{ maxWidth: '100%' }} md={{ maxWidth: '100%' }}>
              <Grid container spacing={4}>
                <Grid item md={12} xs={12}>
                  <Typography component="h7" variant="h7">Service Name</Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField size="small" fullWidth id="serviceName" label="Service Name"
                    value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                </Grid>

                {/* CATEGORY SELECTION */}
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={selectCategory} onChange={(e) => handleSubCategory(e.target.value)}>
                      {categoryList.map((category) => (
                        <MenuItem key={category.id} value={category.id}>{category.levelData}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* SUBCATEGORY SELECTION */}
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Subcategory</InputLabel>
                    <Select value={selectSubCategory} onChange={(e) => setSelectSubCategory(e.target.value)}>
                      {subCategoryList.map((sub) => (
                        <MenuItem key={sub.id} value={sub.id}>{sub.levelData}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* STEPS MANAGEMENT */}
              <Stepper orientation="vertical">
                {steps.map((step, key) => (
                  <Step active expanded key={key}>
                    <StepLabel>
                      <TextField onChange={(e) => {
                        let newSteps = [...steps];
                        newSteps[key].labelName = e.target.value;
                        setSteps(newSteps);
                      }} value={step.labelName} variant="standard" />
                      <CloseIcon onClick={() => setSteps(steps.filter((_, i) => i !== key))} />
                    </StepLabel>
                    <StepContent>
                      <TextField fullWidth variant="filled" value={step.labelDetails || 'Click here to add text *'}
                        onChange={(e) => {
                          let newSteps = [...steps];
                          newSteps[key].labelDetails = e.target.value;
                          setSteps(newSteps);
                        }} />
                    </StepContent>
                  </Step>
                ))}
                <Step active expanded>
                  <StepLabel>
                    <Button onClick={() => setSteps([...steps, { id: steps.length + 1, labelName: '', labelDetails: '' }])}
                      variant="outlined" startIcon={<AddIcon />}>
                      Add a Step
                    </Button>
                  </StepLabel>
                </Step>
              </Stepper>

              <Button type="submit" fullWidth variant="contained" onClick={handleSubmitService}>
                {update ? "Update Service" : "Add a Service"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* RIGHT SECTION: VIEW SERVICES */}
      <Grid item md={7} xs={12}>
        <Card>
          <CardHeader title='View My Services' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <ViewServices step={steps} handleEditData={handleEditData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
