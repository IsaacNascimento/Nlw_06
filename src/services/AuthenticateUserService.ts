import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs";

import {sign} from "jsonwebtoken"

import { UserRepositories } from "../repositories/UserRepositories"



interface IAuthenticateUserService {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateUserService) {
     const usersRepositories = getCustomRepository(UserRepositories);


        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Passowrd incorrect");
        }

        // Verificar se senha está correta
        
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email/Passowrd incorrect");
        }

        // Gerar token

        const token = sign({
            email: user.email
        }, "53562abf4b43bbe3e8210b6bd8e96b0f", {
            subject : user.id,
            expiresIn: "1d"
        }
        );

        return token;

    }

}

export { AuthenticateUserService}








