import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/json-db';

export async function GET() {
    const db = await readDb();
    return NextResponse.json({
        data: db.admins,
        total: db.admins.length,
        page: 1,
        per_page: 100,
        total_pages: 1
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const db = await readDb();

    const newAdmin = {
        ...body,
        id: `user-${Date.now()}`,
        role: 'admin',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    db.admins.push(newAdmin);
    await writeDb(db);

    return NextResponse.json(newAdmin);
}
