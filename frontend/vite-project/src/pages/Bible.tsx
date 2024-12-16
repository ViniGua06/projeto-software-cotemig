import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import ApiService from "../services/Api.service";

export const Bible = () => {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);

  const [text, setText] = useState("");
  const [reference, setReference] = useState("");

  const [will, setWill] = useState(false);

  const api = ApiService();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };

  useEffect(() => {
    api.fetchUserInfo();
    api.testToken();
  }, []);

  const fetchApi = async () => {
    const res = await fetch(
      `https://bible-api.com/${book}+${chapter}:${verse}?translation=almeida`
    );

    const data = await res.json();

    if (res.ok) {
      setText(data.text);
      setReference(data.reference);
    } else {
      setText("Não achado!");
    }
  };

  useEffect(() => {
    if (book.trim() !== "") {
      fetchApi();
    }
  }, [book, chapter, verse, will]);

  const increase = () => {
    setVerse((prev) => prev + 1);

    if (text === "Não achado!") {
      setVerse(1);

      setChapter((prev) => prev + 1);

      setWill(true);
    }
  };

  const decrease = () => {
    if (verse - 1 > 1 || verse - 1 == 1) {
      setVerse((prev) => prev - 1);
    }
  };

  const speak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = "pt-br";
      utterance.pitch = 1;
      utterance.rate = 1;

      if (!speechSynthesis.speaking) window.speechSynthesis.speak(utterance);
    } else {
      alert("Não é possivel reproduzir o áudio");
    }
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <Main>
        <ChooseContainer>
          <LabelInputContainer>
            <Label>Livro</Label>
            <Select value={book} onChange={(e) => setBook(e.target.value)}>
              <Options value="">Selecione um livro</Options>
              <Options value="Gênesis">Gênesis</Options>
              <Options value="Êxodo">Êxodo</Options>
              <Options value="Levítico">Levítico</Options>
              <Options value="Números">Números</Options>
              <Options value="Deuteronômio">Deuteronômio</Options>
              <Options value="Josué">Josué</Options>
              <Options value="Juízes">Juízes</Options>
              <Options value="Rute">Rute</Options>
              <Options value="1 Samuel">1 Samuel</Options>
              <Options value="2 Samuel">2 Samuel</Options>
              <Options value="1 Reis">1 Reis</Options>
              <Options value="2 Reis">2 Reis</Options>
              <Options value="1 Crônicas">1 Crônicas</Options>
              <Options value="2 Crônicas">2 Crônicas</Options>
              <Options value="Esdras">Esdras</Options>
              <Options value="Neemias">Neemias</Options>
              <Options value="Ester">Ester</Options>
              <Options value="Jó">Jó</Options>
              <Options value="Salmos">Salmos</Options>
              <Options value="Provérbios">Provérbios</Options>
              <Options value="Eclesiastes">Eclesiastes</Options>
              <Options value="Cântico dos Cânticos">Cântico dos Cânticos</Options>
              <Options value="Isaías">Isaías</Options>
              <Options value="Jeremias">Jeremias</Options>
              <Options value="Lamentações">Lamentações</Options>
              <Options value="Ezequiel">Ezequiel</Options>
              <Options value="Daniel">Daniel</Options>
              <Options value="Oséias">Oséias</Options>
              <Options value="Joel">Joel</Options>
              <Options value="Amós">Amós</Options>
              <Options value="Obadias">Obadias</Options>
              <Options value="Jonas">Jonas</Options>
              <Options value="Miquéias">Miquéias</Options>
              <Options value="Naum">Naum</Options>
              <Options value="Habacuque">Habacuque</Options>
              <Options value="Sofonias">Sofonias</Options>
              <Options value="Ageu">Ageu</Options>
              <Options value="Zacarias">Zacarias</Options>
              <Options value="Malaquias">Malaquias</Options>
              <Options value="Mateus">Mateus</Options>
              <Options value="Marcos">Marcos</Options>
              <Options value="Lucas">Lucas</Options>
              <Options value="João">João</Options>
              <Options value="Atos">Atos</Options>
              <Options value="Romanos">Romanos</Options>
              <Options value="1 Coríntios">1 Coríntios</Options>
              <Options value="2 Coríntios">2 Coríntios</Options>
              <Options value="Gálatas">Gálatas</Options>
              <Options value="Efésios">Efésios</Options>
              <Options value="Filipenses">Filipenses</Options>
              <Options value="Colossenses">Colossenses</Options>
              <Options value="1 Tessalonicenses">1 Tessalonicenses</Options>
              <Options value="2 Tessalonicenses">2 Tessalonicenses</Options>
              <Options value="1 Timóteo">1 Timóteo</Options>
              <Options value="2 Timóteo">2 Timóteo</Options>
              <Options value="Tito">Tito</Options>
              <Options value="Filemom">Filemom</Options>
              <Options value="Hebreus">Hebreus</Options>
              <Options value="Tiago">Tiago</Options>
              <Options value="1 Pedro">1 Pedro</Options>
              <Options value="2 Pedro">2 Pedro</Options>
              <Options value="1 João">1 João</Options>
              <Options value="2 João">2 João</Options>
              <Options value="3 João">3 João</Options>
              <Options value="Judas">Judas</Options>
              <Options value="Apocalipse">Apocalipse</Options>
            </Select>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label>Capítulo</Label>
            <Input
              type="number"
              value={chapter}
              onChange={(e) => setChapter(parseInt(e.target.value))}
            ></Input>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label>Versículo</Label>
            <Input
              type="number"
              value={verse}
              onChange={(e) => setVerse(parseInt(e.target.value))}
            ></Input>
          </LabelInputContainer>
        </ChooseContainer>
        <TextContainer>
          <Reference>{reference}</Reference>
          <Verse>{text}</Verse>
        </TextContainer>
        <IncreaseAndDecreaseContainer>
          <IncreaseButton onClick={increase}>+</IncreaseButton>
          <DecreaseButton onClick={decrease}>-</DecreaseButton>
        </IncreaseAndDecreaseContainer>
        <Microphone onClick={speak}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            height={"100%"}
            width={"100%"}
          >
            <path d="M192 0C139 0 96 43 96 96l0 160c0 53 43 96 96 96s96-43 96-96l0-160c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40z" />
          </svg>
        </Microphone>
      </Main>
    </>
  );
};

