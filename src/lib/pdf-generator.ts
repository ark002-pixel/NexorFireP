import jsPDF from 'jspdf';

interface CertificateData {
    inspection: any;
    inspectorSig: string;
    clientSig: string;
    clientName: string;
}

export const generateCertificate = ({ inspection, inspectorSig, clientSig, clientName }: CertificateData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // --- Header ---
    // Logo placeholder (Blue rectangle for now)
    doc.setFillColor(37, 99, 235); // Blue-600
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICADO DE INSPECCIÓN', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Seguridad Humana y Protección Contra Incendios', pageWidth / 2, 30, { align: 'center' });

    // --- Inspection Details ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalles de la Propiedad', 20, 60);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    const details = [
        `Nombre: ${inspection.building.name}`,
        `Dirección: ${inspection.building.address}`,
        `Ciudad: ${inspection.building.city}`,
        `Fecha de Inspección: ${new Date(inspection.date).toLocaleDateString()}`,
        `ID de Inspección: ${inspection.id.substring(0, 8).toUpperCase()}`
    ];

    let y = 70;
    details.forEach(line => {
        doc.text(line, 20, y);
        y += 8;
    });

    // --- Results Summary ---
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen de Resultados', 20, y + 15);

    const counts = { Pass: 0, Fail: 0, Citation: 0, NA: 0 };
    inspection.results.forEach((r: any) => {
        if (counts[r.status as keyof typeof counts] !== undefined) {
            counts[r.status as keyof typeof counts]++;
        }
    });

    y += 25;

    // Draw summary boxes
    const boxWidth = 35;
    const startX = 20;

    // Pass
    doc.setFillColor(220, 252, 231); // Green-100
    doc.rect(startX, y, boxWidth, 20, 'F');
    doc.setTextColor(22, 163, 74); // Green-600
    doc.setFontSize(16);
    doc.text(counts.Pass.toString(), startX + (boxWidth / 2), y + 12, { align: 'center' });
    doc.setFontSize(8);
    doc.text('APROBADOS', startX + (boxWidth / 2), y + 18, { align: 'center' });

    // Fail
    doc.setFillColor(254, 226, 226); // Red-100
    doc.rect(startX + 40, y, boxWidth, 20, 'F');
    doc.setTextColor(220, 38, 38); // Red-600
    doc.setFontSize(16);
    doc.text(counts.Fail.toString(), startX + 40 + (boxWidth / 2), y + 12, { align: 'center' });
    doc.setFontSize(8);
    doc.text('FALLAS', startX + 40 + (boxWidth / 2), y + 18, { align: 'center' });

    // Citation
    doc.setFillColor(254, 243, 199); // Amber-100
    doc.rect(startX + 80, y, boxWidth, 20, 'F');
    doc.setTextColor(217, 119, 6); // Amber-600
    doc.setFontSize(16);
    doc.text(counts.Citation.toString(), startX + 80 + (boxWidth / 2), y + 12, { align: 'center' });
    doc.setFontSize(8);
    doc.text('CITACIONES', startX + 80 + (boxWidth / 2), y + 18, { align: 'center' });

    // --- Certification Statement ---
    y += 40;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const text = "Por medio de la presente se certifica que se ha realizado la inspección de seguridad humana y protección contra incendios en las instalaciones mencionadas. Los resultados detallados se encuentran registrados en el sistema NexorFire.";
    const splitText = doc.splitTextToSize(text, pageWidth - 40);
    doc.text(splitText, 20, y);

    // --- Signatures ---
    y += 40;

    // Inspector Signature
    if (inspectorSig) {
        doc.addImage(inspectorSig, 'PNG', 20, y, 60, 30);
        doc.line(20, y + 32, 80, y + 32); // Line
        doc.setFontSize(10);
        doc.text('Inspector Autorizado', 20, y + 38);
        doc.setFontSize(8);
        doc.text('NexorFire Dept.', 20, y + 43);
    }

    // Client Signature
    if (clientSig) {
        doc.addImage(clientSig, 'PNG', 110, y, 60, 30);
        doc.line(110, y + 32, 170, y + 32); // Line
        doc.setFontSize(10);
        doc.text(clientName, 110, y + 38);
        doc.setFontSize(8);
        doc.text('Representante / Cliente', 110, y + 43);
    }

    // --- Footer ---
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175); // Gray-400
    doc.text('Generado por NexorFire - Sistema de Gestión de Inspecciones', pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text(`Fecha de Emisión: ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 6, { align: 'center' });

    // Save
    doc.save(`Certificado_${inspection.id.substring(0, 8)}.pdf`);
};
