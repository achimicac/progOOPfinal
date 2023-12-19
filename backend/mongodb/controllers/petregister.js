import Pet from '../models/pet';
import Procedure from '../models/procedural';
import Appointment from '../models/appointment';
import jwt from 'jsonwebtoken';

export const petregister = async (req, res) => {
    const userRegisteredCookie = req.cookies.userRegistered;
    const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);

    const { petName, petType, petDoB, petGender } = req.body;
    const { petPfp } = req.files;

    try {
        if (!petName || !petType || !petDoB || !petPfp || !petGender) {
            return res.json({
                status: "error",
                error: "Please enter all your pet information"
            });
        } else {
            const existingPet = await Pet.findOne({ id: decodedToken.id, petName });

            if (existingPet) {
                return res.json({ status: "error", error: `${petName} has already been registered.` });
            }

            const newPet = new Pet({
                petName,
                petType,
                petDoB,
                petPfp,
                petGender,
                id: decodedToken.id,
            });

            await newPet.save();

            res.json({ status: "success", success: "Your pet is ready!" });

            const petResult = await Pet.findOne({ id: decodedToken.id, petName });

            const procResult = await Procedure.find({ petType, procName: 'core vaccination' });

            if (procResult && procResult.length > 0) {
                for (let i = 0; i < procResult.length; i++) {
                    const newAppointment = new Appointment({
                        petID: petResult._id,
                        procID: procResult[i]._id,
                        status: 'info',
                    });
                    await newAppointment.save();
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};
