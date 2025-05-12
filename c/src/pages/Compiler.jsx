import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTerminal, FiPlay, FiAlertCircle, FiHome, FiCpu, FiChevronRight } from 'react-icons/fi';

export default function CompilerPage() {
  const [code, setCode] = useState(`#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");
    return 0;
}`);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const compileCode = async () => {
    setIsLoading(true);
    setError('');
    setOutput('');

    const encodedCode = btoa(code);

    try {
      const submissionRes = await fetch(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'x-rapidapi-key': '269deccffcmshb8bcfc66a0fca92p1546fajsn1593f894014a',
          },
          body: JSON.stringify({
            source_code: encodedCode,
            language_id: 48, // C language ID
            stdin: '',
          }),
        }
      );

      const submissionData = await submissionRes.json();

      if (!submissionData.token) {
        throw new Error(`Submission failed: ${JSON.stringify(submissionData)}`);
      }

      const token = submissionData.token;

      let result = null;
      for (let i = 0; i < 10; i++) {
        const resultRes = await fetch(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
              'x-rapidapi-key': '269deccffcmshb8bcfc66a0fca92p1546fajsn1593f894014a',
            },
          }
        );

        result = await resultRes.json();

        if (result.status.id <= 2) {
          await new Promise(res => setTimeout(res, 1000));
        } else {
          break;
        }
      }

      const outputText = atob(result.stdout || '') ||
                       atob(result.stderr || '') ||
                       atob(result.compile_output || '');

      if (result.stderr || result.compile_output) {
        setError(outputText || 'Compilation Error');
      } else {
        setOutput(outputText || 'Program executed successfully');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Compilation failed');
    } finally {
      setIsLoading(false);
    }
  };

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
                C System Compiler
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-blue-200 shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between bg-blue-50 px-4 py-3 border-b border-blue-200">
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiCpu className="text-cyan-600" />
                </motion.div>
                <span className="text-sm font-mono text-blue-600">system_code.c</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 bg-blue-50 p-6 text-cyan-800 font-mono text-sm focus:outline-none resize-none"
              spellCheck="false"
            />
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-blue-200 shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between bg-blue-50 px-4 py-3 border-b border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-sm font-mono text-blue-600">system_output</span>
              </div>
              <motion.button
                onClick={compileCode}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm font-medium flex items-center gap-2 disabled:opacity-50 shadow-md"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiPlay className="text-lg" />
                )}
                {isLoading ? 'Building...' : 'Execute'}
              </motion.button>
            </div>
            
            <AnimatePresence>
              {error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 text-red-600 bg-red-50 rounded-b-lg"
                >
                  <div className="flex items-center gap-3">
                    <FiAlertCircle className="text-xl" />
                    <pre className="font-mono text-sm whitespace-pre-wrap">{error}</pre>
                  </div>
                </motion.div>
              ) : (
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 text-blue-700 font-mono text-sm whitespace-pre-wrap h-96 overflow-y-auto"
                >
                  {isLoading ? (
                    <span className="text-cyan-600">[SYSTEM] Compiling kernel module...</span>
                  ) : output || 'Ready for low-level execution'}
                </motion.pre>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Hardware Panel */}
        <motion.div 
          className="mt-8 bg-white rounded-xl p-6 border border-blue-200 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FiCpu className="text-cyan-600 text-xl" />
            <h3 className="font-medium text-blue-800">Memory Overview</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-cyan-600 font-medium">Stack</div>
              <div className="text-blue-400">0x7ffd3a...</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-blue-600 font-medium">Heap</div>
              <div className="text-blue-400">0x55b1b2...</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-indigo-600 font-medium">Registers</div>
              <div className="text-blue-400">RAX: 0x0</div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.footer 
          className="mt-16 border-t border-blue-200 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="container mx-auto px-4 text-center text-blue-400 text-sm">
            <p>
              © {new Date().getFullYear()} C System Lab | Direct Hardware Access • Memory Management • Kernel-level Operations
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}