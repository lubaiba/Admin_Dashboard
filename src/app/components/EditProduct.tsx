import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchProducts,updateProduct } from '../dashboard/products/product-slice';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@mui/material';

const EditProduct = ({ productId, title, price, isOpen, onClose }:any) => {
  const [newProductTitle, setNewProductTitle] = useState(title);
  const [newProductPrice, setNewProductPrice] = useState(price);
  const dispatch = useDispatch<AppDispatch>();

const handleUpdateProduct = async () => {
    try {
      if (productId) {
          await dispatch(updateProduct({ id: productId, title: newProductTitle, price: newProductPrice }));
          dispatch(fetchProducts());
          onClose();
    } 
    }catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={newProductTitle}
          onChange={(e) => setNewProductTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Price"
          fullWidth
          type="number"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(parseFloat(e.target.value))}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateProduct} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;
