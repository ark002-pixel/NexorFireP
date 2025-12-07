'use client';

import { useState, useEffect } from 'react';
import {
    Mic, MicOff, Video, VideoOff, PhoneOff,
    MessageSquare, User, CheckCircle, XCircle,
    FileText, Image as ImageIcon, Clock, Shield,
    ChevronRight, AlertCircle
} from 'lucide-react';

export default function VirtualInspectionPage() {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [activeTab, setActiveTab] = useState<'checklist' | 'chat' | 'files'>('checklist');
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setDuration(d => d + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4 bg-gray-100 p-2 rounded-xl overflow-hidden">

            {/* Left Column: Video Conference Area */}
            <div className="flex-1 flex flex-col bg-gray-900 rounded-xl overflow-hidden shadow-2xl relative">

                {/* Header Overlay */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-600 p-1.5 rounded-lg">
                            <Shield size={16} className="text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-sm">Inspección #VI-8821</h2>
                            <p className="text-xs text-gray-300 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                En vivo • {formatTime(duration)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/10">
                        Calidad: HD 1080p
                    </div>
                </div>

                {/* Main Video Area (Placeholder) */}
                <div className="flex-1 flex items-center justify-center relative">
                    <div className="text-center p-8">
                        <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-gray-700 shadow-xl">
                            <User size={64} className="text-gray-500" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">Esperando al Cliente</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            El enlace de invitación ha sido enviado. La sesión comenzará automáticamente cuando el cliente se una.
                        </p>
                        <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors">
                            Reenviar Invitación
                        </button>
                    </div>

                    {/* Self View (PIP) */}
                    <div className="absolute bottom-24 right-6 w-48 h-36 bg-gray-800 rounded-xl border-2 border-gray-700 overflow-hidden shadow-2xl">
                        <div className="w-full h-full flex items-center justify-center bg-gray-700 relative">
                            <User size={24} className="text-gray-500" />
                            <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/50 px-1.5 rounded">Tú</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Controls Bar */}
                <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center justify-center gap-4 px-6 z-20">
                    <button
                        onClick={() => setMicOn(!micOn)}
                        className={`p-3 rounded-full transition-all duration-200 ${micOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
                        title={micOn ? "Silenciar" : "Activar Micrófono"}
                    >
                        {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>
                    <button
                        onClick={() => setCameraOn(!cameraOn)}
                        className={`p-3 rounded-full transition-all duration-200 ${cameraOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
                        title={cameraOn ? "Apagar Cámara" : "Encender Cámara"}
                    >
                        {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
                    </button>

                    <div className="w-px h-8 bg-gray-700 mx-2"></div>

                    <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium flex items-center gap-2 transition-colors shadow-lg shadow-red-900/20">
                        <PhoneOff size={20} />
                        <span className="hidden sm:inline">Finalizar</span>
                    </button>
                </div>
            </div>

            {/* Right Column: Tools & Checklist */}
            <div className="w-full lg:w-[400px] bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('checklist')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'checklist' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Checklist
                    </button>
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'chat' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Chat
                    </button>
                    <button
                        onClick={() => setActiveTab('files')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'files' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Archivos
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4">
                    {activeTab === 'checklist' && (
                        <div className="space-y-4">
                            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-3">
                                <AlertCircle size={18} className="text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold text-blue-800">Instrucciones</h4>
                                    <p className="text-xs text-blue-600 mt-1">
                                        Guíe al cliente para que muestre cada elemento en cámara antes de calificar.
                                    </p>
                                </div>
                            </div>

                            {[
                                "Salidas de emergencia despejadas",
                                "Extintores visibles y accesibles",
                                "Detectores de humo operativos",
                                "Panel de alarma sin fallos",
                                "Rociadores sin obstrucciones",
                                "Señalización de salida iluminada",
                                "Puertas cortafuego operativas"
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <p className="font-medium text-gray-800 mb-3 text-sm">{item}</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-green-50 hover:text-green-700 hover:border-green-200 border border-transparent font-medium text-xs flex items-center justify-center gap-1.5 transition-all">
                                            <CheckCircle size={14} /> Pasa
                                        </button>
                                        <button className="flex-1 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-transparent font-medium text-xs flex items-center justify-center gap-1.5 transition-all">
                                            <XCircle size={14} /> Falla
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'chat' && (
                        <div className="h-full flex flex-col">
                            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
                                No hay mensajes aún.
                            </div>
                            <div className="mt-4 relative">
                                <input
                                    type="text"
                                    placeholder="Escribir mensaje..."
                                    className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'files' && (
                        <div className="grid grid-cols-2 gap-3">
                            <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-colors">
                                <ImageIcon size={24} className="mb-2" />
                                <span className="text-xs font-medium">Capturar Foto</span>
                            </div>
                            {/* Placeholders for captured images */}
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <FileText size={18} />
                        Generar Reporte
                    </button>
                </div>
            </div>
        </div>
    );
}
