import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from "./pages/AboutPage";
import {QuizProvider} from "./context/QuizProvider";
import QuizzesPage from "./pages/QuizzesPage";
import QuizDetailPage from "./pages/QuizDetailPage";

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/quizzes" element={<QuizzesPage />} />
                    <Route path="/quiz/:id" element={<QuizDetailPage/>} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path={"/about"} element={<AboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;