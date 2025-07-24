import { useState, useRef, useEffect } from "react"
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import { ShoppingCart, Add } from "@mui/icons-material"
import accessoryData from "./accessory.json"
import DataTable from "./components/DataTable"

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
})

function App() {
  // Load initial data from localStorage or use default values
  const loadFromLocalStorage = () => {
    try {
      const savedItems = localStorage.getItem('v-shop-cart')
      return savedItems ? JSON.parse(savedItems) : [
        { id: 1, name: "Door Visor", price: 100, quantity: 1, total: 100 },
        { id: 2, name: "Mud Flap", price: 200, quantity: 1, total: 200 },
      ]
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return [
        { id: 1, name: "Door Visor", price: 100, quantity: 1, total: 100 },
        { id: 2, name: "Mud Flap", price: 200, quantity: 1, total: 200 },
      ]
    }
  }

  const [price, setPrice] = useState(accessoryData[0].price)
  const [selectedItems, setSelectedItems] = useState(loadFromLocalStorage)
  const [filteredItems, setFilteredItems] = useState(loadFromLocalStorage)

  const quantityRef = useRef()
  const productRef = useRef()

  // Update filtered items when selectedItems changes
  useEffect(() => {
    setFilteredItems(selectedItems)
  }, [selectedItems])

  // Save to localStorage whenever selectedItems changes
  useEffect(() => {
    try {
      localStorage.setItem('v-shop-cart', JSON.stringify(selectedItems))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [selectedItems])

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      // If search is empty, show all items
      setFilteredItems(selectedItems)
    } else {
      // Filter items based on product name
      const filtered = selectedItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredItems(filtered)
    }
  }

  const updatePrice = (e) => {
    const productId = parseInt(e.target.value)
    const product = accessoryData.find((accessory) => accessory.id === productId)
    setPrice(product.price)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const productId = parseInt(productRef.current.value)
    const quantity = parseInt(quantityRef.current.value)

    const product = accessoryData.find((accessory) => accessory.id === productId)

    const order = {
      ...product,
      quantity: quantity,
      total: product.price * quantity,
    }

    setSelectedItems((prev) => [...prev, { ...order, id: Date.now() }])

    // Reset form
    quantityRef.current.value = ""
  }

  const getTotalAmount = () => {
    return selectedItems.reduce((total, item) => total + item.total, 0)
  }

  const handleDeleteItem = (itemId) => {
    setSelectedItems((prev) => prev.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setSelectedItems([])
    localStorage.removeItem('v-shop-cart')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            V-Shop
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Premium Car Accessories Store
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid xs={12} md={5}>
            <Card elevation={2}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={3}>
                  <Add sx={{ mr: 1 }} />
                  <Typography variant="h5" component="h2">
                    Add to Cart
                  </Typography>
                </Box>
                
                <Box component="form" onSubmit={handleSubmit}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Select Product</InputLabel>
                    <Select
                      inputRef={productRef}
                      onChange={updatePrice}
                      required
                      defaultValue={accessoryData[0].id}
                      label="Select Product"
                    >
                      {accessoryData.map((accessory) => (
                        <MenuItem key={accessory.id} value={accessory.id}>
                          {accessory.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box my={2}>
                    <Chip 
                      label={`Price: ฿${price.toLocaleString()}`}
                      color="secondary"
                      size="large"
                      sx={{ fontSize: '1rem', fontWeight: 600 }}
                    />
                  </Box>

                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    inputRef={quantityRef}
                    required
                    inputProps={{ min: 1 }}
                    margin="normal"
                    placeholder="Enter quantity"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    startIcon={<ShoppingCart />}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Table Section */}
          <Grid xs={12} md={7}>
            <Card elevation={2}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Box display="flex" alignItems="center">
                    <ShoppingCart sx={{ mr: 1 }} />
                    <Typography variant="h5" component="h2">
                      Shopping Cart
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    {selectedItems.length > 0 && (
                      <>
                        <Chip
                          label={`Total: ฿${getTotalAmount().toLocaleString()}`}
                          color="primary"
                          size="large"
                          sx={{ fontSize: '1rem', fontWeight: 600 }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={clearCart}
                          color="error"
                        >
                          Clear Cart
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
                <DataTable 
                  data={filteredItems} 
                  onDelete={handleDeleteItem} 
                  onSearch={handleSearch}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default App
