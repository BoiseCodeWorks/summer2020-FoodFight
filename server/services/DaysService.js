import { dbContext } from "../db/DbContext";
import { BadRequest, UnAuthorized } from "../utils/Errors";

class DaysService {

    async findAll(query = {}) {
        let values = await dbContext.Days.find(query).populate(
            "creator",
            "name picture"
        );
        return values;
    }
    async findById(id, email) {
        let value = await dbContext.Days.findById(id);
        if (!value) {
            throw new BadRequest("Invalid Id");
        }
        // @ts-ignore
        if (value.creatorEmail != email) {
            throw new UnAuthorized
        }
        return value;
    }
    async create(body) {
        return await dbContext.Days.create(body)
    }
}

export const daysService = new DaysService();
