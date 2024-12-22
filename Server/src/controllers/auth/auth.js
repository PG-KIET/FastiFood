import "dotenv/config";
import {Customer, DeliveryPartner} from '../../models/user.js'; 
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";


const generateToken = (user) => {
    const accessToken = jwt.sign(
        {userId : user._id, role : user.role},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "1d" }
    );

    const refreshToken = jwt.sign(
        {userId : user._id, role : user.role},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : "1d" }
    )
    return {accessToken, refreshToken};
}


export const loginCustomer = async (req, reply) => {
    try {
        const { phone, password } = req.body;
        if (!password) {
            return reply.status(400).send({ message: "Password is required" });
        }

        let customer = await Customer.findOne({ phone });

        if (!customer) {
            console.log("Plain password:", password);
            const hashedPassword = await bcrypt.hash(password, 10); 
            console.log("Hashed password:", hashedPassword);
            
            customer = new Customer({
                phone,
                password: hashedPassword,
                role: "Customer",
                isActivated: true,
            });
        
            await customer.save();

            const { accessToken, refreshToken } = generateToken(customer);

            return reply.send({
                message: "Customer created and logged in",
                accessToken,
                refreshToken,
                customer,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);
        console.log("Password Match:", isPasswordValid);

        if (!isPasswordValid) {
            return reply.status(401).send({ message: "Invalid password" });
        }

        // Tạo token
        const { accessToken, refreshToken } = generateToken(customer);

        return reply.send({
            message: "Login successful",
            accessToken,
            refreshToken,
            customer,
        });

    } catch (error) {
    console.error("Error during login:", error);
    return reply.status(500).send({ message: "An error occurred", error: error.message || error });
}

};

export const loginDeliveryPartner = async (req, reply) => {
    try {
        const { email, password } = req.body;
        let deliveryPartner = await DeliveryPartner.findOne({email});

        if (!deliveryPartner) {
         
        return reply.status(404).send({message: "Delivery Partner not found"})
            
        }

        const isMatch = password === deliveryPartner.password

        if (!isMatch) {
            return reply.status(400).send({message: "Invalid Password"})
        }

        const {accessToken, refreshToken} = generateToken(deliveryPartner);

        return reply.send({
            message: "Login Successful",
            accessToken,
            refreshToken,
            deliveryPartner,
        })

    } catch (error) {
        console.error("Error in loginDeliveryPartner:", error);
        return reply.status(500).send({message: "An error occurred", error})
    }
}

export const refreshToken = async (req, reply) => {
    const { refreshToken} = req.body;

    if (!refreshToken) {
        return reply.status(401).send({message: "Refresh Token is required"})
    }

    try {
        
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        let user;

        if(decoded.role === "Customer"){
            user = await Customer.findById(decoded.userId)
        } else if(decoded.role === "DeliveryPartner"){
            user = await DeliveryPartner.findById(decoded.userId)
        } else{
            return reply.status(403).send({message: "Invalid Role"})
        }

        if(!user){
            return reply.status(403).send({message: "Invalid refresh token"})
        }
        
        const {accessToken, refreshToken: newRefreshToken} = generateToken(user)

        return reply.send({
            message: "Token refreshed successfully",
            accessToken,
            refreshToken: newRefreshToken,
        })

    } catch (error) {
        return reply.status(403).send({message: "Invalid Refresh Token"})
    }


}


export const fetchUser = async (req, reply) => {
    try {
        
        const {userId, role} = req.user
        let user;

        if(role === "Customer"){
            user = await Customer.findById(userId)
        } else if(role === "DeliveryPartner"){
            user = await DeliveryPartner.findById(userId)
        } else{
            return reply.status(403).send({message: "Invalid Role"})
        }

        if(!user){
            return reply.status(404).send({message: "User not found"})
        }

        return reply.send({
            message: "User fetched successfully", 
            user
        });


    } catch (error) {
        return reply.status(500).send({message: "An error occurred while fetch", error});
    }
}


