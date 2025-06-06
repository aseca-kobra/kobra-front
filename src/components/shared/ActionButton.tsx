import { Button, Stack, Typography } from "@mui/material";
import {ReactNode} from "react";

interface ActionButtonProps {
    icon: ReactNode;
    name: string;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}

const ActionButton = ({ icon, name, label, onClick, disabled }: ActionButtonProps) => {
    return (
        <Button
            name={name}
            variant="outlined"
            onClick={onClick}
            disabled={disabled}
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