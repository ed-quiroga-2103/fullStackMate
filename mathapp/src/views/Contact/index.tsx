import {
  Button, VStack, StackDivider, HStack, Stack, Heading, Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stat,
  StatLabel,
  StatNumber,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface LandingProps { }

const Landing: FunctionComponent<LandingProps> = () => {
  const history = useHistory();
  return (
    <>
      <Center>
        <Heading as="h3" size="lg">
          Contacto de Profesores
        </Heading></Center>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Profesor</Th>
              <Th>Correo</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Josue Araya</Td>
              <Td>josue@itcr.ac.cr</Td>
            </Tr>
            <Tr>
              <Td>Eduardo Quiroga</Td>
              <Td>eduardo@itcr.ac.cr</Td>
            </Tr>
            <Tr>
              <Td>Alberto Araya</Td>
              <Td>alberto@itcr.ac.cr</Td>
            </Tr>
          </Tbody>
        </Table> </VStack>
      <Center>
        <HStack spacing={100}>

          <Stack spacing={6}>
            <Heading as="h2" size="xl">
              ¿Tienes alguan duda?
            </Heading>
            <Heading as="h3" size="lg">
              Contactanos
            </Heading>
            <Stat>
              <StatLabel>Número</StatLabel>
              <StatNumber>2222-2222</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Correo</StatLabel>
              <StatNumber>contacto@itcr.ac.cr</StatNumber>
            </Stat>
          </Stack>
          <Stack spacing={6}>
            <FormControl id="text">
              <FormLabel>O dejanos tu comentario</FormLabel>
              <Input type="text" placeholder="Comentario" />
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={() => {
                history.push('/home');
              }}
            >
              Enviar
            </Button>
          </Stack></HStack>
      </Center>


    </>
  );
};

export default Landing;