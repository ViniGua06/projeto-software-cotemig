import styled from "styled-components";
import url from "../../assets/urlBackend";
import { useSelector } from "react-redux";
import { userSelect } from "../../redux/user/slice";
import { churchSelect } from "../../redux/church/slice";
import { useEffect, useState } from "react";
import { NoticesContainer } from "../../components/NoticesCard";
import Header from "../../components/Header";

export const Notices = () => {
  const { user_id } = useSelector(userSelect);
  const { church_id } = useSelector(churchSelect);

  const [notices, setNotices] = useState([]);

  const getNotices = async () => {
    try {
      const res = await fetch(`${url}/notices/${parseInt(church_id)}`);

      const data = await res.json();

      if (res.status == 200) {
        setNotices(data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    getNotices();
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <Main>
        <Container>
          <FirstSection>
            <h1>
              Avisos: {""}
              {notices.length == 0 ? <>Nenhum</> : notices.length}
            </h1>
          </FirstSection>
          <SecondSection>
            {notices.map((item: any) => {
              return (
                <>
                  <NoticesContainer
                    id={item.id}
                    userid={parseInt(user_id)}
                    text={item.text}
                    author={item.user_id}
                    aware={item.aware}
                  ></NoticesContainer>
                </>
              );
            })}
          </SecondSection>
        </Container>
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding: 2rem 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const FirstSection = styled.div`
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0460a0;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;


  & h1{
    color: white;
  }
`;

const SecondSection = styled.div`
  width: 100%;
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0460a0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #eaeaea;
  }
`;