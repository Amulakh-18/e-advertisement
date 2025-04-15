import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  Card,
  CardMedia,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Image as ImageIcon,
  TextFields,
  VideoLibrary,
  Delete as DeleteIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Preview as PreviewIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { adBuilderAPI } from '../../services/api';

const AdBuilder = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [elements, setElements] = useState([]);
  const [adSettings, setAdSettings] = useState({
    name: '',
    type: 'banner',
    width: 728,
    height: 90,
    status: 'draft',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);

  const onDrop = useCallback(async (acceptedFiles, elementId) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadProgress(prev => ({ ...prev, [elementId]: 0 }));
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await adBuilderAPI.uploadMedia(formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(prev => ({ ...prev, [elementId]: progress }));
        }
      });

      updateElement(elementId, {
        content: response.data.file_url,
        type: file.type.startsWith('image/') ? 'image' : 'video',
      });

      setUploadProgress(prev => ({ ...prev, [elementId]: 100 }));
    } catch (error) {
      setError('Failed to upload file. Please try again.');
      setUploadProgress(prev => ({ ...prev, [elementId]: 0 }));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm'],
    },
    maxSize: 10485760, // 10MB
  });

  const elementTypes = [
    { id: 'text', icon: <TextFields />, label: 'Text' },
    { id: 'image', icon: <ImageIcon />, label: 'Image' },
    { id: 'video', icon: <VideoLibrary />, label: 'Video' },
  ];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setElements(items);
  };

  const addElement = (type) => {
    const newElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: type === 'text' ? 'New Text' : '',
      style: {
        position: 'relative',
        width: '100%',
        height: type === 'text' ? 'auto' : '200px',
        padding: '8px',
      },
    };
    setElements([...elements, newElement]);
  };

  const removeElement = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const updateElement = (id, updates) => {
    setElements(
      elements.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setAdSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const adData = {
        ...adSettings,
        elements,
      };

      await adBuilderAPI.createAd(adData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/campaigns');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save advertisement');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  const PreviewDialog = () => {
    const containerStyle = {
      width: `${adSettings.width}px`,
      height: `${adSettings.height}px`,
      position: 'relative',
      border: '1px solid rgba(33, 150, 243, 0.3)',
      margin: '0 auto',
      overflow: 'hidden',
    };

    return (
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Ad Preview
            <IconButton onClick={handleClosePreview}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {adSettings.name} ({adSettings.width}x{adSettings.height}px)
            </Typography>
            <Box sx={containerStyle}>
              {elements.map((element, index) => (
                <Box
                  key={element.id}
                  sx={{
                    ...element.style,
                    position: 'absolute',
                    zIndex: index + 1,
                  }}
                >
                  {element.type === 'text' ? (
                    <Typography>{element.content}</Typography>
                  ) : element.type === 'image' ? (
                    <img
                      src={element.content}
                      alt="Ad content"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <video
                      src={element.content}
                      controls
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ 
          background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Ad Builder
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            onClick={handlePreview}
            disabled={loading}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={handleSave}
            disabled={loading}
            sx={{
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
              },
            }}
          >
            {loading ? 'Saving...' : 'Save Ad'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Ad Settings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, background: 'rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="h6" gutterBottom>
              Ad Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ad Name"
                  name="name"
                  value={adSettings.name}
                  onChange={handleSettingsChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Ad Type</InputLabel>
                  <Select
                    name="type"
                    value={adSettings.type}
                    onChange={handleSettingsChange}
                    label="Ad Type"
                  >
                    <MenuItem value="banner">Banner Ad</MenuItem>
                    <MenuItem value="popup">Pop-up Ad</MenuItem>
                    <MenuItem value="video">Video Ad</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Width (px)"
                  name="width"
                  value={adSettings.width}
                  onChange={handleSettingsChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Height (px)"
                  name="height"
                  value={adSettings.height}
                  onChange={handleSettingsChange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Element Toolbar */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, background: 'rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="h6" gutterBottom>
              Add Elements
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {elementTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outlined"
                  startIcon={type.icon}
                  onClick={() => addElement(type.id)}
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.light,
                      background: 'rgba(33, 150, 243, 0.1)',
                    },
                  }}
                >
                  {type.label}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Ad Canvas */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              minHeight: '400px',
              border: '2px dashed rgba(33, 150, 243, 0.3)',
              background: 'rgba(255, 255, 255, 0.05)',
              position: 'relative',
            }}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="ad-canvas">
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minHeight: '100%',
                    }}
                  >
                    {elements.map((element, index) => (
                      <Draggable
                        key={element.id}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              p: 2,
                              mb: 2,
                              background: 'rgba(255, 255, 255, 0.1)',
                              borderRadius: 1,
                              position: 'relative',
                            }}
                          >
                            {element.type === 'text' ? (
                              <TextField
                                fullWidth
                                multiline
                                value={element.content}
                                onChange={(e) =>
                                  updateElement(element.id, { content: e.target.value })
                                }
                              />
                            ) : (
                              <Box
                                {...getRootProps()}
                                sx={{
                                  border: '2px dashed rgba(33, 150, 243, 0.3)',
                                  borderRadius: 1,
                                  p: 2,
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                }}
                              >
                                <input {...getInputProps()} />
                                {element.content ? (
                                  element.type === 'image' ? (
                                    <img
                                      src={element.content}
                                      alt="Ad content"
                                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                                    />
                                  ) : (
                                    <video
                                      src={element.content}
                                      controls
                                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                                    />
                                  )
                                ) : (
                                  <Typography color="textSecondary">
                                    Drag and drop or click to upload {element.type}
                                  </Typography>
                                )}
                                {uploadProgress[element.id] > 0 && uploadProgress[element.id] < 100 && (
                                  <CircularProgress
                                    variant="determinate"
                                    value={uploadProgress[element.id]}
                                  />
                                )}
                              </Box>
                            )}
                            <IconButton
                              size="small"
                              onClick={() => removeElement(element.id)}
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: theme.palette.error.main,
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Advertisement saved successfully!
        </Alert>
      </Snackbar>

      <PreviewDialog />
    </Container>
  );
};

export default AdBuilder; 