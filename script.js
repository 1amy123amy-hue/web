document.getElementById("signupForm").addEventListener("submit", function(e) {
e.preventDefault(); // 防止表單重新載入
const name = document.getElementById("name").value;
const checkboxes =
document.querySelectorAll("input[name='interest']:checked");
const interests = Array.from(checkboxes).map(cb =>
cb.value).join("、");
// 新增一列到表格
const table = document.getElementById("resultTable");
const row = table.insertRow();
const cell1 = row.insertCell(0);
const cell2 = row.insertCell(1);
cell1.textContent = name;
cell2.textContent = interests;
// 清空表單
document.getElementById("signupForm").reset();
});