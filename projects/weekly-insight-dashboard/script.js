const funnelData = [
  ["10%", 4, 24, 31, "#dfe5ec"], ["30%", 6, 38, 30, "#cbd6e2"],
  ["50%", 8, 51, 47, "#9fb8d0"], ["70%", 9, 76, 63, "#5b91bd"],
  ["90%", 5, 64, 58, "#1f6697"], ["선PO", 3, 42, 37, "#e88b45"],
  ["수주", 12, 100, 88, "#16846b"]
];
const divisionData = [
  ["Enterprise", "42.8억 / 38.0억", 100, "113%"],
  ["Managed Service", "35.2억 / 34.0억", 100, "104%"],
  ["Data Center", "29.4억 / 30.0억", 98, "98%"],
  ["Strategic Growth", "14.0억 / 13.0억", 100, "108%"],
  ["Commercial", "7.0억 / 10.0억", 70, "70%"]
];

document.querySelector("#funnel").innerHTML = funnelData.map(([label,count,current,previous,color]) => `
  <div class="funnel-row"><span class="funnel-label"><i style="background:${color}"></i>${label}<small>${count}건</small></span>
  <div class="funnel-bars"><div class="bar-track"><i class="bar previous" style="width:${previous}%"></i></div><div class="bar-track"><i class="bar current" style="width:${current}%"></i></div></div><b>${(current*1.28).toFixed(1)}억</b></div>`).join("");

document.querySelector("#departments").innerHTML = divisionData.map(([name,amount,rate,label]) => `
  <div class="dept-row"><span><b>${name}</b><small>${amount}</small></span><div class="dept-progress"><i style="width:${rate}%"></i></div><strong class="${rate>=100?"good":""}">${label}</strong></div>`).join("");

document.querySelector(".columns").innerHTML = [42,55,48,72,64,81,69,92,74,85,66,78].map((height,index) => `<i style="height:${height}%" title="${index+1}월"></i>`).join("");

document.querySelectorAll(".tabs button").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".tabs button,.tab-panel").forEach(element => element.classList.remove("active"));
  button.classList.add("active");
  document.getElementById(button.dataset.tab).classList.add("active");
}));

document.querySelectorAll(".period-switch button").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".period-switch button").forEach(element => element.classList.remove("active"));
  button.classList.add("active");
  const month = document.querySelector("#month").value;
  document.querySelector("#period-label").textContent = button.dataset.period === "year" ? "2026 연간" : button.dataset.period === "quarter" ? "Q3" : month;
}));

document.querySelector("#month").addEventListener("change", event => {
  if (document.querySelector('[data-period="month"]').classList.contains("active")) document.querySelector("#period-label").textContent = event.target.value;
});
document.querySelector("#division").addEventListener("change", event => document.querySelector("#division-label").textContent = event.target.value);
