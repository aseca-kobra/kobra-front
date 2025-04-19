import { Box } from "@mui/material";
import BalanceCard from "../components/wallet/BalanceCard.tsx";
import QuickActions from "../components/wallet/QuickActions.tsx";

const Home = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
            padding={4}
            alignSelf={"center"}
            width={"100%"}
        >
            <BalanceCard balance={1000} isLoading={false} />
            <QuickActions />
        </Box>
    );
};

export default Home;