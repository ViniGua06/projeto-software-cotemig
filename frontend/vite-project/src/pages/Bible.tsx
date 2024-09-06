import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export const Bible = () => {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);

  const [text, setText] = useState("");
  const [reference, setReference] = useState("");

  const [will, setWill] = useState(false);

  const fetchApi = async () => {
    const res = await fetch(
      `https://bible-api.com/${book}+${chapter}:${verse}`
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

      utterance.lang = "en";
      utterance.pitch = 1;
      utterance.rate = 1;

      if (!speechSynthesis.speaking) window.speechSynthesis.speak(utterance);
    } else {
      alert("Não é possivel reproduzir o áudio");
    }
  };

  return (
    <>
      <Header></Header>
      <Main>
        <ChooseContainer>
          <LabelInputContainer>
            <Label>Livro</Label>
            <Select value={book} onChange={(e) => setBook(e.target.value)}>
              <option value="">Selecione um livro</option>
              <option value="Genesis">Gênesis</option>
              <option value="Exodus">Êxodo</option>
              <option value="Leviticus">Levítico</option>
              <option value="Numbers">Números</option>
              <option value="Deuteronomy">Deuteronômio</option>
              <option value="Joshua">Josué</option>
              <option value="Judges">Juízes</option>
              <option value="Ruth">Rute</option>
              <option value="1Samuel">1 Samuel</option>
              <option value="2Samuel">2 Samuel</option>
              <option value="1Kings">1 Reis</option>
              <option value="2Kings">2 Reis</option>
              <option value="1Chronicles">1 Crônicas</option>
              <option value="2Chronicles">2 Crônicas</option>
              <option value="Ezra">Esdras</option>
              <option value="Nehemiah">Neemias</option>
              <option value="Esther">Ester</option>
              <option value="Job">Jó</option>
              <option value="Psalms">Salmos</option>
              <option value="Proverbs">Provérbios</option>
              <option value="Ecclesiastes">Eclesiastes</option>
              <option value="Song of Solomon">Cântico dos Cânticos</option>
              <option value="Isaiah">Isaías</option>
              <option value="Jeremiah">Jeremias</option>
              <option value="Lamentations">Lamentações</option>
              <option value="Ezekiel">Ezequiel</option>
              <option value="Daniel">Daniel</option>
              <option value="Hosea">Oséias</option>
              <option value="Joel">Joel</option>
              <option value="Amos">Amós</option>
              <option value="Obadiah">Obadias</option>
              <option value="Jonah">Jonas</option>
              <option value="Micah">Miquéias</option>
              <option value="Nahum">Naum</option>
              <option value="Habakkuk">Habacuque</option>
              <option value="Zephaniah">Sofonias</option>
              <option value="Haggai">Ageu</option>
              <option value="Zechariah">Zacarias</option>
              <option value="Malachi">Malaquias</option>

              <option value="Matthew">Mateus</option>
              <option value="Mark">Marcos</option>
              <option value="Luke">Lucas</option>
              <option value="John">João</option>
              <option value="Acts">Atos</option>
              <option value="Romans">Romanos</option>
              <option value="1Corinthians">1 Coríntios</option>
              <option value="2Corinthians">2 Coríntios</option>
              <option value="Galatians">Gálatas</option>
              <option value="Ephesians">Efésios</option>
              <option value="Philippians">Filipenses</option>
              <option value="Colossians">Colossenses</option>
              <option value="1Thessalonians">1 Tessalonicenses</option>
              <option value="2Thessalonians">2 Tessalonicenses</option>
              <option value="1Timothy">1 Timóteo</option>
              <option value="2Timothy">2 Timóteo</option>
              <option value="Titus">Tito</option>
              <option value="Philemon">Filemom</option>
              <option value="Hebrews">Hebreus</option>
              <option value="James">Tiago</option>
              <option value="1Peter">1 Pedro</option>
              <option value="2Peter">2 Pedro</option>
              <option value="1John">1 João</option>
              <option value="2John">2 João</option>
              <option value="3John">3 João</option>
              <option value="Jude">Judas</option>
              <option value="Revelation">Apocalipse</option>
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

  &: hover {
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

  &: hover {
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

const Select = styled.select`
  height: 50%;
  width: 100%;
  border-inline: none;
  border-top: none;
  outline: none;
  background: transparent;
`;

const Input = styled.input`
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
  color: black;
  padding-inline: 1.9rem;
  padding-bottom: 1.9rem;
`;

const Reference = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  width: 100%;
  font-size: 1.3rem;
`;

const Verse = styled.div`
  display: flex;
  height: 80%;
  overflow-y: auto;

  font-size: 2rem;
  text-align: center;
`;