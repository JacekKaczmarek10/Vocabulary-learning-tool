import axios from 'axios';

const BASE_URL = 'http://localhost:8011/api/quizzes';

class QuizService {
    async getAllQuizzes() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            this.handleError('Error fetching quizzes', error);
        }
    }

    async getQuizById(quizId) {
        try {
            const response = await axios.get(`${BASE_URL}/${quizId}`);
            return response.data;
        } catch (error) {
            this.handleError(`Error fetching quiz ${quizId}`, error);
        }
    }

    async addQuiz(quizDto) {
        try {
            const response = await axios.post(BASE_URL, quizDto);
            return response.data;
        } catch (error) {
            this.handleError('Error adding quiz', error);
        }
    }

    async updateQuestion(quizId, questionId, questionDto) {
        try {
            const response = await axios.put(`${BASE_URL}/${quizId}/questions/${questionId}`, questionDto);
            return response.data;
        } catch (error) {
            this.handleError(`Error updating question ${questionId} for quiz ${quizId}`, error);
        }
    }

    async deleteQuestion(quizId, questionId) {
        try {
            await axios.delete(`${BASE_URL}/${quizId}/questions/${questionId}`);
        } catch (error) {
            this.handleError(`Error deleting question ${questionId} for quiz ${quizId}`, error);
        }
    }

    async deleteQuiz(quizId) {
        try {
            await axios.delete(`${BASE_URL}/${quizId}`);
        } catch (error) {
            this.handleError(`Error deleting quiz ${quizId}`, error);
        }
    }

    async gradeQuiz(quizId, userAnswers) {
        try {
            const response = await axios.post(`${BASE_URL}/grade/${quizId}`, userAnswers);
            return response.data;
        } catch (error) {
            this.handleError(`Error grading quiz ${quizId}`, error);
        }
    }

    handleError(message, error) {
        console.error(message, error);
        throw error;
    }
}

export default new QuizService();