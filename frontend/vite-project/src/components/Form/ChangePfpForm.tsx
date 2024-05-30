import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userSelect } from "../../redux/user/slice";

import user_default from "../../assets/user_default.png";
import { useState } from "react";
import url from "../../assets/urlBackend";

import imageCompression from "browser-image-compression";
import { desativar } from "../../redux/modal/slice";

const PfpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.6rem;
`;
const USerImg = styled.img`
  box-shadow: 0 0 20px black;
  max-width: 110px;
  min-width: 110px;
  border-radius: 50%;
  height: 110px;
`;

const InputSubmit = styled.input`
  display: inline-block;
  padding: 12px 24px;
  border: 1px solid #4f4f4f;
  border-radius: 4px;
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  font-size: 19px;
  cursor: pointer;
  color: black;
  z-index: 100;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: 100;
  }

  &:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: #39bda7;
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: 100;
  }

  &:hover {
    color: #ffffff;
    background-color: rgba(0, 0, 0, 1);
  }

  &:hover::before {
    top: -35%;
    background-color: #39bda7;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  &:hover::after {
    top: -45%;
    background-color: #39bda7;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
`;

export const FormAddFile = styled.form`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LabelAddFile = styled.label`
  & input {
    display: none;
  }
  & svg {
    height: 50px;
    fill: rgb(82, 82, 82);
    margin-bottom: 20px;
  }

  cursor: pointer;
  background-color: #ddd;
  padding: 30px 70px;
  border-radius: 40px;
  border: 2px dashed rgb(82, 82, 82);
  box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719);
`;

export const DesignAddFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  & > p {
    color: black;
  }
`;

export const BrowserAddFile = styled.span`
  background-color: rgb(82, 82, 82);
  padding: 5px 15px;
  border-radius: 10px;
  color: white;
  transition: all 0.3s;
`;

export const ChangePfpForm = () => {
  const { user_pfp, user_id } = useSelector(userSelect);
  const [imagem, setImagem] = useState<any>("");

  const dispacth = useDispatch();

  const changePfp = async (e: any) => {
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

      const response = await fetch(`${url}/photo/${user_id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      alert(data.message);

      dispacth(desativar());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PfpForm onSubmit={changePfp}>
        <FormAddFile>
          <LabelAddFile>
            <DesignAddFile>
              <svg viewBox="0 0 640 512" height="1em">
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

        {imagem == "" ? (
          <>
            <h2 style={{ color: "red" }}>Nenhuma Imagem Selecionada</h2>
          </>
        ) : null}

        <USerImg
          src={imagem ? imagem : user_pfp ? user_pfp : user_default}
        ></USerImg>

        <InputSubmit type="submit" value="ENVIAR"></InputSubmit>
      </PfpForm>
    </>
  );
};
