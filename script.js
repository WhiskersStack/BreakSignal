"use strict";

const STORAGE_KEY = "breaksignal.settings.v1";
const HISTORY_LIMIT = 30;
const DEFAULT_MOTIVATION = "Start a calm rhythm. Your future self gets the benefit.";
const PREVIEW_DURATION_MS = 5000;
const PRESETS = {
  custom: {
    label: "Custom"
  },
  "20-20-20": {
    label: "20-20-20",
    intervalMinutes: 20,
    enabledBreakTypes: ["eye"]
  },
  "deep-work": {
    label: "Deep Work",
    intervalMinutes: 45,
    enabledBreakTypes: ["eye", "posture", "stretch"]
  },
  "posture-guard": {
    label: "Posture Guard",
    intervalMinutes: 30,
    enabledBreakTypes: ["posture", "stretch"]
  },
  "movement-mode": {
    label: "Movement Mode",
    intervalMinutes: 60,
    enabledBreakTypes: ["walk", "stretch"]
  }
};

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

const DEFAULT_BREAK_MESSAGES = DEFAULT_BREAKS.reduce((messages, breakItem) => {
  messages[breakItem.id] = breakItem.message;
  return messages;
}, {});

const DEFAULT_SETTINGS = {
  intervalMinutes: 30,
  snoozeMinutes: 5,
  soundEnabled: true,
  soundTone: "beacon",
  soundVolume: 70,
  notificationsEnabled: false,
  enabledBreakTypes: ["eye", "stretch", "walk", "posture"],
  dailyBreakCount: 0,
  history: [],
  customMessages: { ...DEFAULT_BREAK_MESSAGES },
  lastSavedDate: getTodayKey(),
  nextBreakIndex: 0,
  activePreset: "custom",
  compactMode: false
};

let settings = { ...DEFAULT_SETTINGS };
let timerId = null;
let remainingSeconds = DEFAULT_SETTINGS.intervalMinutes * 60;
let totalSeconds = DEFAULT_SETTINGS.intervalMinutes * 60;
let targetEndTime = null;
let currentStatus = "Stopped";
let activeBreak = null;
let isPreviewBreak = false;
let lastFocusedElement = null;
let soundLoopInterval = null;
let activeAudioContext = null;
let previewAudioContext = null;
let previewLoopInterval = null;
let previewStopTimer = null;
let completionFeedbackTimer = null;

