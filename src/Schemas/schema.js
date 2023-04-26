import joi from "joi";

export const schema = joi.object({
	value: joi.number().positive().precision(2).required(),
	description: joi.string().required(),
});

export const userSchema = joi.object({
	name: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required().min(3),
});

export const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required().min(3),
});