<template>
  <div class="container">
    <div class="header-actions" style="justify-content: center; margin-bottom: 10px;">
      <h2 class="form-title">Add New Response</h2>
    </div>
    <ResponseForm @submit-form="createResponse" />
  </div>
</template>

<script>
import axios from 'axios';
import ResponseForm from '../components/ResponseForm.vue';
import Swal from 'sweetalert2'; 

const API_URL = 'http://localhost:5000/api/responses';

export default {
  components: { ResponseForm },
  methods: {
    async createResponse(formData) {
      try {
        await axios.post(API_URL, formData);
        
        Swal.fire({
          title: 'Success!',
          text: 'New response has been created.',
          icon: 'success',
          iconColor: '#0d6efd',
          timer: 1000,
          showConfirmButton: false
        });
        this.$router.push('/');   
      } catch (error) {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            title: 'Duplicate Key!',
            text: error.response.data.message || 'This key already exists.',
            icon: 'error',
            confirmButtonColor: '#0d6efd'
          });
        } else {
          Swal.fire('Error', 'Something went wrong on the server.', 'error');
        }
        console.error("Create error:", error);
      }
    }
  }
};
</script>