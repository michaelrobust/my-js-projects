export const isValidUUID = (str) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };
  
  // Helper function to handle errors consistently
  export const handleError = (res, statusCode, message) => {
    return res.status(statusCode).json({ error: message });
  };