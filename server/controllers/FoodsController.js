import express from "express";
import BaseController from "../utils/BaseController";
import { foodsService } from "../services/FoodsService";
import auth0Provider from "@bcwdev/auth0provider";

export class FoodsController extends BaseController {

    constructor() {
        super("api/foods");
        this.router
            .use(auth0Provider.getAuthorizedUserInfo)
            .post("", this.create);
    }
    // async getAll(req, res, next) {
    //     try {

    //     } catch (error) {
    //         next(error);
    //     }
    // }
    // async getFoodByFoodId(req, res, next) {
    //     try {

    //     } catch (error) {
    //         next(error);
    //     }
    // }
    // async getById(req, res, next) {
    //     try {

    //     } catch (error) {
    //         next(error);
    //     }
    // }
    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let data = await foodsService.create(req.body)
            return res.send(data)
        } catch (error) {
            next(error);
        }
    }
}
