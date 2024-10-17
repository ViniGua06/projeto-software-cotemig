import { AppDataSource } from "../database/data-source";
import { Church } from "../database/entity/Church";
import { User_Church } from "../database/entity/Integrants";
import { User } from "../database/entity/User";
import Crypt from "crypto";

const database = AppDataSource.getRepository(User);

import { ChurchRepository } from "./church.repository";
import JsonWebToken from "../services/jwt.service";
import { ExpiredTokens } from "../database/entity/ExpiredToken";
const churchRepository = new ChurchRepository();

const jwtServices = new JsonWebToken();

class UserRepository {
  getAllUsers = async () => {
    try {
      const users = await database.find();
      return users;
    } catch (error) {
      console.error("Failed to get all users:", error);
      return [];
    }
  };

  getUserById = async (id: number): Promise<User | null> => {
    try {
      const user = await database.findOne({
        where: { id: id },
      });
      return user as User;
    } catch (error) {
      console.error(`Failed to get user by id ${id}:`, error);
      return null;
    }
  };

  getUserByEmailAndPassword = async (email: string, senha: string) => {
    try {
      let hashedPassword;
      if (senha) {
        hashedPassword = Crypt.createHash("sha256").update(senha).digest("hex");
      } else {
        console.error("Password not provided");
        return null;
      }

      const user = await database.findOne({
        where: { email: email, password: hashedPassword },
      });

      console.log(user);
      return user;
    } catch (error) {
      console.error(`Failed to get user by email and password:`, error);
      return null;
    }
  };

  insertUser = async (user: User): Promise<number | null> => {
    try {
      const hashedPassword = Crypt.createHash("sha256")
        .update(user.password)
        .digest("hex");

      if (
        user.name &&
        user.name !== "" &&
        user.email &&
        user.email !== "" &&
        user.password &&
        user.password !== ""
      ) {
        const insertedUser = await database.insert({
          name: user.name,
          email: user.email,
          password: hashedPassword,
        });

        return insertedUser.identifiers[0].id;
      } else {
        console.error("Invalid user data");
        return null;
      }
    } catch (error) {
      console.error("Failed to insert user:", error);
      return null;
    }
  };

  checkIfEmailIsValid = async (email: string): Promise<User | null> => {
    try {
      const user = await database.findOne({
        where: { email: email },
      });
      return user as User;
    } catch (error) {
      console.error(`Failed to check if email is valid for ${email}:`, error);
      return null;
    }
  };

  updateUser = async (props: User, id: number): Promise<boolean | null> => {
    try {
      const { name, email, password, photo } = props;
      const updateData: Partial<User> = { name, email, photo };

      if (password) {
        const hashedPassword = Crypt.createHash("sha256")
          .update(password)
          .digest("hex");
        updateData.password = hashedPassword;
      }

      const user = await this.checkIfEmailIsValid(email);
      if (user && user.id !== id) {
        throw new Error("Email already registered! Try another");
      }

      await database.update(id, updateData);
      return true;
    } catch (error) {
      console.error(`Failed to update user with id ${id}:`, error);
      return null;
    }
  };

  updatePassword = async (senha: string, email: string) => {
    try {
      const hashedPassword = Crypt.createHash("sha256")
        .update(senha)
        .digest("hex");
      const user = await database.update(
        { email: email },
        { password: hashedPassword }
      );
      return user;
    } catch (error) {
      console.error(`Failed to update password for email ${email}:`, error);
      return null;
    }
  };

  updatePhoto = async (
    id: number | string,
    photo: string
  ): Promise<boolean> => {
    try {
      await database.update(id, { photo: photo });
      return true;
    } catch (error) {
      console.error(`Failed to update photo for user with id ${id}:`, error);
      return false;
    }
  };

  goToChurch = async (church_id: number, user_id: number, role: string) => {
    try {
      const int = AppDataSource.getRepository(User_Church);
      await int.insert({ church: church_id, user_id: user_id, role: role });
    } catch (error) {
      console.error(
        `Failed to insert user ${user_id} into church ${church_id}:`,
        error
      );
    }
  };

  enterChurch = async (user_id: number, token: string) => {
    try {
      const expired = AppDataSource.getRepository(ExpiredToken);
      const payload = await jwtServices.decodePayload(token);

      if (!payload) {
        throw new Error("Erro no token");
      }

      const church = await churchRepository.getChurchById(
        parseInt(payload.payload)
      );

      if (!church) {
        throw new Error("Church not found!");
      }

      const isExpired = await expired.find({
        where: {
          token: token,
        },
      });

      if (isExpired) {
        throw new Error("Convite Expirado!");
      }

      const uc = AppDataSource.getRepository(User_Church);
      const verify = await uc.findOne({
        where: { user_id: user_id, church: church.id },
      });

      if (verify) {
        console.log(verify);
        throw new Error("User already in church!");
      }

      await uc.insert({ church: church.id, user_id: user_id, role: "normal" });

      await expired.insert({ token: token });
    } catch (error) {
      console.error(
        `Failed to enter church for user ${user_id} with code ${token}:`,
        error
      );
      throw error;
    }
  };

  getChurchesByUser = async (id: number) => {
    try {
      const int = AppDataSource.getRepository(User_Church);
      const churches = await int.query(`
        SELECT c.id, c.name, c.photo, uc.role, COUNT(*) as total 
        FROM user_church AS uc 
        INNER JOIN church AS c ON uc.church = c.id 
        WHERE uc.user_id = ${id} 
        GROUP BY c.id, c.name, c.photo, uc.role;
      `);

      return churches as Church[];
    } catch (error) {
      console.error(`Failed to get churches for user ${id}:`, error);
      return [];
    }
  };

  deleteUserById = async (id: number) => {
    try {
      await database.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserRepository;
