import styled from "styled-components";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { churchSelect } from "../../redux/church/slice";
import url from "../../assets/urlBackend";
import { desativar } from "../../redux/modal/slice";

export const SetDailyVerseForm = () => {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [verseFromApi, setVerseFromApi] = useState("");

  const { church_id } = useSelector(churchSelect);
  const dispatch = useDispatch();

  const fetchBibleApi = async () => {
    try {
      const res = await fetch(
        `https://bible-api.com/${book}+${chapter}:${verse}?translation=almeida`
      );

      const data = await res.json();

      if (res.ok) setVerseFromApi(`${data.reference} - ${data.text}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (book.trim() != "" && chapter != "" && verse != "") fetchBibleApi();
  }, [book, chapter, verse]);

  const setDailyVerse = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/church/${church_id}/setverse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          verse: verseFromApi,
        }),
      });

      if (res.status == 200) {
        alert("Versículo diário atualizado com sucesso!");
        dispatch(desativar());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DailyVerseForm onSubmit={setDailyVerse}>
        <Label>Livro</Label>
        <Select value={book} onChange={(e) => setBook(e.target.value)}>
          <option value="">Selecione um livro</option>
          <option value="Gênesis">Gênesis</option>
          <option value="Êxodo">Êxodo</option>
          <option value="Levítico">Levítico</option>
          <option value="Números">Números</option>
          <option value="Deuteronômio">Deuteronômio</option>
          <option value="Josué">Josué</option>
          <option value="Juízes">Juízes</option>
          <option value="Rute">Rute</option>
          <option value="1 Samuel">1 Samuel</option>
          <option value="2 Samuel">2 Samuel</option>
          <option value="1 Reis">1 Reis</option>
          <option value="2 Reis">2 Reis</option>
          <option value="1 Crônicas">1 Crônicas</option>
          <option value="2 Crônicas">2 Crônicas</option>
          <option value="Esdras">Esdras</option>
          <option value="Neemias">Neemias</option>
          <option value="Ester">Ester</option>
          <option value="Jó">Jó</option>
          <option value="Salmos">Salmos</option>
          <option value="Provérbios">Provérbios</option>
          <option value="Eclesiastes">Eclesiastes</option>
          <option value="Cântico dos Cânticos">Cântico dos Cânticos</option>
          <option value="Isaías">Isaías</option>
          <option value="Jeremias">Jeremias</option>
          <option value="Lamentações">Lamentações</option>
          <option value="Ezequiel">Ezequiel</option>
          <option value="Daniel">Daniel</option>
          <option value="Oséias">Oséias</option>
          <option value="Joel">Joel</option>
          <option value="Amós">Amós</option>
          <option value="Obadias">Obadias</option>
          <option value="Jonas">Jonas</option>
          <option value="Miquéias">Miquéias</option>
          <option value="Naum">Naum</option>
          <option value="Habacuque">Habacuque</option>
          <option value="Sofonias">Sofonias</option>
          <option value="Ageu">Ageu</option>
          <option value="Zacarias">Zacarias</option>
          <option value="Malaquias">Malaquias</option>
          <option value="Mateus">Mateus</option>
          <option value="Marcos">Marcos</option>
          <option value="Lucas">Lucas</option>
          <option value="João">João</option>
          <option value="Atos">Atos</option>
          <option value="Romanos">Romanos</option>
          <option value="1 Coríntios">1 Coríntios</option>
          <option value="2 Coríntios">2 Coríntios</option>
          <option value="Gálatas">Gálatas</option>
          <option value="Efésios">Efésios</option>
          <option value="Filipenses">Filipenses</option>
          <option value="Colossenses">Colossenses</option>
          <option value="1 Tessalonicenses">1 Tessalonicenses</option>
          <option value="2 Tessalonicenses">2 Tessalonicenses</option>
          <option value="1 Timóteo">1 Timóteo</option>
          <option value="2 Timóteo">2 Timóteo</option>
          <option value="Tito">Tito</option>
          <option value="Filemom">Filemom</option>
          <option value="Hebreus">Hebreus</option>
          <option value="Tiago">Tiago</option>
          <option value="1 Pedro">1 Pedro</option>
          <option value="2 Pedro">2 Pedro</option>
          <option value="1 João">1 João</option>
          <option value="2 João">2 João</option>
          <option value="3 João">3 João</option>
          <option value="Judas">Judas</option>
          <option value="Apocalipse">Apocalipse</option>
        </Select>
        <Label>Capítulo</Label>
        <Input
          type="number"
          onChange={(e) => setChapter(e.target.value)}
        ></Input>
        <Label>Versículo</Label>
        <Input type="number" onChange={(e) => setVerse(e.target.value)}></Input>
        <Verse>{verseFromApi}</Verse>
        <SubmitButton type="submit">Enviar</SubmitButton>
      </DailyVerseForm>
    </>
  );
};

const DailyVerseForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 1.5rem;
  display: flex;
  color: black;
`;

const Input = styled.input`
  outline: none;
  padding: 0.5rem;
  border-radius: 0.3rem;
  border: solid 0.13rem black;
  font-family: "Montserrat";
  font-size: 1rem;
  resize: vertical;
`;

const Select = styled.select`
  padding: 0.6rem;
  outline: none;
  padding: 0.5rem;
  border-radius: 0.3rem;
  border: solid 0.13rem black;
  font-family: "Montserrat";
  font-size: 1rem;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 0.7rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  border: 3px solid #000000;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 40%;

  &:hover {
    filter: brightness(80%);
  }
`;

const Verse = styled.h3`
  color: black;
`;
