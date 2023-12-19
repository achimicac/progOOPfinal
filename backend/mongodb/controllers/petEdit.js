import Pet from '../models/pet';  // Assuming you have a Pet model

export const petEdit = async (req, res, next) => {
    const { petName, petType, bd, petPfp, petGender } = req.body;

    try {
        const petId = req.params.petid;

        // Use findOneAndUpdate to find and update the document
        const updatedPet = await Pet.findOneAndUpdate(
            { _id: petId },
            {
                $set: {
                    petName,
                    petType,
                    petDoB: bd,
                    petPfp,
                    petGender,
                },
            },
            { new: true } // To return the updated document
        );

        if (updatedPet) {
            console.log("Edit pet information success");
            res.json({ status: "success", success: "Edit Success", updatedPet });
        } else {
            console.log(`Pet with ID ${petId} not found`);
            res.status(404).json({ error: "Pet not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