const elements = {
  timerCard: document.querySelector(".timer-card"),
  timerDisplay: document.getElementById("timerDisplay"),
  statusBadge: document.getElementById("statusBadge"),
  nextBreakType: document.getElementById("nextBreakType"),
  progressBar: document.getElementById("progressBar"),
  motivationalLine: document.getElementById("motivationalLine"),
  startBtn: document.getElementById("startBtn"),
  pauseBtn: document.getElementById("pauseBtn"),
  resetBtn: document.getElementById("resetBtn"),
  testBtn: document.getElementById("testBtn"),
  compactModeBtn: document.getElementById("compactModeBtn"),
  appMessage: document.getElementById("appMessage"),
  presetButtons: document.querySelectorAll(".preset-btn"),
  intervalInput: document.getElementById("intervalInput"),
  snoozeInput: document.getElementById("snoozeInput"),
  soundToggle: document.getElementById("soundToggle"),
  soundToneSelect: document.getElementById("soundToneSelect"),
  previewToneBtn: document.getElementById("previewToneBtn"),
  volumeInput: document.getElementById("volumeInput"),
  volumeValue: document.getElementById("volumeValue"),
  notificationToggle: document.getElementById("notificationToggle"),
  breakTypeList: document.getElementById("breakTypeList"),
  messageEditorList: document.getElementById("messageEditorList"),
  dailyCount: document.getElementById("dailyCount"),
  resetTodayBtn: document.getElementById("resetTodayBtn"),
  historyList: document.getElementById("historyList"),
  historySummary: document.getElementById("historySummary"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  resetMessagesBtn: document.getElementById("resetMessagesBtn"),
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
  renderMessageEditors();
  bindEvents();
  syncSettingsToInputs();
  syncCompactMode();
  syncPresetButtons();
  renderHistory();
  updateDisplay();
}

function bindEvents() {
  elements.startBtn.addEventListener("click", startTimer);
  elements.pauseBtn.addEventListener("click", pauseTimer);
  elements.resetBtn.addEventListener("click", resetTimer);
  elements.testBtn.addEventListener("click", () => triggerBreak(true));
  elements.compactModeBtn.addEventListener("click", toggleCompactMode);
  elements.doneBtn.addEventListener("click", completeBreak);
  elements.snoozeBtn.addEventListener("click", snoozeBreak);
  elements.skipBtn.addEventListener("click", skipBreak);
  elements.resetTodayBtn.addEventListener("click", resetTodayStats);
  elements.resetMessagesBtn.addEventListener("click", resetDefaultMessages);
  elements.clearHistoryBtn.addEventListener("click", clearHistory);
  elements.presetButtons.forEach((button) => {
    button.addEventListener("click", () => applyPreset(button.dataset.preset));
  });
  elements.intervalInput.addEventListener("change", handleIntervalChange);
  elements.snoozeInput.addEventListener("change", handleSnoozeChange);
  elements.soundToggle.addEventListener("change", handleSoundToggle);
  elements.soundToneSelect.addEventListener("change", handleSoundToneChange);
  elements.previewToneBtn.addEventListener("click", previewSelectedTone);
  elements.volumeInput.addEventListener("input", handleVolumeChange);
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
        enabledBreakTypes: Array.isArray(saved.enabledBreakTypes) ? saved.enabledBreakTypes : DEFAULT_SETTINGS.enabledBreakTypes,
        customMessages: normalizeCustomMessages(saved.customMessages)
      };

      if (!["signal", "chime", "pulse", "sweep", "deep", "air", "rise", "double", "neon", "orbit", "cascade", "launch", "beacon", "starlight", "warp", "crystal", "uplink", "horizon"].includes(settings.soundTone)) {
        settings.soundTone = DEFAULT_SETTINGS.soundTone;
      }

      settings.soundVolume = normalizeVolume(settings.soundVolume);

      if (!PRESETS[settings.activePreset]) {
        settings.activePreset = DEFAULT_SETTINGS.activePreset;
      }

      settings.compactMode = Boolean(settings.compactMode);
    }
  } catch (error) {
    settings = {
      ...DEFAULT_SETTINGS,
      customMessages: { ...DEFAULT_BREAK_MESSAGES }
    };
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
  stopTonePreview();
  currentStatus = "Stopped";
  isPreviewBreak = false;
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
  isPreviewBreak = isTest;
  currentStatus = "Break Time";
  setTimerDuration(0);
  updateDisplay();
  showModal(activeBreak);
  playSound();
  sendNotification(activeBreak);

  if (isTest) {
    showMessage("Test reminder opened. This preview is not added to history.", "success");
  } else {
    showMessage("Break time. Take the reset.", "success");
  }
}

function completeBreak() {
  if (!activeBreak) return;

  if (isPreviewBreak) {
    closePreviewBreak("Test reminder closed. No history was added.");
    return;
  }

  settings.dailyBreakCount += 1;
  addHistoryItem(activeBreak, "Completed");
  advanceBreakIndex();
  saveSettings();
  closeModal(true);
  restartNormalInterval("Break completed. Timer restarted.");
  showCompletionFeedback();
}

