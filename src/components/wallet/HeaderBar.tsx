import { AppBar, Box, Button, Toolbar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const HeaderBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <AppBar position="static" color="primary" elevation={1}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccountCircleIcon />
                    {/* <Typography variant="subtitle1">{user?.name}</Typography> */}
                </Box>
                <Button
                    color="inherit"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;
