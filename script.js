"use strict";

const STORAGE_KEY = "breaksignal.settings.v1";
const HISTORY_LIMIT = 30;

const DEFAULT_BREAKS = [
  {
    id: "eye",
    title: "Eye Break",
    duration: "20 seconds",
    description: "Soften your gaze and release screen tension.",
    messages: [
      "Look at something far away for 20 seconds. Let your eyes soften.",
      "Blink slowly and release the tension behind your eyes.",
      "Shift your gaze away from the screen and let the room come back into focus.",
      "Your eyes have been working hard. Give them a clean reset.",
      "Look toward the distance. No sharp focus, no strain, just softness.",
      "Relax your forehead, unclench your jaw, and let your vision rest.",
      "Close your eyes for a few slow breaths, then look far away.",
      "Let your eyes drift beyond the screen. Focus returns sharper after rest.",
      "Take a quiet visual pause. The screen can wait.",
      "Reset your gaze before fatigue becomes the background noise."
    ]
  },
  {
    id: "stretch",
    title: "Stretch Break",
    duration: "1 minute",
    description: "Open the chest, neck, and shoulders.",
    messages: [
      "Stand up, open your chest, roll your shoulders, and breathe.",
      "Reach upward, lengthen your spine, and let your shoulders drop.",
      "Roll your neck gently. Small motion, no force.",
      "Stretch your arms, loosen your wrists, and reset your posture.",
      "Open your chest like you are making room for more air.",
      "Stand tall for a moment. Your body needs movement, not just endurance.",
      "Pull your shoulders back gently and breathe into the space you create.",
      "Let your spine decompress. A small stretch can change the whole session.",
      "Move slowly through one clean stretch. No rush, no pressure.",
      "Release the stiffness before it becomes part of the workday."
    ]
  },
  {
    id: "walk",
    title: "Walking Break",
    duration: "2 minutes",
    description: "Move gently and reset your energy.",
    messages: [
      "Take a short walk. Let your body reset before returning.",
      "Step away from the desk and give your mind more oxygen.",
      "Walk slowly for two minutes. Let your focus rebuild in motion.",
      "Move your legs, loosen your hips, and let the screen disappear for a moment.",
      "A short walk can clear more fog than another forced minute at the desk.",
      "Leave the chair. Let your body remind your brain that it is awake.",
      "Walk with no goal except returning clearer.",
      "Stand up and move through the room. Momentum begins in the body.",
      "Give your circulation a signal. A few steps are enough to start.",
      "Reset your energy with movement, then come back sharper."
    ]
  },
  {
    id: "posture",
    title: "Posture Break",
    duration: "30 seconds",
    description: "Return to a stable, aligned working position.",
    messages: [
      "Relax your shoulders, align your neck, and place both feet on the floor.",
      "Unclench your jaw, lower your shoulders, and sit tall without forcing it.",
      "Bring your screen to your eyes, not your neck to the screen.",
      "Plant both feet. Let your spine stack naturally.",
      "Reset your posture before your body starts negotiating with pain.",
      "Relax your hands, soften your face, and straighten gently.",
      "Check your neck, shoulders, wrists, and feet. Bring everything back to neutral.",
      "Sit like you are protecting tomorrow’s energy, not just today’s task.",
      "Let your shoulders fall away from your ears. That is the signal.",
      "Small alignment now prevents a louder correction later."
    ]
  }
];

const DEFAULT_SETTINGS = {
  intervalMinutes: 30,
  snoozeMinutes: 5,
  soundEnabled: true,
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
let currentStatus = "Stopped";
let activeBreak = null;
let activeBreakMessage = "";
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
  timerId = window.setInterval(tickTimer, 1000);
  showMessage("Timer running. A reset signal is on the way.", "success");
  updateDisplay();
}

function pauseTimer() {
  if (!timerId && currentStatus !== "Running") {
    showMessage("Nothing is running yet.", "warning");
    return;
  }

  clearActiveTimer();
  currentStatus = "Paused";
  showMessage("Paused. Resume when you are ready.", "warning");
  updateDisplay();
}

function resetTimer() {
  clearActiveTimer();
  currentStatus = "Stopped";
  activeBreak = null;
  activeBreakMessage = "";
  closeModal(false);
  setTimerDuration(settings.intervalMinutes * 60);
  showMessage("Timer reset to your normal interval.", "success");
  updateDisplay();
}

