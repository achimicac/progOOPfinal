import Pet from '../models/pet';  // Assuming you have a Pet model

export const petDelete = async (req, res, next) => {
    try {
        const petId = req.params.petid;

        // Use findOneAndDelete to find and delete the document
        const deletedPet = await Pet.findOneAndDelete({ _id: petId });

        if (deletedPet) {
            console.log("Delete pet success");
            next();
        } else {
            console.log(`Pet with ID ${petId} not found`);
            res.status(404).json({ error: "Pet not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
