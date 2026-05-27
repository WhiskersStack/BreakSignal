"use strict";

const STORAGE_KEY = "breaksignal.settings.v1";
const HISTORY_LIMIT = 30;

const DEFAULT_BREAKS = [
  {
    id: "eye",
    title: "Eye Break",
    duration: "20 seconds",
    description: "Soften your gaze and release screen tension.",
    message: "Look at something far away for 20 seconds. Let your eyes soften."
  },
  {
    id: "stretch",
    title: "Stretch Break",
    duration: "1 minute",
    description: "Open the chest, neck, and shoulders.",
    message: "Stand up, open your chest, roll your shoulders, and breathe."
  },
  {
    id: "walk",
    title: "Walking Break",
    duration: "2 minutes",
    description: "Move gently and reset your energy.",
    message: "Take a short walk. Let your body reset before returning."
  },
  {
    id: "posture",
    title: "Posture Break",
    duration: "30 seconds",
    description: "Return to a stable, aligned working position.",
    message: "Relax your shoulders, align your neck, and place both feet on the floor."
  }
];

const DEFAULT_SETTINGS = {
  intervalMinutes: 30,
  snoozeMinutes: 5,
  soundEnabled: true,
  soundTone: "signal",
  notificationsEnabled: false,
  enabledBreakTypes: ["eye", "stretch", "walk", "posture"],
  dailyBreakCount: 0,
  history: [],
  lastSavedDate: getTodayKey(),
  nextBreakIndex: 0
};

let settings = { ...DEFAULT_SETTINGS };
let timerId = null;
let remainingSeconds = DEFAULT_SETTINGS.intervalMinutes * 60;
let totalSeconds = DEFAULT_SETTINGS.intervalMinutes * 60;
let targetEndTime = null;
let currentStatus = "Stopped";
let activeBreak = null;
let lastFocusedElement = null;

const elements = {
  timerDisplay: document.getElementById("timerDisplay"),
  statusBadge: document.getElementById("statusBadge"),
  nextBreakType: document.getElementById("nextBreakType"),
  progressBar: document.getElementById("progressBar"),
  motivationalLine: document.getElementById("motivationalLine"),
  startBtn: document.getElementById("startBtn"),
  pauseBtn: document.getElementById("pauseBtn"),
  resetBtn: document.getElementById("resetBtn"),
  testBtn: document.getElementById("testBtn"),
  appMessage: document.getElementById("appMessage"),
  intervalInput: document.getElementById("intervalInput"),
  snoozeInput: document.getElementById("snoozeInput"),
  soundToggle: document.getElementById("soundToggle"),
  soundToneSelect: document.getElementById("soundToneSelect"),
  notificationToggle: document.getElementById("notificationToggle"),
  breakTypeList: document.getElementById("breakTypeList"),
  dailyCount: document.getElementById("dailyCount"),
  historyList: document.getElementById("historyList"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  modalOverlay: document.getElementById("modalOverlay"),
  modalTitle: document.getElementById("modalTitle"),
  modalMessage: document.getElementById("modalMessage"),
  modalDuration: document.getElementById("modalDuration"),
  doneBtn: document.getElementById("doneBtn"),
  snoozeBtn: document.getElementById("snoozeBtn"),
  skipBtn: document.getElementById("skipBtn")
};

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  loadSettings();
  resetDailyCounterIfNeeded();
  remainingSeconds = settings.intervalMinutes * 60;
  totalSeconds = settings.intervalMinutes * 60;

  renderBreakTypes();
  bindEvents();
  syncSettingsToInputs();
  renderHistory();
  updateDisplay();
}

