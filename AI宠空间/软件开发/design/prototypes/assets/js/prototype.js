const ORDER_STORAGE_KEY = "ai_pet_recent_orders_v1";
const USER_STORAGE_KEY = "ai_pet_current_user_v1";

// Auth Modal Functions
window.openAuthModal = (mode = 'login') => {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('hidden');
    switchTab(mode);
  }
};

window.closeAuthModal = () => {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.add('hidden');
};

window.switchTab = (mode) => {
  const isLogin = mode === 'login';
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const registerFields = document.getElementById('registerOnlyFields');
  const submitBtn = document.getElementById('authSubmitBtn');
  const modalTitle = document.getElementById('modalTitle');

  if (isLogin) {
    tabLogin.className = "flex-1 py-2 text-sm font-medium rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20";
    tabRegister.className = "flex-1 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-slate-200";
    registerFields.classList.add('hidden');
    submitBtn.textContent = "立即登录";
    modalTitle.textContent = "登录账号";
  } else {
    tabRegister.className = "flex-1 py-2 text-sm font-medium rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20";
    tabLogin.className = "flex-1 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-slate-200";
    registerFields.classList.remove('hidden');
    submitBtn.textContent = "注册新账号";
    modalTitle.textContent = "注册新账号";
  }
};

const updateAuthUI = () => {
  const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null');
  const profile = document.getElementById('userProfile');
  const buttons = document.getElementById('authButtons');
  const userName = document.getElementById('userName');

  if (user && profile && buttons && userName) {
    profile.classList.remove('hidden');
    profile.classList.add('flex');
    buttons.classList.add('hidden');
    userName.textContent = `欢迎您，${user.name}`;
  } else if (profile && buttons) {
    profile.classList.add('hidden');
    profile.classList.remove('flex');
    buttons.classList.remove('hidden');
  }
};

const bindAuthActions = () => {
  const form = document.getElementById('authForm');
  const logoutBtn = document.getElementById('logoutBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const account = document.getElementById('authAccount').value;
      const pass = document.getElementById('authPassword').value;
      const status = document.getElementById('authStatus');
      const submitBtn = document.getElementById('authSubmitBtn');

      if (!account || !pass) return;

      submitBtn.classList.add('state-loading');
      submitBtn.disabled = true;
      status.textContent = "正在处理中...";

      setTimeout(() => {
        // Mock success
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
          name: account,
          token: 'mock-jwt-token'
        }));
        updateAuthUI();
        closeAuthModal();
        submitBtn.classList.remove('state-loading');
        submitBtn.disabled = false;
        status.textContent = "操作成功！";
      }, 800);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem(USER_STORAGE_KEY);
      updateAuthUI();
    });
  }
};

const setStatus = (id, text, cls = "") => {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = cls;
  el.textContent = text;
};

const getSelectedAddons = () =>
  [...document.querySelectorAll(".addon-option.active")].map((el) => ({
    name: el.dataset.name || "",
    price: Number(el.dataset.price || 0),
  }));

const getServiceSelection = () => {
  const service = document.getElementById("service");
  if (!service) return { name: "", price: 0 };
  const selected = service.options[service.selectedIndex];
  return { name: selected.dataset.name || selected.textContent || "", price: Number(selected.value || 0) };
};

const updateTotal = () => {
  const totalEl = document.getElementById("orderTotal");
  const service = getServiceSelection();
  const addonTotal = getSelectedAddons().reduce((sum, item) => sum + item.price, 0);
  const total = service.price + addonTotal;
  if (totalEl) totalEl.textContent = `¥${total}`;
  return total;
};

const getOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveOrders = (orders) => {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
};

const maskPhone = (phone) => {
  const raw = (phone || "").replace(/\D/g, "");
  if (raw.length !== 11) return "未填写";
  return `${raw.slice(0, 3)}****${raw.slice(7)}`;
};

const getStatusMeta = (status) => {
  if (status === "处理中") return { cls: "text-emerald-300", text: "处理中" };
  if (status === "待派单") return { cls: "text-amber-300", text: "待派单" };
  if (status === "已完成") return { cls: "text-sky-300", text: "已完成" };
  return { cls: "text-slate-300", text: status || "待派单" };
};

