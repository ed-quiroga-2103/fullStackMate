
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
interface LandingProps { }

const Landing: FunctionComponent<LandingProps> = () => {
    const history = useHistory();
    return (
        <> Aqui el grafo:)
        </>
    );
};

export default Landing;