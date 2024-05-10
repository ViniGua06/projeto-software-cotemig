import { useNavigate } from "react-router-dom";
import "../styles/userCard.css";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user/slice";

interface IUserCard {
  id: number;
  name: string;
  email: string;
  password: string;
}

const UserCard = (props: IUserCard) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const back = () => {
    dispatch(logout());
    navigate("/signIn");
  };
  return (
    <>
      <div className="card">
        <h1>ID: {props.id}</h1>
        <h1>Nome: {props.name}</h1>
        <h2>Email: {props.email}</h2>
        <h3>Senha: {props.password}</h3>
      </div>
      <button onClick={back}>Deslogar</button>
    </>
  );
};

export default UserCard;