function snoozeBreak() {
  if (!activeBreak) return;

  if (isPreviewBreak) {
    closePreviewBreak("Test reminder closed. No snooze was logged.");
    return;
  }

  addHistoryItem(activeBreak, "Snoozed");
  closeModal(true);
  setTimerDuration(settings.snoozeMinutes * 60);
  currentStatus = "Running";
  startIntervalOnly();
  currentStatus = "Snoozed";
  showMessage(`Snoozed for ${settings.snoozeMinutes} minute${settings.snoozeMinutes === 1 ? "" : "s"}.`, "warning");
  updateDisplay();
}

function skipBreak() {
  if (!activeBreak) return;

  if (isPreviewBreak) {
    closePreviewBreak("Test reminder closed. No history was added.");
    return;
  }

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
  stopSoundLoop();
  document.removeEventListener("keydown", trapModalFocus);
  if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function playSound() {
  stopTonePreview();
  if (!settings.soundEnabled) return;

  stopSoundLoop();
  playSoundLoop();
}

function closePreviewBreak(message) {
  activeBreak = null;
  isPreviewBreak = false;
  currentStatus = "Stopped";
  closeModal(true);
  setTimerDuration(settings.intervalMinutes * 60);
  showMessage(message, "success");
  updateDisplay();
}

function playSoundLoop() {
  if (!settings.soundEnabled || elements.modalOverlay.hidden) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    activeAudioContext = activeAudioContext || new AudioContext();
    if (activeAudioContext.state === "suspended") {
      activeAudioContext.resume();
    }

    const repeatTone = () => {
      if (!settings.soundEnabled || elements.modalOverlay.hidden || !activeAudioContext) return;
      playSelectedTone(activeAudioContext, settings.soundTone);
    };

    repeatTone();
    soundLoopInterval = window.setInterval(repeatTone, 1800);
  } catch (error) {
    showMessage("Sound could not play in this browser session.", "warning");
  }
}

function stopSoundLoop() {
  if (soundLoopInterval) {
    window.clearInterval(soundLoopInterval);
    soundLoopInterval = null;
  }
  closeAudioContext();
}

function closeAudioContext() {
  if (activeAudioContext) {
    activeAudioContext.close();
    activeAudioContext = null;
  }
}

function previewSelectedTone() {
  if (isTonePreviewing()) {
    stopTonePreview("Tone preview stopped.");
    return;
  }

  startTonePreview();
}

function startTonePreview() {
  settings.soundTone = elements.soundToneSelect.value;
  settings.soundVolume = normalizeVolume(elements.volumeInput.value);
  saveSettings();

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      showMessage("Sound preview is not supported in this browser.", "warning");
      return false;
    }

    stopTonePreview();
    previewAudioContext = new AudioContext();
    if (previewAudioContext.state === "suspended") {
      previewAudioContext.resume();
    }

    const repeatPreview = () => {
      if (!previewAudioContext) return;
      playSelectedTone(previewAudioContext, settings.soundTone);
    };

    repeatPreview();
    previewLoopInterval = window.setInterval(repeatPreview, 1800);
    previewStopTimer = window.setTimeout(() => {
      stopTonePreview("Tone preview finished.");
    }, PREVIEW_DURATION_MS);

    syncTonePreviewButton(true);
    showMessage("Previewing tone for 5 seconds. Click Stop preview to end it.", "success");
    return true;
  } catch (error) {
    stopTonePreview();
    showMessage("Sound preview could not play in this browser session.", "warning");
    return false;
  }
}

function stopTonePreview(message) {
  if (previewLoopInterval) {
    window.clearInterval(previewLoopInterval);
    previewLoopInterval = null;
  }

  if (previewStopTimer) {
    window.clearTimeout(previewStopTimer);
    previewStopTimer = null;
  }

  if (previewAudioContext) {
    const contextToClose = previewAudioContext;
    previewAudioContext = null;
    contextToClose.close().catch(() => {});
  }

  syncTonePreviewButton(false);
  if (message) {
    showMessage(message, "success");
  }
}

function isTonePreviewing() {
  return Boolean(previewAudioContext || previewLoopInterval || previewStopTimer);
}