function bindEvents() {
  elements.startBtn.addEventListener("click", startTimer);
  elements.pauseBtn.addEventListener("click", pauseTimer);
  elements.resetBtn.addEventListener("click", resetTimer);
  elements.testBtn.addEventListener("click", () => triggerBreak(true));
  elements.doneBtn.addEventListener("click", completeBreak);
  elements.snoozeBtn.addEventListener("click", snoozeBreak);
  elements.skipBtn.addEventListener("click", skipBreak);
  elements.clearHistoryBtn.addEventListener("click", clearHistory);
  elements.intervalInput.addEventListener("change", handleIntervalChange);
  elements.snoozeInput.addEventListener("change", handleSnoozeChange);
  elements.soundToggle.addEventListener("change", handleSoundToggle);
  elements.soundToneSelect.addEventListener("change", handleSoundToneChange);
  elements.notificationToggle.addEventListener("change", handleNotificationToggle);
  elements.modalOverlay.addEventListener("keydown", handleModalKeydown);
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      settings = {
        ...DEFAULT_SETTINGS,
        ...saved,
        history: Array.isArray(saved.history) ? saved.history : [],
        enabledBreakTypes: Array.isArray(saved.enabledBreakTypes) ? saved.enabledBreakTypes : DEFAULT_SETTINGS.enabledBreakTypes
      };
      delete settings.customMessages;

      if (!["signal", "chime", "pulse", "sweep"].includes(settings.soundTone)) {
        settings.soundTone = DEFAULT_SETTINGS.soundTone;
      }
    }
  } catch (error) {
    settings = { ...DEFAULT_SETTINGS };
    showMessage("Saved settings could not be read, so defaults were loaded.", "warning");
  }
}

function saveSettings() {
  settings.lastSavedDate = getTodayKey();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function startTimer() {
  if (!validateSettings()) return;
  if (timerId) return;

  closeModal(false);
  currentStatus = "Running";
  startIntervalOnly();
  showMessage("Timer running. A reset signal is on the way.", "success");
  updateDisplay();
}

function pauseTimer() {
  if (!timerId && currentStatus !== "Running") {
    showMessage("Nothing is running yet.", "warning");
    return;
  }

  syncRemainingSeconds();
  clearActiveTimer();
  currentStatus = "Paused";
  showMessage("Paused. Resume when you are ready.", "warning");
  updateDisplay();
}

function resetTimer() {
  clearActiveTimer();
  currentStatus = "Stopped";
  closeModal(false);
  setTimerDuration(settings.intervalMinutes * 60);
  showMessage("Timer reset to your normal interval.", "success");
  updateDisplay();
}

function tickTimer() {
  resetDailyCounterIfNeeded();
  syncRemainingSeconds();

  if (remainingSeconds <= 0) {
    clearActiveTimer();
    triggerBreak(false);
    return;
  }

  updateDisplay();
}

function triggerBreak(isTest) {
  if (!validateSettings()) return;

  clearActiveTimer();
  activeBreak = getNextBreak();
  currentStatus = "Break Time";
  setTimerDuration(0);
  updateDisplay();
  showModal(activeBreak);
  playSound();
  sendNotification(activeBreak);

  if (isTest) {
    addHistoryItem(activeBreak, "Test");
    showMessage("Test reminder opened.", "success");
  } else {
    showMessage("Break time. Take the reset.", "success");
  }
}

function completeBreak() {
  if (!activeBreak) return;

  settings.dailyBreakCount += 1;
  addHistoryItem(activeBreak, "Done");
  advanceBreakIndex();
  saveSettings();
  closeModal(true);
  restartNormalInterval("Break completed. Timer restarted.");
}

function snoozeBreak() {
  if (!activeBreak) return;

  addHistoryItem(activeBreak, "Snoozed");
  closeModal(true);
  setTimerDuration(settings.snoozeMinutes * 60);
  currentStatus = "Running";
  startIntervalOnly();
  showMessage(`Snoozed for ${settings.snoozeMinutes} minute${settings.snoozeMinutes === 1 ? "" : "s"}.`, "warning");
  updateDisplay();
}

function skipBreak() {
  if (!activeBreak) return;

  addHistoryItem(activeBreak, "Skipped");
  advanceBreakIndex();
  closeModal(true);
  restartNormalInterval("Break skipped. Normal interval restarted.");
}

function showModal(breakItem) {
  lastFocusedElement = document.activeElement;
  elements.modalTitle.textContent = breakItem.title;
  elements.modalMessage.textContent = getBreakMessage(breakItem.id);
  elements.modalDuration.textContent = breakItem.duration;
  elements.modalOverlay.hidden = false;
  document.addEventListener("keydown", trapModalFocus);
  elements.doneBtn.focus();
}

function closeModal(restoreFocus) {
  elements.modalOverlay.hidden = true;
  document.removeEventListener("keydown", trapModalFocus);
  if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function playSound() {
  if (!settings.soundEnabled) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audioContext = new AudioContext();
    const finishAt = playSelectedTone(audioContext, settings.soundTone);
    window.setTimeout(() => audioContext.close(), finishAt * 1000 + 120);
  } catch (error) {
    showMessage("Sound could not play in this browser session.", "warning");
  }
}

function playSelectedTone(audioContext, tone) {
  const tones = {
    signal: [
      { frequency: 660, endFrequency: 440, start: 0, duration: 0.46, volume: 0.09, type: "sine" }
    ],
    chime: [
      { frequency: 523.25, start: 0, duration: 0.42, volume: 0.07, type: "sine" },
      { frequency: 783.99, start: 0.12, duration: 0.5, volume: 0.055, type: "triangle" }
    ],
    pulse: [
      { frequency: 392, start: 0, duration: 0.18, volume: 0.07, type: "sine" },
      { frequency: 523.25, start: 0.24, duration: 0.18, volume: 0.065, type: "sine" },
      { frequency: 659.25, start: 0.48, duration: 0.24, volume: 0.055, type: "sine" }
    ],
    sweep: [
      { frequency: 330, endFrequency: 880, start: 0, duration: 0.58, volume: 0.065, type: "triangle" },
      { frequency: 220, endFrequency: 440, start: 0.08, duration: 0.5, volume: 0.035, type: "sine" }
    ]
  };

  const selectedTone = tones[tone] || tones.signal;
  selectedTone.forEach((note) => playTone(audioContext, note));
  return selectedTone.reduce((latestEnd, note) => Math.max(latestEnd, note.start + note.duration), 0);
}

function playTone(audioContext, note) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const startAt = audioContext.currentTime + note.start;
  const endAt = startAt + note.duration;

  oscillator.type = note.type;
  oscillator.frequency.setValueAtTime(note.frequency, startAt);
  if (note.endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(note.endFrequency, endAt);
  }

  gain.gain.setValueAtTime(0.001, startAt);
  gain.gain.exponentialRampToValueAtTime(note.volume, startAt + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, endAt);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startAt);
  oscillator.stop(endAt + 0.02);
}

