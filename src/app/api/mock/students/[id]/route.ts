import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/json-db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const db = await readDb();
    const index = db.students.findIndex((s: any) => s.id === id);

    if (index !== -1) {
        db.students[index] = { ...db.students[index], ...body, updated_at: new Date().toISOString() };

        // Update inner user_data if names changed
        if (body.first_name || body.last_name) {
            db.students[index].user_data = {
                ...db.students[index].user_data,
                first_name: body.first_name || db.students[index].first_name,
                last_name: body.last_name || db.students[index].last_name
            };
        }

        await writeDb(db);
        return NextResponse.json(db.students[index]);
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log('DELETE request received for ID:', id);
    const db = await readDb();
    console.log('Current DB students count:', db.students.length);
    const index = db.students.findIndex((s: any) => s.id === id);
    console.log('Student found at index:', index);

    if (index !== -1) {
        db.students.splice(index, 1);
        await writeDb(db);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
