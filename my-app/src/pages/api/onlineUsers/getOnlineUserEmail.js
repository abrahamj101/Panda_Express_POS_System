const getOnlineUsersEmail = async (email) => {
    try {
      // Ensure email is not empty
      if (!email) {
        throw new Error("Email is required");
      }
  
      // Call the backend endpoint to check if the user exists
      const response = await fetch(`https://project-3-team-3-b-backend.vercel.app/api/online-users/exists?email=${encodeURIComponent(email)}`);
  
      // If the user is not found, return null
      if (response.status === 404) {
        console.log("User not found");
        return null;
      }
  
      // If the request was not successful, throw an error
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      // Parse the response and return the user data
      const user = await response.json();
      return user; // This will be the user object from the backend
    } catch (error) {
      console.error("Error checking user existence:", error.message);
      throw error; // Rethrow to handle elsewhere if necessary
    }
  };
  
  export default getOnlineUsersEmail;
  