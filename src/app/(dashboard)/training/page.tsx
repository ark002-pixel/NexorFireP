export const dynamic = 'force-dynamic';
import { getCourses } from '@/actions/training';
import { BookOpen, Award, Clock } from 'lucide-react';
import NewCourseForm from '@/components/training/NewCourseForm';

export default async function TrainingPage() {
    const courses = await getCourses();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Training</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Gestión de Cursos y Certificaciones</p>
                </div>
                <NewCourseForm />
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={20} />
                    Catálogo de Cursos
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {courses.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>No hay cursos registrados.</p>
                    ) : (
                        courses.map((course) => (
                            <div key={course.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{course.name}</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{course.description}</p>
                                    </div>
                                    {course.mandatory && (
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#FEE2E2', color: '#991B1B', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                            Obligatorio
                                        </span>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Clock size={14} /> {course.duration} Horas
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Award size={14} /> {course.type}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

