import { useEffect, useState } from 'react';

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {

  // app already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return;
  }

  const handler = (e) => {

    e.preventDefault();

    setDeferredPrompt(e);

    const dismissed = localStorage.getItem('installPromptDismissed');

    const dismissedTime = localStorage.getItem('installPromptDismissedTime');

    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    const shouldShow =
      !dismissed ||
      (dismissedTime &&
        Date.now() - parseInt(dismissedTime) > sevenDays);

    if (shouldShow) {

      

        setShowPrompt(true);

        // auto hide
        setTimeout(() => {
          setShowPrompt(false);
        }, 8000);

      
    }
  };

  window.addEventListener('beforeinstallprompt', handler);

  return () => {
    window.removeEventListener('beforeinstallprompt', handler);
  };

}, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
    localStorage.setItem('installPromptDismissedTime', Date.now().toString());
  };

  const handleSwipe = (e) => {
    const touchStart = e.touches[0].clientX;
    
    const handleTouchEnd = (endEvent) => {
      const touchEnd = endEvent.changedTouches[0].clientX;
      const diff = touchStart - touchEnd;
      
      // Swipe left or right more than 100px
      if (Math.abs(diff) > 100) {
        handleDismiss();
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  if (!showPrompt) return null;

  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md animate-slideDown"
      onTouchStart={handleSwipe}
    >
      <div className="bg-gradient-to-r from-[#2F3645] to-[#3d4554] text-white rounded-2xl shadow-2xl p-4 border border-white/10">
        <div className="flex items-center gap-4">
          {/* App Icon */}
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm">Install Dynamic Studio</h3>
            <p className="text-xs text-white/80 mt-0.5">Quick access from your home screen</p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleInstall}
              className="bg-white text-[#2F3645] px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/90 transition"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="text-white/60 hover:text-white p-2 transition"
              aria-label="Dismiss"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Swipe indicator */}
        <div className="mt-2 flex justify-center">
          <div className="w-12 h-1 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default InstallPrompt;