import { PrismaClient } from '@prisma/client'
import * as bcrypt from "bcrypt"
const prisma = new PrismaClient()
async function main() {
    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash("password", salt);
    const email = "admin@gmail.com"
    const phone_number = "08123456789"
    const name = "ADMIN"
    const check = await prisma.user.findUnique({
        where: { email: email }
    })
    if(check){
        console.log("user already exists")
    } else {
        await prisma.user.create({
            data: {
                email: email,
                password: hashpassword,
                name: name,
                phone_number: phone_number,
                role: "SUPERADMIN",
                status: 1,
                email_confirmation: 1,
                image: "https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280.jpg"
            }
        })
    }
    console.log("DONE SEED")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })