import { Button, Box, Image, Table,
    Thead,
    Tbody,
    Center,
    Tr,
    Th,
    Td, } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface LandingProps {}

const Landing: FunctionComponent<LandingProps> = () => {
    const property = {
        imageUrl: "data:image/jpeg;base64,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",
        carnet: 2017103205,
        name: "Josue Araya",
        subject: "Ecuaciones Diferenciales",
      }

    const history = useHistory();
    return (
        <>
        <Center>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl}  />

      <Box p="6">
        

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.name}
        </Box>

        <Box>
          {property.carnet}
          <Box as="span" color="gray.600" fontSize="sm">
          </Box>
        </Box>
      </Box>
    </Box></Center>
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