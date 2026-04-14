<template>
  <div class="container">
    <div class="header-actions">
      <div class="search-container">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input v-model="searchQuery" @input="fetchResponses" placeholder="Search by key or value..." class="search-bar-custom"/>
      </div>
      <router-link to="/new" class="btn-add-custom">
        <i class="fa-solid fa-plus"></i> Add Response
      </router-link>   
    </div>

    <div class="response-list">
      <div v-if="responses.length === 0" class="no-data">
        No responses found.
      </div>
      
      <div v-for="response in responses" :key="response._id" class="response-card"> 
        <div class="card-content">
          <div class="card-main">
            <h3 class="issue-key">{{ response.key }}</h3>
            <p class="issue-value">{{ response.value }}</p>
          </div>

          <div class="card-side">
            <span :class="['priority-badge', response.priority.toLowerCase()]">
              {{ response.priority }}
            </span>
            
            <div class="card-actions">
              <router-link :to="'/edit/' + response._id" class="btn-icon edit" title="Edit">
                <i class="fa-solid fa-pen-to-square"></i>
              </router-link>
              <button @click="deleteResponse(response._id)" class="btn-icon delete" title="Delete">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
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
      responses: [],
      searchQuery: "",
    };
  },
  methods: {
    async fetchResponses() {
      try {
        const response = await axios.get(`${API_URL}?q=${this.searchQuery}`);
        this.responses = response.data;
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },
    async deleteResponse(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        background: 'rgba(255, 255, 255, 0.9)',
        icon: 'warning',
        iconColor: '#dc3545',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        customClass: {
          title: 'swal-title-custom',
          htmlContainer: 'swal-text-custom',
          popup: 'swal-glass-popup'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`${API_URL}/${id}`);
            this.fetchResponses();
            Swal.fire({
              title: 'Deleted!',
              icon: 'success',
              iconColor: '#0d6efd',
              confirmButtonColor: '#0d6efd'
            });
          } catch (error) {
            Swal.fire('Error!', 'Could not delete the item.', 'error');
          }
        }
      });
    },
  },
  mounted() {
    this.fetchResponses();
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh; 
  font-family: 'Segoe UI', Arial, sans-serif;
}
.swal2-cancel {
  background-color: transparent !important; /* Xóa màu nền */
  color: #6c757d !important; /* Màu chữ xám */
  border: 1px solid #dee2e6 !important; /* Viền mỏng màu nhẹ */
  transition: all 0.3s ease !important;
}

.container {
  max-width: 900px;
  margin: 15px auto;
  padding: 0 15px;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 15px;
}

.search-container {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
}

.search-bar-custom {
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.search-bar-custom:focus {
  border-color: #0d6efd;
}

.btn-add-custom {
  background-color: #0d6efd;
  color: white;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 500;
  white-space: nowrap;
}

.response-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.response-card {
  background: rgba(255, 255, 255, 0.75); 
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  padding: 20px;
  transform: translateZ(0); 
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.response-card:hover {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}


.card-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-main {
  flex: 1;
}

.issue-key {
  margin: 0 0 25px 0;
  color: #0d6efd;
  font-size: 24px;
  font-weight: 500;
}

.issue-value {
  margin: 0;
  color: #495057;
  font-size: 0.85rem;
  line-height: 1;
}

.card-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
  margin-left: 20px;
}

/* Badge Priority */
.priority-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.priority-badge.high { background: #ca2f2f; color: #ffffff; }
.priority-badge.medium { background: #d4bd5f; color: #ffffff; }
.priority-badge.low { background: #91e3bd; color: white; }

.card-actions {
  display: flex;
  gap: 10px;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 5px;
  transition: color 0.2s;
  color: #adb5bd;
}

.btn-icon.edit { color: #0d6efd; }
.btn-icon.delete { color: #dc3545; }

.no-data {
  text-align: center;
  padding: 40px;
  color: #adb5bd;
}
</style>