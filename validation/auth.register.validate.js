const Joi = require("joi")

exports.authRegisterValidate = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.empty": "user name must be",
                "string.min": "name shuld be longer then 3",
                "string.max": "name shuld be less then 30 char",
                "any.required": "name shuld be fule",
            }),

        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.empty": "Email must be",
                "string.email": "something wrong with Email ",
                "any.required": "Email name shuld be fule",
            }),

        password: Joi.string()
            .min(8)
            .required()
            .messages({
                "string.empty": "password must be",
                "string.min": "password shuld be longer then 8 char",
                "any.required": "password shuld be",
            })
    })

    return schema.validate(data, { abortEarly: false })
}