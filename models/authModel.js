// models/authModel.js
const db = require('../config/db');

const addUser = async (email, role) => {
    // Check if the email already exists
    const checkQuery = `SELECT * FROM public."users" WHERE email = $1`;
    const { rows: existingUsers } = await db.query(checkQuery, [email]);

    if (existingUsers.length === 0) {
        // Insert new user if email does not exist
        const insertQuery = `
            INSERT INTO public."users" (email, name, contact, address, role) 
            VALUES ($1, NULL, NULL, NULL, $2) RETURNING *;
        `;
        const { rows } = await db.query(insertQuery, [email, role]);
        return rows[0];
    }
    return null; // Return null if user already exists
};

const isAnAdmin = async (email) => {
    const checkQuery = `SELECT * FROM public."admins" WHERE email = $1`;
    const { rows: existingAdmins } = await db.query(checkQuery, [email]);
    return existingAdmins.length > 0;
};

module.exports = {
    addUser,
    isAnAdmin
};
