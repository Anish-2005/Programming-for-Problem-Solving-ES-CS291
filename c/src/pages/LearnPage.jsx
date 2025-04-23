import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiBookOpen, FiCpu, FiDatabase, FiSave, FiTerminal, FiHome,FiChip } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const concepts = [
 
  {
    title: "Pointers & Memory Management",
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int var = 20;
    int *ptr = &var;
    
    printf("Value of var: %d\\n", var);
    printf("Address of var: %p\\n", (void*)&var);
    printf("Value via pointer: %d\\n", *ptr);
    
    // Dynamic memory allocation
    int *arr = (int*)malloc(5 * sizeof(int));
    for(int i=0; i<5; i++) {
        arr[i] = i * 10;
    }
    
    free(arr);
    return 0;
}`,
    explanation: "Pointers store memory addresses. malloc() allocates heap memory that must be manually freed."
  },
  {
    title: "Arrays & Strings",
    code: `#include <stdio.h>
#include <string.h>

int main() {
    // Array example
    int numbers[5] = {1, 2, 3, 4, 5};
    
    // String (character array)
    char greeting[] = "Hello";
    char name[20];
    
    printf("Enter your name: ");
    fgets(name, 20, stdin);
    
    printf("%s %s\\n", greeting, name);
    printf("Length: %lu\\n", strlen(name));
    
    return 0;
}`,
    explanation: "Arrays store multiple values. Strings are null-terminated character arrays."
  },
  {
    title: "Structures & Unions",
    code: `#include <stdio.h>

// Structure definition
struct Student {
    char name[50];
    int age;
    float gpa;
};

// Union definition
union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    struct Student s1 = {"Alice", 20, 3.8};
    union Data data;
    
    data.i = 10;
    printf("Data.i: %d\\n", data.i);
    
    data.f = 3.14;
    printf("Data.f: %.2f\\n", data.f);
    
    return 0;
}`,
    explanation: "Structures group related data. Unions share memory space between members."
  },
  {
    title: "File I/O Operations",
    code: `#include <stdio.h>

int main() {
    FILE *file;
    
    // Writing to file
    file = fopen("data.txt", "w");
    if(file != NULL) {
        fprintf(file, "Hello File System!\\n");
        fclose(file);
    }
    
    // Reading from file
    char buffer[100];
    file = fopen("data.txt", "r");
    if(file != NULL) {
        fgets(buffer, 100, file);
        printf("File content: %s", buffer);
        fclose(file);
    }
    
    return 0;
}`,
    explanation: "fopen() modes: r (read), w (write), a (append), r+ (read/write)"
  },
  {
    title: "Dynamic Memory Allocation",
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int size = 5;
    
    // Memory allocation
    arr = (int*)calloc(size, sizeof(int));
    
    if(arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    // Reallocate memory
    arr = realloc(arr, 10 * sizeof(int));
    
    free(arr);
    return 0;
}`,
    explanation: "Use calloc for zero-initialized memory. Always check allocation success."
  },
  {
    title: "Preprocessor Directives",
    code: `#include <stdio.h>

#define PI 3.14159
#define SQUARE(x) ((x) * (x))

#ifdef DEBUG
    #define LOG(msg) printf("DEBUG: %s\\n", msg)
#else
    #define LOG(msg)
#endif

int main() {
    printf("Area of circle: %.2f\\n", PI * SQUARE(5));
    LOG("Calculation complete");
    return 0;
}`,
    explanation: "Macros perform text substitution before compilation. Use #ifdef for conditional compilation."
  },
  {
    title: "Advanced Concepts: Recursion & Function Pointers",
    code: `#include <stdio.h>

// Recursive factorial
int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n-1);
}

// Function pointer example
void greet(char *name) {
    printf("Hello, %s!\\n", name);
}

int main() {
    // Recursion
    printf("5! = %d\\n", factorial(5));
    
    // Function pointer
    void (*funcPtr)(char*) = &greet;
    funcPtr("Programmer");
    
    return 0;
}`,
    explanation: "Recursion solves problems by self-reference. Function pointers enable dynamic dispatch."
  }
];

