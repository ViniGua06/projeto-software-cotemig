import styled from "styled-components";
import {
  BrowserAddFile,
  DesignAddFile,
  FormAddFile,
  LabelAddFile,
} from "./ChangePfpForm";
import { useState } from "react";
import imageCompression from "browser-image-compression";
import url from "../../assets/urlBackend";
import { useSelector } from "react-redux";
import { userSelect } from "../../redux/user/slice";
import { useNavigate } from "react-router-dom";

export const CreateChurchForm = () => {
  const [codigo, setCodigo] = useState("");
  const [permitido, setPermitido] = useState(false);
  const [imagem, setImagem] = useState<any>("");
  const [nomeIgreja, setNomeIgreja] = useState("");

  const { user_id, token } = useSelector(userSelect);

  const navigate = useNavigate();

  const submit = async (e: any) => {
    try {
      e.preventDefault();
      const blobImage = await fetch(imagem).then((res) => res.blob());
      const fileImage = new File([blobImage], "image.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      const compressedImage = await imageCompression(fileImage, {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
      });

      const formData = new FormData();

      formData.append("photo", compressedImage, "image.jpg");
      formData.append("name", nomeIgreja);
      formData.append("code", codigo);

      const response = await fetch(`${url}/church/${user_id}`, {
        method: "POST",
        headers: {
          "x-acess-token": token,
        },
        body: formData,
      });

      const data = await response.json();

      alert(data.message);

      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ChurchForm onSubmit={submit}>
        <FormTitle>Cadastro de Igreja</FormTitle>
        <FormLabel>Nome da Igreja</FormLabel>
        <FormInputText
          value={nomeIgreja}
          onChange={(e) => setNomeIgreja(e.target.value)}
          required
        ></FormInputText>
        <FormLabel>Imagem de Perfil da Igreja</FormLabel>

        <FormAddFile>
          <LabelAddFile>
            <DesignAddFile style={{ height: "7rem" }}>
              <svg viewBox="0 0 640 512" height="0.1em">
                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
              </svg>
              <p>Arraste e solte</p>
              <p>ou</p>
              <BrowserAddFile>Pegue do Browser</BrowserAddFile>
            </DesignAddFile>
            <input
              id="file"
              type="file"
              required
              accept=".png, .jpg, .jpeg"
              onChange={(e) => {
                const files = e.target.files;

                if (files && files?.length > 0) {
                  const file = files[0];

                  const reader = new FileReader();
                  reader.onload = () => {
                    setImagem(reader.result);
                  };

                  reader.readAsDataURL(file);
                }
              }}
            />
          </LabelAddFile>
        </FormAddFile>

        <FormLabel>Código(será usado para convidar membros)</FormLabel>
        <FormLabel>Poderá ser mudado posteriormente</FormLabel>
        <FormInputText
          value={codigo}
          onChange={(e) => {
            setCodigo(e.target.value);
            codigo.length == 11 ? setPermitido(true) : setPermitido(false);
          }}
          maxLength={12}
          required
        ></FormInputText>

        {!permitido ? (
          <>
            <ErrorMessage>Minimo 12 caracteres</ErrorMessage>
          </>
        ) : null}

        {permitido ? (
          <>
            <SendForm type={"submit"} value={"Cadastrar"}></SendForm>
          </>
        ) : (
          <>
            <SendForm type={"submit"} value={"Cadastrar"} disabled></SendForm>
          </>
        )}
      </ChurchForm>
    </>
  );
};

const SendForm = styled.input`
  background-color: rgb(76, 175, 80);
  color: white;
  outline: none;
  border: none;
  padding: 1rem;
  border-radius: 1rem;

  &:not([disabled]):hover {
    background-color: green;
    cursor: pointer;
  }
`;

const ChurchForm = styled.form`
  height: 100%;
  width: 100%;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-block: 1rem;
`;

const FormTitle = styled.h2`
  color: black;
`;

const FormLabel = styled.label`
  color: rgba(0, 0, 0, 0.7);
`;

const FormInputText = styled.input`
  border-inline: none;
  border-top: none;
  outline: none;
  background: transparent;
  display: flex;
  text-align: center;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.h2`
  color: red;
`;
