const ContestPage = () => {
  // Add a check before accessing the first element
  if (!data || !data.length) {
    return <div>Loading...</div>; // Or any loading state
  }

  // Now it's safe to access data[0]
  return (
    // Your component JSX
  );
};