const LearnPage = () => {
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
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                  <FiTerminal className="text-xl text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-200">
                  C Programming Lab
                </h1>
              </motion.div>
              
              <motion.div whileHover={{ y: -2 }}>
                <Link to="/" className="px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/40 border border-indigo-700 flex items-center gap-2">
                  <FiHome className="text-indigo-300" />
                  Home
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
              {/* Code Concepts Panel */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border-2 border-indigo-700/50 shadow-xl">
                <div className="flex items-center bg-gray-900/80 px-4 py-3 border-b border-indigo-700/50">
                  <div className="flex items-center gap-3">
                    <FiCpu className="text-indigo-400" />
                    <span className="text-sm font-mono text-gray-300">core_concepts.c</span>
                  </div>
                </div>
                <div className="p-6 space-y-8 h-[600px] overflow-y-auto">
                  {concepts.map((concept, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-gray-900/30 rounded-xl p-4 border border-indigo-700/30"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <FiCode className="text-indigo-400 text-xl" />
                        <h2 className="text-xl font-semibold text-indigo-100">
                          {concept.title}
                        </h2>
                      </div>
                      <pre className="p-4 rounded-lg bg-gray-900/50 overflow-x-auto text-sm font-mono text-green-300">
                        {concept.code}
                      </pre>
                      <div className="mt-4 p-3 bg-indigo-900/20 rounded-lg">
                        <p className="text-indigo-300 text-sm">{concept.explanation}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
    
              {/* Learning Resources Panel */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border-2 border-indigo-700/50 shadow-xl">
                <div className="flex items-center justify-between bg-gray-900/80 px-4 py-3 border-b border-indigo-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-sm font-mono text-gray-300">learning_resources</span>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Learning Path Section */}
                  <div className="bg-gray-900/30 rounded-xl p-4 border border-indigo-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <FiBookOpen className="text-indigo-400 text-xl" />
                      <h2 className="text-xl font-semibold text-indigo-100">
                        Learning Path
                      </h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 text-indigo-200">
                          <FiCpu className="inline mr-2" />
                          System Programming
                        </h3>
                        <ul className="list-disc list-inside text-indigo-300 space-y-2">
                          <li>Memory Management</li>
                          <li>Process Scheduling</li>
                          <li>Device Drivers</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 text-indigo-200">
                          <FiDatabase className="inline mr-2" />
                          Data Structures
                        </h3>
                        <ul className="list-disc list-inside text-indigo-300 space-y-2">
                          <li>Linked Lists</li>
                          <li>Binary Trees</li>
                          <li>Hash Tables</li>
                        </ul>
                      </div>
                    </div>
                  </div>
    
                  {/* Best Practices Section */}
                  <div className="bg-gray-900/30 rounded-xl p-4 border border-indigo-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <FiSave className="text-indigo-400 text-xl" />
                      <h2 className="text-xl font-semibold text-indigo-100">
                        Best Practices
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 text-indigo-200">
                          Memory Safety
                        </h3>
                        <ul className="list-disc list-inside text-indigo-300 space-y-2">
                          <li>Always free allocated memory</li>
                          <li>Check pointer validity</li>
                          <li>Use valgrind for leaks</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 text-indigo-200">
                          Optimization
                        </h3>
                        <ul className="list-disc list-inside text-indigo-300 space-y-2">
                          <li>Cache-friendly patterns</li>
                          <li>Compiler flags (-O2)</li>
                          <li>Profile before optimizing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
    
                  {/* Hardware Panel */}
                  <div className="bg-gray-900/30 rounded-xl p-4 border border-indigo-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <FiCpu className="text-indigo-400 text-xl" />
                      <h2 className="text-xl font-semibold text-indigo-100">
                        Memory Overview
                      </h2>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                      <div className="p-2 bg-gray-800/50 rounded">
                        <div className="text-indigo-400">Stack</div>
                        <div className="text-gray-400">0x7ffd3a...</div>
                      </div>
                      <div className="p-2 bg-gray-800/50 rounded">
                        <div className="text-indigo-400">Heap</div>
                        <div className="text-gray-400">0x55b1b2...</div>
                      </div>
                      <div className="p-2 bg-gray-800/50 rounded">
                        <div className="text-indigo-400">Registers</div>
                        <div className="text-gray-400">RAX: 0x0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
    
            {/* Footer */}
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
    
    export default LearnPage;