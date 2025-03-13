
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import { GiHamburgerMenu } from "react-icons/gi";
import Link from 'next/link'; // Import Link from Next.js for routing
import { AppDispatch, RootState } from '../../../../lib/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LogOut } from '../../../../lib/redux/actions/user';
import { resetRole } from '../../../../lib/redux/slices/Role';
import { resetBooking } from '../../../../lib/redux/slices/Mybookings';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';
interface sidebaritems {
    text: string,
    path: string,
    icon: any
}

export default function Sidebar() {
    const dispatch = useDispatch<AppDispatch>()

    const [open, setOpen] = useState(false);
    const { profile, erroruser, loading } = useSelector((state: RootState) => state.user)
    const [items, setitems] = useState<sidebaritems[]>(
        [
            { text: 'Home', path: '/', icon: <HomeIcon /> },
            { text: 'Hospitals', path: '/RapidHostpital/Hospitals', icon: <LocalHospitalIcon /> },
            { text: 'Consult', path: '#', icon: <EmailIcon /> },
            { text: 'Privacy Policy', path: '#', icon: <DraftsIcon /> },
        ])

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    // useEffect(() => {
    //     if (profile.id !== "") {
    //         setitems((prev) => {
    //             return [...prev,
    //             { text: 'My Bookings', path: '/RapidHostpital/Mybookings', icon: <HomeIcon /> },
    //             { text: 'Logout', path: '/RapidHostpital/Hospitals', icon: <LocalHospitalIcon /> },
    //             ]
    //         })
    //     }
    // }, [profile])

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {items.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} href={item.path}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>

                <ListItem disablePadding>
                    <ListItemButton component={Link} href={'/RapidHostpital/Mybookings'} >
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Bookings"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                        () => {
                            dispatch(LogOut())
                            dispatch(resetRole())
                            dispatch(resetBooking())
                        }

                    }} >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={"LogOut"} />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );

    return (
        <div className="lg:hidden p-0 m-0">
            <Button className="w-fit p-0 m-0" onClick={toggleDrawer(true)}>
                <GiHamburgerMenu size={25} color="teal" />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

