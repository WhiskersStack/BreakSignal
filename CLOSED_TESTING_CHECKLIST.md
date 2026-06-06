# BreakSignal Closed Testing Checklist

Complete this checklist with the exact build intended for the Google Play closed testing track.

## Build Information

```text
App name: BreakSignal
Application ID: com.whiskersstack.breaksignal
Version name: 1.0.0
Version code:
Commit:
Device(s):
Android version(s):
Tester:
Date:
```

## Store Metadata To Confirm

- Developer: WhiskersStack
- Support email: support@break-signal.com
- Support website: https://www.break-signal.com/
- Privacy policy: https://www.break-signal.com/privacy.html

## Install And Launch

- [ ] Install the app successfully.
- [ ] Confirm the BreakSignal launcher icon appears correctly.
- [ ] Launch the app.
- [ ] Confirm the dark branded splash screen appears correctly.
- [ ] Confirm the timer screen loads without a blank screen or crash.
- [ ] Close and reopen the app.

## Timer And Reminder Flow

- [ ] Start the timer.
- [ ] Pause the timer.
- [ ] Resume the timer.
- [ ] Reset the timer.
- [ ] Trigger a test break reminder.
- [ ] Complete a break.
- [ ] Snooze a break.
- [ ] Skip a break.
- [ ] Confirm timer status and countdown remain understandable.

## Settings And Persistence

- [ ] Change the reminder interval.
- [ ] Change the snooze duration.
- [ ] Enable and disable break types.
- [ ] Change the selected preset.
- [ ] Enable and disable sound.
- [ ] Preview each sound option.
- [ ] Change the volume.
- [ ] Change the visual theme.
- [ ] Toggle compact mode.
- [ ] Confirm browser notification controls are not shown in Android.
- [ ] Close and reopen the app.
- [ ] Confirm saved settings load.

## History And Local Data

- [ ] Confirm completed, snoozed, and skipped breaks appear in history.
- [ ] Confirm daily stats update.
- [ ] Clear history and confirm the action.
- [ ] Confirm no account, login, analytics, or advertising UI appears.

## Layout And Accessibility

- [ ] Test portrait layout.
- [ ] Test a smaller screen size.
- [ ] Confirm no horizontal overflow.
- [ ] Confirm no text clipping.
- [ ] Confirm buttons and controls have comfortable tap targets.
- [ ] Confirm settings and history scroll correctly.
- [ ] Confirm modal content and actions remain accessible.
- [ ] Confirm text contrast and readability.

## Stability

- [ ] Check for crashes during all tested flows.
- [ ] Check Android logs for app errors.
- [ ] Test with the device offline.
- [ ] Confirm the app still launches and the timer works offline.
- [ ] Confirm website-only install, notification, SEO, and footer UI remain hidden in Android.

## Tester Feedback

Collect feedback on:

- Timer clarity
- Button tap comfort
- Reminder modal clarity
- Visual professionalism
- Notification expectations
- Sound behavior
- Overall usefulness

## Final Sign-Off

- [ ] All blocking defects are fixed or documented.
- [ ] Privacy policy and Data Safety notes match the tested build.
- [ ] Store listing and screenshots match the tested build.
- [ ] No signing secrets or release binaries are tracked by Git.
- [ ] The next `versionCode` is unique for the planned upload.
