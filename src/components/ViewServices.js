import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ErrorIcon from '@mui/icons-material/Error';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from '../api/axios';  // ✅ Import axios instance

const ViewServices = () => {
  const [serviceList, setServiceList] = useState([]);  // ✅ Default empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch services from backend
  const fetchServices = async () => {
    try {
      const response = await axios.get('/services');  // ✅ Matches FastAPI endpoint
      console.log("Services fetched:", response.data);  // ✅ Debugging log
      setServiceList(response.data.data);  // ✅ API returns { "data": [...] }
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete service
  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`/services/${serviceId}`);
      setServiceList(serviceList.filter(service => service.id !== serviceId));  // ✅ Remove from state
    } catch (err) {
      console.error("Error deleting service:", err);
      setError("Failed to delete service.");
    }
  };

  useEffect(() => {
    fetchServices();  // ✅ Fetch services on mount
  }, []);

  return (
    <Grid container spacing={4} style={{ height: '100%' }}>
      {loading ? (
        <Typography>Loading services...</Typography>  // ✅ Show loading text
      ) : error ? (
        <Typography color="error">{error}</Typography>  // ✅ Show error message
      ) : serviceList.length === 0 ? (
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
              <Grid container spacing={4} key={service.id}>
                <Grid item md={11} xs={11}>
                  <Accordion style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`panel-${index}`}>
                      <Typography>
                        {service.categoryId} | {service.subCategoryId} | Version {service.version}
                      </Typography>
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
                <Grid item md={1} xs={1} style={{ textAlign: 'right' }}>
                  <IconButton onClick={() => handleDeleteService(service.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
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
