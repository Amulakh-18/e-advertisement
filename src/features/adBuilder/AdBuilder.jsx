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
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  ExpandMore as ExpandMoreIcon,
  ViewQuilt as TemplateIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { adBuilderAPI } from '../../services/api';

// Mock Templates
const MOCK_TEMPLATES = [
  {
    id: 'template-basic-image',
    name: 'Image & Text Banner',
    settings: { type: 'banner', width: 728, height: 90 },
    elements: [
      { id: 'image-1', type: 'image', content: '', style: { position: 'absolute', left: 0, top: 0, width: '30%', height: '100%' } },
      { id: 'text-1', type: 'text', content: 'Headline Text', style: { position: 'absolute', left: '32%', top: '10%', width: '66%', height: 'auto' } },
      { id: 'text-2', type: 'text', content: 'Subtext description goes here.', style: { position: 'absolute', left: '32%', top: '40%', width: '66%', height: 'auto' } },
    ],
  },
  {
    id: 'template-video-cta',
    name: 'Video with Call to Action',
    settings: { type: 'video', width: 300, height: 250 },
    elements: [
      { id: 'video-1', type: 'video', content: '', style: { position: 'absolute', left: 0, top: 0, width: '100%', height: '70%' } },
      { id: 'text-1', type: 'text', content: 'Watch Now!', style: { position: 'absolute', left: '10%', top: '75%', width: '80%', height: 'auto', textAlign: 'center' } },
    ],
  },
  {
    id: 'template-product-focus',
    name: 'Product Showcase',
    settings: { type: 'banner', width: 300, height: 600 },
    elements: [
      { id: 'image-1', type: 'image', content: '', style: { position: 'absolute', left: 0, top: 0, width: '100%', height: '60%' } },
      { id: 'text-1', type: 'text', content: 'Product Name', style: { position: 'absolute', left: '5%', top: '65%', width: '90%', height: 'auto' } },
      { id: 'text-2', type: 'text', content: 'Special Offer!', style: { position: 'absolute', left: '5%', top: '80%', width: '90%', height: 'auto', fontWeight: 'bold' } },
    ],
  },
];

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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const updateElement = useCallback((id, updates) => {
    setElements(prevElements =>
      prevElements.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      )
    );
  }, []);

  const onDrop = useCallback(async (acceptedFiles, elementId) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadProgress(prev => ({ ...prev, [elementId]: 0 }));
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await adBuilderAPI.uploadMedia(formData, (progressEvent) => {
        const percentCompleted = progressEvent.loaded;
        setUploadProgress(prev => ({ ...prev, [elementId]: percentCompleted }));
      });

      updateElement(elementId, {
        content: response.file_url,
        type: file.type.startsWith('image/') ? 'image' : 'video',
      });

      showSnackbar('Media uploaded successfully! (Mock)', 'success');
    } catch (error) {
      console.error('Mock Upload error simulation:', error);
      const errorMsg = error.message || 'Failed to upload file (Mock)';
      setError(errorMsg);
      showSnackbar(errorMsg, 'error');
      setUploadProgress(prev => ({ ...prev, [elementId]: undefined }));
    }
  }, [updateElement]);

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
        width: 'auto',
        height: 'auto',
        padding: '8px',
        marginBottom: '8px',
        border: '1px dashed grey'
      },
    };
    setElements([...elements, newElement]);
  };

  const removeElement = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'width' || name === 'height') {
      processedValue = parseInt(value, 10) || 0;
    }
    setAdSettings((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleLoadTemplate = (template) => {
    setAdSettings(prev => ({ ...prev, ...template.settings, name: template.name }));
    const newElements = template.elements.map(el => ({ 
        ...el, 
        id: `${el.type}-${Date.now()}-${Math.random()}` 
    }));
    setElements(newElements);
    showSnackbar(`Template "${template.name}" loaded.`, 'info');
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!adSettings.name) {
      setError('Ad Name is required.');
      showSnackbar('Ad Name is required.', 'error');
      setLoading(false);
      return;
    }

    try {
      const adData = {
        title: adSettings.name,
        description: `Ad created via Ad Builder - Type: ${adSettings.type}`,
        format: adSettings.type,
        placement: 'website',
        meta: {
          width: adSettings.width,
          height: adSettings.height,
          elements: elements,
        },
        status: adSettings.status
      };
      
      console.log("Calling mock createAd with:", adData);
      const createdAd = await adBuilderAPI.createAd(adData);
      
      setSuccess(true);
      showSnackbar(`(Mock) Advertisement '${createdAd.title}' saved successfully!`, 'success');
    } catch (err) {
      console.error('Mock Save error simulation:', err);
      const errorMsg = err.message || 'Failed to save advertisement (Mock)';
      setError(errorMsg);
      showSnackbar(errorMsg, 'error');
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
    const isValidDimension = (dim) => typeof dim === 'number' && dim > 0;
    const previewWidth = isValidDimension(adSettings.width) ? adSettings.width : 300;
    const previewHeight = isValidDimension(adSettings.height) ? adSettings.height : 250;

    const containerStyle = {
      width: `${previewWidth}px`,
      height: `${previewHeight}px`,
      position: 'relative',
      border: '1px solid rgba(33, 150, 243, 0.3)',
      margin: '20px auto',
      overflow: 'hidden',
      background: '#f0f0f0'
    };

    return (
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="lg"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Ad Preview
            <IconButton onClick={handleClosePreview}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="subtitle1">
              {adSettings.name || 'Untitled Ad'} ({previewWidth}x{previewHeight}px)
            </Typography>
          </Box>
          <Box sx={containerStyle}>
            {elements.map((element, index) => (
              <Box
                key={element.id}
                sx={{
                  ...element.style,
                  position: 'absolute',
                }}
              >
                {renderElement(element, true)}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderElement = (element, isPreview = false) => {
    const commonStyle = {
      width: '100%', 
      height: '100%', 
      objectFit: 'contain',
      display: 'block'
    };
    
    const elementId = element.id;
    const { getRootProps: dropzoneRootProps, getInputProps: dropzoneInputProps } = useDropzone({
      onDrop: acceptedFiles => onDrop(acceptedFiles, elementId),
      accept: {
          'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
          'video/*': ['.mp4', '.webm'],
      },
      maxSize: 10485760,
      multiple: false
    });

    switch (element.type) {
      case 'text':
        return isPreview ? (
          <Typography sx={element.style}>{element.content}</Typography> 
        ) : (
          <TextField
            fullWidth
            multiline
            variant="outlined"
            value={element.content}
            onChange={(e) => updateElement(element.id, { content: e.target.value })}
            placeholder="Enter text content"
          />
        );
      case 'image':
      case 'video':
        const isImage = element.type === 'image';
        const progress = uploadProgress[element.id];
        const hasContent = !!element.content;

        return isPreview ? (
          hasContent ? (
            isImage ? <img src={element.content} alt="Ad content" style={commonStyle} /> : <video src={element.content} controls style={commonStyle} />
          ) : (
            <Box sx={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="textSecondary">{isImage ? 'Image' : 'Video'}</Typography>
            </Box>
          )
        ) : (
          <Box 
            {...dropzoneRootProps()} 
            sx={{ 
              border: '2px dashed grey', 
              padding: 2, 
              textAlign: 'center', 
              cursor: 'pointer', 
              position: 'relative', 
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
             }}
           >
            <input {...dropzoneInputProps()} />
            {progress !== undefined && progress < 100 && (
              <CircularProgress variant="determinate" value={progress} sx={{ position: 'absolute' }} />
            )}
            {hasContent ? (
              isImage ? 
                <CardMedia component="img" image={element.content} alt="Uploaded" sx={{ maxHeight: 150, objectFit: 'contain' }} /> : 
                <CardMedia component="video" src={element.content} controls sx={{ maxHeight: 150, maxWidth: '100%' }} />
            ) : (
              <Typography color="textSecondary">Drop {isImage ? 'image' : 'video'} here or click</Typography>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ 
        background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 4
      }}>
        Ad Builder
      </Typography>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
       >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
         >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Ad Settings</Typography>
            <TextField
              fullWidth
              label="Ad Name"
              name="name"
              value={adSettings.name}
              onChange={handleSettingsChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Ad Type</InputLabel>
              <Select
                label="Ad Type"
                name="type"
                value={adSettings.type}
                onChange={handleSettingsChange}
              >
                <MenuItem value="banner">Banner</MenuItem>
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="popup">Popup</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Width (px)"
                  name="width"
                  type="number"
                  value={adSettings.width}
                  onChange={handleSettingsChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Height (px)"
                  name="height"
                  type="number"
                  value={adSettings.height}
                  onChange={handleSettingsChange}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 2, mb: 3 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <TemplateIcon sx={{ mr: 1 }} />
                    <Typography>Templates</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ maxHeight: 200, overflowY: 'auto' }}>
                    {MOCK_TEMPLATES.map(template => (
                        <Button 
                            key={template.id} 
                            fullWidth 
                            variant="outlined" 
                            onClick={() => handleLoadTemplate(template)}
                            sx={{ mb: 1, justifyContent: 'flex-start' }}
                         >
                           {template.name}
                        </Button>
                    ))}
                </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Add Elements</Typography>
            <Grid container spacing={1}>
              {elementTypes.map((elType) => (
                <Grid item xs={4} key={elType.id}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => addElement(elType.id)}
                    startIcon={elType.icon}
                    sx={{ flexDirection: 'column', height: 80, textAlign: 'center' }} 
                  >
                    {elType.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Ad Canvas ({adSettings.width}x{adSettings.height})</Typography>
                 <Box>
                    <Button 
                        variant="outlined"
                        startIcon={<PreviewIcon />}
                        onClick={handlePreview}
                        sx={{ mr: 1 }}
                    >
                        Preview
                    </Button>
                    <Button 
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={loading}
                        sx={{
                            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                            '&:hover': {
                            background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Ad'}
                    </Button>
                </Box>
            </Box>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Ad saved successfully!</Alert>}

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="canvas">
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      border: '1px solid #ccc',
                      minHeight: '300px',
                      flexGrow: 1,
                      overflowY: 'auto',
                      p: 1,
                      background: '#f9f9f9',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {elements.length === 0 && (
                      <Box sx={{ 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          textAlign: 'center', 
                          p: 2 
                         }}>
                        <Typography color="text.secondary">
                          Add elements from the toolbar or select a template to begin.
                        </Typography>
                      </Box>
                    )}
                    {elements.map((element, index) => (
                      <Draggable key={element.id} draggableId={element.id} index={index}>
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ 
                                p: 1,
                                mb: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                             }}
                            elevation={2}
                          >
                            <Box sx={{ flexGrow: 1, mr: 1 }}>
                                {renderElement(element)} 
                            </Box>
                            <IconButton size="small" onClick={() => removeElement(element.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Paper>
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

      {previewOpen && <PreviewDialog />}
    </Container>
  );
};

export default AdBuilder; 