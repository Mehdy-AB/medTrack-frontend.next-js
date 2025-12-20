import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/mocks/db.json');

export async function readDb() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading DB:', error);
        return {
            students: [],
            establishments: [],
            admins: [],
            encadrants: [],
            services: [],
            offers: [],
            applications: [],
            affectations: [],
            attendance: [],
            evaluations: [],
            messages: [],
            notifications: [],
            documents: []
        };
    }
}

export async function writeDb(data: any) {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing DB:', error);
    }
}
