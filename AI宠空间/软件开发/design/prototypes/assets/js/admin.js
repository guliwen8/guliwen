const ORDER_STORAGE_KEY = "ai_pet_recent_orders_v1";
const CAMPAIGN_LOG_KEY = "ai_pet_campaign_logs_v1";
const RULE_LOG_KEY = "ai_pet_rule_logs_v1";
const AB_REPORT_KEY = "ai_pet_ab_reports_v1";
const ORCHESTRATION_RUN_KEY = "ai_pet_orchestration_runs_v1";
const ORCHESTRATION_QUEUE_KEY = "ai_pet_orchestration_queue_v1";
const CHANNEL_ROI_KEY = "ai_pet_channel_roi_v1";

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

const getCampaignLogs = () => {
  try {
    return JSON.parse(localStorage.getItem(CAMPAIGN_LOG_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveCampaignLogs = (logs) => {
  localStorage.setItem(CAMPAIGN_LOG_KEY, JSON.stringify(logs));
};

const getRuleLogs = () => {
  try {
    return JSON.parse(localStorage.getItem(RULE_LOG_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveRuleLogs = (logs) => {
  localStorage.setItem(RULE_LOG_KEY, JSON.stringify(logs));
};

const getABReports = () => {
  try {
    return JSON.parse(localStorage.getItem(AB_REPORT_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveABReports = (rows) => {
  localStorage.setItem(AB_REPORT_KEY, JSON.stringify(rows));
};

const getOrchestrationRuns = () => {
  try {
    return JSON.parse(localStorage.getItem(ORCHESTRATION_RUN_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveOrchestrationRuns = (rows) => {
  localStorage.setItem(ORCHESTRATION_RUN_KEY, JSON.stringify(rows));
};

const getOrchestrationQueue = () => {
  try {
    return JSON.parse(localStorage.getItem(ORCHESTRATION_QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveOrchestrationQueue = (rows) => {
  localStorage.setItem(ORCHESTRATION_QUEUE_KEY, JSON.stringify(rows));
};

const getChannelRoiMap = () => {
  try {
    return JSON.parse(localStorage.getItem(CHANNEL_ROI_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveChannelRoiMap = (map) => {
  localStorage.setItem(CHANNEL_ROI_KEY, JSON.stringify(map));
};

const statusClass = (status) => {
  if (status === "待派单") return "text-amber-300";
  if (status === "处理中") return "text-emerald-300";
  if (status === "已完成") return "text-sky-300";
  return "text-slate-300";
};

const updateStats = (orders) => {
  const total = orders.length;
  const pending = orders.filter((item) => item.status === "待派单").length;
  const processing = orders.filter((item) => item.status === "处理中").length;
  const done = orders.filter((item) => item.status === "已完成").length;
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(text);
  };
  setText("bookingCountAll", total);
  setText("bookingCountPending", pending);
  setText("bookingCountProcessing", processing);
  setText("bookingCountDone", done);
};

const nextStatus = (status) => {
  if (status === "待派单") return "处理中";
  if (status === "处理中") return "已完成";
  return "已完成";
};

const formatOperatorLabel = (status) => {
  if (status === "待派单") return "派单";
  if (status === "处理中") return "完成";
  return "查看";
};

const parseOrderTime = (order) => {
  if (order.createdAt) {
    const dt = new Date(order.createdAt);
    if (!Number.isNaN(dt.getTime())) return dt;
  }
  const dt = new Date(order.time || "");
  if (!Number.isNaN(dt.getTime())) return dt;
  return new Date();
};

const calcUserLevel = (count) => {
  if (count >= 10) return "铂金";
  if (count >= 6) return "黄金";
  if (count >= 3) return "白银";
  return "普通";
};

const levelClass = (level) => {
  if (level === "铂金") return "text-fuchsia-300";
  if (level === "黄金") return "text-amber-300";
  if (level === "白银") return "text-slate-200";
  return "text-slate-300";
};

const activityClass = (activity) => (activity === "活跃" ? "text-emerald-300" : "text-amber-300");

const getUserSegment = (user) => {
  if (user.orderCount >= 6 && user.repurchase >= 35) return "高价值用户";
  if (user.activity === "沉睡" || user.repurchase < 20) return "高流失风险";
  return "成长用户";
};

const segmentClass = (segment) => {
  if (segment === "高价值用户") return "text-fuchsia-300";
  if (segment === "高流失风险") return "text-amber-300";
  return "text-sky-300";
};

const ruleLabel = (ruleId) => {
  if (ruleId === "churn_guard") return "流失预警召回";
  if (ruleId === "vip_boost") return "高价值复购提升";
  if (ruleId === "growth_nurture") return "成长用户孵化";
  return "通用策略";
};

const templateBoost = (template) => {
  if (template.includes("召回")) return 6;
  if (template.includes("复购")) return 8;
  if (template.includes("高客单")) return 10;
  return 5;
};

const channelConfig = {
  sms: { label: "短信", cost: 0.12, boost: 6 },
  push: { label: "Push", cost: 0.02, boost: 3 },
  wecom: { label: "企微", cost: 0.08, boost: 5 },
};

const ruleDefaultTemplate = (ruleId) => {
  if (ruleId === "churn_guard") return "召回券包B";
  if (ruleId === "vip_boost") return "高客单礼包C";
  if (ruleId === "growth_nurture") return "复购券包A";
  return "复购券包A";
};

const getUserProfiles = () => {
  const orders = getOrders();
  const now = new Date();
  const map = new Map();
  orders.forEach((order) => {
    const key = order.phoneMasked || order.phone || order.pet || order.id;
    if (!key) return;
    const current = map.get(key) || {
      name: `${order.pet || "用户"}家长`,
      phoneMasked: order.phoneMasked || "未填写",
      orderCount: 0,
      recent: [],
      lastTime: parseOrderTime(order),
    };
    current.orderCount += 1;
    current.recent.push(parseOrderTime(order));
    if (parseOrderTime(order) > current.lastTime) current.lastTime = parseOrderTime(order);
    map.set(key, current);
  });
  return [...map.values()].map((user) => {
    const lastDiff = Math.floor((now.getTime() - user.lastTime.getTime()) / (1000 * 60 * 60 * 24));
    const activity = lastDiff <= 14 ? "活跃" : "沉睡";
    const repeat30 = user.recent.filter((t) => now.getTime() - t.getTime() <= 30 * 24 * 3600 * 1000).length;
    const repurchase = Math.min(95, Math.max(5, repeat30 * 16));
    const level = calcUserLevel(user.orderCount);
    return {
      ...user,
      activity,
      repurchase,
      level,
      segment: getUserSegment({ ...user, activity, repurchase, level }),
      daysSinceLastOrder: lastDiff,
    };
  });
};

const updateUserStats = (users) => {
  const total = users.length;
  const active = users.filter((u) => u.activity === "活跃").length;
  const dormant = users.filter((u) => u.activity === "沉睡").length;
  const avgRepurchase = total ? Math.round(users.reduce((sum, u) => sum + u.repurchase, 0) / total) : 0;
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(text);
  };
  setText("userCountAll", total);
  setText("userCountActive", active);
  setText("userCountDormant", dormant);
  setText("userAvgRepurchase", `${avgRepurchase}%`);
};

const renderAutomationStats = (users) => {
  const highValue = users.filter((u) => u.segment === "高价值用户").length;
  const churn = users.filter((u) => u.segment === "高流失风险").length;
  const growth = users.filter((u) => u.segment === "成长用户").length;
  const logs = getCampaignLogs();
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(text);
  };
  setText("segmentHighValueCount", highValue);
  setText("segmentChurnCount", churn);
  setText("segmentGrowthCount", growth);
  setText("campaignSendCount", logs.length);
};

const renderCampaignLogs = () => {
  const tbody = document.getElementById("campaignLogBody");
  const empty = document.getElementById("campaignLogEmpty");
  if (!tbody || !empty) return;
  const logs = getCampaignLogs();
  if (!logs.length) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  tbody.innerHTML = logs
    .map(
      (log) => `
      <tr class="border-b border-slate-800">
        <td class="py-3">${log.time}</td>
        <td class="py-3 ${segmentClass(log.segment)}">${log.segment}</td>
        <td class="py-3">${log.template}</td>
        <td class="py-3">${log.targetCount}</td>
        <td class="py-3 text-sky-300">${log.expectedRate}%</td>
        <td class="py-3 text-emerald-300">${log.actualRate}%</td>
      </tr>`
    )
    .join("");
};

const evaluateRuleTargets = (ruleId, users) => {
  if (ruleId === "churn_guard") return users.filter((u) => u.daysSinceLastOrder >= 7 && u.repurchase < 20);
  if (ruleId === "vip_boost") return users.filter((u) => ["黄金", "铂金"].includes(u.level) && u.repurchase >= 35);
  if (ruleId === "growth_nurture") return users.filter((u) => u.orderCount >= 2 && u.orderCount <= 5);
  return users;
};

const calcRateByUsers = (targets, template, offset = 0) => {
  if (!targets.length) return 0;
  const avg = Math.round(targets.reduce((sum, u) => sum + u.repurchase, 0) / targets.length);
  return Math.min(88, Math.max(8, avg + templateBoost(template) + offset));
};

const renderRuleLogs = () => {
  const tbody = document.getElementById("ruleLogBody");
  const empty = document.getElementById("ruleLogEmpty");
  if (!tbody || !empty) return;
  const logs = getRuleLogs();
  if (!logs.length) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  tbody.innerHTML = logs
    .map(
      (log) => `
      <tr class="border-b border-slate-800">
        <td class="py-3">${log.time}</td>
        <td class="py-3">${log.ruleName}</td>
        <td class="py-3">${log.template}</td>
        <td class="py-3">${log.targetCount}</td>
        <td class="py-3 text-sky-300">${log.expectedRate}%</td>
        <td class="py-3 text-emerald-300">${log.actualRate}%</td>
      </tr>`
    )
    .join("");
};

const renderABReports = () => {
  const tbody = document.getElementById("abReportBody");
  const empty = document.getElementById("abReportEmpty");
  if (!tbody || !empty) return;
  const rows = getABReports();
  if (!rows.length) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  tbody.innerHTML = rows
    .map(
      (row) => `
      <tr class="border-b border-slate-800">
        <td class="py-3">${row.time}</td>
        <td class="py-3">${row.ruleName}</td>
        <td class="py-3">${row.templateA}</td>
        <td class="py-3">${row.templateB}</td>
        <td class="py-3 text-sky-300">${row.rateA}%</td>
        <td class="py-3 text-sky-300">${row.rateB}%</td>
        <td class="py-3 text-amber-300">${row.winner}</td>
      </tr>`
    )
    .join("");
};

const renderEngineStats = () => {
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(text);
  };
  const ruleLogs = getRuleLogs();
  const reports = getABReports();
  const touched = ruleLogs.reduce((sum, row) => sum + row.targetCount, 0);
  setText("ruleRunCount", ruleLogs.length);
  setText("ruleTouchedCount", touched);
  setText("abRunCount", reports.length);
  setText("abLatestWinner", reports[0]?.winner || "-");
};

const updateScheduleHint = () => {
  const schedule = document.getElementById("orScheduleType")?.value || "manual";
  const hint = document.getElementById("orNextRunHint");
  if (!hint) return;
  if (schedule === "daily") {
    hint.textContent = "下一次执行：明日 10:00";
    return;
  }
  if (schedule === "weekly") {
    hint.textContent = "下一次执行：下周一 10:00";
    return;
  }
  hint.textContent = "下一次执行：手动触发";
};

const setOrchestrationFeedback = (message, type = "normal") => {
  const el = document.getElementById("orchestrationFeedback");
  if (!el) return;
  const cls = type === "success" ? "text-emerald-300" : type === "warn" ? "text-amber-300" : "text-slate-400";
  el.className = `text-xs ${cls}`;
  el.textContent = message;
};

const getOrchestrationRules = () => {
  const rules = [];
  if (document.getElementById("orRuleChurn")?.checked) {
    rules.push({
      id: "churn_guard",
      priority: Number(document.getElementById("orPriorityChurn")?.value || 1),
      template: ruleDefaultTemplate("churn_guard"),
    });
  }
  if (document.getElementById("orRuleVip")?.checked) {
    rules.push({
      id: "vip_boost",
      priority: Number(document.getElementById("orPriorityVip")?.value || 2),
      template: ruleDefaultTemplate("vip_boost"),
    });
  }
  if (document.getElementById("orRuleGrowth")?.checked) {
    rules.push({
      id: "growth_nurture",
      priority: Number(document.getElementById("orPriorityGrowth")?.value || 3),
      template: ruleDefaultTemplate("growth_nurture"),
    });
  }
  return rules.sort((a, b) => a.priority - b.priority);
};

const getEnabledChannels = () => {
  const channels = [];
  if (document.getElementById("orChannelSms")?.checked) channels.push("sms");
  if (document.getElementById("orChannelPush")?.checked) channels.push("push");
  if (document.getElementById("orChannelWecom")?.checked) channels.push("wecom");
  return channels;
};

const resolveTargetsByPolicy = (users, rules, conflictPolicy) => {
  const candidateMap = new Map();
  rules.forEach((rule) => {
    const targets = evaluateRuleTargets(rule.id, users);
    targets.forEach((user) => {
      const key = user.phoneMasked;
      const row = candidateMap.get(key) || { user, hits: [] };
      row.hits.push({ ruleId: rule.id, ruleName: ruleLabel(rule.id), template: rule.template, priority: rule.priority });
      candidateMap.set(key, row);
    });
  });
  const resolved = [];
  let conflictResolved = 0;
  [...candidateMap.values()].forEach((row) => {
    if (row.hits.length > 1) conflictResolved += 1;
    const sorted = [...row.hits].sort((a, b) => a.priority - b.priority);
    if (conflictPolicy === "merge_all") {
      resolved.push({
        user: row.user,
        ruleName: sorted.map((x) => x.ruleName).join(" + "),
        template: sorted[0].template,
        priorities: sorted.map((x) => x.priority),
      });
      return;
    }
    if (conflictPolicy === "first_match") {
      resolved.push({ user: row.user, ruleName: sorted[0].ruleName, template: sorted[0].template, priorities: [sorted[0].priority] });
      return;
    }
    resolved.push({ user: row.user, ruleName: sorted[0].ruleName, template: sorted[0].template, priorities: [sorted[0].priority] });
  });
  return { resolved, conflictResolved };
};

const renderOrchestrationQueue = () => {
  const tbody = document.getElementById("orQueueBody");
  const empty = document.getElementById("orQueueEmpty");
  if (!tbody || !empty) return;
  const rows = getOrchestrationQueue();
  if (!rows.length) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  tbody.innerHTML = rows
    .map(
      (row) => `
      <tr class="border-b border-slate-800">
        <td class="py-3">${row.time}</td>
        <td class="py-3">${row.userName} ${row.phoneMasked}</td>
        <td class="py-3">${row.ruleName}</td>
        <td class="py-3">${row.template}</td>
        <td class="py-3">${row.channelLabel}</td>
        <td class="py-3 ${row.status.includes("跳过") ? "text-amber-300" : "text-emerald-300"}">${row.status}</td>
      </tr>`
    )
    .join("");
};

const renderChannelRoi = () => {
  const tbody = document.getElementById("channelRoiBody");
  const empty = document.getElementById("channelRoiEmpty");
  if (!tbody || !empty) return;
  const map = getChannelRoiMap();
  const rows = Object.entries(map);
  if (!rows.length) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  tbody.innerHTML = rows
    .map(([key, row]) => {
      const roi = row.cost > 0 ? (((row.revenue - row.cost) / row.cost) * 100).toFixed(1) : "0.0";
      return `
      <tr class="border-b border-slate-800">
        <td class="py-3">${channelConfig[key]?.label || key}</td>
        <td class="py-3">${row.sends}</td>
        <td class="py-3">${row.conversions}</td>
        <td class="py-3">¥${row.cost.toFixed(2)}</td>
        <td class="py-3">¥${row.revenue.toFixed(2)}</td>
        <td class="py-3 text-sky-300">${roi}%</td>
      </tr>`;
    })
    .join("");
};

const renderOrchestrationStats = () => {
  const runs = getOrchestrationRuns();
  const roiMap = getChannelRoiMap();
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(text);
  };
  setText("orRunCount", runs.length);
  setText("orTargetCount", runs.reduce((sum, row) => sum + row.targetCount, 0));
  setText("orConflictResolved", runs.reduce((sum, row) => sum + row.conflictResolved, 0));
  setText("orBlockedCooldown", runs.reduce((sum, row) => sum + (row.blockedCooldown || 0), 0));
  setText("orBlockedLimit", runs.reduce((sum, row) => sum + (row.blockedLimit || 0), 0));
  const best = Object.entries(roiMap)
    .map(([k, v]) => ({ key: k, roi: v.cost > 0 ? (v.revenue - v.cost) / v.cost : 0 }))
    .sort((a, b) => b.roi - a.roi)[0];
  setText("orBestChannel", best ? `${channelConfig[best.key]?.label || best.key}` : "-");
};

const getChannelDailyLimits = () => ({
  sms: Number(document.getElementById("orLimitSms")?.value || 200),
  push: Number(document.getElementById("orLimitPush")?.value || 500),
  wecom: Number(document.getElementById("orLimitWecom")?.value || 300),
});

const toDateSafe = (value) => {
  const dt = new Date(value || "");
  if (Number.isNaN(dt.getTime())) return null;
  return dt;
};

const renderUserTable = () => {
  const tbody = document.getElementById("userTableBody");
  const empty = document.getElementById("userEmpty");
  if (!tbody || !empty) return;
  const search = (document.getElementById("userSearchInput")?.value || "").trim();
  const level = document.getElementById("userLevelFilter")?.value || "全部会员等级";
  const activeFilter = document.getElementById("userActiveFilter")?.value || "全部活跃状态";
  const segmentFilter = document.getElementById("userSegmentFilter")?.value || "全部标签";
  const users = getUserProfiles();
  updateUserStats(users);
  renderAutomationStats(users);
  renderCampaignLogs();
  const filtered = users.filter((user) => {
    const hitKeyword = !search || [user.name, user.phoneMasked].join(" ").includes(search);
    const hitLevel = level === "全部会员等级" || user.level === level;
    const hitActive = activeFilter === "全部活跃状态" || user.activity === activeFilter;
    const hitSegment = segmentFilter === "全部标签" || user.segment === segmentFilter;
    return hitKeyword && hitLevel && hitActive && hitSegment;
  });
  if (!filtered.length) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  tbody.innerHTML = filtered
    .map(
      (user, idx) => `
      <tr class="${idx === filtered.length - 1 ? "" : "border-b border-slate-800"}">
        <td class="py-3">${user.name}</td>
        <td class="py-3">${user.phoneMasked}</td>
        <td class="py-3 ${levelClass(user.level)}">${user.level}</td>
        <td class="py-3">${user.orderCount}</td>
        <td class="py-3 text-sky-300">${user.repurchase}%</td>
        <td class="py-3 ${activityClass(user.activity)}">${user.activity}</td>
        <td class="py-3 ${segmentClass(user.segment)}">${user.segment}</td>
        <td class="py-3 flex gap-2">
          <button class="user-action text-xs px-2 py-1 rounded border border-slate-600 hover:bg-slate-800" data-phone="${user.phoneMasked}">详情</button>
          <button class="user-action text-xs px-2 py-1 rounded border border-slate-600 hover:bg-slate-800" data-phone="${user.phoneMasked}">触达</button>
        </td>
      </tr>`
    )
    .join("");
};

const renderBookingTable = () => {
  const tbody = document.getElementById("bookingTableBody");
  const empty = document.getElementById("bookingEmpty");
  if (!tbody || !empty) return;
  const search = (document.getElementById("bookingSearchInput")?.value || "").trim();
  const statusFilter = document.getElementById("bookingStatusFilter")?.value || "全部状态";
  const storeFilter = document.getElementById("bookingStoreFilter")?.value || "全部门店";
  const allOrders = getOrders();
  updateStats(allOrders);
  const filtered = allOrders.filter((order) => {
    const hitKeyword =
      !search ||
      [order.id, order.phoneMasked, order.phone, order.pet, order.service].filter(Boolean).join(" ").includes(search);
    const hitStatus = statusFilter === "全部状态" || order.status === statusFilter;
    const hitStore = storeFilter === "全部门店" || order.store === storeFilter;
    return hitKeyword && hitStatus && hitStore;
  });
  if (!filtered.length) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  tbody.innerHTML = filtered
    .map(
      (order) => `
      <tr class="border-b border-slate-800">
        <td class="py-3">${order.id || "-"}</td>
        <td class="py-3">${order.pet || "-"} ${order.phoneMasked || "未填写"}</td>
        <td class="py-3">${order.service || "-"}</td>
        <td class="py-3">${order.time || "-"}</td>
        <td class="py-3 ${statusClass(order.status)}">${order.status || "-"}</td>
        <td class="py-3 flex gap-2">
          <button class="booking-action text-xs px-2 py-1 rounded border border-slate-600 hover:bg-slate-800" data-id="${order.id}">${formatOperatorLabel(order.status)}</button>
          <button class="booking-view text-xs px-2 py-1 rounded border border-slate-600 hover:bg-slate-800" data-id="${order.id}">详情</button>
        </td>
      </tr>`
    )
    .join("");
};

const setFeedback = (message, type = "normal") => {
  const feedback = document.getElementById("bookingFeedback");
  if (!feedback) return;
  const cls = type === "success" ? "text-emerald-300" : type === "warn" ? "text-amber-300" : "text-slate-400";
  feedback.className = `mt-3 text-xs ${cls}`;
  feedback.textContent = message;
};

const setUserFeedback = (message, type = "normal") => {
  const feedback = document.getElementById("userFeedback");
  if (!feedback) return;
  const cls = type === "success" ? "text-emerald-300" : type === "warn" ? "text-amber-300" : "text-slate-400";
  feedback.className = `mt-3 text-xs ${cls}`;
  feedback.textContent = message;
};

const setRuleFeedback = (message, type = "normal") => {
  const feedback = document.getElementById("ruleFeedback");
  if (!feedback) return;
  const cls = type === "success" ? "text-emerald-300" : type === "warn" ? "text-amber-300" : "text-slate-400";
  feedback.className = `text-xs ${cls}`;
  feedback.textContent = message;
};

const runCampaign = () => {
  const users = getUserProfiles();
  const segment = document.getElementById("userSegmentFilter")?.value || "全部标签";
  const template = document.getElementById("campaignTemplateSelect")?.value || "复购券包A";
  const targets = users.filter((u) => segment === "全部标签" || u.segment === segment);
  if (!targets.length) {
    setUserFeedback("当前筛选分群无可触达用户，请调整标签条件", "warn");
    return;
  }
  const avgRepurchase = Math.round(targets.reduce((sum, u) => sum + u.repurchase, 0) / targets.length);
  const expectedRate = Math.min(80, Math.max(10, avgRepurchase + (segment === "高价值用户" ? 12 : 4)));
  const actualRate = Math.max(6, expectedRate - (targets.length % 7));
  const now = new Date();
  const log = {
    time: now.toLocaleString("zh-CN", { hour12: false }),
    segment: segment === "全部标签" ? "全量用户" : segment,
    template,
    targetCount: targets.length,
    expectedRate,
    actualRate,
  };
  const logs = [log, ...getCampaignLogs()].slice(0, 20);
  saveCampaignLogs(logs);
  renderAutomationStats(users);
  renderCampaignLogs();
  setUserFeedback(`已触达 ${targets.length} 位用户，模板“${template}”，预计转化 ${expectedRate}%`, "success");
};

const runRuleEngine = () => {
  const users = getUserProfiles();
  const ruleId = document.getElementById("ruleTypeSelect")?.value || "churn_guard";
  const template = document.getElementById("strategyTemplateSelect")?.value || "召回券包B";
  const targets = evaluateRuleTargets(ruleId, users);
  if (!targets.length) {
    setRuleFeedback("当前规则命中人数为0，未执行触达", "warn");
    return;
  }
  const expectedRate = calcRateByUsers(targets, template, 2);
  const actualRate = Math.max(5, expectedRate - (targets.length % 6));
  const now = new Date();
  const log = {
    time: now.toLocaleString("zh-CN", { hour12: false }),
    ruleId,
    ruleName: ruleLabel(ruleId),
    template,
    targetCount: targets.length,
    expectedRate,
    actualRate,
  };
  const logs = [log, ...getRuleLogs()].slice(0, 30);
  saveRuleLogs(logs);
  const campaignLogs = [
    {
      time: log.time,
      segment: `${log.ruleName}命中`,
      template,
      targetCount: targets.length,
      expectedRate,
      actualRate,
    },
    ...getCampaignLogs(),
  ].slice(0, 30);
  saveCampaignLogs(campaignLogs);
  renderCampaignLogs();
  renderRuleLogs();
  renderEngineStats();
  setRuleFeedback(`策略已执行：${log.ruleName} 命中 ${targets.length} 人，预计转化 ${expectedRate}%`, "success");
};

const runABTest = () => {
  const users = getUserProfiles();
  const ruleId = document.getElementById("ruleTypeSelect")?.value || "churn_guard";
  const templateA = document.getElementById("abTemplateA")?.value || "复购券包A";
  const templateB = document.getElementById("abTemplateB")?.value || "召回券包B";
  const targets = evaluateRuleTargets(ruleId, users);
  if (!targets.length) {
    setRuleFeedback("A/B测试未执行：当前策略无命中用户", "warn");
    return;
  }
  const rateA = calcRateByUsers(targets, templateA, 1);
  const rateB = calcRateByUsers(targets, templateB, -1);
  const winner = rateA >= rateB ? `A(${templateA})` : `B(${templateB})`;
  const now = new Date();
  const row = {
    time: now.toLocaleString("zh-CN", { hour12: false }),
    ruleId,
    ruleName: ruleLabel(ruleId),
    templateA,
    templateB,
    rateA,
    rateB,
    winner,
  };
  const rows = [row, ...getABReports()].slice(0, 30);
  saveABReports(rows);
  renderABReports();
  renderEngineStats();
  setRuleFeedback(`A/B测试完成：${winner} 优胜（A:${rateA}% / B:${rateB}%）`, "success");
};

const runOrchestration = () => {
  const users = getUserProfiles();
  const rules = getOrchestrationRules();
  const channels = getEnabledChannels();
  const conflictPolicy = document.getElementById("orConflictPolicy")?.value || "highest_priority";
  const scheduleType = document.getElementById("orScheduleType")?.value || "manual";
  const cooldownHours = Number(document.getElementById("orCooldownHours")?.value || 24);
  const channelLimits = getChannelDailyLimits();
  if (!rules.length) {
    setOrchestrationFeedback("请至少启用一个策略后再执行编排", "warn");
    return;
  }
  if (!channels.length) {
    setOrchestrationFeedback("请至少选择一个触达渠道后再执行编排", "warn");
    return;
  }
  const { resolved, conflictResolved } = resolveTargetsByPolicy(users, rules, conflictPolicy);
  if (!resolved.length) {
    setOrchestrationFeedback("当前编排未命中用户，请调整规则或优先级", "warn");
    return;
  }
  const now = new Date();
  const nowText = now.toLocaleString("zh-CN", { hour12: false });
  const nowISO = now.toISOString();
  const todayKey = nowISO.slice(0, 10);
  const queueRows = [];
  const roiMap = getChannelRoiMap();
  const historyQueue = getOrchestrationQueue();
  const blockedCooldownUsers = new Set();
  const blockedLimitUsers = new Set();
  const dailyUsage = {};
  channels.forEach((channel) => {
    dailyUsage[channel] = historyQueue.filter((row) => row.channel === channel && (row.createdAt || "").slice(0, 10) === todayKey && !row.status.includes("跳过")).length;
  });
  resolved.forEach((row, idx) => {
    const latestTouch = historyQueue
      .filter((item) => item.phoneMasked === row.user.phoneMasked && !item.status.includes("跳过"))
      .map((item) => toDateSafe(item.createdAt || item.time))
      .filter(Boolean)
      .sort((a, b) => b.getTime() - a.getTime())[0];
    if (latestTouch && cooldownHours > 0 && now.getTime() - latestTouch.getTime() < cooldownHours * 3600 * 1000) {
      blockedCooldownUsers.add(row.user.phoneMasked);
      queueRows.push({
        time: nowText,
        createdAt: nowISO,
        userName: row.user.name,
        phoneMasked: row.user.phoneMasked,
        ruleName: row.ruleName,
        template: row.template,
        channel: "-",
        channelLabel: "-",
        status: "冷却跳过",
      });
      return;
    }
    channels.forEach((channel) => {
      const cfg = channelConfig[channel];
      const limit = channelLimits[channel] || 0;
      if (limit > 0 && dailyUsage[channel] >= limit) {
        blockedLimitUsers.add(row.user.phoneMasked);
        queueRows.push({
          time: nowText,
          createdAt: nowISO,
          userName: row.user.name,
          phoneMasked: row.user.phoneMasked,
          ruleName: row.ruleName,
          template: row.template,
          channel,
          channelLabel: cfg.label,
          status: "限流跳过",
        });
        return;
      }
      const baseRate = Math.min(90, Math.max(6, row.user.repurchase + cfg.boost + (idx % 4)));
      const converted = baseRate >= 45 ? 1 : 0;
      const revenue = converted ? 68 : 0;
      const cost = cfg.cost;
      const channelRow = roiMap[channel] || { sends: 0, conversions: 0, cost: 0, revenue: 0 };
      channelRow.sends += 1;
      channelRow.conversions += converted;
      channelRow.cost += cost;
      channelRow.revenue += revenue;
      roiMap[channel] = channelRow;
      dailyUsage[channel] += 1;
      queueRows.push({
        time: nowText,
        createdAt: nowISO,
        userName: row.user.name,
        phoneMasked: row.user.phoneMasked,
        ruleName: row.ruleName,
        template: row.template,
        channel,
        channelLabel: cfg.label,
        status: converted ? "已触达·已转化" : "已触达",
      });
    });
  });
  saveChannelRoiMap(roiMap);
  const queue = [...queueRows, ...historyQueue].slice(0, 60);
  saveOrchestrationQueue(queue);
  const blockedCooldown = blockedCooldownUsers.size;
  const blockedLimit = blockedLimitUsers.size;
  const touchedUsers = new Set(queueRows.filter((row) => !row.status.includes("跳过")).map((row) => row.phoneMasked));
  const run = {
    time: nowText,
    createdAt: nowISO,
    scheduleType,
    conflictPolicy,
    ruleIds: rules.map((r) => r.id),
    channels,
    targetCount: touchedUsers.size,
    conflictResolved,
    blockedCooldown,
    blockedLimit,
  };
  const runs = [run, ...getOrchestrationRuns()].slice(0, 40);
  saveOrchestrationRuns(runs);
  renderOrchestrationQueue();
  renderChannelRoi();
  renderOrchestrationStats();
  setOrchestrationFeedback(`编排执行成功：命中 ${resolved.length} 人，冷却拦截 ${blockedCooldown} 人，限流拦截 ${blockedLimit} 人，渠道 ${channels.map((c) => channelConfig[c].label).join("/")}`, "success");
};

const bindBookingActions = () => {
  const bookingPanel = document.getElementById("bookingPanel");
  if (!bookingPanel) return;
  bookingPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.classList.contains("booking-action")) {
      const id = target.dataset.id;
      if (!id) return;
      const orders = getOrders();
      const idx = orders.findIndex((item) => item.id === id);
      if (idx < 0) return;
      orders[idx].status = nextStatus(orders[idx].status);
      if (orders[idx].status === "处理中") orders[idx].assignee = "王技师";
      if (orders[idx].status === "已完成") orders[idx].assignee = "李技师";
      saveOrders(orders);
      renderBookingTable();
      renderUserTable();
      setFeedback(`订单 ${id} 已更新为 ${orders[idx].status}`, "success");
    }
    if (target.classList.contains("booking-view")) {
      const id = target.dataset.id;
      if (!id) return;
      const order = getOrders().find((item) => item.id === id);
      if (!order) return;
      setFeedback(`详情：${order.pet} · ${order.service} · ${order.status} · ${order.store}`, "warn");
    }
  });
};

const bindUserActions = () => {
  const userPanel = document.getElementById("userPanel");
  if (!userPanel) return;
  userPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("user-action")) return;
    const phone = target.dataset.phone || "未填写";
    if (target.textContent === "详情") {
      const user = getUserProfiles().find((u) => u.phoneMasked === phone);
      if (!user) return;
      setUserFeedback(`详情：${user.name} · ${user.level} · 累计${user.orderCount}单 · 复购${user.repurchase}%`, "warn");
      return;
    }
    setUserFeedback(`已向 ${phone} 发送运营触达消息`, "success");
  });
};

const bindCampaignActions = () => {
  const runBtn = document.getElementById("runCampaignBtn");
  if (runBtn) runBtn.addEventListener("click", runCampaign);
};

const bindRuleEngineActions = () => {
  const runRuleBtn = document.getElementById("runRuleEngineBtn");
  if (runRuleBtn) runRuleBtn.addEventListener("click", runRuleEngine);
  const runABBtn = document.getElementById("runABTestBtn");
  if (runABBtn) runABBtn.addEventListener("click", runABTest);
};

const bindOrchestrationActions = () => {
  const runBtn = document.getElementById("runOrchestrationBtn");
  if (runBtn) runBtn.addEventListener("click", runOrchestration);
  const schedule = document.getElementById("orScheduleType");
  if (schedule) schedule.addEventListener("change", updateScheduleHint);
};

document.addEventListener("DOMContentLoaded", () => {
  const tabs = [...document.querySelectorAll(".admin-tab")];
  const panels = [...document.querySelectorAll(".admin-panel")];
  const activate = (targetId) => {
    panels.forEach((panel) => panel.classList.toggle("hidden", panel.id !== targetId));
    tabs.forEach((tab) => {
      const active = tab.dataset.target === targetId;
      tab.classList.toggle("bg-emerald-500/20", active);
      tab.classList.toggle("text-emerald-300", active);
      tab.classList.toggle("border", !active);
      tab.classList.toggle("border-slate-700", !active);
    });
    if (targetId === "bookingPanel") renderBookingTable();
    if (targetId === "userPanel") renderUserTable();
  };
  tabs.forEach((tab) => tab.addEventListener("click", () => activate(tab.dataset.target || "dashboardPanel")));

  ["bookingSearchInput", "bookingStatusFilter", "bookingStoreFilter"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", renderBookingTable);
    if (el) el.addEventListener("change", renderBookingTable);
  });

  ["userSearchInput", "userLevelFilter", "userActiveFilter", "userSegmentFilter"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", renderUserTable);
    if (el) el.addEventListener("change", renderUserTable);
  });

  bindBookingActions();
  bindUserActions();
  bindCampaignActions();
  bindRuleEngineActions();
  bindOrchestrationActions();
  renderBookingTable();
  renderUserTable();
  renderRuleLogs();
  renderABReports();
  renderEngineStats();
  updateScheduleHint();
  renderOrchestrationQueue();
  renderChannelRoi();
  renderOrchestrationStats();
});
