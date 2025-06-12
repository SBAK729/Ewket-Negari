document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const navigations = document.getElementById("navigations");

  let isClicked = false;

  // Toggle on click
  menuIcon.addEventListener("click", () => {
    isClicked = !isClicked;
    dropdownMenu.classList.toggle("show", isClicked);
  });

  document.addEventListener("click", (e) => {
    const isClickInside =
      menuIcon.contains(e.target) || dropdownMenu.contains(e.target);
    if (!isClickInside) {
      dropdownMenu.classList.remove("show");
      isClicked = false;
    }
  });
  // Make navigation sticky top
  const stickyOffset = 100;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= stickyOffset) {
      navigations.classList.add("sticky-nav");
    } else {
      navigations.classList.remove("sticky-nav");
    }
  });

  // Service cards carousel

  const carousel = document.getElementById("carousel");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("previous");

  const cards = [
    {
      img: "asset/image/teaching.jpg",
      title: "Course Delivery Platform",
      desc: "An online learning platform offering structured video lessons, notes, and quizzes aligned with the Ethiopian curriculum for grades 9'-'12. Content is delivered in simple language and local languages for better accessibility.",
    },
    {
      img: "asset/image/exam-preparation.jpg",
      title: "National Exam Preparation",
      desc: "Focused resources to help students prepare for Grade 10 and 12 national exams, including past papers, timed mock exams, and exam tips. Helps students build confidence and improve test-taking skills.",
    },
    {
      img: "asset/image/prograss-track.jpg",
      title: "Student Progress Tracker",
      desc: "A smart dashboard that tracks student performance, study habits, and progress over time. <br /><br /> It gives personalized feedback and study tips to help students improve where they need it most.",
    },
    {
      img: "asset/image/teaching.jpg",
      title: "Course Delivery Platform",
      desc: "An online learning platform offering structured video lessons, notes, and quizzes aligned with the Ethiopian curriculum for grades 9'-'12. Content is delivered in simple language and local languages for better accessibility.",
    },
    {
      img: "asset/image/exam-preparation.jpg",
      title: "National Exam Preparation",
      desc: "Focused resources to help students prepare for Grade 10 and 12 national exams, including past papers, timed mock exams, and exam tips. Helps students build confidence and improve test-taking skills.",
    },
    {
      img: "asset/image/prograss-track.jpg",
      title: "Student Progress Tracker",
      desc: "A smart dashboard that tracks student performance, study habits, and progress over time. <br /><br /> It gives personalized feedback and study tips to help students improve where they need it most.",
    },
  ];

  let startIndex = 0;

  function getCardsPerView() {
    return window.innerWidth >= 780 ? 3 : 1;
  }
  //displaying carousel
  function renderCarousel() {
    const cardsPerView = getCardsPerView();
    const visibleCards = cards.slice(startIndex, startIndex + cardsPerView);
    carousel.innerHTML = "";

    visibleCards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "service-card";
      cardElement.innerHTML = `
        <img src="${card.img}" alt="${card.title}" />
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
        <button>Start Now</button>
      `;
      carousel.appendChild(cardElement);
    });
  }

  //Adding event listener for next and previous button
  nextBtn.addEventListener("click", () => {
    const cardsPerView = getCardsPerView();
    if (startIndex + cardsPerView < cards.length) {
      startIndex++;
      renderCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (startIndex > 0) {
      startIndex--;
      renderCarousel();
    }
  });

  window.addEventListener("resize", () => {
    const maxStartIndex = Math.max(0, cards.length - getCardsPerView());
    if (startIndex > maxStartIndex) {
      startIndex = maxStartIndex;
    }
    renderCarousel();
  });

  renderCarousel();

  // FAQs Accordion logic
  const accordianCards = document.querySelectorAll(".questions-card");

  accordianCards.forEach((card) => {
    const question = card.querySelector(".question");
    const answer = card.querySelector(".answer");
    const iconPath = card.querySelector("svg path");

    // Hide answers initially
    if (answer) answer.style.display = "none";

    // Click listener on the entire question block, including text and icon
    question.addEventListener("click", () => {
      const isActive = card.classList.contains("active");

      // Close all cards
      accordianCards.forEach((card) => {
        card.classList.remove("active");
        const answer = card.querySelector(".answer");
        const path = card.querySelector("svg path");
        if (answer) answer.style.display = "none";
        if (path) {
          // Down arrow
          path.setAttribute(
            "d",
            "M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
          );
        }
      });

      // Toggle this card
      if (!isActive) {
        card.classList.add("active");
        if (answer) answer.style.display = "block";
        if (iconPath) {
          // Up arrow
          iconPath.setAttribute(
            "d",
            "M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"
          );
        }
      }
    });
  });

  // Implementing the chatbot

  // Get DOM elements
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-btn");

  // State variables
  let isProcessing = false;
  let isAuthenticated = false;

  // Initialize chat when page loads
  initChat();

  // Add event listeners
  sendButton.addEventListener("click", handleSendMessage);
  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Initialize chat - check auth
  async function initChat() {
    try {
      // Check if user is signed in
      isAuthenticated = puter.auth.isSignedIn();

      if (isAuthenticated) {
        console.log("User is authenticated, loading chat history...");
      } else {
        console.log(
          "User not signed in yet. Will authenticate on first message."
        );
      }
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  }

  // Handle sending a message
  async function handleSendMessage() {
    const message = userInput.value.trim();

    if (!message || isProcessing) {
      return;
    }

    isProcessing = true;

    userInput.value = "";

    appendMessage("user", message);

    try {
      // Ensure user is authenticated
      if (!isAuthenticated) {
        console.log("Authenticating user...");
        await puter.auth.signIn();
        isAuthenticated = true;
      }

      // Prepare the conversation context
      const contextPrompt = `
You are Ewket Negari’s helpful AI assistant.
Ewket Negari is a startup founded to make education more accessible and personalized in Ethiopia.
We provide digital courses, training programs, and a platform that connects learners with expert educators.
Our mission is to empower students and professionals through affordable, high-quality, and context-aware education.
The team is led by passionate educators, developers, and entrepreneurs dedicated to driving social impact through technology.

We offer:
- Online and offline courses in STEM and soft skills
- Personalized learning paths
- Mentorship and community events
- Tools for schools and instructors

We aim to reach underrepresented learners and become a leading education innovation hub in Africa.

You can support us by:
- Taking or sharing our courses
- Volunteering as a mentor or instructor
- Donating or partnering with us

Be friendly, clear, and helpful in your answers. Respond to greetings like "hello", and explain who you are if someone asks "who are you?" or similar.
`;

      // Build messages array for AI
      const messages = [
        { role: "system", content: contextPrompt },
        { role: "user", content: message },
      ];

      // Get AI response
      const response = await puter.ai.chat(messages);

      // Add AI response to chat
      appendMessage("ai", response);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Show error message
      appendMessage("ai", "Sorry, I encountered an error. Please try again.");
    } finally {
      // Reset processing state and re-enable input
      isProcessing = false;
      userInput.focus();
    }
  }

  // Append a message to the chat box
  function appendMessage(sender, message) {
    const div = document.createElement("div");
    div.className = "chat " + sender;
    div.innerHTML =
      sender === "ai"
        ? `<span class="flag">🤖</span><strong>AI:</strong> ${message}`
        : `<strong>👤 You:</strong> ${message}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Implement how many times the site visited
  let count = localStorage.getItem("visitCount");

  if (!count) {
    count = 0;
  }

  count = parseInt(count) + 1;

  localStorage.setItem("visitCount", count);

  document.getElementById("visit-count").textContent = count;
});
