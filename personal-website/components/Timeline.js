import styled from 'styled-components';

const Timeline = () => {
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

  return (
    <TimelineContainer>
      {years.map((year, index) => (
        <YearContainer key={index}>
          <Year>{year}</Year>
        </YearContainer>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  scroll-snap-type: y mandatory; /* Enables vertical scroll snapping */
  overflow-y: scroll; /* Enables scrolling */
  scroll-behavior: smooth; /* Smooth scrolling behavior */
`;

const YearContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Each year takes up the full viewport height */
  scroll-snap-align: start; /* Ensures each year snaps into view */
  width: 100%; /* Make sure the container takes up the full width */
`;

const Year = styled.h2`
  font-family: "DM Mono", monospace;
  font-size: 5rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;
