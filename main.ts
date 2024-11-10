//listing element
document
  .getElementById(`resumeForm`)
  ?.addEventListener(`submit`, function (event) {
    event.preventDefault();

    //type assertion

    const profilePictureInput = document.getElementById(
      `profilePicture`
    ) as HTMLInputElement;

    const nameElement = document.getElementById(`name`) as HTMLInputElement;
    const emailElement = document.getElementById(`email`) as HTMLInputElement;
    const phoneElement = document.getElementById(`phone`) as HTMLInputElement;
    const educationElement = document.getElementById(
      `education`
    ) as HTMLInputElement;
    const experienceElement = document.getElementById(
      `experience`
    ) as HTMLInputElement;
    const skillsElement = document.getElementById(`skills`) as HTMLInputElement;

    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement
    ) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;

      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";

      //create resume output

      const resumeHTML = `
<h2>Resume</h2>

${
  profilePictureURL
    ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">`
    : ""
}

<p> <strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span> </p>
<p> <strong>Email:</strong> <span id="edit-email" class="editable"> ${email} </span> </p>
<p> <strong>Phone Number:</strong> <span id="edit-phone" class="editable"> ${phone} </span> </p>

<h3>Education:</h3>
<p  id="edit-education" class="editable">${education}</P>

<h3>Experience:</h3>
<p id="edit-experience" class="editable">${experience}</P>

<h3>Skills:</h3>
<p id="edit-skills" class="editable">${skills}</P>
`;

      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeHTML;
        resumeOutputElement.classList.remove("hidden");

        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download As PDF";
        downloadButton.addEventListener("click", () => {
          window.print();
        });

        buttonsContainer.appendChild(downloadButton);

        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click",async() => {
          try {
            const ShareableLink = `https://yourdomain.com/resumes/${name.replace(
              /\s+/g,
              "_"
            )}_cv.html`;

            await navigator.clipboard.writeText(ShareableLink);
            alert("Shareable Link Copied To Clipboard!");
          } catch (err) {
            console.error("Failed to copy Link:", err);
            alert("Failed to copy link to clipboard. Please try again.");
          }
        });
        buttonsContainer.appendChild(shareLinkButton);
      } else {
        console.error("Resume output container not found");
      }
    } else {
      console.error("Forms elements are missing");
    }
  });
