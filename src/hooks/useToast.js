import useUIStore from '../store/uiStore';

const useToast = () => {
  const showToast = useUIStore((s) => s.showToast);
  const hideToast = useUIStore((s) => s.hideToast);

  return {
    success: (msg, duration) => showToast(msg, 'success', duration),
    error: (msg, duration) => showToast(msg, 'error', duration),
    info: (msg, duration) => showToast(msg, 'info', duration),
    warning: (msg, duration) => showToast(msg, 'warning', duration),
    hide: hideToast,
  };
};

export default useToast;
