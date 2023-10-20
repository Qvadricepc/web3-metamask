import {
     Box,
} from '@mui/material';
import {Navbar} from "./components/navbar.tsx";
import {Wallet} from "./components/wallet.tsx";

export const  App = () => {
    return (
        <Box>
            <Navbar/>
            <Wallet />
        </Box>
    );
}
