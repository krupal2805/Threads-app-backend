import { prismaClient } from "../../lib/db.js";

export const addUsers = async (req:any,res:any) => {
    try {
        const user = req.body; 
    
        console.log(user);
    
        const Query = await prismaClient.user.create({
            data:{
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                password : user.password,
                salt : 'random_salt'
            }
        })
    
        res.json({message : 'user added successfully',Query});
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Internal server error'});
    }
}
