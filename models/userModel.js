// models/userModel.js
const db = require('../config/db');

const currentUser = async (email) => {
    console.log("email: ", email);
    const checkQuery = `SELECT * FROM public."users" WHERE email = $1`;
    const { rows } = await db.query(checkQuery, [email]);
    return rows[0]; // Return the first row, assuming email is unique
};

const updateUser = async (email, updates) => {
    const updateFields = Object.keys(updates)
        .map((key, index) => `"${key}" = $${index + 1}`)
        .join(', ');
    const updateValues = Object.values(updates);

    const updateQuery = `
        UPDATE public."users" 
        SET ${updateFields} 
        WHERE email = $${updateValues.length + 1} 
        RETURNING *;
    `;
    const { rows } = await db.query(updateQuery, [...updateValues, email]);
    return rows[0];
};

module.exports = {
    currentUser,
    updateUser
};
