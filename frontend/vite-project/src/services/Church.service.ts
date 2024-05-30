import { useSelector } from "react-redux";
import url from "../assets/urlBackend";
import { userSelect } from "../redux/user/slice";

const ChurchService = () => {
  const { user_id } = useSelector(userSelect);
  const getChurchesByUser = async () => {
    try {
      const response = await fetch(`${url}/churches/${user_id}`);
      const churches = await response.json();

      const churchesWithPhotos = await Promise.all(
        churches.map(async (church: any) => {
          const photoResponse = await fetch(`${url}/church/photo/${church.id}`);
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

  return { getChurchesByUser };
};

export default ChurchService;
