// src/pages/CCompiler.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTerminal, FiPlay, FiAlertCircle, FiHome, FiCpu } from 'react-icons/fi';


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
          <motion.div whileHover={{ scale: 1.03 }}>
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                <FiTerminal className="text-xl text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-200">
                C System Compiler
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Code Editor */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border-2 border-indigo-700/50 shadow-xl">
            <div className="flex items-center bg-gray-900/80 px-4 py-3 border-b border-indigo-700/50">
              <div className="flex items-center gap-3">
                <FiCpu className="text-indigo-400" />
                <span className="text-sm font-mono text-gray-300">system_code.c</span>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 bg-gray-900/20 p-6 text-green-300 font-mono text-sm focus:outline-none resize-none"
              spellCheck="false"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border-2 border-indigo-700/50 shadow-xl">
            <div className="flex items-center justify-between bg-gray-900/80 px-4 py-3 border-b border-indigo-700/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-sm font-mono text-gray-300">system_output</span>
              </div>
              <motion.button
                onClick={compileCode}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-sm font-medium flex items-center gap-2 disabled:opacity-50"
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
                  className="p-6 text-red-400 bg-red-900/20 rounded-b-lg"
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
                  className="p-6 text-gray-300 font-mono text-sm whitespace-pre-wrap h-96 overflow-y-auto"
                >
                  {isLoading ? (
                    <span className="text-indigo-400">[SYSTEM] Compiling kernel module...</span>
                  ) : output || 'Ready for low-level execution'}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Hardware Panel */}
        <motion.div 
          className="mt-8 bg-gray-800/50 rounded-lg p-4 border border-indigo-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FiCpu className="text-indigo-400" />
            <h3 className="font-mono text-gray-300">Memory Overview</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-2 bg-gray-900/50 rounded">
              <div className="text-indigo-400">Stack</div>
              <div className="text-gray-400">0x7ffd3a...</div>
            </div>
            <div className="p-2 bg-gray-900/50 rounded">
              <div className="text-indigo-400">Heap</div>
              <div className="text-gray-400">0x55b1b2...</div>
            </div>
            <div className="p-2 bg-gray-900/50 rounded">
              <div className="text-indigo-400">Registers</div>
              <div className="text-gray-400">RAX: 0x0</div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <footer className="mt-16 border-t border-indigo-700/50 py-8">
          <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} C System Lab | Direct Hardware Access • Memory Management • Kernel-level Operations
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