function syncTonePreviewButton(isPreviewing) {
  elements.previewToneBtn.textContent = isPreviewing ? "Stop preview" : "Preview tone";
  elements.previewToneBtn.setAttribute("aria-pressed", String(isPreviewing));
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
    ],
    deep: [
      { frequency: 246.94, start: 0, duration: 0.7, volume: 0.065, type: "sine" },
      { frequency: 493.88, start: 0.05, duration: 0.48, volume: 0.035, type: "triangle" }
    ],
    air: [
      { frequency: 880, start: 0, duration: 0.22, volume: 0.045, type: "sine" },
      { frequency: 1318.51, start: 0.08, duration: 0.26, volume: 0.03, type: "sine" }
    ],
    rise: [
      { frequency: 392, endFrequency: 659.25, start: 0, duration: 0.42, volume: 0.055, type: "triangle" },
      { frequency: 523.25, endFrequency: 783.99, start: 0.16, duration: 0.46, volume: 0.04, type: "sine" }
    ],
    double: [
      { frequency: 587.33, start: 0, duration: 0.16, volume: 0.065, type: "sine" },
      { frequency: 587.33, start: 0.26, duration: 0.18, volume: 0.06, type: "sine" },
      { frequency: 880, start: 0.32, duration: 0.22, volume: 0.03, type: "triangle" }
    ],
    neon: [
      { frequency: 440, endFrequency: 659.25, start: 0, duration: 0.26, volume: 0.058, type: "triangle" },
      { frequency: 659.25, start: 0.16, duration: 0.18, volume: 0.052, type: "sine" },
      { frequency: 987.77, start: 0.32, duration: 0.28, volume: 0.044, type: "sine" },
      { frequency: 1318.51, start: 0.5, duration: 0.22, volume: 0.028, type: "triangle" }
    ],
    orbit: [
      { frequency: 329.63, endFrequency: 493.88, start: 0, duration: 0.5, volume: 0.052, type: "sine" },
      { frequency: 659.25, start: 0.08, duration: 0.16, volume: 0.04, type: "triangle" },
      { frequency: 783.99, start: 0.34, duration: 0.18, volume: 0.04, type: "triangle" },
      { frequency: 987.77, start: 0.62, duration: 0.2, volume: 0.032, type: "sine" }
    ],
    cascade: [
      { frequency: 1046.5, start: 0, duration: 0.12, volume: 0.04, type: "square" },
      { frequency: 880, start: 0.11, duration: 0.12, volume: 0.04, type: "triangle" },
      { frequency: 659.25, start: 0.22, duration: 0.13, volume: 0.045, type: "triangle" },
      { frequency: 523.25, start: 0.36, duration: 0.22, volume: 0.052, type: "sine" },
      { frequency: 783.99, start: 0.5, duration: 0.2, volume: 0.032, type: "sine" }
    ],
    launch: [
      { frequency: 196, endFrequency: 523.25, start: 0, duration: 0.62, volume: 0.055, type: "sine" },
      { frequency: 392, endFrequency: 1174.66, start: 0.08, duration: 0.56, volume: 0.045, type: "triangle" },
      { frequency: 1567.98, start: 0.54, duration: 0.16, volume: 0.026, type: "sine" }
    ],
    beacon: [
      { frequency: 261.63, start: 0, duration: 0.42, volume: 0.055, type: "sine" },
      { frequency: 523.25, start: 0.04, duration: 0.36, volume: 0.04, type: "triangle" },
      { frequency: 783.99, start: 0.18, duration: 0.34, volume: 0.035, type: "sine" },
      { frequency: 1046.5, start: 0.42, duration: 0.2, volume: 0.028, type: "triangle" }
    ],
    starlight: [
      { frequency: 587.33, start: 0, duration: 0.14, volume: 0.04, type: "sine" },
      { frequency: 739.99, start: 0.12, duration: 0.14, volume: 0.042, type: "sine" },
      { frequency: 987.77, start: 0.24, duration: 0.18, volume: 0.04, type: "triangle" },
      { frequency: 1479.98, start: 0.42, duration: 0.28, volume: 0.026, type: "sine" }
    ],
    warp: [
      { frequency: 174.61, endFrequency: 698.46, start: 0, duration: 0.5, volume: 0.05, type: "sawtooth" },
      { frequency: 349.23, endFrequency: 1396.91, start: 0.08, duration: 0.48, volume: 0.032, type: "triangle" },
      { frequency: 1046.5, start: 0.5, duration: 0.14, volume: 0.024, type: "sine" }
    ],
    crystal: [
      { frequency: 1567.98, start: 0, duration: 0.1, volume: 0.026, type: "sine" },
      { frequency: 1174.66, start: 0.12, duration: 0.1, volume: 0.032, type: "triangle" },
      { frequency: 880, start: 0.24, duration: 0.12, volume: 0.036, type: "triangle" },
      { frequency: 659.25, start: 0.38, duration: 0.24, volume: 0.045, type: "sine" }
    ],
    uplink: [
      { frequency: 493.88, start: 0, duration: 0.1, volume: 0.044, type: "square" },
      { frequency: 493.88, start: 0.14, duration: 0.1, volume: 0.04, type: "square" },
      { frequency: 987.77, start: 0.28, duration: 0.22, volume: 0.032, type: "triangle" },
      { frequency: 1318.51, start: 0.46, duration: 0.16, volume: 0.024, type: "sine" }
    ],
    horizon: [
      { frequency: 293.66, endFrequency: 440, start: 0, duration: 0.46, volume: 0.048, type: "sine" },
      { frequency: 440, endFrequency: 659.25, start: 0.18, duration: 0.46, volume: 0.04, type: "triangle" },
      { frequency: 659.25, endFrequency: 987.77, start: 0.36, duration: 0.46, volume: 0.03, type: "sine" },
      { frequency: 1318.51, start: 0.74, duration: 0.18, volume: 0.022, type: "triangle" }
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
  gain.gain.exponentialRampToValueAtTime(note.volume * getVolumeScale(), startAt + 0.03);
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
  const statusLabels = {
    Stopped: "Ready",
    Running: "Running",
    Paused: "Paused",
    "Break Time": "Break active",
    Snoozed: "Snoozed"
  };

  elements.statusBadge.textContent = statusLabels[currentStatus] || currentStatus;
  elements.statusBadge.className = "status-badge";

  if (currentStatus === "Running") elements.statusBadge.classList.add("running");
  if (currentStatus === "Paused") elements.statusBadge.classList.add("paused");
  if (currentStatus === "Break Time") elements.statusBadge.classList.add("break");
  if (currentStatus === "Snoozed") elements.statusBadge.classList.add("snoozed");
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
  updateHistorySummary();

  if (!settings.history.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No breaks logged yet. Start a session to build your recovery rhythm.";
    elements.historyList.appendChild(empty);
    return;
  }

  settings.history.forEach((item) => {
    const row = document.createElement("article");
    row.className = "history-item";

    const meta = document.createElement("div");
    meta.className = "history-meta";

    const timestamp = document.createElement("span");
    timestamp.textContent = `${formatHistoryDate(item.time)} at ${formatHistoryTime(item.time)}`;

    const action = document.createElement("span");
    action.textContent = item.action;

    meta.append(timestamp, action);

    const title = document.createElement("strong");
    title.textContent = item.breakType;

    const preview = document.createElement("p");
    preview.textContent = item.message.length > 92 ? `${item.message.slice(0, 92)}...` : item.message;

    row.append(meta, title, preview);
    elements.historyList.appendChild(row);
  });
}

