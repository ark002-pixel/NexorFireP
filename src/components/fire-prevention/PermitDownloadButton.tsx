'use client';

import { FileText } from 'lucide-react';
import { generateCertificate } from '@/lib/pdf-generator';

interface PermitDownloadButtonProps {
    permit: any;
    inspection: any;
}

export default function PermitDownloadButton({ permit, inspection }: PermitDownloadButtonProps) {
    const handleDownload = () => {
        if (!inspection) {
            alert('No se encontró la inspección asociada a este permiso.');
            return;
        }

        if (!inspection.inspectorSignature || !inspection.clientSignature) {
            alert('Esta inspección no tiene firmas guardadas. No se puede regenerar el certificado.');
            return;
        }

        generateCertificate({
            inspection: inspection,
            inspectorSig: inspection.inspectorSignature,
            clientSig: inspection.clientSignature,
            clientName: inspection.clientName || 'Cliente'
        });
    };

    return (
        <button
            onClick={handleDownload}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Descargar Certificado"
        >
            <FileText size={20} />
        </button>
    );
}
