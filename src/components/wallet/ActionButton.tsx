import { Button, Stack, Typography } from "@mui/material";
import {ReactNode} from "react";

const ActionButton = ({ icon, label, onClick }: {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
}) => {
    return (
        <Button
            variant="outlined"
            onClick={onClick}
            sx={{
                width: 100,
                height: 100,
                borderRadius: 2,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                textTransform: "none"
            }}
        >
            <Stack spacing={1} alignItems="center">
                {icon}
                <Typography variant="body2" fontWeight={500}>
                    {label}
                </Typography>
            </Stack>
        </Button>
    );
};

export default ActionButton;