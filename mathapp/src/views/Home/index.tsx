
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Heading, Text, Button, HStack, Stack, Center } from "@chakra-ui/react";

interface LandingProps { }


const Landing: FunctionComponent<LandingProps> = () => {
    const history = useHistory();
    return (
        <>
            <Center>
                <Stack spacing={50}>
                    <HStack spacing={6}>
                        <Box
                            w="30%"
                            borderRadius="sm"
                            background="#bcbcbc"
                            boxShadow="md"
                            _hover={{ background: "#999999" }}
                        >
                            <Box p={6}>
                                <Center>
                                    <Heading as="h3" size="lg" color="gray.500">
                                        Matemática General.
                                    </Heading>
                                </Center>
                                <Center>
                                    <Text fontSize={["lg", "xl"]}>
                                        Grupo
                                    </Text>
                                    </Center>
                                <Center>
                                    <Button size="md" mt="5" color="black" bg="gray.500" borderRadius="none" onClick={() => {
                                        history.push('/graph');
                                    }}>
                                        Ir a Curso
                                    </Button>
                                </Center>
                            </Box>
                        </Box>
                        <Box
                            w="30%"
                            borderRadius="sm"
                            background="#bcbcbc"
                            boxShadow="md"
                            _hover={{ background: "#999999" }}
                        >
                            <Box p={6}>
                                <Center>
                                    <Heading as="h3" size="lg" color="gray.500">
                                        Cálculo Diferencial e Integral.
                                    </Heading>
                                </Center>
                                <Center>
                                    <Text fontSize={["lg", "xl"]}>
                                        Grupo
                                    </Text></Center>
                                <Center>
                                    <Button size="md" mt="5" color="black" bg="gray.500" borderRadius="none" 
                                    onClick={() => {
                                        history.push('/graph');
                                    }}>
                                        Ir a Curso
                                    </Button>
                                </Center>
                            </Box>
                        </Box>
                        <Box
                            w="30%"
                            borderRadius="sm"
                            background="#bcbcbc"
                            boxShadow="md"
                            _hover={{ background: "#999999" }}
                        >
                            <Box p={6}>
                                <Center>
                                    <Heading as="h3" size="lg" color="gray.500">
                                        Algebra Lineal.
                                    </Heading>
                                </Center>
                                <Center>
                                    <Text fontSize={["lg", "xl"]}>
                                        Grupo
                                    </Text>
                                </Center>
                                <Center>
                                    <Button size="md" mt="5" color="black" bg="gray.500" borderRadius="none" 
                                    onClick={() => {
                                        history.push('/graph');
                                    }}>
                                        Ir a Curso
                                    </Button>
                                </Center>
                            </Box>
                        </Box>
                        

                    </HStack>
                    <HStack spacing={6}>
                    <Box
                            w="30%"
                            borderRadius="sm"
                            background="#bcbcbc"
                            boxShadow="md"
                            _hover={{ background: "#999999" }}
                        >
                            <Box p={6}>
                                <Center>
                                    <Heading as="h3" size="lg" color="gray.500">
                                        Cálculo Superior.
                                    </Heading>
                                </Center>
                                <Center>
                                    <Text fontSize={["lg", "xl"]}>
                                        Grupo
                                    </Text>
                                </Center>
                                <Center>
                                    <Button size="md" mt="5" color="black" bg="gray.500" borderRadius="none" 
                                    onClick={() => {
                                        history.push('/graph');
                                    }}>
                                        Ir a Curso
                                    </Button>
                                </Center>
                            </Box>
                        </Box>
                        <Box
                            w="30%"
                            borderRadius="sm"
                            background="#bcbcbc"
                            boxShadow="md"
                            _hover={{ background: "#999999" }}
                        >
                            <Box p={6}>
                                <Center>
                                    <Heading as="h3" size="lg" color="gray.500">
                                        Ecuaciones Diferenciales.
                                    </Heading>
                                </Center>
                                <Center>
                                    <Text fontSize={["lg", "xl"]}>
                                        Grupo
                                    </Text>
                                </Center>
                                <Center>
                                    <Button size="md" mt="5" color="black" bg="gray.500" borderRadius="none" 
                                    onClick={() => {
                                        history.push('/graph');
                                    }}>
                                        Ir a Curso
                                    </Button>
                                </Center>
                            </Box>
                        </Box>
                        <Box
                            w="30%"
                            borderRadius="sm"
                            background="#bcbcbc"
                            boxShadow="md"
                            _hover={{ background: "#999999" }}
                        >
                            <Box p={6}>
                                <Center>
                                    <Heading as="h3" size="lg" color="gray.500">
                                        Métodos Numéricos.
                                    </Heading>
                                </Center>
                                <Center>
                                    <Text fontSize={["lg", "xl"]}>
                                        Grupo
                                    </Text>
                                </Center>
                                <Center>
                                    <Button size="md" mt="5" color="black" bg="gray.500" borderRadius="none" 
                                    onClick={() => {
                                        history.push('/graph');
                                    }}>
                                        Ir a Curso
                                    </Button>
                                </Center>
                            </Box>
                        </Box>
                       

                    </HStack></Stack></Center>

        </>
    );
};

export default Landing;