function requestNotificationPermission() {
  if (!("Notification" in window)) {
    settings.notificationsEnabled = false;
    elements.notificationToggle.checked = false;
    saveSettings();
    showMessage("This browser does not support notifications.", "warning");
    return;
  }

  if (Notification.permission === "granted") {
    settings.notificationsEnabled = true;
    elements.notificationToggle.checked = true;
    saveSettings();
    showMessage("Browser notifications enabled.", "success");
    return;
  }

  if (Notification.permission === "denied") {
    settings.notificationsEnabled = false;
    elements.notificationToggle.checked = false;
    saveSettings();
    showMessage("Notification permission is blocked in this browser. You can re-enable it from site settings.", "warning");
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      settings.notificationsEnabled = true;
      showMessage("Browser notifications enabled.", "success");
    } else {
      settings.notificationsEnabled = false;
      elements.notificationToggle.checked = false;
      showMessage("Notification permission was denied. You can still use in-app reminders.", "warning");
    }
    saveSettings();
  });
}

function sendNotification(breakItem) {
  if (!settings.notificationsEnabled || !("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  new Notification("BreakSignal Reminder", {
    body: getBreakMessage(breakItem.id)
  });
}

function updateDisplay() {
  elements.timerDisplay.textContent = formatTime(remainingSeconds);
  elements.nextBreakType.textContent = getNextBreak().title;
  elements.dailyCount.textContent = settings.dailyBreakCount;
  updateStatusBadge();
  updateProgress();
  updateButtons();
}

function updateProgress() {
  const elapsed = Math.max(totalSeconds - remainingSeconds, 0);
  const progress = totalSeconds > 0 ? Math.min((elapsed / totalSeconds) * 100, 100) : 100;
  elements.progressBar.style.width = `${progress}%`;
}

