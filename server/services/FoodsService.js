import { dbContext } from "../db/DbContext";
import { BadRequest, UnAuthorized } from "../utils/Errors";
import { daysService } from "./DaysService";

class FoodsService {

    async findAll(query = {}) {
        let values = await dbContext.Foods.find(query).populate(
            "creator",
            "name picture"
        );
        return values;
    }
    async findById(id) {
        let value = await dbContext.Foods.findById(id);
        if (!value) {
            throw new BadRequest("Invalid Id");
        }
        return value;
    }
    async create(body) {
        let day = await daysService.findById(body.day, body.creatorEmail)
        // @ts-ignore
        if (day.creatorEmail !== body.creatorEmail) {
            throw new UnAuthorized("not your day bro")
        }
        return await dbContext.Foods.create(body)
    }
}

export const foodsService = new FoodsService();
