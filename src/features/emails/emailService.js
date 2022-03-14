const API_URL = "https://flipkart-email-mock.now.sh/";

const getEmails = async () => {
  const response = await fetch(API_URL);
  const results = await response.json();
  return results;
};

const getEmail = async (emailId) => {
  const response = await fetch(`${API_URL}?id=${emailId}`);
  const results = await response.json();
  return results;
};

const emailService = {
  getEmails,
  getEmail,
};

export default emailService;
