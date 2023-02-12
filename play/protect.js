const protectDoctor = (req, res, next) => {
    if (req.user.role === "DOCTOR") {
      next();
    } else {
      res.status(401).send({ error: "Unauthorized" });
    }
  };