import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTerminal, FiCpu, FiCode, FiServer, FiLock, FiBookOpen, FiPlay, FiChevronRight } from 'react-icons/fi';

const CLanding = () => {
  const features = [
    {
      icon: <FiTerminal className="text-2xl" />,
      title: "System Programming",
      description: "Master low-level programming with memory management and hardware interaction",
      color: "bg-cyan-100"
    },
    {
      icon: <FiServer className="text-2xl" />,
      title: "Algorithm Design",
      description: "Implement efficient algorithms with pointer arithmetic and data structures",
      color: "bg-blue-100"
    },
    {
      icon: <FiLock className="text-2xl" />,
      title: "Secure Coding",
      description: "Learn memory safety and secure programming practices",
      color: "bg-indigo-100"
    }
  ];

  const codeSnippets = [
    `#include <stdio.h>\n\nint main() {\n    printf("Hello, Memory!\\n");\n    return 0;\n}`,
    `int *ptr = malloc(10 * sizeof(int));\nif(ptr == NULL) {\n    // Handle error\n}\nfree(ptr);`,
    `for(int i = 0; i < 10; i++) {\n    printf("%d\\n", i);\n}`
  ];

  const [activeSnippet, setActiveSnippet] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
          
          <div className="flex gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/c-labs"
                className="px-4 py-2 rounded-lg bg-white hover:bg-blue-50 border border-blue-200 flex items-center gap-2 transition-all duration-300 hover:shadow-md text-blue-700"
              >
                <FiCode className="text-cyan-600" />
                <span>Labs</span>
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
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="py-3 text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Master C Programming
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Dive deep into system programming, memory management, and algorithm optimization with our interactive labs and compiler.
          </motion.p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Code Editor Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
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
                <span className="text-sm font-mono text-blue-600">memory_management.c</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
              </div>
            </div>
            
            <div className="relative h-96 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeSnippet}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 p-6 text-cyan-800 font-mono text-sm whitespace-pre-wrap bg-blue-50"
                >
                  {codeSnippets[activeSnippet]}
                </motion.pre>
              </AnimatePresence>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent p-4 flex justify-center gap-2">
                {codeSnippets.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSnippet(index)}
                    className={`w-3 h-3 rounded-full transition-all ${activeSnippet === index ? 'bg-cyan-600 w-6' : 'bg-blue-300'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-blue-200 p-6 shadow-lg overflow-hidden relative"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-200 rounded-full opacity-30"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <FiTerminal className="text-cyan-600 text-2xl" />
                  <h2 className="text-xl font-bold text-blue-800">Interactive Labs</h2>
                </div>
                <p className="text-blue-600 mb-6">Hands-on exercises covering memory management, pointers, and system programming.</p>
                <Link
                  to="/c-labs"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-lg transition-all duration-300 group shadow-md"
                >
                  <span>Start Learning</span>
                  <motion.span
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <FiChevronRight />
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-blue-200 p-6 shadow-lg overflow-hidden relative"
            >
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <FiCpu className="text-blue-600 text-2xl" />
                  <h2 className="text-xl font-bold text-blue-800">Live Compiler</h2>
                </div>
                <p className="text-blue-600 mb-6">Write, compile and execute C code directly in your browser with our powerful compiler.</p>
                <Link
                  to="/c-compiler"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white rounded-lg transition-all duration-300 group shadow-md"
                >
                  <span>Try Compiler</span>
                  <motion.span
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <FiChevronRight />
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-blue-200 p-6 shadow-lg overflow-hidden relative"
            >
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-indigo-200 rounded-full opacity-30"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <FiBookOpen className="text-indigo-600 text-2xl" />
                  <h2 className="text-xl font-bold text-blue-800">Learning Path</h2>
                </div>
                <p className="text-blue-600 mb-6">Structured curriculum from basics to advanced system programming concepts.</p>
                <Link
                  to="/learn"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white rounded-lg transition-all duration-300 group shadow-md"
                >
                  <span>Explore Content</span>
                  <motion.span
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <FiChevronRight />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
            >
              Core Features
            </motion.h2>
            <motion.p 
              className="text-blue-600 max-w-2xl mx-auto"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Everything you need to master low-level programming in C
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.03 }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={`bg-white rounded-xl border border-blue-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${feature.color}`}
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br from-${feature.color.split('-')[1]}-400 to-${feature.color.split('-')[1]}-500 flex items-center justify-center mb-4 text-white shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">{feature.title}</h3>
                <p className="text-blue-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl border border-blue-200 p-8 text-center mb-16 shadow-lg relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-200 rounded-full opacity-20"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-200 rounded-full opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">Ready to Master C Programming?</h2>
            <p className="text-blue-600 mb-6 max-w-2xl mx-auto">
              Join thousands of developers learning system programming with our interactive labs and compiler.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/c-labs"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiPlay className="mr-2" />
                Start Learning Now
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="border-t border-blue-200 py-8"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md">
                  <FiTerminal className="text-xl text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                  C Programming Lab
                </h3>
              </div>
              
              <div className="flex gap-6">
                <Link to="/about" className="text-blue-600 hover:text-blue-800 transition-colors">About</Link>
                <Link to="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors">Privacy</Link>
                <Link to="/terms" className="text-blue-600 hover:text-blue-800 transition-colors">Terms</Link>
                <Link to="/contact" className="text-blue-600 hover:text-blue-800 transition-colors">Contact</Link>
              </div>
            </div>
            
            <div className="mt-8 text-center text-blue-400 text-sm">
              <p>© {new Date().getFullYear()} C Programming Lab. All rights reserved.</p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default CLanding;