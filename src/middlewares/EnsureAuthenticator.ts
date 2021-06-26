import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken"

interface IPayLoad {
    sub: string;
}

export function EnsureAuthenticator(
    request: Request,
    response: Response, 
    next: NextFunction 
) {

    // Receber o Token
    const authtoken = request.headers.authorization;

    // Validar se o token está preenchido
    if(!authtoken) {
        return response.status(401)/*.end()*/.json({message: "User Unauthorized!"})
    }
 
    const [, token] = authtoken.split(" ");
    
    try {
        
        // Validar se o token é válido
        const { sub } = verify(token ,"53562abf4b43bbe3e8210b6bd8e96b0f") as IPayLoad;
        
        // Recuperar informações do usuário
        request.user_id = sub;

        return next();
    }   catch(err) {
        return response.status(401).end();
    }
    
    
    
    
}
