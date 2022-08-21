import bcrypt from 'bcryptjs'

export const hashDigest = (message) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(message + '', salt);
}

export const compareHash = (message, hash) => {
    return bcrypt.compareSync(message + '', hash)
}