function updateHistorySummary() {
  const count = settings.history.length;
  elements.historySummary.textContent = count
    ? `Showing ${count} of the latest ${HISTORY_LIMIT} activity entries.`
    : `Latest ${HISTORY_LIMIT} activity entries will appear here.`;
}

function resetDailyCounterIfNeeded() {
  const today = getTodayKey();
  if (settings.lastSavedDate !== today) {
    settings.dailyBreakCount = 0;
    settings.lastSavedDate = today;
    saveSettings();
  }
}

function applyPreset(presetId) {
  const preset = PRESETS[presetId];
  if (!preset) return;

  settings.activePreset = presetId;

  if (presetId !== "custom") {
    settings.intervalMinutes = preset.intervalMinutes;
    settings.enabledBreakTypes = [...preset.enabledBreakTypes];
    settings.nextBreakIndex = 0;
    elements.intervalInput.value = settings.intervalMinutes;

    if (currentStatus === "Stopped" || currentStatus === "Paused") {
      setTimerDuration(settings.intervalMinutes * 60);
    }
  }

  saveSettings();
  renderBreakTypes();
  syncPresetButtons();
  updateDisplay();

  const message = presetId === "custom"
    ? "Custom cadence selected."
    : `${preset.label} preset applied.`;
  showMessage(message, "success");
}

