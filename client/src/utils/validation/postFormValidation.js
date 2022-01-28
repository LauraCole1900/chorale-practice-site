const postValidate = (post) => {
  let errors = {};

  // type errors
  if (!post.postType) {
    errors.name = "What type of post is this? This determines where the post will render."
  }

  // title errors
  if (!post.postTitle) {
    errors.date = "What is the title of this post?"
  }

  // content errors
  if (!post.postBody) {
    errors.date = "You must enter content for this post!"
  }

  return errors;
}

export default postValidate;