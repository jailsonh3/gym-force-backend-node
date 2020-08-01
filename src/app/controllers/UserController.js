import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validatation fails' });
    }

    const userExists = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, idade, peso, altura } = await User.create(
      request.body
    );

    return response.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }
}

export default new UserController();
