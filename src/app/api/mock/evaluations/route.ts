import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/json-db';

export async function GET() {
    const db = await readDb();

    // Populate student data for each evaluation
    const evaluationsWithStudents = db.evaluations.map((evaluation: any) => {
        const student = db.students.find((s: any) => s.id === evaluation.student_id);
        return {
            ...evaluation,
            student: student ? {
                id: student.id,
                student_number: student.student_number,
                user: {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email
                }
            } : null
        };
    });

    return NextResponse.json({
        data: evaluationsWithStudents,
        total: evaluationsWithStudents.length,
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
        id: `eval-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    db.evaluations.push(newItem);
    await writeDb(db);

    return NextResponse.json(newItem);
}
