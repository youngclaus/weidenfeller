import styled from 'styled-components';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const Timeline = () => {
  const timelineData = [
    {
      year: 2019,
      text: [
        { src: '/Projects/icon_c++.png', alt: 'C++' },
        { src: '/Projects/icon_solidworks.png', alt: 'SolidWorks' },
        { src: '/Projects/icon_arduino.png', alt: 'Arduino' },
        { src: '/Projects/icon_python.png', alt: 'Python' },
      ],
      images: [
        { src: '/Projects/2019_drone_design.png', description: 'SOLIDWORKS Drone Schematic', style: { left: '5%', top: '10%', transform: 'scale(.8)' } },
        { src: '/Projects/2019_drone.png', description: 'SOLIDWORKS Drone Design', style: { left: '3%', top: '50%', transform: 'scale(.8)' } },
        { src: '/Projects/2019_robot.jpg', description: 'Robotics Final Project', style: { left: '23%', top: '50%', transform: 'scale(.8)'} },
        { src: '/Projects/2019_final_project.png', id: 'linkimage', description: 'C++ Final Project', style: { left: '62%', top: '10%', transform: 'scale(.8)'}, link: 'https://github.com/youngclaus/klopp/tree/main/reus'},
        { src: '/Projects/2019_python_project.png', id: 'linkimage', description: 'Python Project', style: { left: '60%', top: '55%', transform: 'scale(.8)'}, link: 'https://github.com/youngclaus/klopp/tree/main/piszczek'},
      ],
    },
    {
      year: 2020,
      text: [
        { src: '/Projects/icon_solidworks.png', alt: 'SolidWorks' },
        { src: '/Projects/icon_arduino.png', alt: 'Arduino' },
        { src: '/Projects/icon_python.png', alt: 'Python' },
      ],
      images: [
        { src: '/Projects/2020_arduino.png', description: 'Arduino Weather Sensor', style: { left: '0%', top: '6%', transform: 'scale(.9)' } },
        { src: '/Projects/2020_design.png', description: '3-D Printer Baby Yoda', style: { left: '0%', top: '50%', transform: 'scale(.9)' } },
        { src: '/Projects/2020_labview.png', description: 'Weather Sensor Logic', style: { left: '20%', top: '60%', transform: 'scale(.8)'} },
        { src: '/Projects/2020_spotify.png', description: 'Spotify Album Analyzer', style: { left: '65%', top: '25%', transform: 'scale(1.1)'} },
      ],
    },
    {
      year: 2021,
      text: [
        { src: '/Projects/icon_matlab.png', alt: 'matlab' },
        { src: '/Projects/icon_c++.png', alt: 'c++' },
        { src: '/Projects/icon_python.png', alt: 'python' },
      ],
      images: [
        { src: '/Projects/2021_filters.png', description: 'Amplifier w/ Filters', style: { left: '0%', top: '10%', transform: 'scale(.8)' } },
        { src: '/Projects/2021_amp_final.png', description: 'Amplifier Design', style: { left: '-3%', top: '50%', transform: 'scale(.8)' } },
        { src: '/Projects/2021_queue.png', id: 'linkimage', description: 'Queues, Lists, Stacks', style: { left: '62%', top: '6%', transform: 'scale(.8)' }, link: 'https://github.com/youngclaus/klopp/tree/main/emrecan'},
        { src: '/Projects/2021_queue_example.png', id: 'linkimage', description: '', style: { left: '79%', top: '10%', transform: 'scale(.8)'}, link: 'https://github.com/youngclaus/klopp/tree/main/emrecan'},
        { src: '/Projects/2021_binary_tree_example.png', id: 'linkimage', description: 'Binary Tree', style: { left: '63%', top: '50%', transform: 'scale(.8)'}, link: 'https://github.com/youngclaus/klopp/tree/main/burki'},
        { src: '/Projects/2021_binary_tree.png', id: 'linkimage', description: '', style: { left: '78%', top: '55%', transform: 'scale(.8)'}, link: 'https://github.com/youngclaus/klopp/tree/main/burki'},
      ],
    },
    {
      year: 2022,
      text: [
        { src: '/Projects/icon_matlab.png', alt: 'matlab' },
        { src: '/Projects/icon_omnet.png', alt: 'omnet' },
        { src: '/Projects/icon_c++.png', alt: 'c++' },
        { src: '/Projects/icon_python.png', alt: 'python' },
      ],
      images: [
        { src: '/Projects/2022_matlab_image.png', description: 'Matlab Image Deconstruction', style: { left: '4%', top: '10%', transform: 'scale(1)' } },
        { src: '/Projects/2022_omnet_sim.png', description: 'Omnet Simulation', style: { left: '0%', top: '50%', transform: 'scale(1)' } },
        { src: '/Projects/2022_c++_schematic.png', id: 'linkimage', description: 'C++ Music Playback Project', style: { left: '55%', top: '5%', transform: 'scale(.8)'}, link: 'https://github.com/youngclaus/klopp/tree/main/moukoko'},
        { src: '/Projects/2022_c++_final.png', id: 'linkimage', description: '', style: { left: '75%', top: '20%', transform: 'scale(.8)' }, link: 'https://github.com/youngclaus/klopp/tree/main/moukoko'},
        { src: '/Projects/2022_python_code.png', id: 'linkimage', description: 'Python Spotify Analyzer', style: { left: '55%', top: '50%', transform: 'scale(.8)'}, link: 'https://github.com/youngclaus/klopp/tree/main/sahin'},
        { src: '/Projects/2022_python_final.png', id: 'linkimage', description: '', style: { left: '65%', top: '50%', transform: 'scale(.9)'}, link: 'https://github.com/youngclaus/klopp/tree/main/sahin'},
      ],
    },
    {
      year: 2023,
      id: '2023',
      text: [
        { src: '/Projects/icon_react.png', alt: 'react' },
        { src: '/Projects/icon_css.png', alt: 'css' },
        { src: '/Projects/icon_mongodb.png', alt: 'mongo' },
      ],
      images: [
        { src: '/Projects/2023_allergenics_code.png', id: 'linkimage', style: { left: '25%', top: '35%', transform: 'scale(2)'}, link: 'https://github.com/youngclaus/aubameyang'},
        { src: '/Projects/2023_allergenics.png', id: 'linkimage', description: 'Allergenics', style: { left: '8%', top: '20%', transform: 'scale(1.5)' }, link: 'https://github.com/youngclaus/aubameyang'},
        { src: '/Projects/2023_allergenics.jpg', description: 'Stevens Design Expo', style: { left: '70%', top: '40%', transform: 'scale(1)' } },
      ],
    },
    {
      year: 2024,
      text: [
        { src: '/Projects/icon_c++.png', alt: 'C++' },
        { src: '/Projects/icon_solidworks.png', alt: 'SolidWorks' },
        { src: '/Projects/icon_arduino.png', alt: 'Arduino' },
        { src: '/Projects/icon_python.png', alt: 'Python' },
        { src: '/Projects/icon_react.png', alt: 'react' },
        { src: '/Projects/icon_css.png', alt: 'css' },
        { src: '/Projects/icon_mongodb.png', alt: 'mongo' },
        { src: '/Projects/icon_matlab.png', alt: 'matlab' },
      ],
    },
  ];

  const sectionRefs = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);

  const scrollToNext = () => {
    if (currentSection < sectionRefs.current.length - 1) {
      const nextSection = sectionRefs.current[currentSection + 1];
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
        setCurrentSection((prevIndex) => prevIndex + 1);  // Update the index
      }
    }
  };

  const scrollToPrev = () => {
    if (currentSection > 0) {
      const nextSection = sectionRefs.current[currentSection - 1];
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
        setCurrentSection((prevIndex) => prevIndex - 1);  // Update the index
      }
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const newIndex = sectionRefs.current.findIndex(
      (ref) => ref.offsetTop > scrollPosition + 100  // Offset to trigger early
    );
    if (newIndex !== -1) {
      setCurrentSection(newIndex - 1);
    } else {
      setCurrentSection(sectionRefs.current.length - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <TimelineContainer>
      {timelineData.map((item, index) => (
        <YearSection key={index} id={item.id} ref={(el) => (sectionRefs.current[index] = el)}>
          <Year>{item.year}</Year>
          <TextBox>
            {item.text.map((img, imgIndex) => (
              <IconImage key={imgIndex} src={img.src} alt={img.alt} />
            ))}
          </TextBox>
          {item.year === 2024 && <Link href="/"><Text>this.</Text></Link>}
          {item.images && item.images.length > 0 && (
            item.images.map((image, imgIndex) => (
              <ImageContainer key={imgIndex} style={image.style}>
                {image.link ? (
                  <a href={image.link} target="_blank" rel="noopener noreferrer">
                    <Image id={image.id} src={image.src} alt={`${item.year} image`} />
                  </a>
                ) : (
                  <Image id={image.id} src={image.src} alt={`${item.year} image`} />
                )}
                {image.description && <Description>{image.description}</Description>}
              </ImageContainer>
            ))
          )}

        </YearSection>
      ))}
      <ScrollContainer>
        <ScrollButton onClick={scrollToPrev}>
          <img src="/Projects/icon_up.png" alt="Scroll Up"/>
        </ScrollButton>
        <ScrollButton onClick={scrollToNext} >
          <img src="/Projects/icon_down.png" alt="Scroll down" />
        </ScrollButton>
      </ScrollContainer>
    </TimelineContainer>
  );
};

export default Timeline;

const TimelineContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const YearSection = styled.div`
  width: 100vw;
  height: 100vh; 
  position: relative;
  scroll-snap-align: start;
  background-color: ${({ theme }) => theme.c1};
`;

const Year = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "DM Mono", monospace;
  font-size: 6rem;
  color: ${({ theme }) => theme.c4};
  margin: 0;
  z-index: 1;
`;

const TextBox = styled.div`
  position: absolute;
  top: calc(50% + 4rem);
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.c4};
  margin: 0;
  z-index: 2;
