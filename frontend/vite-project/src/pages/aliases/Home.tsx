import { useState } from "react";
import Header from "../../components/Header";
import { HomeMain } from "../../components/HomeMain";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <HomeMain></HomeMain>
    </>
  );
};

export default Home;
