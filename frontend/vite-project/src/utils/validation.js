export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateNumber = (value, min = 0) => {
  const num = Number(value);
  return !isNaN(num) && num >= min;
};

export const getValidationErrors = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const rule = rules[field];

    if (rule.required && !validateRequired(value)) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      return;
    }

    if (rule.email && value && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email address';
      return;
    }

    if (rule.password && value && !validatePassword(value)) {
      errors[field] = 'Password must be at least 6 characters long';
      return;
    }

    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `Must be at least ${rule.minLength} characters long`;
      return;
    }

    if (rule.number && value && !validateNumber(value, rule.min)) {
      errors[field] = rule.min ? `Must be a number greater than or equal to ${rule.min}` : 'Must be a valid number';
      return;
    }
  });

  return errors;
};
