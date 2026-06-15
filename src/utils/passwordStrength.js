export const characterGroups = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "~!@#$%^&*()_-+={[}]|:;<,>.?/",
};

export function getCharsetLengthFromOptions({
  useUppercase,
  useLowercase,
  useNumbers,
  useSymbols,
}) {
  let size = 0;
  if (useUppercase) size += characterGroups.uppercase.length;
  if (useLowercase) size += characterGroups.lowercase.length;
  if (useNumbers) size += characterGroups.numbers.length;
  if (useSymbols) size += characterGroups.symbols.length;
  return size;
}

export function getCharsetLengthFromPassword(password) {
  let size = 0;
  if (/[A-Z]/.test(password)) size += characterGroups.uppercase.length;
  if (/[a-z]/.test(password)) size += characterGroups.lowercase.length;
  if (/[0-9]/.test(password)) size += characterGroups.numbers.length;
  if (/[^A-Za-z0-9]/.test(password)) size += characterGroups.symbols.length;
  return size;
}

export function getStrengthDetails(passwordLength, charsetLength) {
  if (!passwordLength || !charsetLength) {
    return {
      entropy: 0,
      percent: 0,
      label: "No password",
      status: "exception",
      feedback: "Enter a password to check its strength.",
    };
  }

  const entropy = passwordLength * Math.log2(charsetLength);
  const percent = Math.min(Math.round((entropy / 100) * 100), 100);

  if (entropy >= 90) {
    return {
      entropy,
      percent,
      label: "Very strong",
      status: "success",
      feedback: "Good length and character variety.",
    };
  }

  if (entropy >= 70) {
    return {
      entropy,
      percent,
      label: "Strong",
      status: "normal",
      feedback: "Solid for most accounts.",
    };
  }

  if (entropy >= 50) {
    return {
      entropy,
      percent,
      label: "Moderate",
      status: "normal",
      feedback: "Increase length or add more character types.",
    };
  }

  return {
    entropy,
    percent,
    label: "Weak",
    status: "exception",
    feedback: "Use a longer password with more character variety.",
  };
}

export function getPasswordChecks(password) {
  return [
    { label: "At least 12 characters", passed: password.length >= 12 },
    { label: "Uppercase letter", passed: /[A-Z]/.test(password) },
    { label: "Lowercase letter", passed: /[a-z]/.test(password) },
    { label: "Number", passed: /[0-9]/.test(password) },
    { label: "Symbol", passed: /[^A-Za-z0-9]/.test(password) },
  ];
}
