<template>
  <div class="login-ctn section">
    <div class="inner">
      <div class="auth-box">
        <div class="header">Welcome Back, <b>Ayo</b></div>
        <div v-if="error" class="sub">Incorrect Password</div>
        <form @submit.prevent>
          <div class="form-group">
            <input
              v-model="email"
              type="email"
              placeholder="email@company.com"
            />
            <label class="label"> Your Email </label>
          </div>
          <div class="form-group">
            <button
              v-show="passwordType === 'password'"
              class="clear-btn icon reveals"
              @click="passwordType = 'text'"
            >
              show
            </button>
            <button
              v-show="passwordType !== 'password'"
              class="clear-btn icon reveals"
              @click="passwordType = 'password'"
            >
              hide
            </button>
            <input
              v-model="password"
              :type="passwordType"
              placeholder="********"
              @keyup.enter="signIn"
            />
            <label class="label"> Password </label>
          </div>
          <button
            :disabled="!(email.length > 5 && password.length > 5)"
            :class="['primary-btn center', error !== null ? 'mt-18' : '']"
            @click="signIn()"
          >
            <Loader v-if="isLoading" />
            <span v-else>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader.vue";
export default {
  name: "LoginPage",
  layout: "authAccessLayout",
  data() {
    return {
      email: "admin@acumen.digital",
      password: "",
      passwordType: "password",
      error: null,
      response: null,
      isLoading: false,
    };
  },
  methods: {
    async call() {},
    async signIn() {
      this.error = false;
      this.isLoading = true;
      const response = await fetch(
        `https://dolphin-app-4xaig.ondigitalocean.app/v1/admin/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        }
      );
      const user = await response.json();
      this.isLoading = false;
      if (user.data) {
        this.$router.push("/dashboard");
        this.$store.commit("setUser", user.data.admin);
      } else {
        this.error = true;
      }
    },
  },
  components: { Loader },
};
</script>

<style scoped>
.primary-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}
.primary-btn {
  color: #fff;
  cursor: pointer;
  border-radius: 26px;
  padding: 15px 50px;
  min-height: 50px;
  min-width: 300px;
  border: 0;
  outline: 0;
  font-size: 1rem;
  opacity: 1;
  font-weight: 500;
  background-color: #ee2525;
  transition: opacity 0.2s ease;
  margin-top: 5rem;
}
.login-ctn.section {
  min-height: 100vh;
  align-items: center;
}
.login-ctn > .inner {
  max-width: 600px;
  margin: 15% auto;
}

.form-group {
  margin-top: 28px;
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column-reverse;
}
.form-group label {
  font-size: 0.85rem;
  display: block;
  margin-bottom: 8px;
  color: #ffffff;
  transition: 0.3s;
}

.form-group label.has-optional::after {
  content: "(optional)";
  font-size: 0.7rem;
  color: #ffffff;
}

.form-group input,
.form-group select {
  display: block;
  border-radius: 4px;
  border: 1px solid #9999bc;
  background: #f5f7fc;
  transition: 0.3s;
  height: 55px;
  padding: 0 24px;
  outline: none;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -ms-transition: 0.3s;
  -o-transition: 0.3s;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
}
.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #9999bc;
}
hr {
  opacity: 0.2;
  margin: 5% 0;
}
.auth-box {
  color: #ffffff;
  background: #2c0000;
  border-radius: 24px;
  text-align: center;
  padding: 10% 15%;
  height: 50vh;
  padding-bottom: 5%;
  box-shadow: 0px 5px 40px rgba(71, 107, 210, 0.19);
}
.flex-ctn.link {
  display: flex;
  margin-top: 5%;
  justify-content: center;
  font-size: 0.925rem;
  font-family: "PS Regular";
}
.flex-ctn.link div {
  font-family: "PS Regular";
  font-weight: 100;
  color: #00000067;
}
.flex-ctn.link a {
  font-size: 1rem;
  font-family: "PS Regular";
  color: #4568d1;
}
.flex-ctn.footer {
  display: flex;
  margin-top: 20%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
}
.flex-ctn.footer a {
  font-family: "PS Regular";
}
.flex-ctn.footer span {
  opacity: 0.5;
  font-size: 0.7rem;
  font-family: "PS Regular";
}

.header {
  font-size: 1.5rem;
  margin-top: 10%;
}
.sub {
  font-family: "PS Regular";
  font-size: 1rem;
  opacity: 0.5;
  letter-spacing: 0.01em;
  margin-top: 12px;
}
.clear-btn {
  color: #4568d1;
  text-align: right;
  display: block;
  width: 100%;
  font-size: 0.7rem;
  margin-top: 8px;
}
form {
  margin-top: 10%;
}
.form-group .clear-btn {
  display: inline-flex;
  align-items: center;
  width: 60px;
  float: right;
  color: #566ba0;
}
.form-group .icon.clear-btn {
  top: 36px;
  right: 8px;
  position: absolute;
  border: 0;
  background: white;
  font-size: 0.9rem;
  color: black;
  cursor: pointer;
}

/* MEDIA QUERIES */
/* SPECIAL MQ */
@media screen and (max-width: 1250px) {
  .flex-ctn.footer {
    margin-top: 10%;
  }
}
@media screen and (max-height: 900px) {
  .auth-box {
    padding: 5% 15%;
    min-height: 560px;
  }
  .header {
    margin-top: 5%;
    font-size: 1.3rem;
  }
  .sub {
    font-size: 0.875rem;
    margin-top: 8px;
  }
  .flex-ctn.footer {
    margin-top: 5%;
  }
  .primary-btn {
    margin: 5% auto;
  }
}

/* REGULAR MQ */

@media screen and (max-width: 1050px) {
  /* No styles needed */
}

@media screen and (max-width: 800px) {
  /* No styles needed */
}

@media screen and (max-width: 600px) {
  .auth-box {
    padding: 5% 8%;
    height: auto;
    min-height: auto;
  }
  .primary-btn {
    min-width: auto;
    width: 100%;
    font-size: 0.9rem;
    height: 45px;
  }
  .flex-ctn.link {
    margin-top: 25%;
    font-size: 0.775rem;
  }
  .flex-ctn.footer {
    margin-top: 0;
  }
  .form-group .icon.clear-btn {
    top: 18px;
  }
}
</style>
