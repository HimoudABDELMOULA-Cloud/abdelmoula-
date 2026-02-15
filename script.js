function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

function scrollToServices() {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
}

async function sendMessage(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById("successMsg").style.color = "#00ff88";
      document.getElementById("successMsg").innerText = data.msg;
      document.querySelector(".contact-form").reset();
    } else {
      document.getElementById("successMsg").style.color = "red";
      document.getElementById("successMsg").innerText = "Erreur ❌";
    }
  } catch (err) {
    document.getElementById("successMsg").style.color = "red";
    document.getElementById("successMsg").innerText =
      "Erreur connexion au serveur ❌";
  }
}
