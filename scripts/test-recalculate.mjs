import fetch from 'node-fetch';

async function main() {
    const baseUrl = 'http://192.168.20.152:3000'; // Using the IP from context

    // 1. Login
    console.log('Logging in...');
    const loginRes = await fetch(`${baseUrl}/api/mobile/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@nexorfire.com', password: 'admin123' })
    });

    if (!loginRes.ok) {
        console.error('Login failed:', await loginRes.text());
        return;
    }

    const { token, user } = await loginRes.json();
    console.log('Logged in as:', user.name);

    // 2. Get Active Route
    console.log('Fetching active route...');
    const routeRes = await fetch(`${baseUrl}/api/mobile/routes?inspectorId=${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!routeRes.ok) {
        console.error('Get route failed:', await routeRes.text());
        return;
    }

    const route = await routeRes.json();
    if (!route || !route.id) {
        console.error('No active route found.');
        return;
    }

    console.log('Active Route ID:', route.id);
    console.log('Stops:', route.stops.length);
    console.log('Current Stop Order:');
    route.stops.forEach((s, i) => console.log(`${i}: ${s.inspection.building.name} (${s.inspection.building.latitude}, ${s.inspection.building.longitude})`));

    // 3. Recalculate Route
    // Current stops: Torre Reforma (19.4233, -99.1756), Angel (19.4270, -99.1677).
    // If we are at 19.4300, -99.1600 (North East), Angel is closer (dist ~0.9km) than Torre Reforma (dist ~1.8km).
    // So Angel should be first.

    console.log('Recalculating route from 19.4300, -99.1600...');
    const recalcRes = await fetch(`${baseUrl}/api/mobile/routes/recalculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            routeId: route.id,
            lat: 19.4300,
            lng: -99.1600
        })
    });

    if (!recalcRes.ok) {
        console.error('Recalculate failed:', await recalcRes.text());
        return;
    }

    const updatedRoute = await recalcRes.json();
    console.log('Updated Route Stops:', updatedRoute.stops.length);
    console.log('New Stop Order:');
    updatedRoute.stops.forEach((s, i) => console.log(`${i}: ${s.inspection.building.name}`));
}

main().catch(console.error);
