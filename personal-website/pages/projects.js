import styled from 'styled-components';
import Header from '../components/Header';
import Timeline from '../components/Timeline';

const Projects = () => {
    return (
        <Container>
            <Header />
            <Timeline />
        </Container>

    )
}

export default Projects;

const Container = styled.div`
    display: flex;
`;
