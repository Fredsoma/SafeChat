
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const uploadFolder = path.join(__dirname, '../uploads');

// Ensure uploads folder exists
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post('/', upload.single('media'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // Return the relative path so the frontend can display or store it
  res.json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});

module.exports = router;
