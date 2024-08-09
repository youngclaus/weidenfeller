import styled from 'styled-components';

const Right  = () => {
    return (
        <Container>
            <MixtapeContainer>
                <img src="/mixtape_about.png" alt="mixtape_about" width='300px' height='300px' />
            </MixtapeContainer>
        </Container>
    );
};

export default Right;

const Container = styled.div`
    position: inherit;
    width: 30%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const MixtapeContainer = styled.div`
    background: rgba(255, 255, 255, 0.2);
    height: 100%;
`