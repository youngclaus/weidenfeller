import styled from 'styled-components';

const Timeline = () => {
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

  return (
    <TimelineContainer>
      {years.map((year, index) => (
        <YearSection key={index}>
          <Year>{year}</Year>
        </YearSection>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;

const TimelineContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll; /* Enables scrolling */
  scroll-snap-type: y mandatory; /* Enables vertical scroll snapping */
  -ms-overflow-style: none;  /* Hide scrollbar in Internet Explorer and Edge */
  scrollbar-width: none;  /* Hide scrollbar in Firefox */
  &::-webkit-scrollbar {
    display: none;  /* Hide scrollbar in WebKit browsers */
  }
`;

const YearSection = styled.div`
  width: 100vw;
  height: 100vh; /* Each section takes up the full viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start; /* Ensures each section snaps into view */
  background-color: ${({ theme }) => theme.bodyBg};
`;

const Year = styled.h2`
  font-family: "DM Mono", monospace;
  font-size: 6rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;
