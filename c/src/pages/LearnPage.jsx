import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiBookOpen, FiCpu, FiDatabase, FiSave, FiTerminal, FiHome,FiChevronRight } from 'react-icons/fi';
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
    const [activeConcept, setActiveConcept] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveConcept((prev) => (prev + 1) % concepts.length);
        }, 5000);
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
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.h1 
                        className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600"
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        viewport={{ once: true }}
                    >
                        C Programming Concepts
                    </motion.h1>
                    <motion.p 
                        className="text-blue-600 max-w-2xl mx-auto text-lg"
                        whileInView={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Master core concepts with interactive examples and detailed explanations
                    </motion.p>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Code Concepts Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-xl border border-blue-200 shadow-lg overflow-hidden"
                    >
                        <div className="flex items-center justify-between bg-blue-50 px-4 py-3 border-b border-blue-200">
                            <div className="flex items-center gap-3">
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <FiCode className="text-cyan-600" />
                                </motion.div>
                                <span className="text-sm font-mono text-blue-600">core_concepts.c</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                            </div>
                        </div>
                        
                        <div className="relative h-[600px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeConcept}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 p-6 overflow-y-auto"
                                >
                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <FiCode className="text-cyan-600 text-xl" />
                                            <h2 className="text-xl font-bold text-blue-800">
                                                {concepts[activeConcept].title}
                                            </h2>
                                        </div>
                                        <pre className="p-4 rounded-lg bg-blue-50 overflow-x-auto text-sm font-mono text-cyan-800">
                                            {concepts[activeConcept].code}
                                        </pre>
                                    </div>
                                    <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                                        <p className="text-blue-700">{concepts[activeConcept].explanation}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent p-4 flex justify-center gap-2">
                                {concepts.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveConcept(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${activeConcept === index ? 'bg-cyan-600 w-6' : 'bg-blue-300'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Learning Resources Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Learning Path Section */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl border border-blue-200 p-6 shadow-lg overflow-hidden relative"
                        >
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-200 rounded-full opacity-20"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <FiBookOpen className="text-cyan-600 text-2xl" />
                                    <h2 className="text-xl font-bold text-blue-800">Learning Path</h2>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <h3 className="text-lg font-medium mb-2 text-blue-700">
                                            <FiCpu className="inline mr-2 text-cyan-600" />
                                            System Programming
                                        </h3>
                                        <ul className="list-disc list-inside text-blue-600 space-y-2">
                                            <li>Memory Management</li>
                                            <li>Process Scheduling</li>
                                            <li>Device Drivers</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <h3 className="text-lg font-medium mb-2 text-blue-700">
                                            <FiDatabase className="inline mr-2 text-blue-600" />
                                            Data Structures
                                        </h3>
                                        <ul className="list-disc list-inside text-blue-600 space-y-2">
                                            <li>Linked Lists</li>
                                            <li>Binary Trees</li>
                                            <li>Hash Tables</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Best Practices Section */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl border border-blue-200 p-6 shadow-lg overflow-hidden relative"
                        >
                            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <FiSave className="text-blue-600 text-2xl" />
                                    <h2 className="text-xl font-bold text-blue-800">Best Practices</h2>
                                </div>
                                <div className="grid gap-4">
                                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <h3 className="text-lg font-medium mb-2 text-blue-700">
                                            Memory Safety
                                        </h3>
                                        <ul className="list-disc list-inside text-blue-600 space-y-2">
                                            <li>Always free allocated memory</li>
                                            <li>Check pointer validity</li>
                                            <li>Use valgrind for leaks</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <h3 className="text-lg font-medium mb-2 text-blue-700">
                                            Optimization
                                        </h3>
                                        <ul className="list-disc list-inside text-blue-600 space-y-2">
                                            <li>Cache-friendly patterns</li>
                                            <li>Compiler flags (-O2)</li>
                                            <li>Profile before optimizing</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Memory Overview Panel */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl border border-blue-200 p-6 shadow-lg overflow-hidden relative"
                        >
                            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <FiCpu className="text-indigo-600 text-2xl" />
                                    <h2 className="text-xl font-bold text-blue-800">Memory Overview</h2>
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
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.footer 
                    className="border-t border-blue-200 py-8"
                    whileInView={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    viewport={{ once: true }}
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
};

export default LearnPage;