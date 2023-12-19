import jwt from 'jsonwebtoken';
import User from '../models/user';    
import Pet from '../models/pet';     
import Article from '../models/article';

export const article = async (req, res, next) => {
    const userRegisteredCookie = req.cookies.userRegistered;
    const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);

    try {
        const result = await User.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(decodedToken.id) }
            },
            {
                $lookup: {
                    from: Pet.collection.name,
                    localField: '_id',
                    foreignField: 'ownerID',
                    as: 'pets'
                }
            },
            {
                $unwind: '$pets'
            },
            {
                $lookup: {
                    from: Article.collection.name, 
                    localField: 'pets.petType',
                    foreignField: 'petType',
                    as: 'articles'
                }
            },
            {
                $unwind: '$articles'
            },
            {
                $group: {
                    _id: '$articles._id', 
                    title: { $first: '$articles.title' },
                    description: { $first: '$articles.description' },
                    petType: { $first: '$articles.petType' }
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    petType: 1
                }
            }
        ]);

        res.all_article = result;
        return next();
    } catch (error) {
        throw error;
    }
};
