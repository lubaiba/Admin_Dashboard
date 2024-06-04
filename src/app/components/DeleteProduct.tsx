import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import { deleteProduct} from '../dashboard/products/product-slice';
import { fetchProducts } from '../dashboard/products/product-slice';

const DeleteProduct = ({ deleteProductId, isDeleteDialogOpen, closeDeleteDialog}:any) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteProduct = async () => {
    try {
      if (deleteProductId) {
        dispatch(deleteProduct(deleteProductId));
        dispatch(fetchProducts());
        closeDeleteDialog();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>Are you sure you want to delete this product?</DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog} color="primary">Cancel</Button>
        <Button onClick={handleDeleteProduct} color="secondary">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProduct;
