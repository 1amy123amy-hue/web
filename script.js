document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const tableBody = document.querySelector("#resultTable tbody");

  const nameInput = document.getElementById("nameInput");
  const genderInput = document.getElementById("genderInput");
  const ageInput = document.getElementById("ageInput");

  const otherCheckbox = document.getElementById("otherCheckbox");
  const otherText = document.getElementById("otherText");
  const toast = document.getElementById("successToast");

  otherCheckbox.addEventListener("change", () => {
    const enabled = otherCheckbox.checked;
    otherText.disabled = !enabled;
    if (!enabled) otherText.value = "";
    if (enabled) otherText.focus();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const gender = genderInput.value.trim();
    const age = ageInput.value.trim();

    if (!name) {
      nameInput.focus();
      showToast("請先填寫姓名 🙌");
      return;
    }

    const checked = Array.from(document.querySelectorAll("input[name='interest']:checked"));
    let interests = checked.map(cb => cb.value);

    const otherVal = otherText.value.trim();
    const hasOtherChecked = otherCheckbox.checked;

    // 修正：其他內容前面加上 "其他："
    if (hasOtherChecked && interests.includes("其他")) {
      if (otherVal) {
        interests[interests.indexOf("其他")] = "其他：" + otherVal;
      }
    } else if (!hasOtherChecked && interests.length === 0 && otherVal) {
      interests = ["其他：" + otherVal];
    }

    const interestText = interests.join("、");

    const row = tableBody.insertRow();
    row.classList.add("new-row");

    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = gender;
    row.insertCell(2).textContent = age;
    row.insertCell(3).textContent = interestText;

    showToast("已加入清單 🎉");

    form.reset();
    otherText.disabled = true;
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    toast.addEventListener("animationend", () => {
      toast.classList.remove("show");
    }, { once: true });
  }
});
