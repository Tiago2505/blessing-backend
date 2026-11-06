import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  PORT: Joi.number().required(),
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().default('localhost'),
  JWT_SECRET: Joi.string().required(),
  RESEND_API_KEY: Joi.string().required(),
  MAILER_EMAIL: Joi.string().required(),
});
