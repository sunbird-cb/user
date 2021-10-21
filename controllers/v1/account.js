/**
 * name : account.js
 * author : Aman
 * created-date : 07-Oct-2021
 * Description : User Account.
 */

// Dependencies
const accountHelper = require("../../services/helper/account");

module.exports = class Account {

    /**
    * @api {post} /user/api/v1/account/create
    * @apiVersion 1.0.0
    * @apiName Creates User Account
    * @apiGroup Accounts
    * @apiParamExample {json} Request-Body:
    * {
    *   "name" : "mentee name",
    *   "email" : "mentee@gmail.com",
    *   "password" : "menteepass",
    * }
    * @apiSampleRequest /user/api/v1/account/create
    * @apiParamExample {json} Response:
    * {
    *   "statusCode": 201,
    *   "message": "User created successfully",
    *   "data": []
    * }
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
    * create mentee account
    * @method
    * @name create
    * @param {Object} req -request data.
    * @returns {JSON} - accounts creation.
    */

    async create(req) {
        const params = req.body;
        try {
            const createdAccount = await accountHelper.create(params);
            return createdAccount;
        } catch (error) {
            return error;
        }
    }

    /**
    * @api {post} /user/api/v1/account/login
    * @apiVersion 1.0.0
    * @apiName Login User Account
    * @apiGroup Accounts
    * @apiParamExample {json} Request-Body:
    * {
    *   "email" : "mentee@gmail.com",
    *   "password" : "menteepass",
    * }
    * @apiSampleRequest /user/api/v1/account/login
    * @apiParamExample {json} Response:
    * {
    *   "statusCode": 200,
    *   "message": "User logged in successfully",
    *   "data": {
    *       "email": {
    *           "verified": false,
    *           "address": "aman@gmail.com"
    *       },
    *       "designation": [],
    *       "isAMentor": false,
    *       "deleted": false,
    *       "_id": "61711e6c50cdf213e7971c2b",
    *       "name": "Aman",
    *       "password": "$2a$10$Z23WbUoimCVM32fwXtinXuvyxq4n4xvR0AwNJ4IjJtYJtuBn02ylu",
    *       "areasOfExpertise": [],
    *       "updatedAt": "2021-10-21T08:01:48.203Z",
    *       "createdAt": "2021-10-21T08:01:48.203Z",
    *       "__v": 0
    *   },
    *   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxNzExZTZjNTBjZGYyMTNlNzk3MWMyYiIsImVtYWlsIjoiYW1hbkBnbWFpbC5jb20iLCJpc0FNZW50b3IiOmZhbHNlfSwiaWF0IjoxNjM0ODE1MjU5LCJleHAiOjE2MzQ5MDE2NTl9.jkiotUxYbOZkZ3PLkOj-PdPoEbWfEI0gMfPqyfgzB5w",
    *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxNzExZTZjNTBjZGYyMTNlNzk3MWMyYiIsImVtYWlsIjoiYW1hbkBnbWFpbC5jb20iLCJpc0FNZW50b3IiOmZhbHNlfSwiaWF0IjoxNjM0ODE1MjU5LCJleHAiOjE2NTA2MjY0NTl9.CjNSk6xPuHlPOcdTW9FflIlL9q-1MegE-GwpkBkbwZA"
    * }
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
    * login user account
    * @method
    * @name login
    * @param {Object} req -request data.
    * @returns {JSON} - login details.
    */

    async login(req) {
        const params = req.body;
        try {
            const loggedInAccount = await accountHelper.login(params);
            return loggedInAccount;
        } catch (error) {
            return error;
        }
    }

    /**
    * @api {post} /user/api/v1/account/logout
    * @apiVersion 1.0.0
    * @apiName Logouts User Account
    * @apiGroup Accounts
    * @apiParamExample {json} Request-Body:
    * {
    *   "email" : "mentee@gmail.com"
    * }
    * @apiSampleRequest /user/api/v1/account/logout
    * @apiParamExample {json} Response:
    * {
    *   "statusCode": 200,
    *   "message": "User logged out successfully",
    *   "data": []
    * }
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
    * logout user account
    * @method
    * @name create
    * @param {Object} req -request data.
    * @returns {JSON} - accounts loggedout.
    */

    async logout(req) {
        const params = req.body;
        try {
            const loggedOutAccount = await accountHelper.logout(params);
            return loggedOutAccount;
        } catch (error) {
            return error;
        }
    }
}