function updateAnalogWatch() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const secondRotation = (seconds / 60) * 360;
  const minuteRotation = ((minutes + seconds / 60) / 60) * 360;
  const hourRotation = ((hours + minutes / 60) / 12) * 360;

  document.getElementById('hour-hand').style.transform = `rotate(${hourRotation}deg)`;
  document.getElementById('minute-hand').style.transform = `rotate(${minuteRotation}deg)`;
  document.getElementById('second-hand').style.transform = `rotate(${secondRotation}deg)`;
}

setInterval(updateAnalogWatch, 1000);

updateAnalogWatch();

document.addEventListener("DOMContentLoaded", function () {
  const reviewForm = document.getElementById("review-form");
  const reviewList = document.getElementById("review-list");

  const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

  function displayReviews() {
    reviewList.innerHTML = "";
    storedReviews.forEach(function (review, index) {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Review ${index + 1}:</strong><br>
        Name: ${review.name}<br>
        Email: ${review.email}<br>
        Review: ${review.reviewText}<br><br>
      `;
      reviewList.appendChild(li);
    });
  }

  displayReviews();

  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const reviewText = document.getElementById("review-text").value;

    const reviewData = {
      name: name,
      email: email,
      reviewText: reviewText,
    };
    
    storedReviews.push(reviewData);
    localStorage.setItem("reviews", JSON.stringify(storedReviews));

    displayReviews();

    alert("Review submitted successfully!");

    reviewForm.reset();
  });
});