function tickTimer() {
  resetDailyCounterIfNeeded();
  remainingSeconds -= 1;

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
  activeBreakMessage = getRandomBreakMessage(activeBreak);
  currentStatus = "Break Time";
  setTimerDuration(0);
  updateDisplay();
  showModal(activeBreak, activeBreakMessage);
  playSound();
  sendNotification(activeBreak, activeBreakMessage);

  if (isTest) {
    addHistoryItem(activeBreak, "Test", activeBreakMessage);
    showMessage("Test reminder opened.", "success");
  } else {
    showMessage("Break time. Take the reset.", "success");
  }
}

function completeBreak() {
  if (!activeBreak) return;

  settings.dailyBreakCount += 1;
  addHistoryItem(activeBreak, "Done", activeBreakMessage);
  advanceBreakIndex();
  saveSettings();
  closeModal(true);
  restartNormalInterval("Break completed. Timer restarted.");
}

function snoozeBreak() {
  if (!activeBreak) return;

  addHistoryItem(activeBreak, "Snoozed", activeBreakMessage);
  closeModal(true);
  setTimerDuration(settings.snoozeMinutes * 60);
  currentStatus = "Running";
  startIntervalOnly();
  showMessage(`Snoozed for ${settings.snoozeMinutes} minute${settings.snoozeMinutes === 1 ? "" : "s"}.`, "warning");
  updateDisplay();
}

function skipBreak() {
  if (!activeBreak) return;

  addHistoryItem(activeBreak, "Skipped", activeBreakMessage);
  advanceBreakIndex();
  closeModal(true);
  restartNormalInterval("Break skipped. Normal interval restarted.");
}

function showModal(breakItem, message) {
  lastFocusedElement = document.activeElement;
  elements.modalTitle.textContent = breakItem.title;
  elements.modalMessage.textContent = message;
  elements.modalDuration.textContent = breakItem.duration;
  elements.modalOverlay.hidden = false;
  elements.doneBtn.focus();
}

function closeModal(restoreFocus) {
  elements.modalOverlay.hidden = true;
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
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.22);
    gain.gain.setValueAtTime(0.001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.09, audioContext.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.45);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.46);

    oscillator.addEventListener("ended", () => audioContext.close());
  } catch (error) {
    showMessage("Sound could not play in this browser session.", "warning");
  }
}

function requestNotificationPermission() {
  if (!("Notification" in window)) {
    settings.notificationsEnabled = false;
    elements.notificationToggle.checked = false;
    saveSettings();
    showMessage("This browser does not support notifications.", "warning");
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

function sendNotification(breakItem, message) {
  if (!settings.notificationsEnabled || !("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  new Notification("BreakSignal Reminder", {
    body: message || getRandomBreakMessage(breakItem)
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

function addHistoryItem(breakItem, action, message) {
  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    time: new Date().toISOString(),
    breakType: breakItem.title,
    action,
    message: message || getRandomBreakMessage(breakItem)
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
    const historyMessage = item.message || "Break reminder completed.";
    preview.textContent = historyMessage.length > 92 ? `${historyMessage.slice(0, 92)}...` : historyMessage;

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
  elements.intervalInput.value = settings.intervalMinutes;
  elements.snoozeInput.value = settings.snoozeMinutes;
  elements.soundToggle.checked = settings.soundEnabled;
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

function clearHistory() {
  settings.history = [];
  saveSettings();
  renderHistory();
  showMessage("Break history cleared.", "success");
}

function restartNormalInterval(message) {
  activeBreak = null;
  activeBreakMessage = "";
  setTimerDuration(settings.intervalMinutes * 60);
  currentStatus = "Running";
  startIntervalOnly();
  showMessage(message, "success");
  updateDisplay();
}

function startIntervalOnly() {
  clearActiveTimer();
  timerId = window.setInterval(tickTimer, 1000);
}

function clearActiveTimer() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function setTimerDuration(seconds) {
  totalSeconds = Math.max(seconds, 0);
  remainingSeconds = Math.max(seconds, 0);
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

function getRandomBreakMessage(breakItem) {
  if (!breakItem || !Array.isArray(breakItem.messages) || !breakItem.messages.length) {
    return "Take a short break. Your body and focus will thank you.";
  }

  const randomIndex = Math.floor(Math.random() * breakItem.messages.length);
  return breakItem.messages[randomIndex];
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
