import * as Yup from 'yup';
import Recipient from '../models/Recipients';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
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
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
      streat,
      number,
      complement,
      state,
      cep,
    } = await Recipient.create(req.body);
    return res.json({ name, streat, number, complement, state, cep });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      cep: Yup.string()
        .min(8)
        .max(8),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const recipient = await Recipient.findByPk(req.params.id);

    const {
      name,
      street,
      number,
      complement,
      state,
      cep,
    } = await recipient.update(req.body);
    return res.json({ name, street, number, complement, state, cep });
  }
}

export default new RecipientController();
