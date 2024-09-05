import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export const Bible = () => {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");

  const [text, setText] = useState("");
  const [reference, setReference] = useState("");

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
    if (book.trim() !== "" && chapter.trim() !== "" && verse.trim() !== "") {
      fetchApi();
    }
  }, [book, chapter, verse]);

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
              onChange={(e) => setChapter(e.target.value)}
            ></Input>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label>Versículo</Label>
            <Input
              type="number"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
            ></Input>
          </LabelInputContainer>
        </ChooseContainer>
        <TextContainer>
          <Reference>{reference}</Reference>
          <Verse>{text}</Verse>
        </TextContainer>
      </Main>
    </>
  );
};

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
  height: 100%;
  background: whitesmoke;
  color: black;
  padding-inline: 1.9rem;
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
  justify-content: flex-end;
  align-items: center;
  font-size: 2rem;
  text-align: center;
`;
