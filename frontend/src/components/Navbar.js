import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ()=>{
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h2" component="div" sx={{flexGrou:1}}>
                    <Button color="inherit" component={Link} to="/">
                        CarMarketplace
                    </Button>
                </Typography>
                <Button color="inherit" component={Link} to="/cars">
                    Cars
                </Button>
                <Button color="inherit" component={Link} to="/applications">
                    Applications
                </Button>

                <Button color="inherit" component={Link} to="/profile">
                    Profile
                </Button>

                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>

            </Toolbar>
        </AppBar>
    );
}
export default Navbar;