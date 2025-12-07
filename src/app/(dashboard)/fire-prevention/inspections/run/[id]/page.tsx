'use client';

import { getInspection, updateInspectionResult, uploadInspectionPhoto, completeInspection } from '@/actions/inspections';
import { issuePermitFromInspection } from '@/actions/fire-prevention';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Check, X, AlertTriangle, Camera, MessageSquare, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, FileText } from 'lucide-react';
import SignatureModal from '@/components/fire-prevention/SignatureModal';
import { generateCertificate } from '@/lib/pdf-generator';

export default function InspectionRunnerPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [inspection, setInspection] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [editingNote, setEditingNote] = useState<string | null>(null);
    const [noteText, setNoteText] = useState("");
    const [showFinishModal, setShowFinishModal] = useState(false);
    const [showSignatureModal, setShowSignatureModal] = useState(false);

    useEffect(() => {
        if (id) {
            getInspection(id)
                .then((data) => {
                    if (data) {
                        setInspection(data);
                    } else {
                        console.error("Inspection not found");
                    }
                })
                .catch((err) => {
                    console.error("Error loading inspection:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div className="p-8 text-center">Cargando inspección...</div>;
    if (!inspection) return <div className="p-8 text-center text-red-600">Error: Inspección no encontrada o no válida.</div>;

    const handleResult = async (itemId: string, status: string, notes?: string) => {
        // Optimistic update
        const updatedResults = [...inspection.results];
        const existingIndex = updatedResults.findIndex(r => r.itemId === itemId);

        if (existingIndex >= 0) {
            updatedResults[existingIndex].status = status;
            if (notes !== undefined) updatedResults[existingIndex].notes = notes;
        } else {
            updatedResults.push({ itemId, status, inspectionId: inspection.id, notes });
        }

        setInspection({ ...inspection, results: updatedResults });

        // Server update
        await updateInspectionResult(inspection.id, itemId, status, notes);
    };

    const confirmFinish = async () => {
        try {
            await completeInspection(inspection.id);
            // Refresh local state to show "Completed" status and enable certificate download
            const updated = await getInspection(inspection.id);
            setInspection(updated);
            setShowFinishModal(false);
        } catch (error) {
            console.error('Error completing inspection:', error);
            alert('Hubo un error al finalizar la inspección.');
        }
    };

    const handleSaveSignature = async (inspectorSig: string, clientSig: string, clientName: string) => {
        // 1. Generate PDF Client-Side
        try {
            generateCertificate({
                inspection,
                inspectorSig,
                clientSig,
                clientName
            });
        } catch (error) {
            console.error('Error generating certificate:', error);
            alert('Error al generar el PDF del certificado.');
        }

        setShowSignatureModal(false);

        // 2. Issue Permit Server-Side
        try {
            const result = await issuePermitFromInspection(
                inspection.id,
                inspectorSig,
                clientSig,
                clientName
            );

            if (result.success) {
                router.push('/fire-prevention/permits');
            } else {
                console.error('Server action failed:', result.error);
                alert('Certificado generado, pero hubo un error al registrar el permiso en el sistema.');
            }
        } catch (error) {
            console.error('Error issuing permit:', error);
            alert('Error al registrar el permiso.');
        }
    };

    const getResult = (itemId: string, property: string = 'status') => {
        const result = inspection.results.find((r: any) => r.itemId === itemId);
        return result ? result[property] : undefined;
    };

    // Helper to count statuses
    const getStatusCounts = () => {
        const counts = { Pass: 0, Fail: 0, Citation: 0, NA: 0 };
        inspection.results.forEach((r: any) => {
            if (counts[r.status as keyof typeof counts] !== undefined) {
                counts[r.status as keyof typeof counts]++;
            }
        });
        return counts;
    };

    const counts = inspection ? getStatusCounts() : { Pass: 0, Fail: 0, Citation: 0, NA: 0 };

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] bg-gray-50 relative">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{inspection.building.name}</h1>
                    <p className="text-sm text-gray-500">{inspection.building.address}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {inspection.template?.name || 'Inspección General'}
                    </div>
                    <button onClick={() => router.back()} className="btn bg-gray-100 hover:bg-gray-200 text-gray-700">
                        Salir
                    </button>

                    {inspection.status === 'Completed' ? (
                        <button
                            onClick={() => setShowSignatureModal(true)}
                            className="btn bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                        >
                            <FileText size={18} />
                            Descargar Certificado
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowFinishModal(true)}
                            className="btn btn-primary"
                        >
                            Finalizar Inspección
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Categories/Navigation) */}
                <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto hidden md:block">
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-500 uppercase text-xs tracking-wider mb-3">Categorías</h3>
                        <div className="space-y-1">
                            <button className="w-full text-left px-3 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-sm">
                                General
                            </button>
                            {/* Future categories can be added here */}
                        </div>
                    </div>
                </div>

                {/* Main Content (Checklist) */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* Category Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Category Header */}
                            <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
                                <h2 className="text-lg font-bold">General</h2>
                                <div className="flex items-center gap-4 bg-white/10 px-4 py-1.5 rounded-lg backdrop-blur-sm">
                                    <div className="flex items-center gap-1.5" title="Pasa">
                                        <Check size={16} className="text-green-300" />
                                        <span className="font-mono font-bold">{counts.Pass}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5" title="Falla">
                                        <X size={16} className="text-red-300" />
                                        <span className="font-mono font-bold">{counts.Fail}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5" title="Citación">
                                        <AlertTriangle size={16} className="text-orange-300" />
                                        <span className="font-mono font-bold">{counts.Citation}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5" title="N/A">
                                        <span className="text-gray-300 text-xs font-bold">N/A</span>
                                        <span className="font-mono font-bold">{counts.NA}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="divide-y divide-gray-100">
                                {inspection.template?.items.map((item: any) => {
                                    const status = getResult(item.id);

                                    return (
                                        <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                                            {/* Question & Meta */}
                                            <div className="mb-4">
                                                <div className="flex items-start gap-2">
                                                    {item.mandatory && (
                                                        <X size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                                                    )}
                                                    <div className="flex-1">
                                                        <h3 className="text-gray-800 font-medium text-lg leading-snug">
                                                            {item.question}
                                                            {item.mandatory && <span className="text-red-500 ml-2 text-sm font-normal">(Requerido)</span>}
                                                        </h3>

                                                        {/* Associated Codes */}
                                                        {item.associatedCodes?.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                {item.associatedCodes.map((link: any) => (
                                                                    <span key={link.fireCode.id} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                                        {link.fireCode.code}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Media Actions */}
                                                    <div className="flex gap-1 items-center">
                                                        {getResult(item.id, 'photoUrl') && (
                                                            <a
                                                                href={getResult(item.id, 'photoUrl')}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block w-10 h-10 relative mr-1 group"
                                                                title="Ver imagen"
                                                            >
                                                                <img
                                                                    src={getResult(item.id, 'photoUrl')}
                                                                    alt="Evidencia"
                                                                    className="w-full h-full object-cover rounded-lg border border-gray-200 shadow-sm transition-transform transform group-hover:scale-150 origin-center z-10 bg-white"
                                                                />
                                                            </a>
                                                        )}
                                                        <label className={`p-2 rounded transition-colors cursor-pointer ${getResult(item.id, 'photoUrl') ? 'text-blue-600 bg-blue-50' : 'text-gray-300 hover:text-blue-600 hover:bg-blue-50'
                                                            }`}>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                capture="environment"
                                                                className="hidden"
                                                                onChange={async (e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        const formData = new FormData();
                                                                        formData.append('inspectionId', inspection.id);
                                                                        formData.append('itemId', item.id);
                                                                        formData.append('photo', file);

                                                                        try {
                                                                            // Optimistic update (optional, but good for UX)
                                                                            // For now, we rely on server revalidation which is fast enough locally
                                                                            await uploadInspectionPhoto(formData);

                                                                            // Force refresh inspection data to show new photo
                                                                            const updatedData = await getInspection(id);
                                                                            setInspection(updatedData);

                                                                        } catch (error) {
                                                                            console.error('Upload failed:', error);
                                                                            alert('Error al subir la imagen');
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            <Camera size={20} />
                                                        </label>
                                                        <button
                                                            onClick={() => {
                                                                if (editingNote === item.id) {
                                                                    setEditingNote(null);
                                                                } else {
                                                                    setEditingNote(item.id);
                                                                    setNoteText(getResult(item.id, 'notes') || '');
                                                                }
                                                            }}
                                                            className={`p-2 rounded transition-colors ${getResult(item.id, 'notes') ? 'text-blue-600 bg-blue-50' : 'text-gray-300 hover:text-blue-600 hover:bg-blue-50'
                                                                }`}
                                                        >
                                                            <MessageSquare size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            {item.responseType === 'Input' ? (
                                                <input
                                                    type="text"
                                                    placeholder="Escriba su respuesta..."
                                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            ) : (
                                                <div className="flex flex-wrap gap-3">
                                                    <button
                                                        onClick={() => handleResult(item.id, 'Pass')}
                                                        className={`relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${status === 'Pass'
                                                            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-500/30 ring-2 ring-green-500 ring-offset-2'
                                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-600 hover:bg-green-50'
                                                            }`}
                                                    >
                                                        <Check size={18} strokeWidth={2.5} />
                                                        Pasa
                                                    </button>

                                                    <button
                                                        onClick={() => handleResult(item.id, 'Fail')}
                                                        className={`relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${status === 'Fail'
                                                            ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-500 ring-offset-2'
                                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-red-400 hover:text-red-600 hover:bg-red-50'
                                                            }`}
                                                    >
                                                        <X size={18} strokeWidth={2.5} />
                                                        Falla
                                                    </button>

                                                    <button
                                                        onClick={() => handleResult(item.id, 'Citation')}
                                                        className={`relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${status === 'Citation'
                                                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-500 ring-offset-2'
                                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50'
                                                            }`}
                                                    >
                                                        <AlertTriangle size={18} strokeWidth={2.5} />
                                                        Citación
                                                    </button>

                                                    <button
                                                        onClick={() => handleResult(item.id, 'Corrected')}
                                                        className={`relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${status === 'Corrected'
                                                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500 ring-offset-2'
                                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'
                                                            }`}
                                                    >
                                                        <Check size={18} strokeWidth={2.5} />
                                                        Corregido
                                                    </button>

                                                    <button
                                                        onClick={() => handleResult(item.id, 'NA')}
                                                        className={`relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${status === 'NA'
                                                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/30 ring-2 ring-gray-500 ring-offset-2'
                                                            : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        N/A
                                                    </button>
                                                </div>
                                            )}

                                            {/* Note Editor */}
                                            {editingNote === item.id && (
                                                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <textarea
                                                        value={noteText}
                                                        onChange={(e) => setNoteText(e.target.value)}
                                                        placeholder="Agregar una nota u observación..."
                                                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                                                        autoFocus
                                                    />
                                                    <div className="flex justify-end gap-2 mt-2">
                                                        <button
                                                            onClick={() => setEditingNote(null)}
                                                            className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                                                        >
                                                            Cancelar
                                                        </button>
                                                        <button
                                                            onClick={async () => {
                                                                await handleResult(item.id, status || 'Pending', noteText);
                                                                setEditingNote(null);
                                                            }}
                                                            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm"
                                                        >
                                                            Guardar Nota
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Finish Confirmation Modal */}
            {showFinishModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-blue-600 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Check size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Finalizar Inspección</h3>
                        </div>

                        <p className="text-gray-600 mb-6">
                            ¿Está seguro que desea finalizar esta inspección? Esta acción marcará el registro como completado y no se podrán hacer más cambios.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowFinishModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmFinish}
                                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-sm transition-colors"
                            >
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Signature Modal */}
            <SignatureModal
                isOpen={showSignatureModal}
                onClose={() => setShowSignatureModal(false)}
                onSave={handleSaveSignature}
            />
        </div>
    );
}
