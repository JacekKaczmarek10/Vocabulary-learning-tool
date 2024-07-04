import axios from 'axios';

const API_BASE_URL = 'http://localhost:8011/api/questions';

class QuestionService {
    async addQuestionToQuiz(quizId, questionDto) {
        try {
            const response = await axios.post(`${API_BASE_URL}/quiz/${quizId}`, questionDto);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateQuestion(questionId, questionDto) {
        try {
            const response = await axios.put(`${API_BASE_URL}/${questionId}`, questionDto);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteQuestion(questionId) {
        try {
            await axios.delete(`${API_BASE_URL}/${questionId}`);
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateAnswer(questionId, answerDto) {
        try {
            const response = await axios.put(`${API_BASE_URL}/${questionId}/answer`, answerDto);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getAllQuestionsByQuizId(quizId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/quiz/${quizId}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            console.error('Server responded with a status other than 2xx:', error.response.status, error.response.data);
            alert(`Error: ${error.response.data.message || error.response.data || 'Server error'}`);
        } else if (error.request) {
            console.error('Request was made but no response was received:', error.request);
            alert('Error: No response received from server');
        } else {
            console.error('Error setting up the request:', error.message);
            alert(`Error: ${error.message}`);
        }
    }
}

export default new QuestionService();