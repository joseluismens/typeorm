import { validate } from "class-validator";
import { Response, Request } from "express";
import { User } from "../entity/User";

export default class UserController {
  static listAll = async (req: Request, res: Response) => {
    try {
      const users = await User.find({
        select: [
          "id", "username", "role"
        ]
      });
      return res.json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  static getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findOneBy({ id: parseInt(id) });

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  static newUser = async (req: Request, res: Response) => {

    const { nombre,username, password } = req.body;
    const user = new User();
    user.nombre = nombre;
    user.username = username;
    user.password = password;
    user.role = 'default';
    console.log(user);

    const verifyUsername = await User.findOneBy({ username: username });
    if (verifyUsername) return res.status(500).send({ message: "El nombre de usuario ya ha sido utilizado" });
    const errors = await validate(user);

    if (errors.length > 0) return res.status(400).send(errors);

    user.hashPassword();

    await user.save();
  
    console.log(user);
    return res.json(user);

  }


  static updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre , username, role } = req.body;

    try {
      const user = await User.findOneBy({ id: parseInt(id) });
      if (!user) return res.status(404).json({ message: "Not user found" });
      user.nombre = nombre;

      user.username = username;
      user.role = role;

      const errors = await validate(user);
      if (errors.length > 0) return res.status(400).send(errors);

      await User.update({ id: parseInt(id) }, user);

      return res.sendStatus(204);

    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const result = await User.delete({ id: parseInt(id) });

      if (result.affected === 0)
        return res.status(404).json({ message: "User not found" });

      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };


}


