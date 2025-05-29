import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Toolbar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeaderBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    return (
        <>
            <AppBar position="static" color="primary" elevation={1}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AccountCircleIcon />
                    </Box>
                    <Button
                        color="inherit"
                        onClick={handleOpenDialog}
                        startIcon={<LogoutIcon />}
                    >
                    </Button>
                </Toolbar>
            </AppBar>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>¿Cerrar sesión?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que querés cerrar sesión?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            handleCloseDialog();
                            logout();
                            navigate("/");
                        }}
                        color="error"
                    >
                        Cerrar sesión
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default HeaderBar;
