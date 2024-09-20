import blogModal from "../models/blogModel";
import ValidatemonogoDBid from "../util/validatemongoDBid";

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
    const blog = await blogModal
      .find(id)
      .populate("likes")
      .populate("dislikes");

    res.status(200).json({ data: blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllblog = async (req, res) => {
  try {
    const allblog = await blogModal.find();
    res.status(200).json({ data: allblog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateblog = async (req, res) => {
  const { id } = req.params;
  try {
    const updateblog = await blogModal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ data: updateblog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteblog = async (req, res) => {
  const { id } = req.params;
  try {
    const delblog = await blogModal.find(id);
    res.status(200).json({ data: delblog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likesblog = async (req, res) => {
  const { blogid } = req.body;
  try {
    ValidatemonogoDBid(blogid);
    const blog = await blogModal.findById(blogid);
    const logdinuser = req?.user?._id;
    const isliked = blog?.isLiked;
    const alreadydisliked = blog?.dislikes?.valueOf.find(
      (id) => id.toString() === logdinuser?.toString()
    );

    if (alreadydisliked) {
      const blog = blogModal.findByIdAndUpdate(
        blogid,

        {
          $pull: { dislikes: logdinuser },
          isliked: false,
        },
        {
          new: true,
        }
      );
      res.json(blog);
    }

    if (isliked) {
      const blog = blogModal.findByIdAndUpdate(
        blogid,
        {
          $pull: { likes: logdinuser },
          isliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dislikeblog = async (req, res) => {
  const { blogid } = req.body;
  try {
    ValidatemonogoDBid(blogid);
    const blog = await blogModal.findById(blogid);
    const logdinuser = req?.user?._id;
    const isdisliked = blog?.isDisliked;
    const alreadyliked = blog?.likes?.find(
      (id) => id.toString() === logdinuser?.toString()
    );

    if (alreadyliked) {
      const blog = blogModal.findByIdAndUpdate(
        blog,
        {
          $pull: { likes: logdinuser },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }

    if (isdisliked) {
      const blog = blogModal.findByIdAndUpdate(
        blog,
        {
          $pull: { likes: logdinuser },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  ValidatemonogoDBid(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  creaetBlog,
  getBlog,
  getAllblog,
  deleteblog,
  updateblog,
  dislikeblog,
  likesblog,
  uploadImages,
};
