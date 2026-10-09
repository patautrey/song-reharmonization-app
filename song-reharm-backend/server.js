const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Patented Reharmonization Rules Engine (Backed by Theory Framework) ---
const BACKEND_REHARM_ENGINE = {
    ModernJazz: (chords) => chords.map((c, i) => {
        if (c === '-') return '-';
        let root = c.replace(/m|7|maj|dim|alt/g, '');
        return (i % 2 === 0) ? root + 'maj9' : root + '13alt';
    }),
    TritoneSub: (chords) => chords.map((c, i) => {
        if (c === '-') return '-';
        let root = c.replace(/m|7|maj|dim|alt/g, '');
        return (i % 2 === 1) ? 'Db7(subV)' : root + 'maj7';
    }),
    Backdoor: (chords) => chords.map((c, i) => {
        if (c === '-') return '-';
        let root = c.replace(/m|7|maj|dim|alt/g, '');
        return (i % 2 === 1) ? 'Bb7' : root + 'maj7';
    }),
    ModalBorrow: (chords) => chords.map((c, i) => {
        if (c === '-') return '-';
        let root = c.replace(/m|7|maj|dim|alt/g, '');
        return (i % 2 === 1) ? 'Fm6' : root + 'maj7';
    }),
    UpperStructure: (chords) => chords.map(c => {
        if (c === '-') return '-';
        let root = c.replace(/m|7|maj|dim|alt/g, '');
        return root + '/E';
    }),
    ChromaticPlaning: (chords) => chords.map(c => {
        if (c === '-') return '-';
        let root = c.replace(/m|7|maj|dim|alt/g, '');
        return root + 'maj7';
    }),
    DiminishedWalk: (chords) => chords.map((c, i) => {
        if (c === '-') return '-';
        let root = c.replace(/m|7|maj|dim|alt/g, '');
        return (i % 2 === 1) ? root + 'dim7' : root + 'm7';
    })
};

// --- API Health & Status ---
app.get('/api/health', (req, res) => {
    res.json({ status: 'online', message: 'Patented Reharmonization Backend API is active and secure.' });
});

// --- Core Reharmonization Execution Endpoint ---
app.post('/api/reharmonize', (req, res) => {
    try {
        const { style, chords, section } = req.body;
        if (!chords || !Array.isArray(chords)) {
            return res.status(400).json({ error: 'Valid chord array required.' });
        }

        const transformFn = BACKEND_REHARM_ENGINE[style] || BACKEND_REHARM_ENGINE.ModernJazz;
        const reharmonizedChords = transformFn(chords);

        res.json({
            success: true,
            section: section || 'ACTIVE_SECTION',
            style,
            reharmonizedChords
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error processing reharmonization rule.' });
    }
});

app.listen(PORT, () => {
    console.log(`Secure backend server running on port ${PORT}`);
});
