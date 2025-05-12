require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: true,
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  maxAge: 86400
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/c-assignments', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Schema
const problemSchema = new mongoose.Schema({
  question: String,
  code: String,
  output: String
}, { _id: false });

const cAssignmentSchema = new mongoose.Schema({
  title: String,
  icon: { type: String, default: 'FiTerminal' }, // Default icon as string
  problems: [problemSchema],
  createdAt: { type: Date, default: Date.now }
});

// Model
const CAssignment = mongoose.model('CAssignment', cAssignmentSchema);

// Response Helpers
const respond = {
  success: (res, data, status = 200) => res.status(status).json({ success: true, data }),
  error: (res, message, status = 400, details = null) => {
    const response = { success: false, message };
    if (details && process.env.NODE_ENV !== 'production') response.details = details;
    res.status(status).json(response);
  }
};

// Routes
const router = express.Router();

function asyncHandler(fn) {
  return (req, res) => fn(req, res).catch(err => respond.error(res, err.message, 500, err));
}

// CRUD for C Assignments
router.route('/c-assignments')
  .get(asyncHandler(async (req, res) => {
    const assignments = await CAssignment.find().sort({ createdAt: -1 }).lean();
    respond.success(res, assignments);
  }))
  .post(asyncHandler(async (req, res) => {
    const { title, problems = [], icon } = req.body;
    if (!title || !problems.length) return respond.error(res, 'Title and problems are required');

    const validProblems = problems.map(({ question, code, output }) => {
      if (!question || !code || !output) throw new Error('Each problem must have question, code, and output');
      return { question, code, output };
    });

    // Ensure the icon is a string and set to default if not provided
    const validIcon = typeof icon === 'string' ? icon : 'FiTerminal';

    const newAssignment = new CAssignment({ title, icon: validIcon, problems: validProblems });
    const saved = await newAssignment.save();
    respond.success(res, saved, 201);
  }));

router.route('/c-assignments/:id')
  .get(asyncHandler(async (req, res) => {
    const assignment = await CAssignment.findById(req.params.id).lean();
    if (!assignment) return respond.error(res, 'Assignment not found', 404);
    respond.success(res, assignment);
  }))
  .put(asyncHandler(async (req, res) => {
    const { title, problems, icon } = req.body;
    
    // Ensure the icon is a string and set to default if not provided
    const validIcon = typeof icon === 'string' ? icon : 'FiTerminal';
    
    const updated = await CAssignment.findByIdAndUpdate(
      req.params.id,
      { title, problems, icon: validIcon },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return respond.error(res, 'Assignment not found', 404);
    respond.success(res, updated);
  }))
  .patch(asyncHandler(async (req, res) => {
    const updateFields = req.body;
    
    // Ensure the icon is a string and set to default if not provided
    if (updateFields.icon && typeof updateFields.icon !== 'string') {
      updateFields.icon = 'FiTerminal';
    }

    const updated = await CAssignment.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return respond.error(res, 'Assignment not found', 404);
    respond.success(res, updated);
  }))
  .delete(asyncHandler(async (req, res) => {
    const deleted = await CAssignment.findByIdAndDelete(req.params.id);
    if (!deleted) return respond.error(res, 'Assignment not found', 404);
    respond.success(res, { message: 'Assignment deleted successfully' });
  }));

app.use('/api', router);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 404 Handler
app.use((req, res) => {
  respond.error(res, 'Endpoint not found', 404);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  respond.error(res, 'Internal Server Error', 500, err);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌱 Environment: ${process.env.NODE_ENV || 'development'}`);
});
