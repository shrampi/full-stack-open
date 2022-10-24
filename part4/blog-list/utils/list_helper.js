const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const total = blogs
    .map((blog) => blog.likes)
    .reduce((sum, current) => sum + current, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  let favorite = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });

  return favorite;
};

module.exports = {
  dummy, totalLikes, favoriteBlog
};
