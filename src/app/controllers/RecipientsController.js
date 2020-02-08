import * as Yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),

      street: Yup.string().required(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string().required(),
      cep: Yup.string()
        .min(8)
        .max(8)
        .required(),
    });
    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const {
      name,
      street,
      number,
      complement,
      state,
      cep,
    } = await Recipients.create(req.body);
    return res.json({ name, street, number, complement, state, cep });
  }
}

export default new RecipientsController();
