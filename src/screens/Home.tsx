import {
    Box,
} from "@mui/material";

import BalanceCard from "../components/wallet/BalanceCard.tsx";
import QuickActions from "../components/wallet/QuickActions.tsx";
import TransactionSection from "../components/wallet/TransactionSection.tsx";
import HeaderBar from "../components/wallet/HeaderBar.tsx";

const Home = () => {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                justifyContent: "center",
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={4}
                padding={0}
                alignSelf="center"
                maxWidth="600px"
                margin="0 auto"
            >
                <HeaderBar />
                <BalanceCard />
                <QuickActions />
                <TransactionSection />
            </Box>
        </Box>
    );
};

export default Home;
