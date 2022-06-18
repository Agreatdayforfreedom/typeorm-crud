import express, { Request, Response } from "express";
import { User } from "../entities/User";

const userRouter = express.Router();

userRouter.post('/create', async(request: Request, response: Response) => {
    try {
        const { firstname, lastname} = request.body;

        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;

        const userSaved = await user.save();
        response.json(userSaved);

    } catch (error) {
        if(error instanceof Error) {
            return response.status(500).json({message: error.message});        

        }
    }
});

userRouter.get('/', async(request: Request, response: Response) => {
    const users = await User.find();
    response.json(users)
});

userRouter.put('/:id', async(request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { fistname, lastname, active } = request.body;

        const user = await User.findOneBy({id: parseInt(id)});

        if(!user) return response.status(404).json({message: 'User does not exist'});

        await User.update({id: parseInt(id)}, request.body);

        response.sendStatus(204);
    } catch (error) {
        if(error instanceof Error) {
            return response.status(500).json({message: error.message});
        }
    }
});

userRouter.delete('/:id', async(request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const result = await User.delete({id: parseInt(id)});
        if( result.affected === 0){
            return response.status(404).json({message: 'user does not exist'});
        }
        response.status(204)
    } catch (error) {
        if(error instanceof Error) {
            return response.status(500).json({message: error.message});
        }
    }
});

export default userRouter;
