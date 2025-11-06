
import patientModel from "../../model/PatientModel/patientModels.js"
import utilis from "../utilis.js"
import { Response, Request } from "express"
// public utilis

export default class patientController {


    protected patientmodel = new patientModel()
    protected utilis = new utilis()


    public async updatPatientBio(res: Response, req: Request) {

        const { patient_id, username, profile_img, email, number } = req.body
        if (!patient_id) {
            return this.utilis.sendResponse(res, 400, false, "No ID found in request", [])
        }

        const update = await this.patientmodel.updatePatientBio(patient_id, {
            username,
            profile_img,
            email,
            number,
        });

        return this.utilis.sendResponse(res, 201, true, "ID found in request", update)

    }
}