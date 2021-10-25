import { Button, Flex , Center, Input,
    FormControl,
    FormLabel,
    Stack,
    FormHelperText,
    InputGroup,
    InputRightElement,Spacer} from '@chakra-ui/react';
import React from 'react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

interface LandingProps {}

    
const Landing: FunctionComponent<LandingProps> = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const history = useHistory();
    return (
        <>
        <Stack spacing={5}>
        <Center>
        <Flex alignItems="center" justifyContent="center">
            <FormControl id="email">
            <FormLabel>Correo electrónico</FormLabel>
            <Input type="email" />
            <FormHelperText>Use el correo institucional.</FormHelperText>
            
            <InputGroup size="md">
            <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Contraseña"
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Ocultar" : "Mostrar"}
                </Button>
            </InputRightElement>
            </InputGroup>
            
            </FormControl>
           
            
        </Flex>
        </Center>
        <Center>
        <Button colorScheme="blue"
            onClick={() => {
                history.push('/home');
            }}>
                        Ingresar
            </Button>
        </Center></Stack>
        </>
    );
};

export default Landing;