import { HamburgerIcon } from '@chakra-ui/icons';
import { Center, Flex, GridItem } from '@chakra-ui/layout';
import { Grid, IconButton, useDisclosure, Heading } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { isLogged, login } from '../../redux/logged';
import NavDrawer from './NavDrawer';
import { useHistory } from 'react-router-dom';

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const cookies = new Cookies();
    const dispatch = useDispatch();
    if (cookies.get('mochi')) {
        dispatch(login());
    }

    const logged = useSelector(isLogged);

    return (
        <>
            <NavDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            <Grid templateColumns="repeat(3,1fr)" bg="gray.900" padding="10px">
                <GridItem colSpan={1}>
                    <Flex h="100%">
                        <IconButton
                            marginTop="auto"
                            marginBottom="auto"
                            variant="outline"
                            colorScheme="alphaBlack"
                            color="white"
                            aria-label="Drawer Control"
                            icon={<HamburgerIcon />}
                            onClick={onOpen}
                        />
                    </Flex>
                </GridItem>
                <GridItem colSpan={1}>
                    <Center>
                    <Heading  color="gray.500" onClick={() => {
                history.push('/home');
            }}>APP Math</Heading>
                    </Center>
                </GridItem>
            </Grid>
        </>
    );
};

export default Navbar;