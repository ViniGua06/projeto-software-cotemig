import Header from "../components/Header"
import url from "../assets/urlBackend";
import { userSelect } from "../redux/user/slice";
import { ativar, modalSelect } from "../redux/modal/slice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/slice";
import { Modal } from "../components/Modal";
import { UpdateUserForm } from "../components/Form/UpdateUserForm";
import { Settings, Undo2, UserRoundMinus } from "lucide-react";

const UserSettings = () => {
  const deslogar = () => {
    navigate("/signIn");
    dispatch(logout());
  };

  const { ativo } = useSelector(modalSelect);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user_id, user_name, token } = useSelector(userSelect);

  const deleteAccount = async () => {
    try {
      const res = await fetch(`${url}/user/${user_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status == 200) {
        alert("Conta excluída!");
        deslogar();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); 
  };
  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}></Header>
      <button
        id="return"
        onClick={() => {
          navigate("/user");
        }}
      >
        <Undo2 size={50}></Undo2>
      </button>
      <div className="container">
        <div className="form_area">
          <p className="title">CONFIGURAÇÕES</p>
          <br></br>
          <div className="form-group">
            <button id="editprofile" onClick={() => dispatch(ativar("Editar"))
            }>
              <Settings></Settings> Editar Perfil
            </button>
            <Modal title="Editar Perfil">
              <UpdateUserForm />
            </Modal>
            <div
              id="end-account"
              onClick={() => {
                if (confirm("Tem certeza que deseja excluir sua conta?")) {
                  if (confirm("Absoluta?")) {
                    deleteAccount();
                    navigate("/user");
                  }
                }
              }}
            >
              <UserRoundMinus></UserRoundMinus>
              EXCLUIR CONTA
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettings;