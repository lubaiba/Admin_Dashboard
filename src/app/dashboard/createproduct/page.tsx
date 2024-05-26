'use client'
import { useState } from 'react';
import { Container, Typography, TextField, Button,Box ,Link} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addNewProduct} from '../products/product-slice';
import { AppDispatch } from '@/app/store/store';
export default function CreateProductPage () {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategory] = useState<number>(0);
  const [description,setDescription]=useState<string>('');
  const [images,setImages]=useState<string[]>([]);
  const dispatch=useDispatch<AppDispatch>();
    const handleCreateProduct = async ($e:any) => {
      $e.preventDefault();
      try {
        await dispatch(addNewProduct({title,price,categoryId,description,images}));
        router.push('/dashboard/products'); 
      } catch (error) {
        console.error('Error adding product:', error);
      }  
};
 
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
      Create a new product
      </Typography>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
      }}
    
    >
      <Link href="/dashboard" color="primary" underline="hover">Dashboard</Link>
      <Link href="/dashboard/products" underline="hover">Products</Link>
      <Link href="/"  color="primary" underline="always">New Product</Link>
     </Box>
      <TextField
        label="Product Name"
        fullWidth
        value={title}
        onChange={($e) => setTitle($e.target.value)}
        margin="normal"
      />
      <TextField
        label="Price"
        fullWidth
        value={price}
        type="number"
        onChange={($e) => setPrice(parseFloat($e.target.value))}
        margin="normal"
      />
      <TextField
        label="Category"
        fullWidth
        value={categoryId}
        onChange={($e) => setCategory(parseInt($e.target.value))}
        margin="normal"
      />
       <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={($e) => setDescription($e.target.value)}
        margin="normal"
      />
       <TextField
        label="Image URL"
        fullWidth
        value={images}
        onChange={($e) => setImages([$e.target.value])}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreateProduct}>
        Create
      </Button>
    </Container>
  );
};


