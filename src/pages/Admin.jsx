import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/Auth';
import { 
  Typography, Box, Button, TextField, CircularProgress, Grid, 
  List, ListItem, ListItemText, Card, CardMedia, IconButton, Dialog, 
  DialogActions, DialogContent, DialogContentText, DialogTitle,
  ListItemAvatar, Avatar, ListItemButton
} from '@mui/material';
import { db, storage } from '../firebase';
import { 
  collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const Admin = () => {
  console.log("Admin component rendering...");
  const { currentUser, loading: authLoading } = useAuth(); 
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', tags: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', success: false });
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null, imageUrl: null });

  console.log(`Auth state: loading=${authLoading}, currentUser=${currentUser ? currentUser.email : null}`);

  const isAuthorized = !authLoading && currentUser && currentUser.email === ADMIN_EMAIL;
  console.log(`Authorization check: isAuthorized=${isAuthorized}`);

  useEffect(() => {
    if (!isAuthorized) return;
    console.log("User is authorized, subscribing to projects collection.");
    const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Projects data received: ", projectsData);
      setProjects(projectsData);
    });
    return () => {
      console.log("Unsubscribing from projects collection.");
      unsubscribe();
    }
  }, [isAuthorized]);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setFormData({ name: project.name, description: project.description, tags: project.tags.join(', ') });
    setImagePreview(project.imageUrl);
    setImage(null);
  };

  const handleNewProject = () => {
    setSelectedProject(null);
    setFormData({ name: '', description: '', tags: '' });
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ message: '', success: false });

    try {
      let imageUrl = selectedProject ? imagePreview : '';

      if (image) {
        if (selectedProject && selectedProject.imageUrl) {
          const oldImageRef = ref(storage, selectedProject.imageUrl);
          await deleteObject(oldImageRef).catch(err => {
            console.warn("Could not delete old image, it may not exist: ", err);
          });
        }
        const imageRef = ref(storage, `images/${image.name}-${uuidv4()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const projectData = {
        name: formData.name,
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        imageUrl
      };

      if (selectedProject) {
        const projectRef = doc(db, 'projects', selectedProject.id);
        await updateDoc(projectRef, projectData);
        setFeedback({ message: 'Project updated successfully!', success: true });
        setSelectedProject({...selectedProject, ...projectData});
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        setFeedback({ message: 'Project added successfully!', success: true });
        handleNewProject();
      }
    } catch (error) {
      console.error("Error saving project: ", error);
      setFeedback({ message: `Error: ${error.message}`, success: false });
    }
    setLoading(false);
  };

  const openDeleteDialog = (id, imageUrl) => {
    setDeleteConfirmation({ open: true, id, imageUrl });
  };

  const closeDeleteDialog = () => {
    setDeleteConfirmation({ open: false, id: null, imageUrl: null });
  };

  const handleDelete = async () => {
    const { id, imageUrl } = deleteConfirmation;
    try {
      await deleteDoc(doc(db, 'projects', id));
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
      setFeedback({ message: 'Project deleted successfully!', success: true });
      handleNewProject();
    } catch (error) {
      console.error("Error deleting project: ", error);
      setFeedback({ message: `Error: ${error.message}`, success: false });
    }
    closeDeleteDialog();
  };

  if (authLoading) {
    console.log("Rendering loading spinner while auth is loading.");
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;
  }

  if (!isAuthorized) {
    console.log("Rendering 'Not Authorized' message.");
    return <Typography sx={{ p: 4 }}>You are not authorized to access this page.</Typography>;
  }

  console.log("Rendering admin dashboard UI.");
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Button variant="contained" fullWidth onClick={handleNewProject} sx={{ mb: 2 }}>
            New Project
          </Button>
          <Card>
            <List component="nav" sx={{ width: '100%' }}>
              {projects.map((project) => (
                <ListItem
                  key={project.id}
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteDialog(project.id, project.imageUrl);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton onClick={() => handleSelectProject(project)}>
                    <ListItemAvatar>
                      <Avatar src={project.imageUrl} variant="rounded" sx={{ mr: 2 }} />
                    </ListItemAvatar>
                    <ListItemText primary={project.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              {selectedProject ? 'Edit Project' : 'Create Project'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Project Name" name="name" fullWidth value={formData.name} onChange={handleChange} margin="normal" required />
              <TextField label="Description" name="description" fullWidth multiline rows={4} value={formData.description} onChange={handleChange} margin="normal" required />
              <TextField label="Tags (comma-separated)" name="tags" fullWidth value={formData.tags} onChange={handleChange} margin="normal" required />
              <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
                Upload Image
                <input type="file" hidden onChange={handleImageChange} accept="image/*" />
              </Button>
              {imagePreview && 
                <Box sx={{ my: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Image Preview</Typography>
                  <CardMedia component="img" image={imagePreview} alt="Image preview" sx={{ mt: 1, width: '100%', maxHeight: 300, objectFit: 'contain' }} />
                </Box>
              }
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
                {loading ? <CircularProgress size={24} /> : (selectedProject ? 'Update Project' : 'Create Project')}
              </Button>
              {feedback.message && 
                <Typography sx={{ color: feedback.success ? 'green' : 'red', mt: 2 }}>
                  {feedback.message}
                </Typography>
              }
            </form>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={deleteConfirmation.open} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admin;