`;

const IconImage = styled.img`
  width: 50px;
  height: auto;
`;

const ImageContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  ${({ style }) => style}; // Allows custom positioning via inline styles

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  img {
    border: 2px solid ${({ theme }) => theme.c2};
    border-radius: 8px;
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-bottom: 8px;
  }

  p {
    margin: 0;
    font-family: "DM Mono", monospace;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.c4};
    text-align: center;
  }
`;

const Image = styled.img`
  max-width: 80%;
  max-height: 50vh;
  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.c2};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

  &#linkimage:hover {
    transform: scale(1.01);
    filter: brightness(0.95) drop-shadow(0 0 20px ${({ theme }) => theme.glow });
  }
`;

const Description = styled.p`
  margin-top: 10px;
  font-family: "DM Mono", monospace;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.c4};
  text-align: center;
`;

const Text = styled.h3`
  position: absolute;
  top: calc(50% + 10rem);
  left: 50%;
  transform: translate(-50%, 0);
  font-family: "DM Mono", monospace;
  font-size: 2rem;
  color: ${({ theme }) => theme.c4};
  margin: 0;
  z-index: 3;

  &:hover {
    font-style: oblique;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  position: fixed;
  width: 200px;
  height: 100px;
  bottom: 2%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: space-between;
  align-items: center;
  animation: pulse 5s infinite;

  img {
    position: absolute;
    width: 90px;
    height: 90px;
    top: 50%;
    transform: translate(-9%, -50%);
    z-index: 10;
  }
`

const ScrollButton = styled.button`
  display: flex;
  width: 87px;
  height: 87px;
  background: ${({theme}) => theme.c1};
  border-radius: 50%;
  border: none;
  z-index: 10;

  &:hover {
    background: ${({theme}) => theme.c3};
  }
`;


