export interface Card {
  title: string;
  description: string;
  image: string;
  year: number;

  technologies: string[];
  githubLink?: string;
  role?: string;
  duration?: string;
}

export const cards: Card[] = [
  //2025
  {
    title: 'Allergenics V2',
    description: 'Current W.I.P. Complete rework from the ground-up. Changed codebase to Next.js from base React, introduced Tailwind, adding A.I. model to backend.',
    image:'/Projects/2025_allergenics.png',
    year: 2025,
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'PostCSS', 'Typescript'],
    githubLink: '',
    role: '',
    duration: '',
  },
  {
    title: 'Banking Application',
    description: 'Participated in brief trial with a startup in NYC. Tasked with building a banking application from scratch. Built on Python, React, PostgreSQL, Grafana, Prometheus, Tempo, and ran through Docker build. One of the most valuable parts of this project was designing the backend to handle both ORM and raw SQL operations.',
    image: '/Projects/2025_banking_application.png',
    year: 2025,
    technologies: [],
    githubLink: '',
    role: 'Gen AI Engineer (Trial Contract)',
    duration: 'Feb 2025 - March 2025',
  },
  //2024
  {
    title: 'Stevens Institute of Technology',
    description: 'Masters of Engineering in Applied Artificial Intelligence',
    image:'/Projects/2024_soccer.jpg',
    year: 2024,
    technologies: [],
    githubLink: '',
    role: '',
    duration: 'Sep 2023 - May 2024',
  },
  {
    title: 'youngcla.us',
    description: 'My new creative outlet.',
    image:'/Projects/2024_website.png',
    year: 2024,
    technologies: [],
    githubLink: 'https://github.com/youngclaus/weidenfeller',
    role: '',
    duration: 'Actively Maintained',
  },
  //2023
  {
    title: 'Stevens Institute of Technology',
    description: 'B.E. Computer Engineering',
    image: '/Projects/2019_stevens.jpg',
    year: 2023,
    technologies: [],
    githubLink: '',
    role: '',
    duration: 'Sep 2019 - May 2023',
  },
  {
    title: 'Allergenics V1',
    description: 'My Senior Project. A website that automatically finds the menus of the nearest 20 food vendors near the user, and highlights dishes that could potentially contain something the user is allergic to. Time constraints forced my team to take a hit to front-end design to ensure the product worked for the Stevens Design Expo.',
    image:'/Projects/2023_allergenics.png',
    year: 2023,
    technologies: [],
    githubLink: '',
    role: '',
    duration: 'Sep 2022 - May 2023',
  },
  {
    title: 'Stevens Design Expo',
    description: 'Great success at the Design Expo. Industry leaders, company reps, and family of students were inputting their own allergies and successfully seeing results for places near the Stevens campus.',
    image:'/Projects/2023_allergenics.jpg',
    year: 2023,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  //2022
  {
    title: 'Image Deconstruction',
    description: 'Done with Matlab. Introduction to what I would be doing post-grad.',
    image:'/Projects/2022_matlab_image.png',
    year: 2022,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  {
    title: 'Omnet Simulation',
    description: 'Cool class but never needed to use Omnet again after this.',
    image:'/Projects/2022_omnet_sim.png',
    year: 2022,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  {
    title: 'Music Playback Program',
    description: 'Made a rudimentary version of Windows Media Player in C++. The timeline for the project was ultimately cut short.',
    image:'/Projects/2022_c++_final.png',
    year: 2022,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  {
    title: 'Spotify Analysis Program',
    description: 'Python program that shows the hidden numbers behind any song in the Spotify database - I used this as a foundation in a separate music recommendation app.',
    image:'/Projects/2022_python_final.png',
    year: 2022,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  //2021
  {
    title: 'Amplifier with Filters',
    description: 'Did not get to make a physical device in this class at all because of COVID.',
    image:'/Projects/2021_filters.png',
    year: 2021,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  {
    title: 'Binary Tree Project',
    description: 'Not for the faint of heart (This includes queues, stacks, and lists as well).',
    image:'/Projects/2021_binary_tree.png',
    year: 2021,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  //2020
  {
    title: 'Arduino Weather Sensor',
    description: 'Tasked with building a weather-proof weather sensor to leave outside and remotely collect data to measure air quality and make educated weather predictions based on patterns.',
    image:'/Projects/2020_arduino.png',
    year: 2020,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  {
    title: '3D Printed Baby Yoda',
    description: 'The Child',
    image:'/Projects/2020_design.png',
    year: 2020,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  {
    title: 'C++ Artist-Album Analyzer',
    description: 'Used Spotify API to get entire discography of any Spotify-listed artist (precursor to future projects).',
    image:'/Projects/2020_spotify.png',
    year: 2020,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  //2019
  {
    title: 'Solidworks Drone Design',
    description: 'Graphical engineering class project. Developed a functioning drone schematic in Solidworks.',
    image: '/Projects/2019_drone.png',
    year: 2019,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  {
    title: 'Robotics Final Project',
    description: 'Tasked with building and configuring an Arduino robot to navigate through a randomized course using inconsistent sensors. It was a test of troublehsooting and patience.',
    image: '/Projects/2019_robot.jpg',
    year: 2019,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  {
    title: 'C++ Final Project',
    description: 'Text-based RPG. Hundreds of lines of story text and a fully developed backend with OOP and base-level reasoning. (Roughly 10 minutes of playtime!).',
    image:'/Projects/2019_final_project.png',
    year: 2019,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  {
    title: 'Python Final Project',
    description: 'Moderately similar to C++ Project but with developed solo instead.',
    image:'/Projects/2019_python_project.png',
    year: 2019,
    technologies: [],
    githubLink: '',
    role: '',
    duration: '',
  },
  
  
  
  
  
  

]
