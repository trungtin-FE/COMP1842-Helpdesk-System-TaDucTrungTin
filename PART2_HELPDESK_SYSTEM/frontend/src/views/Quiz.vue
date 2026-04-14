<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="h4 mb-0">Quiz Test</h2>
      <router-link to="/" class="btn btn-sm btn-outline-secondary">Back to Home</router-link>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Loading questions...</p>
    </div>

    <div v-else-if="!isFinished" class="card shadow-sm">
      <div class="card-header bg-white border-bottom-0 pt-3">
        <div class="d-flex justify-content-between small text-muted mb-1">
          <span>Question {{ currentIndex + 1 }} / {{ questions.length }}</span>
          <span>Score: {{ score }}</span>
        </div>
        <div class="progress" style="height: 4px;">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
      </div>

      <div class="card-body">
        <p class="text-muted small mb-1">What is the value for:</p>
        <h4 class="mb-4">{{ currentQuestion.key }}</h4>
        
        <div class="list-group">
          <button 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            @click="checkAnswer(option)"
            class="list-group-item list-group-item-action py-3"
          >
            <strong>{{ String.fromCharCode(65 + index) }}.</strong> {{ option }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="card shadow-sm">
      <div class="card-body text-center py-4">
        <h3 class="card-title">Completed!</h3>
        <p class="display-6 my-3 text-primary">{{ score }} / {{ questions.length }}</p>
        
        <hr />

        <div class="text-start mb-4">
          <h5 class="mb-3">Review Answers:</h5>
          <div v-for="(q, idx) in questions" :key="idx" class="mb-3 p-3 border rounded-3 bg-light">
            <p class="fw-bold mb-1">{{ idx + 1 }}. {{ q.key }}</p>
            <div class="small">
              <div :class="userAnswers[idx] === q.correctAnswer ? 'text-success' : 'text-danger'">
                Your answer: {{ userAnswers[idx] }}
                <i v-if="userAnswers[idx] === q.correctAnswer" class="fa-solid fa-check ms-1"></i>
                <i v-else class="fa-solid fa-xmark ms-1"></i>
              </div>
              <div v-if="userAnswers[idx] !== q.correctAnswer" class="text-muted">
                Correct answer: {{ q.correctAnswer }}
              </div>
            </div>
          </div>
        </div>

        <button @click="startQuiz" class="btn btn-primary px-4">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://localhost:5000/api/responses";
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      allResponses: [],
      questions: [],
      userAnswers: [], 
      currentIndex: 0,
      score: 0,
      loading: true,
      isFinished: false
    };
  },
  computed: {
    currentQuestion() { return this.questions[this.currentIndex]; },
    progress() { return (this.currentIndex / this.questions.length) * 100; }
  },
  methods: {
    async startQuiz() {
  this.loading = true;
  this.isFinished = false;
  this.currentIndex = 0;
  this.score = 0;
  this.userAnswers = [];

  try {
    const res = await axios.get(API_URL);
    this.allResponses = res.data;

    if (this.allResponses.length < 4) {
      Swal.fire({
        text: 'Need at least 4 items to start!',
        icon: 'warning',
        iconColor: '#dc3545',
        confirmButtonColor: '#0d6efd'
      });
      this.$router.push('/');
      return;
    }

    const shuffled = [...this.allResponses].sort(() => 0.5 - Math.random());
    
    this.questions = shuffled.slice(0, 5).map(item => {
      const distractors = this.allResponses
        .filter(r => r._id !== item._id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(r => r.value);

      let options = [...distractors, item.value];

      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      return {
        key: item.key,
        correctAnswer: item.value,
        options: options 
      };
    });

    this.loading = false;
  } catch (error) {
    console.error("Quiz Error:", error);
    Swal.fire('Error', 'Failed to load quiz data.', 'error');
  }
},
    checkAnswer(selected) {
      this.userAnswers.push(selected);

      if (selected === this.currentQuestion.correctAnswer) {
        this.score++;
      }

      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      } else {
        this.isFinished = true;
      }
    }
  },
  mounted() { this.startQuiz(); }
};
</script>

<style scoped>
.container { max-width: 700px; }
.card { border-radius: 8px; border: 1px solid #eee; }
.list-group-item {
  border: 1px solid #f0f0f0;
  margin-bottom: 8px;
  border-radius: 6px !important;
  font-size: 0.95rem;
}
.list-group-item:hover { background-color: #f8f9fa; }
.progress-bar { background-color: #0d6efd; transition: width 0.3s; }
.display-6 { font-weight: bold; }
</style>