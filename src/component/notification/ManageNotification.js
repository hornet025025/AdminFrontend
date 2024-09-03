import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { addNotification, fetchNotification, removeNotification } from '../../action/NotificationAction';
import { useDispatch, useSelector } from 'react-redux';

const ManageNotification = () => {
  const [message, setMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const {notifications} = useSelector((state) => state.notificationReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  const addNotifications = () => {
    console.log(message);
    if (message.trim() === '') return;
    console.log(message);
    dispatch(addNotification(message));
    dispatch(fetchNotification());
    setMessage('');
    setShowAddForm(false); // Hide the add notification form after adding a notification
  };

  const removeNotifications = (id) => {
    dispatch(removeNotification(id));
    dispatch(fetchNotification());
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">Manage Notifications</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            {showAddForm && (
              <Box bgcolor="lightgrey" p={2} borderRadius={4}>
                <TextField
                  fullWidth
                  label="Enter notification message"
                  value={message}
                  onChange={handleInputChange}
                />
                <Box mt={2} display="flex" justifyContent="space-around">
                  <Button variant="contained" onClick={addNotifications}>Add</Button>
                  <Button variant="contained" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
      {!showAddForm && (<Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddForm(true)}
          fullWidth={!showAddForm}
        >
          Add Notification
        </Button>
      )}
      </Grid>
      <Grid item xs={12}>
        { !showAddForm && (
        <List>
          {notifications?.map((not, index) => (
            <ListItem key={index}>
              <ListItemText primary={`message: ${not.message}`} />
              <ListItemText primary={`created At :${not.createdAt}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => removeNotifications(not.id)}>
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        )}
      </Grid>
    </Grid>
  );
};

export default ManageNotification;
