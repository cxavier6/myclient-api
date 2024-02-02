const QUERY = {
    SELECT_CLIENTS: 'SELECT * FROM clients ORDER BY created_at DESC LIMIT 100',
    SELECT_CLIENT_BY_ID: 'SELECT * FROM clients WHERE id = ?',
    CREATE_CLIENT: 'INSERT INTO clients(first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
    UPDATE_CLIENT: 'UPDATE clients SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
    DELETE_CLIENT: 'DELETE FROM clients WHERE id = ?'
}

export default QUERY;

//it's not a good practice to fetch all data from a table, use limit