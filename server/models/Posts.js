// -- Creating a Posts table
module.exports = (sequelize, DataTypes) => {

  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  //-- Adding foreign key from Comments table to Posts table.
  //-- Remember to drop the Comments table before we can re-create it.
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: 'cascade'
    });
  };

  return Posts;
};