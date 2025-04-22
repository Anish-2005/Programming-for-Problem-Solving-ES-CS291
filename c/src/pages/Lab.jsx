import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTerminal, FiCpu, FiCode, FiServer, FiLock, FiBookOpen,
  FiHome, FiX, FiClipboard, FiTrash2, FiPlus, FiFolder,
  FiActivity, FiGrid, FiArchive, FiBox, FiGitlab, FiArrowUp,
  FiArrowDown, FiLink, FiRefreshCw, FiFileText, FiAlertTriangle
} from 'react-icons/fi';

const iconComponents = {
  FiTerminal, FiCpu, FiCode, FiServer, FiLock, FiBookOpen,
  FiHome, FiX, FiClipboard, FiTrash2, FiPlus, FiFolder,
  FiActivity, FiGrid, FiArchive, FiBox, FiGitlab, FiArrowUp,
  FiArrowDown, FiLink, FiRefreshCw, FiFileText, FiAlertTriangle
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
    icon: 'FiTerminal',
    problems: [{ question: '', code: '', output: '' }]
  });
  const [pin, setPin] = useState('');
  const [pinVerified, setPinVerified] = useState(false);
  const HARDCODED_PIN = '1234';

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('https://object-oriented-programming-cpp-lab.onrender.com/api/c-assignments');
        if (!response.ok) throw new Error('Failed to fetch assignments');
        const { data } = await response.json();
        
        const formatted = data.map(a => ({
          ...a,
          icon: iconComponents[a.icon] || FiTerminal
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
      const response = await fetch('https://object-oriented-programming-cpp-lab.onrender.com/api/c-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const { data } = await response.json();
      
      setAssignments(prev => [{
        ...data,
        icon: iconComponents[data.icon] || FiTerminal
      }, ...prev]);
      
    } finally {
      setShowAdminPanel(false);
      setFormData({
        title: '',
        icon: 'FiTerminal',
        problems: [{ question: '', code: '', output: '' }]
      });
      window.location.href = '/c-labs';
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://object-oriented-programming-cpp-lab.onrender.com/api/c-assignments/${id}`, {
        method: 'DELETE'
      });
      setAssignments(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl text-purple-400"
        >
          <FiTerminal />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center text-red-400">
          <p className="text-xl mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
      {/* Circuit Board Background */}
      <div className="fixed inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggMHY0TTggMTJ2NE0xNiA4aC00TTQgOGgtNE0xMiAxMmwyLTIgMiAyLTItMi0yIDJ6TTQgNGwyLTIgMiAyLTItMi0yIDJ6IiBzdHJva2U9IiMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gray-900/80 backdrop-blur-lg border-b border-indigo-700/50 p-4 sticky top-0 z-50"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                <FiTerminal className="text-xl text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-200">
                C Programming Lab
              </h1>
            </Link>
          </motion.div>
          
          <div className="flex gap-4">
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/"
                className="px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/40 border border-indigo-700 flex items-center gap-2"
              >
                <FiHome className="text-indigo-300" />
                Home
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-200">
            <FiCode className="inline-block mr-4" />
            System Programming Labs
          </h1>
          <p className="text-indigo-200 text-lg">Master low-level programming with memory management and hardware interaction</p>
        </motion.div>

        {/* Hardware Panel */}
        <motion.div 
          className="mt-8 bg-gray-800/50 rounded-lg p-4 border border-indigo-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FiCpu className="text-indigo-400" />
            <h3 className="font-mono text-gray-300">Lab Assignments</h3>
          </div>
          
          {/* Assignments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.map((assignment) => {
              const IconComponent = assignment.icon;
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
                  <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-indigo-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-indigo-500/20 h-full">
                    <div className="text-4xl mb-4 text-purple-400">
                      <IconComponent />
                    </div>
                    <h3 className="text-xl font-semibold text-indigo-100">
                      {assignment.title}
                    </h3>
                    <div className="mt-4">
                      <span className="text-indigo-300 text-sm">
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
          className="fixed bottom-8 right-8 p-4 bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-xl z-[1000]"
        >
          <FiLock className="text-2xl text-white" />
        </motion.button>

        {/* Assignment Details Modal */}
        <AnimatePresence>
          {isPopupOpen && selectedAssignment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 backdrop-blur-md bg-black/50 flex items-center justify-center"
              onClick={() => setIsPopupOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-800/90 backdrop-blur-xl rounded-xl border border-purple-400/30 w-full max-w-4xl max-h-[78vh] overflow-y-auto mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 relative">
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                  >
                    <FiX className="text-xl text-purple-400" />
                  </button>

                  <div className="flex items-center mb-8">
                    <div className="text-4xl text-purple-400 mr-4">
                      {selectedAssignment.icon}
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-200">
                      {selectedAssignment.title}
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {selectedAssignment.problems.map((problem, pIndex) => (
                      <div key={pIndex} className="bg-gray-700/30 p-6 rounded-xl">
                        <h4 className="text-xl font-medium text-indigo-100 mb-6">
                          {problem.question}
                        </h4>

                        <div className="bg-gray-900/80 rounded-xl overflow-hidden mb-6 relative">
                          <div className="flex items-center bg-gray-800 px-4 py-3">
                            <div className="flex space-x-2 mr-3">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-sm text-gray-400">solution.c</div>
                          </div>
                          <pre className="p-6 text-sm text-green-300 font-mono overflow-x-auto">
                            {problem.code}
                          </pre>
                          <button
                            onClick={() => navigator.clipboard.writeText(problem.code)}
                            className="absolute top-1.5 right-1.5 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-purple-300 text-lg"
                          >
                            <FiClipboard />
                          </button>
                        </div>

                        <div className="bg-gray-900/80 p-6 rounded-xl">
                          <span className="text-indigo-200 text-sm font-medium">Output:</span>
                          <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap mt-4">
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
                className="bg-gray-800 p-6 rounded-xl w-full max-w-2xl mx-4 max-h-[70vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FiLock className="text-purple-400" /> Admin Panel
                  </h2>
                  <button
                    onClick={handleCloseAdminPanel}
                    className="p-2 hover:bg-gray-700 rounded-full"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {!pinVerified ? (
                  <form onSubmit={handlePinSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-purple-300">
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
                        className="w-full p-2 bg-gray-700 rounded text-center text-2xl font-mono tracking-[0.5em]"
                        placeholder="••••"
                        inputMode="numeric"
                        pattern="\d{4}"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium"
                    >
                      Verify PIN
                    </button>
                  </form>
                ) : (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-6">
  <div className="space-y-2">
    <label className="text-sm font-medium text-purple-300">Title</label>
    <input
      placeholder="Lab Assignment Title"
      value={formData.title}
      onChange={(e) => setFormData({...formData, title: e.target.value})}
      className="w-full p-2 bg-gray-700 rounded text-indigo-100 focus:ring-2 focus:ring-purple-400"
    />
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium text-purple-300">Icon</label>
    <select
      value={formData.icon}
      onChange={(e) => setFormData({...formData, icon: e.target.value})}
      className="w-full p-2 bg-gray-700 rounded text-indigo-100 focus:ring-2 focus:ring-purple-400"
    >
      {Object.keys(iconComponents).map(icon => (
        <option key={icon} value={icon} className="bg-gray-800">
          {icon}
        </option>
      ))}
    </select>
  </div>

  <div className="space-y-4">
    {formData.problems.map((problem, index) => (
      <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-indigo-700/30">
        <div className="flex justify-between mb-2">
          <span className="text-purple-300">Problem {index + 1}</span>
          {index > 0 && (
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                problems: prev.problems.filter((_, i) => i !== index)
              }))}
              className="text-red-400 hover:text-red-300"
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
            className="w-full p-2 bg-gray-700 rounded text-indigo-100 focus:ring-2 focus:ring-purple-400"
            rows="3"
          />
          <textarea
            placeholder="Code Solution"
            value={problem.code}
            onChange={(e) => handleProblemChange(index, 'code', e.target.value)}
            className="w-full p-2 bg-gray-700 rounded font-mono text-sm text-green-200 focus:ring-2 focus:ring-purple-400"
            rows="6"
          />
          <textarea
            placeholder="Expected Output"
            value={problem.output}
            onChange={(e) => handleProblemChange(index, 'output', e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-indigo-100 focus:ring-2 focus:ring-purple-400"
            rows="2"
          />
        </div>
      </div>
    ))}

    <button
      type="button"
      onClick={addProblemField}
      className="w-full py-2 bg-indigo-700/30 hover:bg-indigo-700/40 rounded text-purple-300 border border-indigo-700/50 transition-all"
    >
      <FiPlus className="inline mr-2" />
      Add Another Problem
    </button>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <button
      type="submit"
      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
    >
      Create Lab Assignment
    </button>
    <button
      type="button"
      onClick={handleCloseAdminPanel}
      className="px-6 py-2 bg-red-600/80 hover:bg-red-700/80 rounded-lg font-medium transition-colors"
    >
      Cancel
    </button>
  </div>
</form>

                    {/* Existing assignments section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-purple-300 mb-4">
                        Manage Existing Assignments
                      </h3>
                      <div className="space-y-2">
                        {assignments.map(assignment => (
                          <div 
                            key={assignment._id}
                            className="flex justify-between items-center bg-gray-700/30 p-3 rounded-lg"
                          >
                            <span className="text-indigo-200">{assignment.title}</span>
                            <button
                              onClick={() => handleDelete(assignment._id)}
                              className="p-2 text-red-400 hover:text-red-300"
                            >
                              <FiTrash2 />
                            </button>
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
       <footer className="mt-16 border-t border-indigo-700/50 py-8">
          <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} C Programming Lab | Master Memory Management and System Programming
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}