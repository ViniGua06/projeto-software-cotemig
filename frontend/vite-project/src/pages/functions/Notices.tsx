import styled from "styled-components";
import url from "../../assets/urlBackend";
import { useSelector } from "react-redux";
import { userSelect } from "../../redux/user/slice";
import { churchSelect } from "../../redux/church/slice";
import { useEffect, useState } from "react";
import { NoticesContainer } from "../../components/NoticesCard";

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
      console.log("OLA", error);
    }
  };

  useEffect(() => {
    getNotices();
  }, []);
  return (
    <>
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
                    text={item.text}
                    author={item.user_id}
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
  padding: 3rem 22rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
`;

const FirstSection = styled.div`
  width: 100%;
  height: 10%;
  border: solid 1px;
  display: grid;
  place-items: center;
`;

const SecondSection = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: auto;
`;
