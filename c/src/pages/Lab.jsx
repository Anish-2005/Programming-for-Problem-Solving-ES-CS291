import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCode, 
  FiHome,
  FiX,
  FiFolder,
  FiBook,
  FiClipboard,
  FiCpu,
  FiTerminal,
  FiMousePointer
} from 'react-icons/fi';

const labsData = [
  {
    title: "Basic C Concepts",
    icon: <FiCpu />,
    problems: [
      {
        question: "Hello World Program",
        code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
        output: "Hello, World!"
      },
      {
        question: "Simple Calculator",
        code: `#include <stdio.h>

int main() {
    float num1, num2;
    char op;
    
    printf("Enter two numbers: ");
    scanf("%f %f", &num1, &num2);
    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &op);
    
    switch(op) {
        case '+':
            printf("Result: %.2f", num1 + num2);
            break;
        case '-':
            printf("Result: %.2f", num1 - num2);
            break;
        case '*':
            printf("Result: %.2f", num1 * num2);
            break;
        case '/':
            if(num2 != 0)
                printf("Result: %.2f", num1 / num2);
            else
                printf("Error! Division by zero");
            break;
        default:
            printf("Invalid operator!");
    }
    return 0;
}`,
        output: "Enter two numbers: 10 5\nEnter operator: +\nResult: 15.00"
      }
    ]
  },
  {
    title: "Pointers & Memory",
    icon: <FiMousePointer />,
    problems: [
      {
        question: "Pointer Basics",
        code: `#include <stdio.h>

int main() {
    int var = 42;
    int *ptr = &var;
    
    printf("Value: %d\\n", var);
    printf("Address: %p\\n", (void*)&var);
    printf("Pointer value: %d\\n", *ptr);
    
    return 0;
}`,
        output: `Value: 42
Address: 0x7ffd3a... (actual address)
Pointer value: 42`
      },
      {
        question: "Dynamic Memory Allocation",
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int size = 5;
    
    arr = (int*)malloc(size * sizeof(int));
    
    if(arr == NULL) {
        printf("Memory allocation failed!");
        return 1;
    }
    
    for(int i = 0; i < size; i++) {
        arr[i] = i * 2;
    }
    
    free(arr);
    return 0;
}`,
        output: "No visible output (memory management demonstration)"
      }
    ]
  },
  {
    title: "Data Structures",
    icon: <FiFolder />,
    problems: [
      {
        question: "Linked List Implementation",
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void printList(struct Node* n) {
    while(n != NULL) {
        printf("%d ", n->data);
        n = n->next;
    }
}

int main() {
    struct Node* head = NULL;
    struct Node* second = NULL;
    struct Node* third = NULL;

    head = (struct Node*)malloc(sizeof(struct Node));
    second = (struct Node*)malloc(sizeof(struct Node));
    third = (struct Node*)malloc(sizeof(struct Node));

    head->data = 1;
    head->next = second;

    second->data = 2;
    second->next = third;

    third->data = 3;
    third->next = NULL;

    printList(head);
    
    free(head);
    free(second);
    free(third);
    
    return 0;
}`,
        output: "1 2 3"
      }
    ]
  }
];

export default function LabsPage() {
  const [selectedLab, setSelectedLab] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCardClick = (lab) => {
    setSelectedLab(lab);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => setSelectedLab(null), 300);
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
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
              <FiTerminal className="text-xl text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-200">
              C Programming Lab
            </h1>
          </motion.div>
          
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
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-200">
            <FiCpu className="inline-block mr-4" />
            System Programming Labs
          </h1>
          <p className="text-indigo-300 text-lg">Practical C programming exercises for low-level development</p>
        </motion.div>

        {/* Lab Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labsData.map((lab, index) => (
            <motion.div
              key={index}
              className="cursor-pointer"
              onClick={() => handleCardClick(lab)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border-2 border-indigo-700/50 hover:border-purple-500/50 transition-all duration-300 h-full group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    {lab.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-indigo-100 group-hover:text-purple-200 transition-colors">
                    {lab.title}
                  </h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-indigo-300 text-sm">
                    {lab.problems.length} {lab.problems.length > 1 ? 'Exercises' : 'Exercise'}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lab Detail Modal */}
        <AnimatePresence>
          {isPopupOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 backdrop-blur-md bg-black/50 flex items-center justify-center"
              onClick={closePopup}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-800/90 backdrop-blur-xl rounded-xl border-2 border-indigo-700/50 w-[90vw] max-w-4xl max-h-[80vh] overflow-y-auto shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 relative">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-indigo-700/50">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                      <h2 className="text-2xl font-semibold text-indigo-100">
                        {selectedLab?.title}
                      </h2>
                    </div>
                    <button
                      onClick={closePopup}
                      className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/40 text-indigo-300 transition-colors"
                    >
                      <FiX className="text-xl" />
                    </button>
                  </div>

                  {/* Lab Content */}
                  {selectedLab?.problems.map((problem, pIndex) => (
                    <div key={pIndex} className="mb-8 last:mb-0">
                      {/* Problem Statement */}
                      <div className="bg-gray-700/30 p-4 rounded-lg mb-4">
                        <h3 className="text-lg font-medium text-indigo-100 mb-2">
                          Problem {pIndex + 1}
                        </h3>
                        <p className="text-indigo-300 whitespace-pre-wrap">
                          {problem.question}
                        </p>
                      </div>

                      {/* Code Block */}
                      <div className="bg-gray-900/80 rounded-xl overflow-hidden mb-4">
                        <div className="flex items-center bg-gray-800 px-4 py-2 border-b border-indigo-700/50">
                          <div className="flex gap-2 mr-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-sm text-indigo-300 font-mono">solution.c</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(problem.code)}
                            className="ml-auto px-3 py-1 rounded-md bg-indigo-600/50 hover:bg-indigo-500/40 text-indigo-100 text-sm flex items-center gap-2"
                          >
                            <FiClipboard className="text-base" />
                            Copy
                          </button>
                        </div>
                        <pre className="p-4 text-sm text-green-300 font-mono overflow-x-auto">
                          {problem.code}
                        </pre>
                      </div>

                      {/* Output Block */}
                      <div className="bg-gray-900/80 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                          <span className="text-sm text-indigo-300 font-medium">Expected Output</span>
                        </div>
                        <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap bg-gray-800/50 p-3 rounded-lg">
                          {problem.output}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-indigo-700/50 py-8">
        <div className="container mx-auto px-4 text-center text-indigo-300 text-sm">
          <p>
            © {new Date().getFullYear()} C System Lab | Low-Level Programming & Memory Management
          </p>
        </div>
      </footer>
    </div>
  );
}


