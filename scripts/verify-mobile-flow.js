const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const BASE_URL = 'http://localhost:3000/api/mobile';
const EMAIL = 'admin@nexorfire.com';
const PASSWORD = 'admin123';

async function runVerification() {
    console.log('🚀 Starting End-to-End Verification...');

    try {
        // 1. Login
        console.log('\n🔐 1. Testing Login...');
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: EMAIL, password: PASSWORD })
        });

        if (!loginRes.ok) {
            throw new Error(`Login failed: ${loginRes.status} ${loginRes.statusText}`);
        }

        const loginData = await loginRes.json();
        console.log('✅ Login Successful!');
        console.log(`   User: ${loginData.user.name} (${loginData.user.id})`);
        console.log(`   Token: ${loginData.token.substring(0, 20)}...`);

        const token = loginData.token;
        const inspectorId = loginData.user.id;
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        // 2. Get Route
        console.log('\n🗺️ 2. Testing Get Route...');
        const routeRes = await fetch(`${BASE_URL}/routes?inspectorId=${inspectorId}`, { headers });
        const routeData = await routeRes.json();
        console.log('Route Response:', JSON.stringify(routeData, null, 2));

        if (routeData.message) {
            console.log(`ℹ️ ${routeData.message}`);
        } else {
            console.log('✅ Route Fetched!');
            console.log(`   Route ID: ${routeData.id}`);
            if (routeData.stops) {
                console.log(`   Stops: ${routeData.stops.length}`);
            } else {
                console.log('⚠️ Route has no stops property');
            }
        }

        // 3. Get Inspections
        console.log('\n📋 3. Testing Get Inspections...');
        const inspectionsRes = await fetch(`${BASE_URL}/inspections?inspectorId=${inspectorId}`, { headers });
        const inspectionsData = await inspectionsRes.json();
        console.log('Inspections Response:', JSON.stringify(inspectionsData, null, 2));

        if (Array.isArray(inspectionsData)) {
            console.log(`✅ Inspections Fetched: ${inspectionsData.length} items`);

            if (inspectionsData.length > 0) {
                const inspectionToComplete = inspectionsData[0];
                console.log(`   Target Inspection: ${inspectionToComplete.id} (${inspectionToComplete.status})`);

                // 4. Complete Inspection
                console.log('\n✅ 4. Testing Complete Inspection...');
                const completeRes = await fetch(`${BASE_URL}/inspections/${inspectionToComplete.id}`, {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({ status: 'Completed' })
                });

                if (!completeRes.ok) {
                    throw new Error(`Complete failed: ${completeRes.status}`);
                }

                const completeData = await completeRes.json();
                console.log('✅ Inspection Completed!');
                console.log(`   New Status: ${completeData.status}`);
            } else {
                console.log('⚠️ No inspections available to complete.');
            }
        } else {
            console.log('❌ Inspections response is not an array:', inspectionsData);
        }

        console.log('\n✨ Verification Finished Successfully!');

    } catch (error) {
        console.error('\n❌ Verification Failed:', error.message);
    }
}

runVerification();
