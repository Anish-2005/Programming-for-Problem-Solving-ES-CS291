# 🖥️ C Programming Lab - Interactive Learning Platform

> **A comprehensive web-based C programming learning platform with an integrated compiler, interactive tutorials, and dynamic lab assignments.**

![C Programming Lab](https://img.shields.io/badge/Language-C-blue.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🌟 Overview

The **C Programming Lab** is a modern, interactive web application designed to revolutionize how students learn C programming. This platform combines theoretical concepts with hands-on practice through an integrated online compiler, dynamic lab assignments, and comprehensive tutorials.

### 🎯 Key Features

- **🔧 Online C Compiler**: Write, compile, and run C programs directly in your browser
- **📚 Interactive Learning Modules**: Step-by-step tutorials with live code examples
- **🧪 Dynamic Lab Assignments**: Admin-manageable assignments with automatic grading
- **🎨 Modern UI/UX**: Beautiful, responsive interface built with React and Framer Motion
- **📱 Mobile-Friendly**: Fully responsive design for learning on any device
- **🔒 Admin Panel**: Secure assignment management with PIN-based authentication

---

## 🏗️ Architecture

### Frontend (React + Vite)
- **Modern React 19** with functional components and hooks
- **Framer Motion** for smooth animations and transitions
- **React Router** for seamless navigation
- **Tailwind CSS** for responsive styling
- **React Icons** for consistent iconography

### Backend (Node.js + Express)
- **Express.js** server with RESTful API design
- **MongoDB** with Mongoose for data persistence
- **CORS** enabled for cross-origin requests
- **Helmet** for security headers
- **Compression** for optimized responses

### External APIs
- **Judge0 API** for C code compilation and execution
- **Secure API key management** with environment variables

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anish-2005/Programming-for-Problem-Solving-ES-CS291.git
   cd Programming-for-Problem-Solving-ES-CS291
   ```

2. **Setup Frontend**
   ```bash
   cd c
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd ../c-backend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the `c-backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/c-assignments
   VITE_ADMIN_PIN=your-admin-pin
   VITE_BACKEND_URL=http://localhost:3001
   ```

5. **Start the Development Servers**
   
   Terminal 1 (Backend):
   ```bash
   cd c-backend
   node server.js
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd c
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

---

## 🎯 Platform Features

### 🏠 Landing Page
- **Hero Section**: Animated introduction to C programming
- **Feature Highlights**: System programming, algorithms, and secure coding
- **Live Code Snippets**: Rotating examples of C code
- **Navigation**: Easy access to all platform features

### 📚 Learn Page
Interactive tutorials covering:
- **Pointers & Memory Management**: Dynamic allocation, malloc/free
- **Arrays & Strings**: Data structures and string manipulation
- **Structures & Unions**: Complex data types
- **File I/O Operations**: Reading and writing files
- **Control Structures**: Loops, conditionals, and flow control

### 🔧 Online Compiler
- **Real-time Compilation**: Using Judge0 API
- **Syntax Highlighting**: Enhanced code editor
- **Error Handling**: Detailed compilation and runtime error messages
- **Output Display**: Clean, formatted program output
- **Example Programs**: Pre-loaded templates to get started

### 🧪 Labs & Assignments
- **Dynamic Assignment Management**: Admin can create, edit, and delete assignments
- **Multi-Problem Structure**: Each assignment can contain multiple coding problems
- **Icon-based Organization**: Visual categorization of assignments
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Secure Admin Access**: PIN-based authentication for assignment management

---

## 📁 Project Structure

```
Programming-for-Problem-Solving-ES-CS291/
├── c/                                    # Frontend React Application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx              # Home page with hero section
│   │   │   ├── LearnPage.jsx            # Interactive tutorials
│   │   │   ├── Compiler.jsx             # Online C compiler
│   │   │   └── Lab.jsx                  # Lab assignments management
│   │   ├── App.jsx                      # Main app component with routing
│   │   └── main.jsx                     # Application entry point
│   ├── public/
│   │   └── pps.png                      # Application logo
│   ├── package.json                     # Frontend dependencies
│   └── vite.config.js                   # Vite configuration
├── c-backend/                           # Backend Node.js Application
│   ├── server.js                        # Express server and API routes
│   ├── models/
│   │   └── CAssignment.js               # MongoDB schema for assignments
│   └── package.json                     # Backend dependencies
│ 
└── README.md                            # This file
```

---

## 🔧 API Endpoints

### Assignments Management
- `GET /api/c-assignments` - Fetch all assignments
- `POST /api/c-assignments` - Create new assignment
- `PUT /api/c-assignments/:id` - Update assignment
- `DELETE /api/c-assignments/:id` - Delete assignment

### Assignment Structure
```json
{
  "title": "Assignment Title",
  "icon": "FiTerminal",
  "problems": [
    {
      "question": "Problem statement",
      "code": "// Template code",
      "output": "Expected output"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: Blue gradient (`from-blue-50 to-cyan-50`)
- **Accent**: Cyan (`cyan-400` to `blue-500`)
- **Text**: Dark blue (`blue-900`)
- **Background**: Light gradient with glassmorphism effects

### Animations
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Loading States**: Elegant loading indicators
- **Hover Effects**: Interactive button and card animations
- **Responsive Transitions**: Optimized for all screen sizes

### Icons
- **React Icons**: Consistent iconography throughout the app
- **Feather Icons**: Clean, modern icon style
- **Dynamic Icons**: Admin-selectable icons for assignments

---

## 🧑‍💻 For Educators

### Admin Features
- **Secure Access**: PIN-based authentication
- **Assignment CRUD**: Create, read, update, delete assignments
- **Multi-Problem Support**: Add multiple coding problems per assignment
- **Icon Selection**: Choose from various icons for visual organization
- **Real-time Updates**: Changes reflect immediately for students

### Course Integration
- **Structured Units**: 10 comprehensive units covering all C programming topics
- **Progressive Learning**: From basic syntax to advanced concepts
- **Hands-on Practice**: Every unit includes practical exercises
- **Assessment Ready**: Built-in assignment system for evaluation

---

## 🚀 Deployment

### Frontend (Vercel)
The frontend is configured for easy deployment on Vercel:
```bash
cd c
npm run build
# Deploy to Vercel
```

### Backend (Railway/Heroku)
The backend is ready for deployment on cloud platforms:
```bash
cd c-backend
# Set environment variables
# Deploy to your preferred platform
```

### Environment Variables
```env
MONGODB_URI=your-mongodb-connection-string
VITE_ADMIN_PIN=your-secure-admin-pin
VITE_BACKEND_URL=your-backend-url
RAPIDAPI_KEY=your-judge0-api-key
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Areas for Contribution
- **New Learning Modules**: Add more C programming topics
- **UI/UX Improvements**: Enhance the user interface
- **Performance Optimization**: Improve loading times and responsiveness
- **Mobile Features**: Add mobile-specific enhancements
- **Testing**: Add unit and integration tests

---

## 📱 Mobile Experience

The platform is fully responsive and provides an excellent mobile experience:
- **Touch-friendly Interface**: Optimized for mobile interactions
- **Responsive Code Editor**: Works seamlessly on mobile devices
- **Adaptive Layout**: Content reflows perfectly on all screen sizes
- **Mobile Navigation**: Hamburger menu and touch gestures

---

## 🔒 Security Features

- **Input Validation**: All user inputs are validated and sanitized
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Helmet Integration**: Security headers for protection
- **PIN-based Authentication**: Secure admin access
- **Environment Variables**: Sensitive data stored securely

---

## 📊 Performance

- **Vite Build Tool**: Lightning-fast development and build processes
- **Code Splitting**: Optimized bundle size with lazy loading
- **Compression**: Gzip compression for faster loading
- **Efficient Animations**: Hardware-accelerated animations with Framer Motion
- **Optimized Images**: Properly sized and compressed assets

---

## 🎓 Learning Path

### Beginner Level
1. **Start with Landing Page**: Understand the platform overview
2. **Explore Learn Page**: Go through interactive tutorials
3. **Practice with Compiler**: Write and run simple C programs
4. **Complete Basic Labs**: Start with Unit 1-3 assignments

### Intermediate Level
1. **Advanced Topics**: Units 4-7 (Arrays, Algorithms, Functions, Recursion)
2. **Complex Programs**: Multi-function programs with data structures
3. **Memory Management**: Pointers and dynamic allocation
4. **File Operations**: Reading and writing files

### Advanced Level
1. **System Programming**: Low-level programming concepts
2. **Advanced Data Structures**: Linked lists, trees, graphs
3. **Algorithm Implementation**: Sorting, searching, optimization
4. **Project Development**: Complete C programming projects

---

## 📞 Support

If you encounter any issues or have questions:

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check this README for detailed information
- **Community**: Join discussions in the repository
- **Email**: Contact the maintainers for urgent issues

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Judge0 API**: For providing the online C compilation service
- **React Community**: For the amazing frontend framework
- **MongoDB**: For the flexible database solution
- **Framer Motion**: For beautiful animations
- **Vercel**: For seamless deployment platform

---

## 📈 Future Enhancements

- **AI-Powered Code Review**: Automated code feedback and suggestions
- **Collaborative Coding**: Real-time code collaboration features
- **Advanced Analytics**: Progress tracking and performance metrics
- **Mobile App**: Native iOS and Android applications
- **Multi-language Support**: Support for C++, Java, Python
- **Video Tutorials**: Integrated video learning content
- **Gamification**: Badges, achievements, and leaderboards

---

<div align="center">
  <p><strong>Happy Coding! 🚀</strong></p>
  <p>Made with ❤️ by <a href="https://github.com/Anish-2005">Anish</a></p>
</div>
