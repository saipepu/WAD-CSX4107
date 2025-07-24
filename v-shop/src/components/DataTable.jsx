import React, { useRef, useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  Container,
  Button,
  IconButton,
  TableSortLabel,
} from "@mui/material"
import { ShoppingCartOutlined, Delete } from "@mui/icons-material"

const DataTable = ({ data, onDelete, onSearch }) => {
  const sRef = useRef()
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key]
      let bValue = b[sortConfig.key]

      // Handle string sorting (for product names)
      if (sortConfig.key === 'name') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])

  const handleSearch = () => {
    const searchTerm = sRef.current.value
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  const handleDelete = (itemId) => {
    if (onDelete) {
      onDelete(itemId)
    }
  }

  if (data.length === 0) {
    return (
      <Container>
        <Box sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}>
          <input type="text" placeholder="Search..." ref={sRef} />{" "}
          <Button onClick={handleSearch}>Search</Button>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={6}
          sx={{ color: "text.secondary" }}
        >
          <ShoppingCartOutlined sx={{ fontSize: 80, mb: 2, opacity: 0.5 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1">Add some products to get started!</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Box sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}>
        <input type="text" placeholder="Search..." ref={sRef} />{" "}
        <Button onClick={handleSearch}>Search</Button>
      </Box>

      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel
                  active={sortConfig.key === 'name'}
                  direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Product
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel
                  active={sortConfig.key === 'price'}
                  direction={sortConfig.key === 'price' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('price')}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel
                  active={sortConfig.key === 'quantity'}
                  direction={sortConfig.key === 'quantity' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('quantity')}
                >
                  Qty
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel
                  active={sortConfig.key === 'total'}
                  direction={sortConfig.key === 'total' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('total')}
                >
                  Total
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item, index) => (
              <TableRow key={index} sx={{ "&:hover": { backgroundColor: "grey.50" } }}>
                <TableCell>
                  <Typography variant="body1" fontWeight={600}>
                    {item.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">฿{item.price.toLocaleString()}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.quantity}
                    size="small"
                    color="default"
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight={700} color="primary">
                    ฿{item.total.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    color="error"
                    size="small"
                    aria-label="delete item"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default DataTable
