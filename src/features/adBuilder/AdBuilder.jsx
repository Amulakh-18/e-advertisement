import { useState } from 'react';
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
} from '@mui/material';
import {
  Image as ImageIcon,
  TextFields,
  VideoLibrary,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const AdBuilder = () => {
  const [elements, setElements] = useState([]);
  const [adSettings, setAdSettings] = useState({
    name: '',
    type: 'banner',
    width: 728,
    height: 90,
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
        height: type === 'text' ? 'auto' : '100px',
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ad Builder
      </Typography>

      <Grid container spacing={3}>
        {/* Ad Settings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
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
          <Paper sx={{ p: 2 }}>
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
              p: 2,
              minHeight: '400px',
              border: '2px dashed #ccc',
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
                              border: '1px solid #ddd',
                              borderRadius: 1,
                              backgroundColor: '#fff',
                              position: 'relative',
                            }}
                          >
                            {element.type === 'text' ? (
                              <TextField
                                fullWidth
                                multiline
                                value={element.content}
                                onChange={(e) =>
                                  updateElement(element.id, {
                                    content: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              <Box
                                sx={{
                                  height: '100px',
                                  backgroundColor: '#f5f5f5',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {element.type === 'image' ? (
                                  <ImageIcon />
                                ) : (
                                  <VideoLibrary />
                                )}
                              </Box>
                            )}
                            <IconButton
                              size="small"
                              sx={{ position: 'absolute', top: 8, right: 8 }}
                              onClick={() => removeElement(element.id)}
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

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={() => setElements([])}>
              Clear
            </Button>
            <Button variant="contained" color="primary">
              Save Ad
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdBuilder; 