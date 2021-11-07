import { StarIcon } from '@chakra-ui/icons';
import {
    Button,
    Center,
    Circle,
    Container,
    Flex,
    FormControl,
    FormHelperText,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
} from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';
import { useCookies } from 'react-cookie';
import { MdAccountCircle } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import auth from '../../lib/auth';
import { setUser } from '../../redux/user';

interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
    const [show, setShow] = React.useState(false);
    const [email, setStateEmail] = React.useState('');
    const [password, setStatePassword] = React.useState('');
    const handleClick = () => setShow(!show);
    const history = useHistory();

    const dispatch = useDispatch();

    const [mochi, setCookie, removeCookie] = useCookies(['mochi']);

    return (
        <Container padding={2} bg="gray.800" borderRadius={15}>
            <Stack padding={15} spacing={5} bg="white" borderRadius={15}>
                <Flex justify="center">
                    <Circle w={20} h={20} bg="gray.800">
                        <Icon color="white" boxSize={20} as={MdAccountCircle} />
                    </Circle>
                </Flex>
                <Center>
                    <Flex alignItems="center" justifyContent="center">
                        <FormControl id="email">
                            <Text fontSize="lg">Correo electrónico</Text>
                            <Input
                                size="lg"
                                placeholder="Correo"
                                type="email"
                                value={email}
                                onChange={(event) => {
                                    setStateEmail(event.target.value);
                                }}
                            />
                            <FormHelperText>
                                Use el correo institucional.
                            </FormHelperText>

                            <Text fontSize="lg" marginTop={3}>
                                Contraseña
                            </Text>
                            <InputGroup size="lg">
                                <Input
                                    pr="4.5rem"
                                    type={show ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event) => {
                                        setStatePassword(event.target.value);
                                    }}
                                    placeholder="Contraseña"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={handleClick}
                                        marginRight={2}
                                    >
                                        {show ? 'Ocultar' : 'Mostrar'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </Flex>
                </Center>
                <Center>
                    <Button
                        colorScheme="blue"
                        onClick={async () => {
                            const response = await auth.login(email, password);

                            if (response?.data.token) {
                                setCookie('mochi', response.data.token);

                                const userResponse = await auth.me(
                                    email,
                                    response.data.token
                                );
                                dispatch(setUser(userResponse.data.user));
                            }

                            history.push('/home');
                        }}
                    >
                        Ingresar
                    </Button>
                </Center>
            </Stack>
        </Container>
    );
};

export default Landing;
