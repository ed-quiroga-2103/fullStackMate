import { Container, Center, Heading, VStack, Text,StackDivider, Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface LandingProps {}
function Feature({title, desc} : {title:any,desc:any}) {
    return (
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    )
  }
const Landing: FunctionComponent<LandingProps> = () => {
    const history = useHistory();
    return (
        <> <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}> 
        <Center>
                <Heading>APP Math</Heading>
            </Center>
       <Container>            
            <Feature
        title="¿Qué somos?"
        desc="Es un proyecto de la escuela de matemática del ITCR para
        facilicar el aprendizaje de los cursos de la escuela."
      />
      <Feature
        title="¿En qué te servirá?"
        desc="En está página encontrará toda la materia, práctica y ejercicios
        necesarios para el curso."
      /></Container> 
        <Heading>Proyecto de la Escuela de Matemática, ITCR</Heading>
            </VStack>
        </>
    );
};

export default Landing;