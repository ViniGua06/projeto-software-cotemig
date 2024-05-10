import { AppDataSource } from "../database/data-source";
import { User } from "../database/entity/User";

import Crypt from "crypto";

const database = AppDataSource.getRepository("user");

class UserRepository {
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
    try {
      const { name, email, password } = props;

      const hashedPassword = Crypt.createHash("sha256")
        .update(password)
        .digest("hex");

      await database.update(id, {
        name: name,
        email: email,
        password: hashedPassword,
      });

      return true;
    } catch (error) {
      console.log(error);
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
}

export default UserRepository;
