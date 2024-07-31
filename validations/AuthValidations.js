import joi from "joi";
const userRegisterschema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
      )
    )
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
    }),
});

const userUpadte = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

const userLoginSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
});

const forgotpasswordschema = joi.object({
  email: joi.string().required().email(),
  resetpassowrdlink: joi.string().required(),
  resetPasswordExpires: joi.date().required(),
});

const resetpasswordSchema = joi.object({
  resetpassowrdlink: joi.string().required(),
  password: joi.string().required(),
});

export {
  userUpadte,
  userLoginSchema,
  userRegisterschema,
  forgotpasswordschema,
  resetpasswordSchema,
};
