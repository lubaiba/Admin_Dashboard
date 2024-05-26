import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductService } from "../services/product-service";
import { useDispatch } from "react-redux";
import { addNewCategory } from "../dashboard/category/category-slice";
import { AppDispatch } from "../store/store";
export default function CreateCategory() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const dispatch=useDispatch<AppDispatch>();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateCategory = async ($e: any) => {
    $e.preventDefault();
    try {
      await dispatch(addNewCategory({name,image}));
      router.push("/dashboard/category");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label="New Category Name"
              fullWidth
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              label="image"
              fullWidth
              value={image}
              onChange={(e: any) => setImage(e.target.value)}
              margin="normal"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateCategory} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
