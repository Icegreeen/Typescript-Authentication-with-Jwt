import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id: number
}
export class UserControlller {
    async create(req: Request, res: Response) {
        const {name, email, password} = req.body
        const userExists = await userRepository.findOneBy({email})

        if(userExists){
            throw new BadRequestError('E-mail já existe')
        }

       const hashPassword = await bcrypt.hash(password, 10)

       const newUser = userRepository.create({
            name, 
            email,
            password: hashPassword 
       })

       await userRepository.save(newUser)

       const {password: _, ...user} = newUser; // o _ descarta a variavel password
       return res.status(201).json(user);
    }

    async login(req: Request, res: Response) {
        const { email, password }= req.body

        const user = await userRepository.findOneBy({email})

        if(!user){
            throw new BadRequestError('E-mail ou senha inválidos!')
        }

        const verifyPassword = await bcrypt.compare(password, user.password)
        
        if(!verifyPassword){
            throw new BadRequestError('E-mail ou senha inválidos!')
        }

        const token = jwt.sign({ id: user.id}, process.env.JWT_PASS ?? '', {
            expiresIn: '8h'
        })

        const { password: _, ...userLogin } = user;

        return res.json({
            user: userLogin,
            token: token
        })
    }

    async getProfile(req: Request, res: Response){
        const { authorization } = req.headers;

        if(!authorization) {
            throw new UnauthorizedError('Não autorizado')
        }

        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '' ) as JwtPayload; //type
        
        const user = await userRepository.findOneBy({ id })

        if(!user){
            throw new UnauthorizedError('Não autorizado')
        }

        const { password: _, ...loggedUser} = user

        return res.json(loggedUser);
    }
}