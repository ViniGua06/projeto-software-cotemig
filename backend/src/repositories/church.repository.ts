import { AppDataSource } from "../database/data-source";
import { Church } from "../database/entity/Church";

const database = AppDataSource.getRepository(Church);

export class ChurchRepository {
  getAllChurches = async () => {
    const churches = await database.find();

    return churches;
  };

  getChurchById = async (id: number) => {
    const church = await database.findOne({
      where: {
        id: id,
      },
    });

    return church;
  };

  insertChurch = async (church: Church) => {
    try {
      const log = await database.insert({
        name: church.name,
        photo: church.photo,
        code: church.code,
      });

      console.log(log.identifiers[0].id);

      return log.identifiers[0].id as number;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}
