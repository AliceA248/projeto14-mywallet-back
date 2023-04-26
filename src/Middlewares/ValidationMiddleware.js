import { userSchema, loginSchema, schema } from "../Schemas/schema.js";

function handleValidationError(error, res) {
  const errors = error.details.map((detail) => {
    return {
      message: detail.message,
      field: detail.path.join("."),
    };
  });
  res.status(422).send(errors);
}

export async function validateSchema(req, res, next) {
  const { value, description } = req.body;
  try {
    await schema.validateAsync({ value, description });
    next();
  } catch (error) {
    handleValidationError(error, res);
  }
}

export async function validateUserSchema(req, res, next) {
  const { name, email, password } = req.body;
  try {
    await userSchema.validateAsync({ name, email, password });
    next();
  } catch (error) {
    handleValidationError(error, res);
  }
}

export async function validateLoginSchema(req, res, next) {
  const { email, password } = req.body;
  try {
    await loginSchema.validateAsync({ email, password });
    next();
  } catch (error) {
    handleValidationError(error, res);
  }
}
//a