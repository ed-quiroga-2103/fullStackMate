import { AspectRatio, Center, Heading } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface LandingProps { }

const Landing: FunctionComponent<LandingProps> = () => {
    const property = {
        videoUrl: "https://www.youtube.com/embed/QhBnZ6NPOY0",
        name: "Math",
    }
    const history = useHistory();
    return (
        <>  <Center>
            <Heading>{property.name}</Heading>
        </Center>
            <AspectRatio maxW="560px" ratio={1} mx="auto" >
                <iframe
                    title={property.name}
                    src={property.videoUrl}
                    allowFullScreen
                />
            </AspectRatio>
        </>
    );
};

export default Landing;