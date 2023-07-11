export function validationSchemas(userSchema) {
  return (req, res, next) => {

    const validation = userSchema.validate(req.body)

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(401).send(errors);
    }
    next()
  }
}
