let active = 0;
let navigationActive = false;
let navigationTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export const loadingStore = {
  start() {
    active += 1;
    emit();
  },
  end() {
    active = Math.max(0, active - 1);
    emit();
  },
  startNavigation() {
    navigationActive = true;
    if (navigationTimer) clearTimeout(navigationTimer);
    navigationTimer = setTimeout(() => {
      navigationActive = false;
      navigationTimer = null;
      emit();
    }, 10000);
    emit();
  },
  endNavigation() {
    if (!navigationActive) return;
    navigationActive = false;
    if (navigationTimer) clearTimeout(navigationTimer);
    navigationTimer = null;
    emit();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot: () => active + Number(navigationActive),
  getServerSnapshot: () => 0,
};
