import { AppDataSource } from "../database/data-source";
import { Church } from "../database/entity/Church";
import { User_Church } from "../database/entity/Integrants";
import { Notice } from "../database/entity/Notice";
import { User } from "../database/entity/User";

const database = AppDataSource.getRepository(Church);
const integrants = AppDataSource.getRepository(User_Church);
const user = AppDataSource.getRepository(User);

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

  getChurchByCode = async (code: string) => {
    const church = await database.findOne({
      where: {
        code: code,
      },
    });

    if (!church) {
      return false;
    }

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

  getChurchIntegrants = async (church_id: number) => {
    const integ = await integrants.query(
      `SELECT * FROM user_church as i
    INNER JOIN "user" as u 
    ON i.user_id = u.id
    WHERE i.church = $1`,
      [church_id]
    );

    return integ;
  };

  getUserRole = async (church_id: number, user_id: number) => {
    const user = await integrants.findOne({
      where: {
        church: church_id,
        user_id: user_id,
      },
    });

    if (!user) {
      throw new Error("Usuario nao encontrado");
    }

    return user;
  };

  getIntegrantProphilePhoto = async (user_id: number) => {
    const photo = await user.query(
      `SELECT photo FROM "user"
    INNER JOIN user_church as uc
    ON user.id = uc.user_id
    WHERE user.id = $1`,
      [user_id]
    );

    return photo;
  };

  deleteIntegrant = async (church_id: number, user_id: number) => {
    const affected = await integrants.delete({
      church: church_id,
      user_id: user_id,
    });

    if (!affected.affected) {
      throw new Error("Usuário não removido!");
    }
  };

  getNotices = async (user_id: number, church_id: number) => {
    const noticeRepo = AppDataSource.getRepository(Notice);

    const notices = await noticeRepo.find({
      where: {
        user_id: user_id,
        church_id: church_id,
      },
    });

    for (let item of notices) {
      const user = await noticeRepo.query(
        `SELECT u.name FROM "user" AS u INNER JOIN notice AS n ON u.id = n.user_id where u.id = $1`,
        [item.user_id]
      );
      item.user_id = user[0].name;
    }

    console.log(notices);

    if (notices.length == 0) {
      throw new Error("Nenhuma notícia encontrada!");
    }

    return notices;
  };

  insertNotice = async (notice: Notice) => {
    const noticeRepo = AppDataSource.getRepository(Notice);

    const not = await noticeRepo.insert({
      text: notice.text,
      user_id: notice.user_id,
      church_id: notice.church_id,
    });

    if (!not.identifiers) {
      throw new Error("Noticia não inserida!");
    }
  };
}
