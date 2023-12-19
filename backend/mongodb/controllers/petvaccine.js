import Pet from '../models/pet';        // Assuming you have a Pet model
import Appointment from '../models/appointment';  // Assuming you have an Appointment model
import Procedure from '../models/procedural';    // Assuming you have a Procedural model
import Vaccine from '../models/vaccine';          // Assuming you have a Vaccine model

export const petVaccine = async (req, res, next) => {
    try {
        const petId = req.params.petid;

        // Use Mongoose methods to perform the join and query
        const coreVaccination = await Pet.aggregate([
            { $match: { _id: petId } },
            {
                $lookup: {
                    from: Appointment.collection.name,
                    localField: '_id',
                    foreignField: 'petID',
                    as: 'appointments',
                },
            },
            {
                $unwind: '$appointments',
            },
            {
                $lookup: {
                    from: Procedure.collection.name,
                    localField: 'appointments.procID',
                    foreignField: 'procID',
                    as: 'procedure',
                },
            },
            {
                $unwind: '$procedure',
            },
            {
                $lookup: {
                    from: Vaccine.collection.name,
                    localField: 'procedure.vaccineID',
                    foreignField: 'vacID',
                    as: 'vaccine',
                },
            },
            {
                $unwind: '$vaccine',
            },
            {
                $match: {
                    'procedure.procName': 'core vaccination',
                },
            },
        ]);

        res.core_vac = coreVaccination;
        next();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
