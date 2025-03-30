import React from "react";

const TopCards = () => {
  return (
    <div style={styles.card}>
      <div style={styles.iconContainer}>
        <div style={styles.icon}>
            
           
          
        </div>
      </div>
      <h3 style={styles.title}>Grow</h3>
      <p style={styles.description}>
        Learn about Google technologies through workshops, events, and
        project-based learning.
      </p>
    </div>
  );
};

const styles = {
  card: {
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
    textAlign: "left",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "10px",
  },
  icon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#fde8e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
  },
};

export default TopCards;
