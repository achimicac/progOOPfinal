import Pet from '../models/pet';  // Assuming you have a Pet model

export const petProfile = async (req, res, next) => {
    try {
        const petId = req.params.petid;

        // Use findById to find the pet by ID
        const petInfo = await Pet.findById(petId);

        if (!petInfo) {
            console.log("Can't find this pet");
            return res.status(404).send("Can't find this pet");
        } else {
            // Convert Mongoose document to plain JavaScript object
            const petInfoObject = petInfo.toObject();

            // Add formatted date fields
            petInfoObject.bd = petInfo.petDoB.toISOString().split('T')[0];
            petInfoObject.showbd = petInfo.petDoB.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

            res.petinfo = petInfoObject;
            console.log(res.petinfo);
            return next();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
