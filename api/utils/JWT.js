import jwt from 'jsonwebtoken'

const JWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

export default JWT