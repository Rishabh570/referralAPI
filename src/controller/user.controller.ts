import { Request, RequestHandler, Response } from 'express';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { IAuthenticatedUser, IJwtUser, IUser } from '../interfaces/IUser';
import { userService, referralService } from '../services';
import { utilHelper } from '../helpers';

export const signup: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, name, password, referralCode } = req.body;
        let referredBy = null;
        const existingUserCheck = await userService.findUser({ email }, { _id: 1 });
        if (existingUserCheck.length) return res.status(Code.USER_EXIST)
            .send(new HttpResponse(Code.USER_EXIST, Status.USER_EXIST, 'User already exist with this email'));

        if (referralCode) {
            const referrerUser = await userService.findUser({ referralCode }, { _id: 1 });
            if (!referrerUser.length) return res.status(Code.INVALID_CODE)
                .send(new HttpResponse(Code.INVALID_CODE, Status.INVALID_CODE, 'Invalid referral code'));
            referredBy = referrerUser[0]._id;
        }

        const newUserDocument: IUser = {
            name,
            email,
            password,
            flags: { hasInvested: false },
            smallbucks: 0,
            referredBy: referredBy
        };
        const addUserResponse = await userService.addUser([newUserDocument]);
        console.log(`addUserResponse`, JSON.stringify(addUserResponse));
        if (referralCode) {
            const newUserId = addUserResponse[0]._id;
            await referralService.addReferral({
                referredTo: newUserId,
                //@ts-ignore
                referredBy,
                name
            })
        }

        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, 'User created'));

    } catch (error) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}

export const login: RequestHandler = async (req, res) => {

    try {
        const { email, password } = req.body;

        const loginUserDetails = await userService.findUser({ email });

        if (!loginUserDetails.length) return res.status(Code.NOT_FOUND)
            .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "User doesn't exist"));

        if (loginUserDetails[0].password !== password) return res.status(Code.NOT_AUTHORIZED)
            .send(new HttpResponse(Code.NOT_AUTHORIZED, Status.NOT_AUTHORIZED, "Incorrect password"));

        const jwtPayload: IJwtUser = {
            id: loginUserDetails[0]._id
        };
        const jwtToken = userService.generateJwt(jwtPayload)
        res.cookie('token', jwtToken);

    } catch (error) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}
//@ts-ignore
export const getUserDetails: RequestHandler = async (req: IAuthenticatedUser, res) => {

    try {
        const { id } = req.user;
        const responseObj = { userDetails: {}, referralDetails: [] };
        const userDetails = await userService.findUser({ _id: utilHelper.getMongooseId(id) }, { password: 0 });
        if (!userDetails.length) return res.status(Code.NOT_FOUND)
            .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User Not Found', responseObj));

        responseObj.userDetails = userDetails[0];

        const referralDetails = await referralService.getReferrer({ referredBy: id });
        //@ts-ignore
        responseObj.referralDetails = referralDetails;

        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'User Details', responseObj));
    } catch (error) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}