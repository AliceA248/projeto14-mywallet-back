import { userSchema } from "../model/userSchema.js"
import bcrypt from "bcrypt"

export async function userValidation(req, res, next) {
    const user = req.body
    const  users = db.collection("users")

    const { error } = userSchema.validate(user, { abortEarly:false})

    if (error) {
        const errorMensagem = error.details.map( detail => detail.message)
        return res.status(400).send(errorMensagem)
    }

    const checkUser = await users.findOne( { email: user.email} ) 
    if (checkUser) return res.status(409).send("Usuário já existe")

    res.locals.user = user

    next()
}

export async function signInValidation(req, res, next) {
    const  users = db.collection("users")
    const { email, password } = req.body

    try {
        const user = await users.findOne({ email: email})

        if (!user) return res.status(401).send("Não autorizado")

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) return res.status(401).send("Senha inválida")
        res.locals.user = user

        


    } catch (error) {
        console.error(error)
        res.status(500).send("Problema de servidor")
    }

}