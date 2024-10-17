import { AppDataSource } from "../database/data-source";
import { Aware } from "../database/entity/Aware";
import { Church } from "../database/entity/Church";
import { User_Church } from "../database/entity/Integrants";
import { Notice } from "../database/entity/Notice";
import { User } from "../database/entity/User";

import { Event as Evento } from "../database/entity/Event";
import JsonWebToken from "../services/jwt.service";

const database = AppDataSource.getRepository(Church);
const integrants = AppDataSource.getRepository(User_Church);
const user = AppDataSource.getRepository(User);

const jwtServices = new JsonWebToken();

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

  getNotices = async (church_id: number) => {
    const noticeRepo = AppDataSource.getRepository(Notice);

    console.log(church_id, "IDDDDDDD");

    const notices = await noticeRepo.find({
      where: {
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
      aware: 0,
    });

    if (!not.identifiers) {
      throw new Error("Noticia não inserida!");
    }
  };

  changeUserRole = async (
    church_id: number,
    user_id: number,
    role: "admin" | "normal"
  ) => {
    const int = await integrants.update(
      { user_id: user_id, church: church_id },
      {
        user_id: user_id,
        church: church_id,
        role: role,
      }
    );

    if (int.affected == 0) {
      throw new Error("Nenhum usuário afetado");
    }
  };

  updateChurch = async (church_id: number, church: Church) => {
    try {
      await database.update(church_id, church);

      console.log(church_id, church);
    } catch (error) {
      throw error;
    }
  };

  getNotice = async (id: number) => {
    try {
      const noticeRepo = AppDataSource.getRepository(Notice);
      const notice = await noticeRepo.findOne({
        where: {
          id: id,
        },
      });

      return notice.aware;
    } catch (error) {
      console.log(error);
    }
  };

  setAware = async (notice_id: number, user_id: number) => {
    const noticeRepo = AppDataSource.getRepository(Notice);
    const awareRepo = AppDataSource.getRepository(Aware);

    const awareNumber = await this.getNotice(notice_id);

    await noticeRepo.update(notice_id, {
      aware: awareNumber + 1,
    });

    await awareRepo.insert({
      notice_id: notice_id,
      user_id: user_id,
    });
  };

  checkIfIsAlreadyAware = async (notice_id: number, user_id: number) => {
    try {
      const awareRepo = AppDataSource.getRepository(Aware);

      const notice = await awareRepo.findOne({
        where: {
          notice_id: notice_id,
          user_id: user_id,
        },
      });

      return notice !== null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getEvents = async () => {
    const eventRepo = AppDataSource.getRepository(Evento);

    return await eventRepo.find();
  };

  getEventsByChurches = async (church_ids: string[]) => {
    try {
      const eventRepo = AppDataSource.getRepository(Evento);

      if (!Array.isArray(church_ids)) {
        throw new Error("Expected an array of church IDs");
      }

      const events = await Promise.all(
        church_ids.map(async (item) => {
          return await eventRepo.find({
            where: { church_id: item },
          });
        })
      );

      return events.flat();
    } catch (error) {
      throw error;
    }
  };

  createEvent = async (event: Evento) => {
    try {
      const eventRepo = AppDataSource.getRepository(Evento);

      const insertedEvent = await eventRepo.insert(event);

      return insertedEvent.identifiers[0].id;
    } catch (error) {
      throw error;
    }
  };

  getDailyVerse = async (church_id: number) => {
    const verse = await database.findOne({
      where: {
        id: church_id,
      },
    });

    return verse.daily_verse;
  };

  addDailyVerse = async (church_id: number, verse: string) => {
    await database.update(church_id, {
      daily_verse: verse,
    });
  };

  createInvite = async (church_id: number) => {
    const token = await jwtServices.createToken(church_id.toString());

    return token;
  };
}
