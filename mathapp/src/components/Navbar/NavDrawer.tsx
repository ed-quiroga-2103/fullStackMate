import {
    Box,
    Button,
    Center,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Icon,
    Text,
    Stack,
} from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/user';
import { Cookies } from 'react-cookie';

interface NavDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const NavDrawer: FunctionComponent<NavDrawerProps> = ({
    isOpen,
    onOpen,
    onClose,
}) => {
    const btnRef = React.useRef();
    const user = useSelector(getUser);
    const cookies = new Cookies();
    const mochi = cookies.get('mochi');

    const history = useHistory();
    return (
        <>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize="3xl">Math app</DrawerHeader>
                    {mochi ? (
                        <Box bg="gray.900" width="100%" height="100px">
                            <Flex
                                height="100%"
                                justify="center"
                                alignSelf="center"
                            >
                                <Center>
                                    <Stack justify="center">
                                        <Flex justify="center">
                                            <Icon
                                                color="white"
                                                boxSize={8}
                                                as={MdAccountCircle}
                                            />
                                        </Flex>
                                        <Text color="white">{user.name}</Text>
                                    </Stack>
                                </Center>
                            </Flex>
                        </Box>
                    ) : undefined}
                    <Button
                        fontSize="xl"
                        colorScheme="gray"
                        variant="outline"
                        onClick={() => {
                            history.push('/home');
                        }}
                    >
                        Principal
                    </Button>
                    <Button
                        fontSize="xl"
                        colorScheme="gray"
                        variant="outline"
                        onClick={() => {
                            history.push('/profile');
                        }}
                    >
                        Perfil
                    </Button>
                    <Button
                        colorScheme="gray"
                        variant="outline"
                        fontSize="xl"
                        onClick={() => {
                            history.push('/contact');
                        }}
                    >
                        Contacto
                    </Button>

                    <Button
                        colorScheme="gray"
                        variant="outline"
                        fontSize="xl"
                        onClick={() => {
                            history.push('/about');
                        }}
                    >
                        About
                    </Button>

                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default NavDrawer;
