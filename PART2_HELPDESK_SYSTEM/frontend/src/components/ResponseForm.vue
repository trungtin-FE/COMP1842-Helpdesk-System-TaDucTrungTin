<template>
  <div class="form-wrapper">
    <form @submit.prevent="save" class="glass-form">
      <h2 class="form-title">{{ form._id ? 'Edit Response' : 'Create New Response' }}</h2>
      
      <div class="form-group">
        <label><i class="fa-solid fa-key"></i> Key</label>
        <input 
          v-model="form.key" 
          type="text" 
          placeholder="e.g., PWD_RESET" 
          required 
        />
      </div>

      <div class="form-group">
        <label><i class="fa-solid fa-message"></i> Response Text</label>
        <textarea 
          v-model="form.value" 
          placeholder="Enter the automated response content..." 
          required
        ></textarea>
      </div>

      <div class="form-group">
  <label><i class="fa-solid fa-layer-group"></i> Priority</label>
  <select v-model="form.priority" :class="form.priority.toLowerCase()">
    <option value="Low" class="opt-low">Low</option>
    <option value="Medium" class="opt-medium">Medium</option>
    <option value="High" class="opt-high">High</option>
  </select>
</div>

      <div class="form-actions">
        <button type="submit" class="btn-save">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['initialData'], 
  data() {
    return {
      form: { key: '', value: '', priority: 'Low' }
    };
  },
  watch: {
    initialData: {
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal };
        }
      },
      immediate: true 
    }
  },
  methods: {
    save() {
    const payload = { 
      ...this.form, 
      key: this.form.key ? this.form.key.trim() : '' 
    };

    if (!payload.key) {
      
      return;
    }

    this.$emit('submit-form', payload);
  }
  }
};
</script>


<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.glass-form {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.form-title {
  color: #0d6efd;
  margin-bottom: 30px;
  font-weight: 600;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

.form-group label i {
  margin-right: 5px;
  color: #0d6efd;
}

/* Style cho Input, Textarea và Select */
input[type="text"],
textarea,
select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  font-family: inherit;
  transition: all 0.3s ease;
  outline: none;
  box-sizing: border-box; /* Đảm bảo padding không làm tràn chiều rộng */
}

input:focus, textarea:focus, select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.form-actions {
  margin-top: 30px;
}

.btn-save {
  width: 100%;
  background: #0d6efd;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.btn-save:hover {
  background: #0b5ed7;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
}

.btn-save:active {
  transform: translateY(0);
}
</style>