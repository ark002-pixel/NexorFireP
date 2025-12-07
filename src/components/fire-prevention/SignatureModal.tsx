'use client';

import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { X, Eraser, Check } from 'lucide-react';

interface SignatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (inspectorSig: string, clientSig: string, clientName: string) => void;
}

export default function SignatureModal({ isOpen, onClose, onSave }: SignatureModalProps) {
    const inspectorSigRef = useRef<SignatureCanvas>(null);
    const clientSigRef = useRef<SignatureCanvas>(null);
    const [clientName, setClientName] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        if (inspectorSigRef.current?.isEmpty() || clientSigRef.current?.isEmpty() || !clientName.trim()) {
            alert('Por favor complete todos los campos y firmas.');
            return;
        }

        const inspectorSig = inspectorSigRef.current?.getTrimmedCanvas().toDataURL('image/png') || '';
        const clientSig = clientSigRef.current?.getTrimmedCanvas().toDataURL('image/png') || '';

        onSave(inspectorSig, clientSig, clientName);
    };

    const clearInspector = () => inspectorSigRef.current?.clear();
    const clearClient = () => clientSigRef.current?.clear();

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Firmas Digitales</h2>
                        <p className="text-sm text-gray-500">Requerido para generar el certificado</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Inspector Signature */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-end">
                            <label className="block text-sm font-semibold text-gray-700">Firma del Inspector</label>
                            <button onClick={clearInspector} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                                <Eraser size={14} /> Limpiar
                            </button>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-white transition-colors">
                            <SignatureCanvas
                                ref={inspectorSigRef}
                                canvasProps={{ className: 'w-full h-40 rounded-lg cursor-crosshair' }}
                                backgroundColor="rgba(0,0,0,0)"
                            />
                        </div>
                        <p className="text-xs text-gray-400 text-center">Firme dentro del recuadro</p>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Client Signature */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Cliente / Responsable</label>
                            <input
                                type="text"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                placeholder="Ej: Juan Pérez"
                                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <label className="block text-sm font-semibold text-gray-700">Firma del Cliente</label>
                                <button onClick={clearClient} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                                    <Eraser size={14} /> Limpiar
                                </button>
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-white transition-colors">
                                <SignatureCanvas
                                    ref={clientSigRef}
                                    canvasProps={{ className: 'w-full h-40 rounded-lg cursor-crosshair' }}
                                    backgroundColor="rgba(0,0,0,0)"
                                />
                            </div>
                            <p className="text-xs text-gray-400 text-center">Firme dentro del recuadro</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm flex items-center gap-2 transition-transform active:scale-95"
                    >
                        <Check size={18} />
                        Generar Certificado
                    </button>
                </div>
            </div>
        </div>
    );
}
