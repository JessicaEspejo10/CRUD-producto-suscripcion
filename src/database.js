import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'adventure',
    password: 'adventure',
    database: 'adventure'
});

export default pool;