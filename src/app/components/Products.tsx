'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store/store';
import { setProducts,fetchProducts} from '../dashboard/products/product-slice';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Box, Link } from '@mui/material';
import { useTheme } from '@mui/material';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

const ProductsList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<{ id: number | null; title: string; price: number }>({ id: null, title: '', price: 0 });

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const isLoading = useSelector((state: RootState) => state.products.inProgress);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const openEditDialog = (productId: number, title: string, price: number) => {
    setEditProduct({ id: productId, title, price });
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditProduct({ id: null, title: '', price: 0 });
    setIsEditDialogOpen(false);
  };

  const openDeleteDialog = (productId: number) => {
    setDeleteProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteProductId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const theme = useTheme();
  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        List
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          typography: 'body1',
          '& > :not(style) ~ :not(style)': {
            ml: 2,
          },
        }}>
        <Link href="/dashboard" color="primary" underline="hover">Dashboard</Link>
        <Link href="/dashboard/products" underline="hover">Products</Link>
        <Link href="/" color="primary" underline="always">List</Link>
      </Box>
      {isLoading && <h5>Loading. Please wait...</h5>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell><img src={product.images} height={100} width={100} /></TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>
                  <Button onClick={() => openEditDialog(product.id, product.title, product.price)} style={{ color: theme.palette.secondary.main }}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => openDeleteDialog(product.id)} style={{ color: theme.palette.primary.main }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <DeleteProduct
        deleteProductId={deleteProductId}
        isDeleteDialogOpen={isDeleteDialogOpen}
        closeDeleteDialog={closeDeleteDialog}
        fetchProducts={fetchProducts}
      />
      <EditProduct
        productId={editProduct.id}
        title={editProduct.title}
        price={editProduct.price}
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        fetchProducts={fetchProducts}
      />
    </Container>
  );
};

export default ProductsList;
