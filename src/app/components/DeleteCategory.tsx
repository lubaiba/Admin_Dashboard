import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { deleteCategory, fetchCategories } from '@/app/dashboard/category/category-slice';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';

interface DeleteCategoryProps {
    categoryId: number | null;
    isOpen: boolean;
    onClose: () => void;
    fetchCategories:()=>void;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({ categoryId, isOpen, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleDeleteCategory = async () => {
        try {
            if (categoryId) {
                await dispatch(deleteCategory(categoryId));
                dispatch(fetchCategories());
                onClose();
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this category?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDeleteCategory} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCategory;
