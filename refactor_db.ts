
import fs from 'fs';
import path from 'path';

const filesToUpdate = [
    'src/app/api/inspections/[id]/route.ts',
    'src/actions/buildings.ts',
    'src/actions/community.ts',
    'src/actions/delete-inspection.ts',
    'src/actions/finance.ts',
    'src/actions/hydrants.ts',
    'src/actions/inventory.ts',
    'src/actions/itm.ts',
    'src/actions/training.ts',
    'src/actions/public-requests.ts',
    'src/actions/scheduling.ts',
    'src/actions/neris.ts',
    'src/actions/mobile.ts',
    'src/actions/invoicing.ts',
    'src/actions/inspections.ts',
    'src/actions/epcr.ts',
    'src/actions/dashboard.ts',
    'src/actions/command.ts',
    'src/actions/fire-prevention.ts',
    'src/actions/auth.ts',
    'src/actions/assets.ts',
    'src/actions/analytics.ts'
];

const projectRoot = 'c:/Aplicaciones Tecnosolution/NexorFire';

filesToUpdate.forEach(relativePath => {
    const fullPath = path.join(projectRoot, relativePath);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');

        // Check if file already uses the singleton
        if (content.includes("from '@/lib/db'")) {
            console.log(`Skipping ${relativePath}, already updated.`);
            return;
        }

        // 1. Remove the local instantiation
        content = content.replace(/const prisma = new PrismaClient\(\);/g, '');
        content = content.replace(/const prisma = new PrismaClient\(\)/g, ''); // just in case

        // 2. Add the import
        // We'll add it after the last import or at the top
        if (content.includes("import { prisma } from '@/lib/db';")) {
            // already there
        } else {
            // Find the last import line
            const importLines = content.match(/^import .*/gm);
            if (importLines && importLines.length > 0) {
                const lastImport = importLines[importLines.length - 1];
                content = content.replace(lastImport, `${lastImport}\nimport { prisma } from '@/lib/db';`);
            } else {
                content = `import { prisma } from '@/lib/db';\n${content}`;
            }
        }

        // 3. Clean up unused PrismaClient import if possible (simple check)
        // We won't remove it because it might be used for types, but we can try to remove the instantiation part if it was named imports

        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${relativePath}`);
    } else {
        console.log(`File not found: ${relativePath}`);
    }
});
