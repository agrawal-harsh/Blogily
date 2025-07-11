const populate = async()=>{
    const {Comment,User,Blog,Like,Tag,Blog_tag} = require('../models');
    const DummyData = require('../dummyData.json')

    await Comment.deleteMany({})
    await Comment.create(DummyData.comments)
    await User.deleteMany({})
    await User.create(DummyData.users)
    await Blog.deleteMany({})
    await Blog.create(DummyData.blogs)
    await Like.deleteMany({})
    await Like.create(DummyData.likes)
    await Tag.deleteMany({})
    await Tag.create(DummyData.tags)
    await Blog_tag.deleteMany({})
    await Blog_tag.create(DummyData.blog_tags)
    console.log('DB populated successfully');
}
module.exports = populate;