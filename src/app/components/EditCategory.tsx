import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { updateCategory, fetchCategories } from '@/app/dashboard/category/category-slice';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@mui/material';

interface EditCategoryProps {
    categoryId: number | null;
    title: string;
    image:string;
    isOpen: boolean;
    onClose: () => void;
    fetchCategories:()=>void;
}

const EditCategory: React.FC<EditCategoryProps> = ({ categoryId, title,image, isOpen, onClose }) => {
    const [newCategoryName, setNewCategoryName] = useState(title);
    const [newImage,setNewImage]=useState(image);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setNewCategoryName(title);
    }, [title]);

    const handleUpdateCategory = async () => {
        try {
            if (categoryId) {
                await dispatch(updateCategory({ id: categoryId, name: newCategoryName ,image:newImage}));
                dispatch(fetchCategories());
                onClose();
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Image"
                    fullWidth
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdateCategory} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCategory;
