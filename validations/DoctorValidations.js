import joi from "joi";

const DoctorValidations = joi.object({
  fullname: joi.string().required(),

  email: joi
    .string()
    .required({ message: "email is required" })
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  phone: joi.string().required(),
  address: joi.string().required(),
  specialization: joi.string().required(),
  experience: joi.string().required(),
  feepercounsultation: joi.string().required(),
  timings: joi.array().required(),

  unseenNotifications: joi.array().items(joi.string()),
  seenNotifications: joi.array().items(joi.string()),
});

export { DoctorValidations };
