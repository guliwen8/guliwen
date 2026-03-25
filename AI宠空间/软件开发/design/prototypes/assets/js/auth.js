const toggleAuthTab = (targetId) => {
  document.querySelectorAll(".auth-tab").forEach((btn) => {
    if (btn.dataset.target === targetId) {
      btn.classList.add("bg-emerald-500/20", "text-emerald-300");
      btn.classList.remove("text-slate-300");
    } else {
      btn.classList.remove("bg-emerald-500/20", "text-emerald-300");
      btn.classList.add("text-slate-300");
    }
  });
  document.getElementById("loginPanel")?.classList.toggle("hidden", targetId !== "loginPanel");
  document.getElementById("registerPanel")?.classList.toggle("hidden", targetId !== "registerPanel");
};

const setFieldError = (inputId, statusId, message) => {
  const input = document.getElementById(inputId);
  if (input) input.setAttribute("aria-invalid", "true");
  const status = document.getElementById(statusId);
  if (status) {
    status.className = "text-xs text-red-400";
    status.textContent = message;
  }
};

const setStatus = (statusId, cls, message) => {
  const status = document.getElementById(statusId);
  if (!status) return;
  status.className = cls;
  status.textContent = message;
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".auth-tab").forEach((btn) => {
    btn.addEventListener("click", () => toggleAuthTab(btn.dataset.target || "loginPanel"));
  });

  const loginBtn = document.getElementById("loginBtn");
  loginBtn?.addEventListener("click", () => {
    const phone = document.getElementById("loginPhone")?.value.trim() || "";
    const code = document.getElementById("loginCode")?.value.trim() || "";
    if (!phone) return setFieldError("loginPhone", "loginStatus", "请输入手机号");
    if (!code) return setFieldError("loginCode", "loginStatus", "请输入验证码");
    loginBtn.classList.add("state-loading");
    loginBtn.setAttribute("disabled", "true");
    setStatus("loginStatus", "text-xs text-sky-300", "正在登录...");
    setTimeout(() => {
      loginBtn.classList.remove("state-loading");
      loginBtn.removeAttribute("disabled");
      setStatus("loginStatus", "text-xs text-emerald-300", "登录成功，跳转用户首页");
    }, 900);
  });

  const registerBtn = document.getElementById("registerBtn");
  registerBtn?.addEventListener("click", () => {
    const name = document.getElementById("registerName")?.value.trim() || "";
    const phone = document.getElementById("registerPhone")?.value.trim() || "";
    const password = document.getElementById("registerPassword")?.value.trim() || "";
    if (!name) return setFieldError("registerName", "registerStatus", "请输入昵称");
    if (!phone) return setFieldError("registerPhone", "registerStatus", "请输入手机号");
    if (password.length < 8) return setFieldError("registerPassword", "registerStatus", "密码至少8位");
    registerBtn.classList.add("state-loading");
    registerBtn.setAttribute("disabled", "true");
    setStatus("registerStatus", "text-xs text-sky-300", "正在创建账户...");
    setTimeout(() => {
      registerBtn.classList.remove("state-loading");
      registerBtn.removeAttribute("disabled");
      setStatus("registerStatus", "text-xs text-emerald-300", "注册成功，会员档案已生成");
    }, 1100);
  });
});
