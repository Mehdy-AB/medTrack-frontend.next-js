import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/json-db';

export async function GET() {
    const db = await readDb();
    return NextResponse.json({
        data: db.students,
        total: db.students.length,
        page: 1,
        per_page: 100,
        total_pages: 1
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const db = await readDb();

    const newStudent = {
        ...body,
        id: `stu-${Date.now()}`,
        user_id: `user-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_data: {
            id: `user-${Date.now()}`,
            email: body.email,
            first_name: body.first_name,
            last_name: body.last_name,
            role: 'student'
        }
    };

    db.students.push(newStudent);
    await writeDb(db);

    return NextResponse.json(newStudent);
}
