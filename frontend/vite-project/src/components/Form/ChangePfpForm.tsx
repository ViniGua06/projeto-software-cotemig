import { useSelector } from "react-redux";
import styled from "styled-components";
import { select } from "../../redux/user/slice";

import user_default from "../../assets/user_default.png";
import { useState } from "react";

const PfpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const USerImg = styled.img`
  box-shadow: 0 0 20px black;
  width: 15%;
  border-radius: 50%;
  height: 200px;
`;

export const ChangePfpForm = () => {
  const { user_pfp } = useSelector(select);
  const [imagem, setImagem] = useState<any>("");

  return (
    <>
      <PfpForm>
        <USerImg src={user_pfp ? user_pfp : user_default}></USerImg>
        <h1>Trocar Imagem de Perfil</h1>
        <input
          type="file"
          accept=".png "
          onChange={(e) => {
            const files = e.target.files;

            if (files && files?.length > 0) {
              const file = files[0];

              const reader = new FileReader();
              reader.onload = () => {
                setImagem(reader.result);
                console.log(imagem);
              };

              reader.readAsDataURL(file);
            }
          }}
        />

        {imagem == "" ? (
          <>
            <h2 style={{ color: "red" }}>Nenhuma Imagem Selecionada</h2>
          </>
        ) : null}

        <USerImg
          src={imagem ? imagem : user_pfp ? user_pfp : user_default}
        ></USerImg>
      </PfpForm>
    </>
  );
};
