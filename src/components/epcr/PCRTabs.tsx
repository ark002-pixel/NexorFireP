'use client';

import { useState } from 'react';
import { Clock, User, Activity, HeartPulse, Syringe, FileText } from 'lucide-react';
import IncidentTab from './tabs/IncidentTab';
import PatientTab from './tabs/PatientTab';
import AssessmentTab from './tabs/AssessmentTab';
import VitalsTab from './tabs/VitalsTab';
import TreatmentTab from './tabs/TreatmentTab';
import NarrativeTab from './tabs/NarrativeTab';

interface PCRTabsProps {
    pcr: any;
}

export default function PCRTabs({ pcr }: PCRTabsProps) {
    const [activeTab, setActiveTab] = useState('incident');

    const tabs = [
        { id: 'incident', label: 'Incidente', icon: Clock },
        { id: 'patient', label: 'Paciente', icon: User },
        { id: 'assessment', label: 'Evaluación', icon: Activity },
        { id: 'vitals', label: 'Signos Vitales', icon: HeartPulse },
        { id: 'treatment', label: 'Tratamiento', icon: Syringe },
        { id: 'narrative', label: 'Narrativa', icon: FileText },
    ];

    return (
        <div>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem', overflowX: 'auto' }}>
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '1rem',
                                border: 'none',
                                background: 'none',
                                borderBottom: isActive ? '2px solid #3B82F6' : '2px solid transparent',
                                color: isActive ? '#3B82F6' : 'var(--color-text-secondary)',
                                fontWeight: isActive ? 600 : 500,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Icon size={18} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div style={{ padding: '0.5rem' }}>
                {activeTab === 'incident' && <IncidentTab pcr={pcr} />}
                {activeTab === 'patient' && <PatientTab pcr={pcr} />}
                {activeTab === 'assessment' && <AssessmentTab pcr={pcr} />}
                {activeTab === 'vitals' && <VitalsTab pcr={pcr} />}
                {activeTab === 'treatment' && <TreatmentTab pcr={pcr} />}
                {activeTab === 'narrative' && <NarrativeTab pcr={pcr} />}
            </div>
        </div>
    );
}
