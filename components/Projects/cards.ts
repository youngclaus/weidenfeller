export interface Card {
  title: string;
  description: string;
  image: string;
}

export const cards: Card[] = [
  //2019
  {
    title: 'Stevens Institute of Technology',
    description: 'B.E. Computer Engineering',
    image: '/Projects/2019_stevens.jpg'
  },
  {
    title: 'Solidworks Drone Design',
    description: 'Graphical engineering class project. Developed a functioning drone schematic in Solidworks.',
    image: '/Projects/2019_drone.png'
  },
  {
    title: 'Robotics Final Project',
    description: 'Tasked with building and configuring an Arduino robot to navigate through a randomized course using inconsistent sensors. It was a test of troublehsooting and patience.',
    image: '/Projects/2019_robot.jpg'
  },
  {
    title: 'C++ Final Project',
    description: 'Text-based RPG. Hundreds of lines of story text and a fully developed backend with OOP and base-level reasoning. (Roughly 10 minutes of playtime!).',
    image:'/Projects/2019_final_project.png'
  },
  {
    title: 'Python Final Project',
    description: 'Moderately similar to C++ Project but with developed solo instead.',
    image:'/Projects/2019_python_project.png'
  },
  //2020
  {
    title: 'Arduino Weather Sensor',
    description: 'Tasked with building a weather-proof weather sensor to leave outside and remotely collect data to measure air quality and make educated weather predictions based on patterns.',
    image:'/Projects/2020_arduino.png'
  },
  {
    title: '3D Printed Baby Yoda',
    description: 'The Child',
    image:'/Projects/2020_design.png'
  },
  {
    title: 'C++ Artist-Album Analyzer',
    description: 'Used Spotify API to get entire discography of any Spotify-listed artist (precursor to future projects).',
    image:'/Projects/2020_spotify.png'
  },
  //2021
  {
    title: 'Amplifier with Filters',
    description: 'Did not get to make a physical device in this class at all because of COVID.',
    image:'/Projects/2021_filters.png'
  },
  {
    title: 'Binary Tree Project',
    description: 'Not for the faint of heart (This includes queues, stacks, and lists as well).',
    image:'/Projects/2021_binary_tree.png'
  },
  //2022
  {
    title: 'Image Deconstruction',
    description: 'Done with Matlab. Introduction to what I would be doing post-grad.',
    image:'/Projects/2022_matlab_image.png'
  },
  {
    title: 'Omnet Simulation',
    description: 'Cool class but never needed to use Omnet again after this.',
    image:'/Projects/2022_omnet_sim.png'
  },
  {
    title: 'Music Playback Program',
    description: 'Made a rudimentary version of Windows Media Player in C++. The timeline for the project was ultimately cut short.',
    image:'/Projects/2022_c++_final.png'
  },
  {
    title: 'Spotify Analysis Program',
    description: 'Python program that shows the hidden numbers behind any song in the Spotify database - I used this as a foundation in a separate music recommendation app.',
    image:'/Projects/2022_python_final.png'
  },
  //2023
  {
    title: 'Allergenics V1',
    description: 'My Senior Project. A website that automatically finds the menus of the nearest 20 food vendors near the user, and highlights dishes that could potentially contain something the user is allergic to. Time constraints forced my team to take a hit to front-end design to ensure the product worked for the Stevens Design Expo.',
    image:'/Projects/2023_allergenics.png'
  },
  {
    title: 'Stevens Design Expo',
    description: 'Great success at the Design Expo. Industry leaders, company reps, and family of students were inputting their own allergies and successfully seeing results for places near the Stevens campus.',
    image:'/Projects/2023_allergenics.jpg'
  },
  //2024
  {
    title: 'Stevens Institute of Technology',
    description: 'Masters of Engineering in Applied Artificial Intelligence 2023-2024',
    image:'/Projects/2024_soccer.jpg'
  },
  {
    title: 'youngcla.us',
    description: 'This is my creative outlet - not a professional portfolio.',
    image:'/Projects/2024_website.png'
  },

]
