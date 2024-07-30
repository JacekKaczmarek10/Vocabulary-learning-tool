import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/common/HomePage';
import ResultsPage from './pages/quiz/ResultsPage';
import NotFoundPage from './pages/error/NotFoundPage';
import AboutPage from './pages/common/AboutPage';
import QuizzesPage from './pages/quiz/QuizzesPage';
import QuizDetailPage from './pages/quiz/QuizDetailPage';
import { QuizProvider } from './context/QuizProvider';
import AddQuizPage from "./pages/quiz/AddQuizPage"; // Ensure this path is correct

const App = () => {
    return (
        <QuizProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/quizzes" element={<QuizzesPage />} />
                    <Route path="/add-quiz" element={<AddQuizPage />} />
                    <Route path="/quiz/:id" element={<QuizDetailPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </QuizProvider>
    );
};

export default App;