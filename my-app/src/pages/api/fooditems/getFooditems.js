const getFoodItems = async () => {
  try {
      const response = await fetch("http://localhost:5001/api/fooditems");
      if (!response.ok) {
          const errorText = await response.text(); // Read the error as text
          console.error("API Error:", response.status, errorText);
          throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      const jsonData = await response.json();
      return jsonData;
  } catch (err) {
      console.error("Fetch Error:", err.message);
      throw err;
  }
};

export default getFoodItems;
