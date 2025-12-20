import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/json-db';

export async function GET() {
    const db = await readDb();
    return NextResponse.json({
        data: db.offers,
        total: db.offers.length,
        page: 1,
        per_page: 100,
        total_pages: 1
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const db = await readDb();

    const newItem = {
        ...body,
        id: `offer-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    db.offers.push(newItem);
    await writeDb(db);

    return NextResponse.json(newItem);
}
