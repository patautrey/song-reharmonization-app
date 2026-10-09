const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Patented Reharmonization Backend Rules Engine ---
const BACKEND_REHARM_ENGINE = {
    ModernJazz: (chords) => chords.map((c, i) => i % 2 === 0 ? c.replace(/7|maj/g, '') + 'maj9' : c + '13alt'),
    TritoneSub: (chords) => chords.map((c, i) => i % 2 === 1 ? 'Db7(subV)' : c),
    Backdoor: (chords) => chords.map((c, i) => i % 2 === 1 ? 'Bb7' : c),
    ModalBorrow: (chords) => chords.map((c, i) => i % 2 === 1 ? 'Fm6' : c),
    UpperStructure: (chords) => chords.map(c => c.replace(/m|7|maj/g, '') + '/E'),
    ChromaticPlaning: (chords) => chords.map(c => c + 'maj7'),
    DiminishedWalk: (chords) => chords.map((c, i) => i % 2 === 1 ? c + 'dim7' : c + 'm7')
};

// --- API Endpoints ---
app.get('/api/health', (req, res) => {
    res.json({ status: 'online', message: 'Patented Reharmonization Backend API is secure and active.' });
});

// Targeted Reharmonization API Endpoint
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

// Start Server
app.listen(PORT, () => {
    console.log(`Secure backend server running on port ${PORT}`);
});
