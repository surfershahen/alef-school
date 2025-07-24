import { useEffect, useRef, useCallback } from "react";
import {
  trackFormStart,
  trackFormAbandonment,
  trackFormSubmissionSuccess,
} from "@/utils/vercelAnalytics";

export const useFormTracking = (formName) => {
  const formStarted = useRef(false);
  const formStartTime = useRef(null);
  const fieldsInteracted = useRef(new Set());
  const lastInteractedField = useRef(null);
  const abandonmentTimer = useRef(null);

  // Track when user starts filling the form (first input interaction)
  const handleFormStart = useCallback(
    (fieldName) => {
      if (!formStarted.current) {
        formStarted.current = true;
        formStartTime.current = Date.now();
        trackFormStart(formName, fieldName);
        console.log(`📝 Form "${formName}" started with field: ${fieldName}`);
      }

      fieldsInteracted.current.add(fieldName);
      lastInteractedField.current = fieldName;

      // Reset abandonment timer
      if (abandonmentTimer.current) {
        clearTimeout(abandonmentTimer.current);
      }

      // Set new abandonment timer (30 seconds of inactivity)
      abandonmentTimer.current = setTimeout(() => {
        handleFormAbandonment();
      }, 30000); // 30 seconds
    },
    [formName]
  );

  // Track form abandonment
  const handleFormAbandonment = useCallback(() => {
    if (formStarted.current && formStartTime.current) {
      const timeSpent = Date.now() - formStartTime.current;
      const fieldsCompleted = fieldsInteracted.current.size;

      trackFormAbandonment(
        formName,
        lastInteractedField.current,
        timeSpent,
        fieldsCompleted
      );

      console.log(
        `❌ Form "${formName}" abandoned at field: ${
          lastInteractedField.current
        }, fields completed: ${fieldsCompleted}, time spent: ${Math.round(
          timeSpent / 1000
        )}s`
      );

      // Reset state
      formStarted.current = false;
      formStartTime.current = null;
      fieldsInteracted.current.clear();
      lastInteractedField.current = null;
    }
  }, [formName]);

  // Track successful form submission
  const handleFormSuccess = useCallback(
    (submissionData = {}) => {
      if (formStartTime.current) {
        const timeSpent = Date.now() - formStartTime.current;
        const fieldsCompleted = fieldsInteracted.current.size;

        trackFormSubmissionSuccess(formName, {
          time_to_complete: timeSpent,
          fields_completed: fieldsCompleted,
          ...submissionData,
        });

        console.log(
          `✅ Form "${formName}" submitted successfully, time spent: ${Math.round(
            timeSpent / 1000
          )}s, fields completed: ${fieldsCompleted}`
        );

        // Clear abandonment timer
        if (abandonmentTimer.current) {
          clearTimeout(abandonmentTimer.current);
        }

        // Reset state
        formStarted.current = false;
        formStartTime.current = null;
        fieldsInteracted.current.clear();
        lastInteractedField.current = null;
      }
    },
    [formName]
  );

  // Track when user leaves the page (potential abandonment)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formStarted.current) {
        handleFormAbandonment();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && formStarted.current) {
        // User switched tabs/minimized window - potential abandonment
        setTimeout(() => {
          if (document.hidden && formStarted.current) {
            handleFormAbandonment();
          }
        }, 10000); // 10 seconds after tab switch
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (abandonmentTimer.current) {
        clearTimeout(abandonmentTimer.current);
      }
    };
  }, [handleFormAbandonment]);

  return {
    handleFormStart,
    handleFormSuccess,
    handleFormAbandonment,
    isFormStarted: formStarted.current,
    fieldsCompleted: fieldsInteracted.current.size,
  };
};
