import { NextResponse } from 'next/server';
import { readDb } from '@/lib/json-db';
import { mockAuthTokens, mockUser, mockEncadrantUser, mockEstablishmentUser, mockAdminUser } from '@/mocks/mockData';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        console.log('Login attempt for email:', email);
        const db = await readDb();

        let user = null;

        // 1. Check persistent DB first

        // Check Admins
        if (!user) {
            const admin = db.admins.find((u: any) => u.email === email);
            if (admin) {
                user = {
                    id: admin.id,
                    email: admin.email,
                    first_name: admin.first_name,
                    last_name: admin.last_name,
                    role: admin.role || 'admin', // Ensure role is set
                    is_active: admin.is_active
                };
                console.log('Admin user found:', user);
            }
        }

        // Check Students (nested in user_data or direct fields, normalizing to User type)
        if (!user) {
            const student = db.students.find((s: any) => s.email === email || s.user_data?.email === email);
            if (student) {
                user = {
                    id: student.user_id || student.id,
                    email: student.email,
                    first_name: student.first_name,
                    last_name: student.last_name,
                    role: 'student'
                };
            }
        }

        // Check Encadrants
        if (!user) {
            const encadrant = db.encadrants.find((e: any) => e.email === email);
            if (encadrant) {
                user = {
                    id: encadrant.user_id || encadrant.id,
                    email: encadrant.email,
                    first_name: encadrant.first_name,
                    last_name: encadrant.last_name,
                    role: 'encadrant'
                };
            }
        }

        // Check Establishments
        if (!user) {
            const est = db.establishments.find((e: any) => e.email === email);
            if (est) {
                user = {
                    id: est.id,
                    email: est.email,
                    first_name: est.name,
                    last_name: 'Admin',
                    role: 'establishment'
                };
            }
        }

        // 2. Fallback to hardcoded mocks (for original demo accounts)
        if (!user) {
            if (email.includes('admin')) user = mockAdminUser;
            else if (email.includes('encadrant')) user = mockEncadrantUser;
            else if (email.includes('etablissement')) user = mockEstablishmentUser;
            else if (email.includes('student')) user = mockUser;
        }

        if (user) {
            console.log('Returning user:', user);
            return NextResponse.json({
                user,
                tokens: mockAuthTokens
            });
        }

        console.log('No user found for email:', email);
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        console.error('Login route error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
