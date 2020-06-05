import express from "express";
import BaseController from "../utils/BaseController";
import { daysService } from "../services/DaysService";
import auth0Provider from "@bcwdev/auth0provider";
import { foodsService } from "../services/FoodsService";

export class DaysController extends BaseController {

    constructor() {
        super("api/days");
        this.router
            .use(auth0Provider.getAuthorizedUserInfo)
            .get("", this.getAll)
            .get("/:id", this.getById)
            .get("/:id/foods", this.getFoodByDayId)
            .post("", this.create);
    }
    async getAll(req, res, next) {
        try {
            let data = await daysService.findAll({ creatorEmail: req.userInfo.email })
            return res.send(data)
        } catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            let data = await daysService.findById(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) {
            next(error);
        }
    }
    async getFoodByDayId(req, res, next) {
        try {
            let data = await foodsService.findAll({ day: req.params.id, creatorEmail: req.userInfo.email })
            return res.send(data)
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let data = await daysService.create(req.body)
            return res.send(data)
        } catch (error) {
            next(error);
        }
    }
}
