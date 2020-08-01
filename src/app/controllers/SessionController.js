import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Admin from '../models/Admin';

import authConfig from '../../config/auth';

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = request.body;

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return response.status(400).json({ error: 'User not found' });
    }

    if (!(await admin.checkPassword(password))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = admin;

    return response.json({
      admin: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
