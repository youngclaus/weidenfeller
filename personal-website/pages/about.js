import styled from 'styled-components';
import Header from '../components/Header';
import Timeline from '../components/Timeline';

const About = () => {
    return (
        <Container>
            <Header />
            <Timeline />
        </Container>

    )
}

export default About;

const Container = styled.div`
    display: flex;
`;