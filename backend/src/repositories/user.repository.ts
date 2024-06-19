import { AppDataSource } from "../database/data-source";
import { Church } from "../database/entity/Church";
import { User_Church } from "../database/entity/Integrants";
import { User } from "../database/entity/User";

import Crypt from "crypto";

const database = AppDataSource.getRepository("user");

import { ChurchRepository } from "./church.repository";

const churchRepository = new ChurchRepository();

class UserRepository {
  getAllUsers = async () => {
    const users = await database.find();

    return users;
  };
  getUserById = async (id: number): Promise<User | null> => {
    try {
      const user = await database.findOne({
        where: {
          id: id,
        },
      });

      return user as User;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getUserByEmailAndPassword = async (email: string, senha: string) => {
    try {
      let hashedPassword;
      if (senha) {
        hashedPassword = Crypt.createHash("sha256").update(senha).digest("hex");
      } else {
        console.error("Senha não fornecida");
      }

      const user = await database.findOne({
        where: {
          email: email,
          password: hashedPassword,
        },
      });

      console.log(user);

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  insertUser = async (user: User): Promise<number | null> => {
    try {
      const hashedPassword = Crypt.createHash("sha256")
        .update(user.password)
        .digest("hex");

      console.log(hashedPassword);

      if (
        user.name != "" &&
        user.email != "" &&
        user.password != "" &&
        user.name &&
        user.email &&
        user.password
      ) {
        const insertedUser = await database.insert({
          name: user.name,
          email: user.email,
          password: hashedPassword,
        });

        return insertedUser.identifiers[0].id;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  checkIfEmailIsValid = async (email: string): Promise<User | null> => {
    try {
      const user = await database.findOne({
        where: {
          email: email,
        },
      });

      return user as User;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateUser = async (props: User, id: number): Promise<boolean | null> => {
    const { name, email, password, photo } = props;

    if (password) {
      const hashedPassword = Crypt.createHash("sha256")
        .update(password)
        .digest("hex");

      const user = await this.checkIfEmailIsValid(email);

      if (user) {
        if (user.id !== id) {
          throw new Error("Email já cadastrado! Tente outro");
        }
      }

      await database.update(id, {
        name: name,
        email: email,
        password: hashedPassword,
        photo: photo,
      });
    } else {
      await database.update(id, {
        name: name,
        email: email,
        photo: photo,
      });
    }

    return true;
  };

  updatePassword = async (senha: string, email: string) => {
    try {
      const hashedPassword = Crypt.createHash("sha256")
        .update(senha)
        .digest("hex");

      const user = await database.update(
        { email: email },
        {
          password: hashedPassword,
        }
      );

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updatePhoto = async (
    id: number | string,
    photo: string
  ): Promise<boolean> => {
    try {
      database.update(id, {
        photo: photo,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  goToChurch = (church_id: number, user_id: number, role: string) => {
    try {
      const int = AppDataSource.getRepository(User_Church);

      int.insert({
        church: church_id,
        user_id: user_id,
        role: role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  enterChurch = async (user_id: number, code: string) => {
    const church = await churchRepository.getChurchByCode(code);

    if (!church) {
      throw new Error("Igreja não encontrada!");
    }

    const uc = AppDataSource.getRepository(User_Church);

    const verify = await uc.findOne({
      where: {
        user_id: user_id,
        church: church.id,
      },
    });

    if (verify) {
      console.log(verify);
      throw new Error("Usuário já está na igreja!");
    }

    uc.insert({
      church: church.id,
      user_id: user_id,
      role: "normal",
    });
  };

  getChurchesByUser = async (id: number) => {
    try {
      const int = AppDataSource.getRepository(User_Church);
      const churches = await int.query(
        `SELECT c.id, c.name, c.photo, uc.role, COUNT(*) as total 
        FROM user_church AS uc 
        INNER JOIN church AS c ON uc.church = c.id 
        WHERE uc.user_id = ${id} 
        GROUP BY c.id, c.name, c.photo, uc.role;
        `
      );

      return churches as Church[];
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}

export default UserRepository;
