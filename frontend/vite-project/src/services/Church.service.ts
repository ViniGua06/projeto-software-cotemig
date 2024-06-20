import { useDispatch, useSelector } from "react-redux";
import url from "../assets/urlBackend";
import { userSelect } from "../redux/user/slice";
import { changeChurch, churchSelect } from "../redux/church/slice";

const ChurchService = () => {
  const { user_id, token } = useSelector(userSelect);
  const dispatch = useDispatch();

  const {} = useSelector(churchSelect);

  const getChurchesByUser = async () => {
    try {
      const response = await fetch(`${url}/churches/${user_id}`, {
        method: "GET",
        headers: { "x-acess-token": token },
      });

      const churches = await response.json();

      const churchesWithPhotos = await Promise.all(
        churches.map(async (church: any) => {
          const photoResponse = await fetch(
            `${url}/church/photo/${church.id}`,
            {
              headers: {
                "x-acess-token": token,
              },
            }
          );
          const photoBlob = await photoResponse.blob();

          church.photo = URL.createObjectURL(photoBlob);

          return church;
        })
      );

      return churchesWithPhotos;
    } catch (error) {
      console.log(error);
    }
  };

  const enterChurch = async (code: string) => {
    try {
      const response = await fetch(`${url}/enterchurch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          code: code,
        }),
      });

      const data = await response.json();

      if (response.status == 200) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeChurchService = async (
    church_id: number | string | undefined
  ) => {
    try {
      const response = await fetch(`${url}/church/${church_id}`, {
        headers: {
          "x-acess-token": token,
        },
      });

      const data = await response.json();

      const res2 = await fetch(`${url}/church/photo/${church_id}`, {
        headers: {
          "x-acess-token": token,
        },
      });

      const data2 = await res2.blob();

      const photo = URL.createObjectURL(data2);

      const integrants = await getChurchIntegrants(church_id);

      const roleResponse = await fetch(`${url}/${church_id}/${user_id}`, {
        headers: {
          "x-acess-token": token,
        },
      });

      const roleData = await roleResponse.json();

      dispatch(
        changeChurch({
          church_id: data.id,
          church_name: data.name,
          church_code: data.code,
          church_photo: photo,
          integrants: integrants,
          role: roleData,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getChurchIntegrants = async (
    church_id: number | string | undefined
  ) => {
    try {
      const response = await fetch(`${url}/church/${church_id}/integrants`, {
        headers: {
          "x-acess-token": token,
        },
      });

      const data = await response.json();

      const integrantsWithPhotos = await Promise.all(
        data.map(async (props: any) => {
          const photoResponse = await fetch(`${url}/photo/${props.id}`, {
            headers: {
              "x-acess-token": token,
            },
          });
          const photoBlob = await photoResponse.blob();

          props.photo = URL.createObjectURL(photoBlob);

          return props;
        })
      );

      return integrantsWithPhotos;
    } catch (error) {
      console.log(error);
    }
  };

  return { getChurchesByUser, enterChurch, changeChurchService };
};

export default ChurchService;
