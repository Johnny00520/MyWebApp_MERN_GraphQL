import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
import { AuthenticationError } from 'apollo-server-express';

export const authCheck = (context) => {
    // We will get: context = { ... headers }
    // console.log("context: ", context)

    const authHeader = context.req.headers.authorization;
    
    if(authHeader) {
        // Bearer
        const token = authHeader.split('Bearer ')[1];
        if(token) {
            try {
                const user = jwt.verify(token, keys.SECRET_KEY);
                return user
            } catch(error) {
                throw new AuthenticationError("Invalid/Expired token");
            }
        }
        throw new Error("Authentication token must be \ 'Bearer [token]")
    }
    throw new Error("Authorization header must be provided")
}