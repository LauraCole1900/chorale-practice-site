const postValidate = (post) => {
  let errors = {};

  // type errors
  if (!post.postType) {
    errors.postType = "What type of post is this? This determines where the post will render."
  }

  // content errors
  if (!post.postBody) {
    errors.postBody = "You must enter content for this post!"
  }

  return errors;
}

export default postValidate;