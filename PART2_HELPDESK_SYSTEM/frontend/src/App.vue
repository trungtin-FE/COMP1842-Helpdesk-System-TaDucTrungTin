<template>
  <div id="app">
    <h1 class="logo">Helpdesk Response Library</h1>
      <nav class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/quiz">Quiz</router-link>
      </nav>

    <router-view></router-view>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh; 
  font-family: 'Segoe UI', Arial, sans-serif;
}

body {
  background: radial-gradient(125% 125% at 50% 10%, #fff 40%, #0d6efd 100%);
  background-attachment: fixed; 
}

h1.logo {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  color: #212529;
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  padding: 10px;
}

.nav-links a {
  text-decoration: none;
  color: #6c757d;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  margin: 0 5px;
  transition: all 0.2s ease-in-out;
  border-radius: 6px;
}

.nav-links a:hover {
  color: #0d6efd;
}

.nav-links a.router-link-exact-active {
  color: #0d6efd;
  font-weight: 700;
}
</style>
