export type PlanetDataItemType = {
  name: string;
  nickName: string;
  hasRing: boolean;
  background: string;
  tagline: string;
  lengthOfYear: string;
}

export type PlanetDataType = PlanetDataItemType[];

export const planets: PlanetDataType = [
  {
    name: "Mercury",
    nickName: "The Swift Planet",
    hasRing: false,
    background: require("../../assets/Images/mercury_bg.jpg"),
    tagline: 'Mercury is the closest planet to the sun, but ice exists on it.',
    lengthOfYear: '88 Earth days',
  },
  {
    name: "Venus",
    nickName: "The Morning star",
    hasRing: false,
    background: require("../../assets/Images/venus_bg.jpg"),
    tagline: 'Venus is the hottest planet in the solar system.',
    lengthOfYear: '225 Earth days',
  },
  {
    name: "Earth",
    nickName: "The Blue planet",
    hasRing: false,
    background: require("../../assets/Images/earth_bg.jpg"),
    tagline: 'Earth’s atmosphere protects us from meteoroids and radiation from the Sun.',
    lengthOfYear: '365.24 days',
  },
  {
    name: "Mars",
    nickName: "The Red planet",
    hasRing: false,
    background: require("../../assets/Images/mars_bg.jpg"),
    tagline: 'There have been more missions to Mars than any other planet.',
    lengthOfYear: '1.9 Earth years',
  },
  {
    name: "Jupiter",
    nickName: "The Gaint planet",
    hasRing: false,
    background: require("../../assets/Images/jupiter_bg.jpg"),
    tagline: 'Jupiter has more than double the mass of all the other planets combined.',
    lengthOfYear: '11.9 Earth years',
  },
  {
    name: "Saturn",
    nickName: "The Ringed planet",
    hasRing: true,
    background: require("../../assets/Images/saturn_bg.jpg"),
    tagline: 'Saturn has more moons than any other planet in the Solar System.',
    lengthOfYear: '29.5 Earth years',
  },
  {
    name: "Uranus",
    nickName: "The Ice giant",
    hasRing: false,
    background: require("../../assets/Images/uranus_bg.jpg"),
    tagline: 'Uranus has only been visited by a single spacecraft, Voyager 2.',
    lengthOfYear: '84.0 Earth years',
  },
  {
    name: "Neptune",
    nickName: "The Big blue planet",
    hasRing: true,
    background: require("../../assets/Images/neptune_bg.jpg"),
    tagline: 'It takes more than 4 hours for light to reach Neptune from the Sun.',
    lengthOfYear: '164.8 Earth years',
  },
];
