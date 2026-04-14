<template>
  <div class="container">
    <h2>Edit Response</h2>
    <ResponseForm v-if="loaded" :initialData="response" @submit-form="updateResponse" />
  </div>
</template>

<script>
import axios from 'axios';
import ResponseForm from '../components/ResponseForm.vue';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:5000/api/responses'; 

export default {
  components: { ResponseForm },
  data() {
    return {
      response: null,
      loaded: false
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      const res = await axios.get(`${API_URL}/${id}`);
      this.response = res.data;
      this.loaded = true;
    } catch (err) {
      alert("Error: Record not found!");
      this.$router.push('/');
    }
  },

  methods: {
  async updateResponse(formData) {
  try {
    const id = this.$route.params.id;
    
    const dataToUpdate = {
      key: formData.key,
      value: formData.value,
      priority: formData.priority
    };

    const res = await axios.put(`${API_URL}/${id}`, dataToUpdate);
    
    if(res.status === 200) {
      Swal.fire({
        title: 'Updated!',
        icon: 'success',
        iconColor: '#0d63fd',
        confirmButtonColor: '#0d63fd'
      })
      this.$router.push('/');
    }
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    Swal.fire({
          title: 'Error!',
          text: 'Could not update the record.',
          icon: 'error',
          confirmButtonColor: '#dc3545'
          });
  }
  }
}
};
</script>