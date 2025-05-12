import React,{ useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import {
  FiTerminal, FiCpu, FiCode, FiServer, FiLock, FiBookOpen,
  FiHome, FiX, FiClipboard, FiTrash2, FiPlus, FiFolder,
  FiActivity, FiGrid, FiArchive, FiBox, FiGitlab, FiArrowUp,
  FiArrowDown, FiLink, FiRefreshCw, FiFileText, FiAlertTriangle, FiChevronRight,
  FiEdit2, FiSave
} from 'react-icons/fi';

const iconComponents = {
  FiTerminal, FiCpu, FiCode, FiServer, FiLock, FiBookOpen,
  FiHome, FiX, FiClipboard, FiTrash2, FiPlus, FiFolder,
  FiActivity, FiGrid, FiArchive, FiBox, FiGitlab, FiArrowUp,
  FiArrowDown, FiLink, FiRefreshCw, FiFileText, FiAlertTriangle, FiEdit2, FiSave
};

export default function CLabsPage() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    icon: 'FiTerminal', // Use the string name for the icon, not the component
    problems: [{ question: '', code: '', output: '' }]
  });
  const [pin, setPin] = useState('');
  const [pinVerified, setPinVerified] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const HARDCODED_PIN = import.meta.env.VITE_ADMIN_PIN;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/c-assignments`);
        if (!response.ok) throw new Error('Failed to fetch assignments');
        const { data } = await response.json();
        // Ensure all assignments have an icon and it's a valid string
        const formatted = data.map(a => ({
          ...a,
          icon: a.icon || 'FiTerminal' // Fallback to 'FiTerminal' if no icon is found
        }));
        setAssignments(formatted);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === HARDCODED_PIN) {
      setPinVerified(true);
      setPin('');
    }
  };

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false);
    setPinVerified(false);
    setPin('');
    setEditingId(null);
    setFormData({
      title: '',
      icon: 'FiTerminal',
      problems: [{ question: '', code: '', output: '' }]
    });
  };

  const addProblemField = () => {
    setFormData(prev => ({
      ...prev,
      problems: [...prev.problems, { question: '', code: '', output: '' }]
    }));
  };

  const handleProblemChange = (index, field, value) => {
    const newProblems = formData.problems.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setFormData(prev => ({ ...prev, problems: newProblems }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      // Ensure that the icon is always a string before sending it to the server
      const payload = {
        ...formData,
        icon: typeof formData.icon === 'string' ? formData.icon : 'FiTerminal' // Default to 'FiTerminal'
      };

      if (editingId) {
        response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/c-assignments/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/c-assignments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const { data } = await response.json();
      // Handle the server response and update assignments
      if (editingId) {
        setAssignments(prev => prev.map(a =>
          a._id === editingId ? { ...data, icon: data.icon || 'FiTerminal' } : a
        ));
      } else {
        setAssignments(prev => [{ ...data, icon: data.icon || 'FiTerminal' }, ...prev]);
      }

      handleCloseAdminPanel();
      navigate('/c-labs');
      window.location.reload(); // Reload the page after navigating

    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/c-assignments/${id}`, {
        method: 'DELETE'
      });
      setAssignments(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (assignment) => {
    setEditingId(assignment._id);
    setFormData({
      title: assignment.title,
      icon: assignment.icon || 'FiTerminal', // Ensure there's always an icon string
      problems: assignment.problems
    });
    setShowAdminPanel(true);
    setPinVerified(true);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl text-cyan-600"
        >
          <FiTerminal />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center text-red-600">
          <p className="text-xl mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-900">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white/80 backdrop-blur-lg border-b border-blue-200 p-4 sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md"
              >
                <FiTerminal className="text-xl text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                C Programming Lab
              </h1>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-white hover:bg-blue-50 border border-blue-200 flex items-center gap-2 transition-all duration-300 hover:shadow-md text-blue-700"
            >
              <FiHome className="text-cyan-600" />
              <span>Home</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-blue-500"
              >
                <FiChevronRight />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
            <FiCode className="inline-block mr-4" />
            System Programming Labs
          </h1>
          <p className="text-blue-600 text-lg">Master low-level programming with memory management and hardware interaction</p>
        </motion.div>

        {/* Assignments Panel */}
        <motion.div
          className="mt-8 bg-white rounded-xl p-6 border border-blue-200 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FiCpu className="text-cyan-600 text-xl" />
            <h3 className="text-xl font-bold text-blue-800">Lab Assignments</h3>
          </div>

          {/* Assignments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => {
              const IconComponent = iconComponents[assignment.icon]; // Ensure this is a valid React component
              return (
                <motion.div
                  key={assignment._id}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setIsPopupOpen(true);
                  }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-white p-6 rounded-xl border border-blue-200 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-100 h-full flex flex-col">
                    <div className="text-4xl mb-4 text-cyan-600">
                      <IconComponent /> {/* Make sure you're passing a React component */}
                    </div>

                    <h3 className="text-xl font-semibold text-blue-800">
                      {assignment.title}
                    </h3>
                    <div className="mt-4">
                      <span className="text-cyan-600 text-sm">
                        {assignment.problems.length} {assignment.problems.length > 1 ? 'Problems' : 'Problem'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </motion.div>

        {/* Admin Panel Button */}
        <motion.button
          onClick={() => setShowAdminPanel(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-xl z-[1000] text-white"
        >
          <FiLock className="text-2xl" />
        </motion.button>

        {/* Assignment Details Modal */}
         <AnimatePresence>
          {isPopupOpen && selectedAssignment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4"
              onClick={() => setIsPopupOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-xl border border-blue-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 relative">
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    <FiX className="text-xl text-blue-600" />
                  </button>

                  <div className="flex items-center mb-8">
                    <div className="text-4xl text-cyan-600 mr-4">
                      {React.createElement(iconComponents[selectedAssignment.icon] || FiTerminal)}
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                      {selectedAssignment.title}
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {selectedAssignment.problems.map((problem, pIndex) => (
                      <div key={pIndex} className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h4 className="text-xl font-medium text-blue-800 mb-6">
                          {problem.question}
                        </h4>

                        <div className="bg-white rounded-xl overflow-hidden mb-6 relative border border-blue-200">
                          <div className="flex items-center bg-blue-50 px-4 py-3 border-b border-blue-200">
                            <div className="flex space-x-2 mr-3">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-sm text-blue-600">solution.c</div>
                          </div>
                          <pre className="p-6 text-sm text-cyan-800 font-mono overflow-x-auto">
                            {problem.code}
                          </pre>
                          <button
                            onClick={() => navigator.clipboard.writeText(problem.code)}
                            className="absolute top-1.5 right-1.5 p-2 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-600 text-lg"
                          >
                            <FiClipboard />
                          </button>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-blue-200">
                          <span className="text-blue-600 text-sm font-medium">Output:</span>
                          <pre className="text-blue-700 text-sm font-mono whitespace-pre-wrap mt-4">
                            {problem.output}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Panel */}
        <AnimatePresence>
          {showAdminPanel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1002] bg-black/50 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white p-6 rounded-xl w-full max-w-2xl mx-4 max-h-[70vh] overflow-y-auto border border-blue-200 shadow-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-800">
                    <FiLock className="text-cyan-600" /> Admin Panel
                  </h2>
                  <button
                    onClick={handleCloseAdminPanel}
                    className="p-2 hover:bg-blue-50 rounded-full"
                  >
                    <FiX className="text-xl text-blue-600" />
                  </button>
                </div>

                {!pinVerified ? (
                  <form onSubmit={handlePinSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-600">
                        Enter 4-digit Admin PIN
                      </label>
                      <input
                        type="password"
                        value={pin}
                        onChange={(e) => {
                          const filteredValue = e.target.value
                            .replace(/\D/g, '')
                            .slice(0, 4);
                          setPin(filteredValue);
                        }}
                        className="w-full p-2 bg-blue-50 rounded text-center text-2xl font-mono tracking-[0.5em] text-blue-800"
                        placeholder="••••"
                        inputMode="numeric"
                        pattern="\d{4}"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-lg font-medium shadow-md"
                    >
                      Verify PIN
                    </button>
                  </form>
                ) : (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-600">Title</label>
                        <input
                          placeholder="Lab Assignment Title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full p-2 bg-blue-50 rounded text-blue-800 focus:ring-2 focus:ring-cyan-400 border border-blue-200"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-600">Icon</label>
                        <select
                          value={formData.icon}
                          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                          className="w-full p-2 bg-blue-50 rounded text-blue-800 focus:ring-2 focus:ring-cyan-400 border border-blue-200"
                        >
                          {Object.keys(iconComponents).map(icon => (
                            <option key={icon} value={icon} className="bg-white">
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-4">
                        {formData.problems.map((problem, index) => (
                          <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex justify-between mb-2">
                              <span className="text-blue-600">Problem {index + 1}</span>
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => setFormData(prev => ({
                                    ...prev,
                                    problems: prev.problems.filter((_, i) => i !== index)
                                  }))}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <FiX />
                                </button>
                              )}
                            </div>

                            <div className="space-y-4">
                              <textarea
                                placeholder="Problem Statement"
                                value={problem.question}
                                onChange={(e) => handleProblemChange(index, 'question', e.target.value)}
                                className="w-full p-2 bg-white rounded text-blue-800 focus:ring-2 focus:ring-cyan-400 border border-blue-200"
                                rows="3"
                                required
                              />
                              <textarea
                                placeholder="Code Solution"
                                value={problem.code}
                                onChange={(e) => handleProblemChange(index, 'code', e.target.value)}
                                className="w-full p-2 bg-white rounded font-mono text-sm text-cyan-800 focus:ring-2 focus:ring-cyan-400 border border-blue-200"
                                rows="6"
                                required
                              />
                              <textarea
                                placeholder="Expected Output"
                                value={problem.output}
                                onChange={(e) => handleProblemChange(index, 'output', e.target.value)}
                                className="w-full p-2 bg-white rounded text-blue-800 focus:ring-2 focus:ring-cyan-400 border border-blue-200"
                                rows="2"
                                required
                              />
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={addProblemField}
                          className="w-full py-2 bg-blue-100 hover:bg-blue-200 rounded text-blue-600 border border-blue-300 transition-all flex items-center justify-center gap-2"
                        >
                          <FiPlus className="text-blue-600" />
                          Add Another Problem
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-lg font-medium transition-colors shadow-md flex items-center justify-center gap-2"
                        >
                          {editingId ? <FiSave /> : <FiPlus />}
                          {editingId ? 'Update Assignment' : 'Create Assignment'}
                        </button>
                        <button
                          type="button"
                          onClick={handleCloseAdminPanel}
                          className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white rounded-lg font-medium transition-colors shadow-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>

                    {/* Existing assignments section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-blue-600 mb-4">
                        Manage Existing Assignments
                      </h3>
                      <div className="space-y-2">
                        {assignments.map(assignment => (
                          <div
                            key={assignment._id}
                            className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-200"
                          >
                            <span className="text-blue-800">{assignment.title}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(assignment)}
                                className="p-2 text-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-full"
                                title="Edit"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                onClick={() => handleDelete(assignment._id)}
                                className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                                title="Delete"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Note */}
        <motion.footer
          className="mt-16 border-t border-blue-200 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="container mx-auto px-4 text-center text-blue-400 text-sm">
            <p>
              © {new Date().getFullYear()} C Programming Lab | Master Memory Management and System Programming
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}