const renderOrders = () => {
  const wrap = document.getElementById("recentOrders");
  if (!wrap) return;
  const orders = getOrders();
  if (!orders.length) {
    wrap.innerHTML = '<div class="text-sm text-slate-400">暂无订单，创建第一笔预约后会展示在这里。</div>';
    return;
  }
  wrap.innerHTML = orders
    .map(
      (order) => `
      <div class="rounded-xl border border-slate-700 bg-slate-900/70 p-3 flex items-center justify-between gap-3">
        <div>
          <div class="text-sm font-semibold">${order.pet} · ${order.service}</div>
          <div class="text-xs text-slate-400 mt-1">${order.time} · ${order.phoneMasked} · ${order.addonsText}</div>
        </div>
        <div class="text-right">
          <div class="text-base font-bold text-emerald-300">¥${order.total}</div>
          <div class="text-xs ${getStatusMeta(order.status).cls}">${getStatusMeta(order.status).text}</div>
        </div>
      </div>`
    )
    .join("");
};

const bindAddonActions = () => {
  document.querySelectorAll(".addon-option").forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("active");
      if (el.classList.contains("active")) {
        el.classList.remove("border-slate-600", "bg-slate-800/70");
        el.classList.add("border-emerald-400", "bg-emerald-500/20", "text-emerald-300");
      } else {
        el.classList.add("border-slate-600", "bg-slate-800/70");
        el.classList.remove("border-emerald-400", "bg-emerald-500/20", "text-emerald-300");
      }
      updateTotal();
    });
  });
};

const bindDemoActions = () => {
  const submitBtn = document.getElementById("submitOrder");
  const nameInput = document.getElementById("petName");
  const ownerPhoneInput = document.getElementById("ownerPhone");
  const service = document.getElementById("service");
  const clearBtn = document.getElementById("clearOrders");
  
  // Hero section buttons
  const btnNearbyBooking = document.getElementById("btnNearbyBooking");
  const btnViewStatus = document.getElementById("btnViewStatus");

  if (btnNearbyBooking) {
    btnNearbyBooking.addEventListener("click", () => {
      document.getElementById("bookingForm")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (btnViewStatus) {
    btnViewStatus.addEventListener("click", () => {
      document.getElementById("statusSection")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (service) {
    service.addEventListener("change", updateTotal);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      saveOrders([]);
      renderOrders();
      setStatus("formStatus", "已清空本地订单记录", "text-slate-400 text-xs");
    });
  }

  if (submitBtn && nameInput && ownerPhoneInput) {
    submitBtn.addEventListener("click", () => {
      if (!nameInput.value.trim()) {
        nameInput.setAttribute("aria-invalid", "true");
        setStatus("formStatus", "请输入宠物昵称后再提交", "text-red-400 text-sm");
        return;
      }
      const rawPhone = ownerPhoneInput.value.replace(/\D/g, "");
      if (rawPhone.length !== 11) {
        ownerPhoneInput.setAttribute("aria-invalid", "true");
        setStatus("formStatus", "请输入11位手机号后再提交", "text-red-400 text-sm");
        return;
      }
      nameInput.setAttribute("aria-invalid", "false");
      ownerPhoneInput.setAttribute("aria-invalid", "false");
      const total = updateTotal();
      const serviceInfo = getServiceSelection();
      const addons = getSelectedAddons();
      submitBtn.classList.add("state-loading");
      submitBtn.setAttribute("disabled", "true");
      setStatus("formStatus", "正在创建订单...", "text-sky-300 text-sm");
      setTimeout(() => {
        const now = new Date();
        const order = {
          id: `BK-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`,
          pet: nameInput.value.trim(),
          service: serviceInfo.name,
          addonsText: addons.length ? addons.map((item) => item.name).join(" / ") : "无增值服务",
          total,
          phone: rawPhone,
          phoneMasked: maskPhone(rawPhone),
          status: "待派单",
          store: "杭州一店",
          assignee: "调度中心",
          time: now.toLocaleString("zh-CN", { hour12: false }),
          createdAt: now.toISOString(),
        };
        const orders = [order, ...getOrders()].slice(0, 8);
        saveOrders(orders);
        renderOrders();
        submitBtn.classList.remove("state-loading");
        submitBtn.removeAttribute("disabled");
        setStatus("formStatus", `订单创建成功，合计 ¥${total}，已进入排队`, "text-emerald-300 text-sm");
      }, 1000);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  bindAuthActions();
  updateAuthUI();
  bindAddonActions();
  bindDemoActions();
  updateTotal();
  renderOrders();
});
