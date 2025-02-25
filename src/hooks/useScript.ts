import { useEffect, useState } from 'react';

type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

export function useScript(src: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(src ? 'loading' : 'idle');

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    // Check if script already exists
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    if (!script) {
      // Create script
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);

      // Add event handlers
      const setAttributeFromEvent = (event: Event) => {
        const newStatus = event.type === 'load' ? 'ready' : 'error';
        script.setAttribute('data-status', newStatus);
      };

      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    } else {
      // Grab existing script status from attribute and set to state
      const currentStatus = script.getAttribute('data-status') as ScriptStatus;
      setStatus(currentStatus);
    }

    // Script event handler to update status in state
    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };

    // Add event listeners
    script.addEventListener('load', setStateFromEvent);
    script.addEventListener('error', setStateFromEvent);

    // Remove event listeners on cleanup
    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent);
        script.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src]);

  return status;
}
