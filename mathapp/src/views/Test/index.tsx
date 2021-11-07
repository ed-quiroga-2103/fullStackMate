import { Radio, Stack, Box, Text, Center, RadioGroup, Button, HStack, Heading } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import React from "react";
interface LandingProps { }

const Landing: FunctionComponent<LandingProps> = () => {
    const property = {
        pregunta: "Por un bolso hemos pagado 50 euros, más el 21% de IVA. ¿Cuánto hemos tenido que pagar en total?",
        numero: "1",
        respuesta: 1
    }
    const history = useHistory();
    const [value, setValue] = React.useState("0")
    return (

        <>  <Center><Heading>Pregunta {property.numero}</Heading>
        </Center>
            <Center>

                <Box maxW="l" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Text noOfLines={2}>{property.pregunta}</Text>

                    <RadioGroup onChange={setValue} value={value}>
                        <Stack>
                            <Radio size="md" name="1" colorScheme="gray" value="1">
                                Opción 1
                            </Radio>
                            <Radio size="md" name="1" colorScheme="gray" value="2">
                                Opción 2
                            </Radio>
                            <Radio size="md" name="1" colorScheme="gray" value="3">
                                Opción 3
                            </Radio>
                            <Radio size="md" name="1" colorScheme="gray" value="4">
                                Opción 4
                            </Radio>
                        </Stack>
                    </RadioGroup >
                </Box>
            </Center>
            <Center>
                <HStack spacing={25}>
                    <Button colorScheme="blue"
                        onClick={() => {
                            history.push('/home');
                        }}>
                        Anterior
                    </Button>
                    <Button colorScheme="blue"
                        onClick={() => {
                            history.push('/home');
                        }}>
                        Siguiente
                    </Button>
                </HStack>
            </Center>
        </>
    );
};

export default Landing;