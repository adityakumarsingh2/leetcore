import mongoose from 'mongoose';
import User from '../src/models/User.models.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkUsers() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");

        const allUsers = await User.find({}).lean();
        console.log("Total users in DB:", allUsers.length);

        allUsers.forEach(u => {
            console.log(`User: ${u.username}, stats exists: ${!!u.stats}, stats:`, u.stats);
        });
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkUsers();