function updateStatusBadge() {
  elements.statusBadge.textContent = currentStatus;
  elements.statusBadge.className = "status-badge";

  if (currentStatus === "Running") elements.statusBadge.classList.add("running");
  if (currentStatus === "Paused") elements.statusBadge.classList.add("paused");
  if (currentStatus === "Break Time") elements.statusBadge.classList.add("break");
  if (currentStatus === "Stopped") elements.statusBadge.classList.add("stopped");
}

function updateButtons() {
  elements.startBtn.disabled = Boolean(timerId) || currentStatus === "Break Time";
  elements.pauseBtn.disabled = !timerId;
}

function addHistoryItem(breakItem, action) {
  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    time: new Date().toISOString(),
    breakType: breakItem.title,
    action,
    message: getBreakMessage(breakItem.id)
  };

  settings.history = [item, ...settings.history].slice(0, HISTORY_LIMIT);
  saveSettings();
  renderHistory();
  updateDisplay();
}

function renderHistory() {
  elements.historyList.innerHTML = "";

  if (!settings.history.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No break activity yet. Start the timer and build a calmer work rhythm.";
    elements.historyList.appendChild(empty);
    return;
  }

  settings.history.forEach((item) => {
    const row = document.createElement("article");
    row.className = "history-item";

    const meta = document.createElement("div");
    meta.className = "history-meta";
    meta.innerHTML = `<span>${formatHistoryTime(item.time)}</span><span>${item.action}</span>`;

    const title = document.createElement("strong");
    title.textContent = item.breakType;

    const preview = document.createElement("p");
    preview.textContent = item.message.length > 92 ? `${item.message.slice(0, 92)}...` : item.message;

    row.append(meta, title, preview);
    elements.historyList.appendChild(row);
  });
}

function resetDailyCounterIfNeeded() {
  const today = getTodayKey();
  if (settings.lastSavedDate !== today) {
    settings.dailyBreakCount = 0;
    settings.lastSavedDate = today;
    saveSettings();
  }
}

function renderBreakTypes() {
  elements.breakTypeList.innerHTML = "";

  DEFAULT_BREAKS.forEach((breakItem) => {
    const label = document.createElement("label");
    label.className = "break-type-item";
    label.innerHTML = `
      <input type="checkbox" value="${breakItem.id}">
      <span class="check-mark" aria-hidden="true"></span>
      <span>
        <span class="break-type-title">${breakItem.title}</span>
        <p>${breakItem.description}</p>
      </span>
    `;

    const input = label.querySelector("input");
    input.checked = settings.enabledBreakTypes.includes(breakItem.id);
    input.addEventListener("change", () => {
      settings.enabledBreakTypes = Array.from(elements.breakTypeList.querySelectorAll("input:checked")).map((item) => item.value);
      if (settings.enabledBreakTypes.length && !settings.enabledBreakTypes.includes(getNextBreak().id)) {
        settings.nextBreakIndex = 0;
      }
      saveSettings();
      updateDisplay();
      showMessage(settings.enabledBreakTypes.length ? "Break rotation updated." : "Choose at least one break type before starting.", "warning");
    });

    elements.breakTypeList.appendChild(label);
  });
}

function syncSettingsToInputs() {
  if (settings.notificationsEnabled && (!("Notification" in window) || Notification.permission !== "granted")) {
    settings.notificationsEnabled = false;
    saveSettings();
  }

  elements.intervalInput.value = settings.intervalMinutes;
  elements.snoozeInput.value = settings.snoozeMinutes;
  elements.soundToggle.checked = settings.soundEnabled;
  elements.soundToneSelect.value = settings.soundTone;
  elements.notificationToggle.checked = settings.notificationsEnabled;
}

function handleIntervalChange() {
  const value = parseWholeMinutes(elements.intervalInput.value);
  if (!value) {
    elements.intervalInput.value = settings.intervalMinutes;
    showMessage("Use a reminder interval of at least 1 minute.", "error");
    return;
  }

  settings.intervalMinutes = value;
  saveSettings();
  if (currentStatus === "Stopped" || currentStatus === "Paused") {
    setTimerDuration(settings.intervalMinutes * 60);
    updateDisplay();
  }
  showMessage("Reminder interval saved.", "success");
}

