import styled from "styled-components";

export const NoticesContainer = ({
  author,
  text,
}: {
  author: string;
  text: string;
}) => {
  return (
    <>
      <CardContainer>
        <h1>De {author}</h1>
        <Text>{text}</Text>
      </CardContainer>
    </>
  );
};

const CardContainer = styled.div`
  width: 100%;
  height: fit-content;
  border: solid black 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 1rem;
  gap: 1rem;
`;

const Text = styled.p`
  color: black;
  word-break: break-word;
  width: 100%;
  padding-inline: 1rem;
`;
