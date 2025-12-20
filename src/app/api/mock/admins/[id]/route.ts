import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/json-db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const db = await readDb();
    const index = db.admins.findIndex((a: any) => a.id === id);

    if (index !== -1) {
        db.admins[index] = { ...db.admins[index], ...body, updated_at: new Date().toISOString() };
        await writeDb(db);
        return NextResponse.json(db.admins[index]);
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const db = await readDb();
    const index = db.admins.findIndex((a: any) => a.id === id);

    if (index !== -1) {
        db.admins.splice(index, 1);
        await writeDb(db);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
