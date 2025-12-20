import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/json-db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const db = await readDb();
    const index = db.attendance.findIndex((i: any) => i.id === id);

    if (index !== -1) {
        db.attendance[index] = { ...db.attendance[index], ...body, updated_at: new Date().toISOString() };
        await writeDb(db);
        return NextResponse.json(db.attendance[index]);
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const db = await readDb();
    const index = db.attendance.findIndex((i: any) => i.id === id);

    if (index !== -1) {
        db.attendance.splice(index, 1);
        await writeDb(db);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
