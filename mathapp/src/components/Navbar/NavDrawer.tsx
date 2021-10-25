import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Stack
} from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Math app</DrawerHeader>
                    <Button colorScheme="gray" variant="outline" size="xs"  
                    onClick={() => {
                    history.push('/home');
                }}>
                        Principal
                    </Button>
                    <Button colorScheme="gray" variant="outline" size="xs"
                    onClick={() => {
                        history.push('/contact');
                    }}>
                        Contacto
                    </Button>
                    <Button colorScheme="gray" variant="outline" size="xs"
                    onClick={() => {
                        history.push('/profile');
                    }}>
                        Perfil
                    </Button>
                    <Button colorScheme="gray" variant="outline" size="xs"
                    onClick={() => {
                        history.push('/about');
                    }}>
                        About
                    </Button>
                   
                    <DrawerFooter>
                        
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default NavDrawer;