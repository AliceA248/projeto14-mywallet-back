import bcrypt from "bcrypt"
import { v4 as uuidv4} from "uuid"

export async function signUp() {
    const  users = db.collection("users")
    const newUser = res.locals.user

    const newPassword = bcrypt.hashSync(newUser.password, 10)

    try {
        await users.insertOne({ ...newUser, password: newPassword})
        res.status(201).send("Usuário Cadastrado!")
    } catch (error) {
        console.log(error)
        res.status(500).send("Erro")
        
    }

}

export async function signIn(req, res) {
    const user = res.locals.user
    const  session = db.collection("session")

    const token = uuidv4

    try {
        await session.insertOne( { userID: user._id, token}) 
        res.status(200).send({ token })
        
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro no servidor")
        
    }


    
}