function syncPresetButtons() {
  elements.presetButtons.forEach((button) => {
    const isActive = button.dataset.preset === settings.activePreset;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function markCustomPreset() {
  if (settings.activePreset !== "custom") {
    settings.activePreset = "custom";
    syncPresetButtons();
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
      markCustomPreset();
      settings.enabledBreakTypes = Array.from(elements.breakTypeList.querySelectorAll("input:checked")).map((item) => item.value);
      if (settings.enabledBreakTypes.length && !settings.enabledBreakTypes.includes(getNextBreak().id)) {
        settings.nextBreakIndex = 0;
      }
      saveSettings();
      syncPresetButtons();
      updateDisplay();
      showMessage(settings.enabledBreakTypes.length ? "Break rotation updated." : "Choose at least one break type before starting.", "warning");
    });

    elements.breakTypeList.appendChild(label);
  });
}

function renderMessageEditors() {
  elements.messageEditorList.innerHTML = "";

  DEFAULT_BREAKS.forEach((breakItem) => {
    const wrapper = document.createElement("div");
    wrapper.className = "message-editor";

    const label = document.createElement("label");
    label.setAttribute("for", `message-${breakItem.id}`);
    label.textContent = breakItem.title;

    const textarea = document.createElement("textarea");
    textarea.id = `message-${breakItem.id}`;
    textarea.value = getBreakMessage(breakItem.id);
    textarea.dataset.breakMessage = breakItem.id;
    textarea.addEventListener("input", handleMessageChange);

    wrapper.append(label, textarea);
    elements.messageEditorList.appendChild(wrapper);
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
  elements.volumeInput.value = settings.soundVolume;
  elements.volumeValue.textContent = `${settings.soundVolume}%`;
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
  markCustomPreset();
  saveSettings();
  syncPresetButtons();
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

function toggleCompactMode() {
  settings.compactMode = !settings.compactMode;
  saveSettings();
  syncCompactMode();
  showMessage(settings.compactMode ? "Compact mode enabled." : "Full dashboard restored.", "success");
}

function syncCompactMode() {
  document.body.classList.toggle("compact-mode", settings.compactMode);
  elements.compactModeBtn.setAttribute("aria-pressed", String(settings.compactMode));
  elements.compactModeBtn.textContent = settings.compactMode ? "Full Dashboard" : "Compact Mode";
}

function resetTodayStats() {
  settings.dailyBreakCount = 0;
  saveSettings();
  updateDisplay();
  showMessage("Today's completed break count was reset. History was kept.", "success");
}

function showCompletionFeedback() {
  if (completionFeedbackTimer) {
    window.clearTimeout(completionFeedbackTimer);
  }

  elements.timerCard.classList.add("reset-logged");
  elements.statusBadge.textContent = "Reset logged";
  elements.statusBadge.className = "status-badge completed";
  elements.motivationalLine.textContent = "Reset logged. Keep the next stretch calm and steady.";
  showMessage("Reset logged. Timer restarted.", "success");

  completionFeedbackTimer = window.setTimeout(() => {
    elements.timerCard.classList.remove("reset-logged");
    elements.motivationalLine.textContent = DEFAULT_MOTIVATION;
    completionFeedbackTimer = null;
    updateDisplay();
  }, 1400);
}

function handleSoundToggle() {
  settings.soundEnabled = elements.soundToggle.checked;
  if (!settings.soundEnabled) {
    stopSoundLoop();
    stopTonePreview();
  }
  saveSettings();
  showMessage(settings.soundEnabled ? "Sound alert enabled." : "Sound alert disabled.", "success");
}

function handleSoundToneChange() {
  settings.soundTone = elements.soundToneSelect.value;
  saveSettings();
  showMessage(isTonePreviewing() ? "Alert tone updated for the active preview." : "Alert tone saved. Use Preview tone to hear it.", "success");
}

function handleVolumeChange() {
  settings.soundVolume = normalizeVolume(elements.volumeInput.value);
  elements.volumeValue.textContent = `${settings.soundVolume}%`;
  saveSettings();
}

function handleMessageChange(event) {
  const breakId = event.target.dataset.breakMessage;
  const fallbackMessage = DEFAULT_BREAK_MESSAGES[breakId];
  const customMessage = event.target.value.trim();

  settings.customMessages[breakId] = customMessage || fallbackMessage;
  saveSettings();

  if (activeBreak?.id === breakId && !elements.modalOverlay.hidden) {
    elements.modalMessage.textContent = getBreakMessage(breakId);
  }
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
  const confirmed = window.confirm("Clear all break history?");
  if (!confirmed) return;

  settings.history = [];
  saveSettings();
  renderHistory();
  showMessage("Break history cleared.", "success");
}

function resetDefaultMessages() {
  settings.customMessages = { ...DEFAULT_BREAK_MESSAGES };
  saveSettings();
  renderMessageEditors();

  if (activeBreak && !elements.modalOverlay.hidden) {
    elements.modalMessage.textContent = getBreakMessage(activeBreak.id);
  }

  showMessage("Default break messages restored.", "success");
}

function restartNormalInterval(message) {
  activeBreak = null;
  isPreviewBreak = false;
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
  const enabled = settings.enabledBreakTypes
    .map((id) => DEFAULT_BREAKS.find((breakItem) => breakItem.id === id))
    .filter(Boolean);
  if (!enabled.length) return DEFAULT_BREAKS[0];

  const index = settings.nextBreakIndex % enabled.length;
  return enabled[index];
}

function advanceBreakIndex() {
  const enabledCount = settings.enabledBreakTypes.length || 1;
  settings.nextBreakIndex = (settings.nextBreakIndex + 1) % enabledCount;
}

function getBreakMessage(id) {
  return settings.customMessages?.[id] || DEFAULT_BREAK_MESSAGES[id] || "";
}

function parseWholeMinutes(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 1) return null;
  return Math.floor(number);
}

function normalizeVolume(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return DEFAULT_SETTINGS.soundVolume;
  return Math.min(Math.max(Math.round(number), 20), 100);
}

function normalizeCustomMessages(savedMessages) {
  const normalized = { ...DEFAULT_BREAK_MESSAGES };

  if (savedMessages && typeof savedMessages === "object") {
    DEFAULT_BREAKS.forEach((breakItem) => {
      const message = savedMessages[breakItem.id];
      if (typeof message === "string" && message.trim()) {
        normalized[breakItem.id] = message.trim();
      }
    });
  }

  return normalized;
}

function getVolumeScale() {
  return normalizeVolume(settings.soundVolume) / 100;
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

function formatHistoryDate(value) {
  const date = new Date(value);
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
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
