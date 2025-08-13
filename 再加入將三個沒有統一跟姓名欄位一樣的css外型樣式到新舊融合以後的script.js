document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // 取得表單資料
    const name = document.getElementById("inputName").value.trim();
    const gender = document.getElementById("inputGender").value.trim();
    const age = document.getElementById("inputAge").value.trim();
    const buyerEmail = document.getElementById("inputBuyerEmail").value.trim();
    const sellerEmail = document.getElementById("inputSellerEmail").value.trim();

    const checkboxes = document.querySelectorAll("input[name='interest']:checked");
    let interests = Array.from(checkboxes).map(cb => cb.value);

    const otherValue = document.getElementById("inputOther").value.trim();
    if (interests.includes("其他") && otherValue) {
        interests[interests.indexOf("其他")] = "其他：" + otherValue;
    }

    // 新增提交時間
    const now = new Date();
    const submitTime = now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, '0') + "-" +
        String(now.getDate()).padStart(2, '0') + " " +
        String(now.getHours()).padStart(2, '0') + ":" +
        String(now.getMinutes()).padStart(2, '0') + ":" +
        String(now.getSeconds()).padStart(2, '0');

    // 將資料新增到表格
    const table = document.getElementById("resultTable");
    const row = table.insertRow();
    row.classList.add("new-row");

    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = gender;
    row.insertCell(2).textContent = age;
    row.insertCell(3).textContent = buyerEmail;
    row.insertCell(4).textContent = sellerEmail;
    row.insertCell(5).textContent = interests.join("、");
    row.insertCell(6).textContent = submitTime;

    // 清空表單
    document.getElementById("signupForm").reset();
});

// 下載 CSV
document.getElementById("downloadCsvBtn").addEventListener("click", function() {
    const table = document.getElementById("resultTable");
    let csv = [];
    for (let row of table.rows) {
        let cols = [];
        for (let cell of row.cells) {
            let text = cell.innerText.replace(/"/g, '""'); // 避免引號衝突
            cols.push(`"${text}"`);
        }
        csv.push(cols.join(","));
    }
    const csvContent = "\uFEFF" + csv.join("\n"); // 加 BOM 避免 Excel 中文亂碼

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "報名與市場調查清單.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
