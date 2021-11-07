import {
    Button,
    Box,
    Image,
    Table,
    Thead,
    Tbody,
    Center,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import config from '../../config';
import { getUser } from '../../redux/user';
interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
    const user = useSelector(getUser);

    return (
        <>
            <Center>
                <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                >
                    <Image src={config.PLACEHOLDER_IMAGE} />

                    <Box p="6">
                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {user.name + ' ' + user.lastName}
                        </Box>

                        <Box>
                            {user.dni}
                            <Box as="span" color="gray.600" fontSize="sm"></Box>
                        </Box>
                    </Box>
                </Box>
            </Center>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Curso</Th>
                        <Th>Profesor</Th>
                        <Th>Nota</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Matemática General</Td>
                        <Td>Eduardo Quiroga</Td>
                        <Td>85</Td>
                    </Tr>
                    <Tr>
                        <Td>Cálculo Diferencial e Integral</Td>
                        <Td>Alberto Araya</Td>
                        <Td>90</Td>
                    </Tr>
                    <Tr>
                        <Td>Algebra Lineal</Td>
                        <Td>Eduardo Quiroga</Td>
                        <Td>85</Td>
                    </Tr>
                </Tbody>
            </Table>
        </>
    );
};

export default Landing;