function handleSnoozeChange() {
  const value = parseWholeMinutes(elements.snoozeInput.value);
  if (!value) {
    elements.snoozeInput.value = settings.snoozeMinutes;
    showMessage("Use a snooze duration of at least 1 minute.", "error");
    return;
  }

  settings.snoozeMinutes = value;
  saveSettings();
  showMessage("Snooze duration saved.", "success");
}

function handleSoundToggle() {
  settings.soundEnabled = elements.soundToggle.checked;
  saveSettings();
  showMessage(settings.soundEnabled ? "Sound alert enabled." : "Sound alert disabled.", "success");
}

function handleSoundToneChange() {
  settings.soundTone = elements.soundToneSelect.value;
  saveSettings();
  showMessage("Alert tone saved. Use Test Reminder to hear it.", "success");
}

function handleNotificationToggle() {
  if (elements.notificationToggle.checked) {
    requestNotificationPermission();
  } else {
    settings.notificationsEnabled = false;
    saveSettings();
    showMessage("Browser notifications disabled.", "success");
  }
}

function handleModalKeydown(event) {
  if (event.key === "Escape") {
    skipBreak();
  }
}

function trapModalFocus(event) {
  if (elements.modalOverlay.hidden || event.key !== "Tab") return;

  const focusableElements = elements.modalOverlay.querySelectorAll("button");
  if (!focusableElements.length) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function clearHistory() {
  settings.history = [];
  saveSettings();
  renderHistory();
  showMessage("Break history cleared.", "success");
}

function restartNormalInterval(message) {
  activeBreak = null;
  setTimerDuration(settings.intervalMinutes * 60);
  currentStatus = "Running";
  startIntervalOnly();
  showMessage(message, "success");
  updateDisplay();
}

function startIntervalOnly() {
  clearActiveTimer();
  targetEndTime = Date.now() + remainingSeconds * 1000;
  timerId = window.setInterval(tickTimer, 1000);
}

function clearActiveTimer() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
  targetEndTime = null;
}

function syncRemainingSeconds() {
  if (targetEndTime) {
    remainingSeconds = Math.max(Math.ceil((targetEndTime - Date.now()) / 1000), 0);
  } else {
    remainingSeconds = Math.max(remainingSeconds - 1, 0);
  }
}

function setTimerDuration(seconds) {
  totalSeconds = Math.max(seconds, 0);
  remainingSeconds = Math.max(seconds, 0);
  targetEndTime = currentStatus === "Running" && remainingSeconds > 0 ? Date.now() + remainingSeconds * 1000 : null;
}

function validateSettings() {
  const interval = parseWholeMinutes(elements.intervalInput.value);
  const snooze = parseWholeMinutes(elements.snoozeInput.value);

  if (!interval) {
    showMessage("Reminder interval must be at least 1 minute.", "error");
    return false;
  }

  if (!snooze) {
    showMessage("Snooze duration must be at least 1 minute.", "error");
    return false;
  }

  settings.intervalMinutes = interval;
  settings.snoozeMinutes = snooze;

  if (!settings.enabledBreakTypes.length) {
    showMessage("Choose at least one break type before starting.", "warning");
    return false;
  }

  saveSettings();
  return true;
}

function getNextBreak() {
  const enabled = DEFAULT_BREAKS.filter((breakItem) => settings.enabledBreakTypes.includes(breakItem.id));
  if (!enabled.length) return DEFAULT_BREAKS[0];

  const index = settings.nextBreakIndex % enabled.length;
  return enabled[index];
}

function advanceBreakIndex() {
  const enabledCount = settings.enabledBreakTypes.length || 1;
  settings.nextBreakIndex = (settings.nextBreakIndex + 1) % enabledCount;
}

function getBreakMessage(id) {
  return DEFAULT_BREAKS.find((breakItem) => breakItem.id === id)?.message || "";
}

function parseWholeMinutes(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 1) return null;
  return Math.floor(number);
}

function formatTime(seconds) {
  const safeSeconds = Math.max(seconds, 0);
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function formatHistoryTime(value) {
  const date = new Date(value);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getTodayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function showMessage(message, type) {
  elements.appMessage.textContent = message;
  elements.appMessage.className = `app-message ${type || ""}`.trim();
}
