import blogModal from "../models/blogModel";

const creaetBlog = async (req, res) => {
  try {
    const blog = await blogModal.create(req.body);

    res.status(200).json({ mesg: "blog created", data: blog });
  } catch (error) {
    console.log(error.message);
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;

  ValidatemonogoDBid(id);

  try {
    const blog = await blogModal.find(id);

    res.status(200).json({ mesg: "blog created", data: blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllblog = async (req, res) => {};

module.exports = {
  creaetBlog,
  getBlog,
};
