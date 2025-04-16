import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTerminal, FiCpu, FiCode, FiServer, FiLock, FiBookOpen, FiPlay } from 'react-icons/fi';

const CLanding = () => {
  const features = [
    {
      icon: <FiTerminal />,
      title: "System Programming",
      description: "Master low-level programming with memory management and hardware interaction"
    },
    {
      icon: <FiServer />,
      title: "Algorithm Design",
      description: "Implement efficient algorithms with pointer arithmetic and data structures"
    },
    {
      icon: <FiLock />,
      title: "Secure Coding",
      description: "Learn memory safety and secure programming practices"
    }
  ];

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
                to="/c-labs"
                className="px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/40 border border-indigo-700 flex items-center gap-2"
              >
                <FiCode className="text-indigo-300" />
                Labs
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
          {/* Code Preview */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border-2 border-indigo-700/50 shadow-xl">
            <div className="flex items-center bg-gray-900/80 px-4 py-3 border-b border-indigo-700/50">
              <div className="flex items-center gap-3">
                <FiCpu className="text-indigo-400" />
                <span className="text-sm font-mono text-gray-300">example_code.c</span>
              </div>
            </div>
            <pre className="p-6 text-green-300 font-mono text-sm whitespace-pre-wrap h-96 overflow-y-auto">
{`#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = malloc(5 * sizeof(int));
    
    for(int i = 0; i < 5; i++) {
        arr[i] = i * 2;
    }
    
    printf("Memory Address: %p\\n", (void*)arr);
    
    free(arr);
    return 0;
}`}
            </pre>
          </div>

          {/* Features Panel */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border-2 border-indigo-700/50 shadow-xl">
            <div className="flex items-center justify-between bg-gray-900/80 px-4 py-3 border-b border-indigo-700/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-sm font-mono text-gray-300">getting_started</span>
              </div>
            </div>
            
            <div className="p-6 text-gray-300 font-mono text-sm space-y-6">
              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-4">
                <motion.div whileHover={{ y: -2 }}>
                  <Link
                    to="/c-labs"
                    className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <FiTerminal className="flex-shrink-0" />
                    <span>Start Interactive Labs</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -2 }}>
                  <Link
                    to="/c-compiler"
                    className="w-full px-6 py-3 border border-indigo-500 hover:bg-indigo-900/30 text-white rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <FiCpu className="flex-shrink-0" />
                    <span>Access Live Compiler</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -2 }}>
                  <Link
                    to="/learn"
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <FiBookOpen className="flex-shrink-0" />
                    <span>Learn Fundamentals</span>
                  </Link>
                </motion.div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mt-8">
                <div className="p-3 bg-gray-900/30 rounded border border-indigo-700/30">
                  <div className="flex items-center gap-3 text-indigo-400">
                    <FiTerminal />
                    <h3 className="font-semibold">Memory Management</h3>
                  </div>
                  <p className="mt-2 text-indigo-200">
                    Learn manual memory allocation and pointers
                  </p>
                </div>

                <div className="p-3 bg-gray-900/30 rounded border border-indigo-700/30">
                  <div className="flex items-center gap-3 text-indigo-400">
                    <FiServer />
                    <h3 className="font-semibold">System Calls</h3>
                  </div>
                  <p className="mt-2 text-indigo-200">
                    Interface directly with operating system APIs
                  </p>
                </div>

                <div className="p-3 bg-gray-900/30 rounded border border-indigo-700/30">
                  <div className="flex items-center gap-3 text-indigo-400">
                    <FiLock />
                    <h3 className="font-semibold">Security Fundamentals</h3>
                  </div>
                  <p className="mt-2 text-indigo-200">
                    Prevent buffer overflows and memory leaks
                  </p>
                </div>
              </div>
            </div>
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
            <h3 className="font-mono text-gray-300">Core Features</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-xs font-mono">
            {features.map((feature, index) => (
              <div key={index} className="p-4 bg-gray-900/50 rounded border border-indigo-700/30">
                <div className="text-indigo-400 text-2xl mb-2">{feature.icon}</div>
                <div className="text-indigo-300 font-semibold mb-1">{feature.title}</div>
                <div className="text-gray-400">{feature.description}</div>
              </div>
            ))}
          </div>
        </motion.div>

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
};

export default CLanding;