const Microphone = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 3rem;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const IncreaseAndDecreaseContainer = styled.div`
  width: 60px;
  height: 120px;
  position: absolute;
  right: 1.1rem;
  bottom: 3rem;
`;

const IncreaseButton = styled.div`
  width: 100%;
  height: 50%;
  background-color: green;
  color: white;
  display: grid;
  place-items: center;
  font-size: 4rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(102, 255, 102, 1);
  }
`;

const DecreaseButton = styled.div`
  width: 100%;
  height: 50%;
  background-color: red;
  color: white;
  display: grid;
  place-items: center;
  font-size: 4rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 102, 102, 1);
  }
`;

const Main = styled.main`
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-inline: 5rem;
  gap: 2rem;
`;

const ChooseContainer = styled.div`
  width: 100%;
  background-color: whitesmoke;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-block: 2rem;
`;

const Options = styled.option`
`;

const LabelInputContainer = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Label = styled.h2`
  color: black;
`;

export const Select = styled.select`
  height: 50%;
  width: 100%;
  border-inline: none;
  font-size: 1rem;
  border-top: none;
  outline: none;
  background: transparent;
`;

export const Input = styled.input`
  height: 50%;
  width: 100%;
  border-inline: none;
  border-top: none;
  outline: none;
  background: transparent;
`;

const TextContainer = styled.section`
  width: 100%;
  height: 60%;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: black;
  padding-inline: 1.9rem;
  padding-bottom: 1.9rem;
`;

const Reference = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  margin-top: 1rem;
  width: 100%;
  font-size: 1.3rem;
`;

const Verse = styled.div`
  display: flex;
  height: 80%;
  margin-top: 1rem;
  overflow-y: auto;
  font-size: 2rem;
  text-align: justify;
`;
