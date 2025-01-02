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
    description: 'Graphical engineering class project',
    image: '/Projects/2019_drone.png'
  },
  {
    title: 'Robotics Final Project',
    description: 'Tasked with building and configuring an Arduino robot to navigate through a randomized course using inconsistent sensors',
    image: '/Projects/2019_robot.jpg'
  },
  {
    title: 'C++ Final Project',
    description: 'Text-based RPG (Roughly 10 minutes of playtime!)',
    image:'/Projects/2019_final_project.png'
  },
  {
    title: 'Python Final Project',
    description: 'Moderately similar to C++ Project but with Pokemon instead',
    image:'/Projects/2019_python_project.png'
  },
  //2020
  {
    title: 'Arduino Weather Sensor',
    description: 'Tasked with building a weather-proof weather sensor to leave outside and remotely collect data to measure air quality and such',
    image:'/Projects/2020_arduino.png'
  },
  {
    title: '3D Printed Baby Yoda',
    description: 'The Child',
    image:'/Projects/2020_design.png'
  },
  {
    title: 'C++ Artist-Album Analyzer',
    description: 'Used Spotify API to get entire discography of any Spotify-listed artist (precursor to future projects)',
    image:'/Projects/2020_spotify.png'
  },
  //2021
  {
    title: 'Amplifier with Filters',
    description: 'Did not get to actually make a physical device because of COVID',
    image:'/Projects/2021_filters.png'
  },
  {
    title: 'Binary Tree Project',
    description: 'Not for the faint of heart (I would throw in queues, stacks, and lists as well)',
    image:'/Projects/2021_binary_tree.png'
  },
  //2022
  {
    title: 'Image Deconstruction',
    description: 'Done with Matlab; Introduction to what I would be doing post-grad',
    image:'/Projects/2022_matlab_image.png'
  },
  {
    title: 'Omnet Simulation',
    description: 'Cool class but never used Omnet again after this',
    image:'/Projects/2022_omnet_sim.png'
  },
  {
    title: 'Music Playback Program',
    description: 'Made a rudimentary version of Windows Media Player in C++ (the instructor gave us maybe two weeks for final project)',
    image:'/Projects/2022_c++_final.png'
  },
  {
    title: 'Spotify Analysis Program',
    description: 'Python program that shows the numbers behind any song in the Spotify database - I used this as a foundation in a separate music recommendation app',
    image:'/Projects/2022_python_final.png'
  },
  //2023
  {
    title: 'Allergenics',
    description: 'My pride and joy. A website that automatically researches the menus of the nearest 20 food vendors near the user, and highlights dishes that could potentially contain something the user is allergic to (the UI got a makeover after I was not under time constraints)',
    image:'/Projects/2023_allergenics.png'
  },
  {
    title: 'Stevens Design Expo',
    description: 'Great success at the Design Expo, attendees were inputting their own allergies and successfully seeing what they shouldn\'t eat near the Stevens campus',
    image:'/Projects/2023_allergenics.jpg'
  },
  //2024
  {
    title: 'Stevens Institute of Technology',
    description: 'M.E. Applied Artificial Intelligence',
    image:'/Projects/2024_soccer.jpg'
  },
  {
    title: 'youngcla.us',
    description: 'i think its pretty cool',
    image:'/Projects/2024_website.png'
  },

]