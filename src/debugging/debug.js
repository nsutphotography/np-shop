// debugging/debug.js
const debugLib = require('debug');

// Base namespace for your application
const APP_NAMESPACE = 'app';

// ANSI color codes for console output
const COLORS = {
  folder: '\x1b[34m', // Blue
  file: '\x1b[32m', // Green
  function: '\x1b[36m', // Cyan
  reset: '\x1b[0m' // Reset
};

/**
 * Create a debug logger for a specific namespace.
 */
const createDebug = (namespace) => {
  const debugInstance = debugLib(namespace);

  return (message, ...args) => {
    let functionName = 'anonymous';
    let fileName = 'unknown';
    let folderName = 'unknown';

    try {
      const stack = new Error().stack;

      if (stack) {
        const stackLines = stack.split('\n');

        // Extract function name and file path from the stack trace
        const match = stackLines[2]?.match(/at (.+?) \((.+?):\d+:\d+\)/);
        if (match) {
          functionName = match[1];
          let filePath = match[2];

          // Remove query parameters (e.g., ?t=1738238037352) from the file path
          filePath = filePath.split('?')[0];

          // Extract file name and folder name using string manipulation
          const parts = filePath.split('/');
          fileName = parts.pop() || 'unknown';
          folderName = parts.pop() || 'unknown';

          // Remove file extension (e.g., .tsx)
          fileName = fileName.replace(/\.[^/.]+$/, '');
        }
      }
    } catch (e) {
      console.warn('Error parsing stack trace for function name:', e);
    }

    // Format the log with colors for folder, file, and function name
    const formattedMessage = `${COLORS.folder}[${folderName}]${COLORS.reset}/${COLORS.file}${fileName}${COLORS.reset}:${COLORS.function}${functionName}${COLORS.reset}\n ${message}`;

    debugInstance(formattedMessage, ...args);
  };
};

// Create a default log instance using the base namespace
const log = createDebug(APP_NAMESPACE);

// Export both `createDebug` and `log` for flexible use
module.exports = { createDebug, log };
module.exports.default = log;
