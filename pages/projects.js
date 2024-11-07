import styled from 'styled-components';
import Timeline from '../components/Projects/Timeline';

const Projects = () => {
    return (
        <Container className="projects-container">
            <Timeline />
        </Container>
    )
}

export default Projects;

const Container = styled.div`
    display: flex;
    user-select: none;
    -webkit-user-drag: none;
`;
