'use client'
import { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Link, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material";
import CreateCategory from "@/app/components/CreateCategory";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchCategories } from "./category-slice";
import EditCategory from "@/app/components/EditCategory";
import DeleteCategory from "@/app/components/DeleteCategory";

const CategoryListPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newImage, setNewImage] = useState("");
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.category.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openDeleteDialog = (categoryId: number) => {
        setDeleteCategoryId(categoryId);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteCategoryId(null);
        setIsDeleteDialogOpen(false);
    };

    const openEditDialog = (categoryId: number, name: string) => {
        setEditCategoryId(categoryId);
        setNewCategoryName(name);
        setIsEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setEditCategoryId(null);
        setNewCategoryName("");
        setIsEditDialogOpen(false);
    };

    const theme = useTheme();

    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                Categories
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    typography: "body1",
                    "& > :not(style) ~ :not(style)": {
                        ml: 2,
                    },
                }}
            >
                <Link href="/dashboard" color="primary" underline="hover">
                    Dashboard
                </Link>
                <Link href="/" color="primary" underline="always">
                    Categories
                </Link>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <img src={category.image} height={100} width={100} />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => openEditDialog(category.id, category.name)}
                                            style={{ color: theme.palette.secondary.main }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => openDeleteDialog(category.id)}
                                            style={{ color: theme.palette.primary.main }}
                                        >
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
                    count={categories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <DeleteCategory
                categoryId={deleteCategoryId}
                isOpen={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
                fetchCategories={fetchCategories}
            />
            <EditCategory
                categoryId={editCategoryId}
                title={newCategoryName}
                image={newImage}
                isOpen={isEditDialogOpen}
                onClose={closeEditDialog}
                fetchCategories={fetchCategories}
            />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ display: "grid" }}
            >
                <Grid item xs={3}>
                    <CreateCategory />
                </Grid>
            </Grid>
        </Container>
    );
};

export default CategoryListPage;
