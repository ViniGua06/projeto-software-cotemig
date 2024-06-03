import { useDispatch, useSelector } from "react-redux";
import url from "../assets/urlBackend";
import { fetchUser, logout, userSelect } from "../redux/user/slice";
import { useNavigate } from "react-router-dom";

const ApiService = () => {
  const { user_id, token, user_pfp } = useSelector(userSelect);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testToken = async () => {
    try {
      const response = await fetch(`${url}/testToken`, {
        method: "POST",
        headers: {
          "x-acess-token": token,
        },
        body: JSON.stringify({
          test: "Teste",
        }),
      });

      const data = await response.json();

      if (response.status == 403) {
        alert("Sessão de usuário expirada!" + data.message);
        dispatch(logout());
        navigate("/signIn");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfilePhoto = async () => {
    try {
      const response = await fetch(`${url}/photo/${user_id}`, {
        headers: {
          "x-acess-token": token,
        },
      });
      console.log(user_pfp, "POHOY");

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      console.log(response.status, imageUrl);

      if (response.status != 404) {
        return imageUrl;
      }

      return null;
    } catch (error) {
      console.error("Erro ao buscar a foto de perfil:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${url}/user/${user_id}`);

      const data = await response.json();

      const photo = await fetchProfilePhoto();

      if (response.status == 403) {
        dispatch(logout());
        navigate("/signIn");
      } else {
        dispatch(
          fetchUser({
            name: data.user.name,
            email: data.user.email,
            password: data.user.password,
            photo: photo,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { testToken, fetchUserInfo };
};

export default ApiService;
