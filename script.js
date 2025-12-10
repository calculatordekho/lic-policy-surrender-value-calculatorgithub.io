function formatRupees(value) {
  if (isNaN(value)) return "₹0";
  return "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

document.addEventListener("DOMContentLoaded", () => {
  const annualPremiumInput = document.getElementById("annualPremium");
  const yearsPaidInput = document.getElementById("yearsPaid");
  const policyTermInput = document.getElementById("policyTerm");

  const totalPremiumsEl = document.getElementById("totalPremiums");
  const pptYearsEl = document.getElementById("pptYears");
  const factorEl = document.getElementById("surrenderFactor");
  const gsvEl = document.getElementById("gsvValue");

  const calcBtn = document.getElementById("calculateBtn");
  const resetBtn = document.getElementById("resetBtn");

  function calculate() {
    const annualPremium = parseFloat(annualPremiumInput.value) || 0;
    const yearsPaid = parseFloat(yearsPaidInput.value) || 0;
    const pptYears = parseFloat(policyTermInput.value) || 0;

    if (annualPremium <= 0 || yearsPaid <= 0 || pptYears <= 0) {
      alert("Please enter valid positive values for premium, years paid and policy term.");
      return;
    }

    // Total premiums
    const totalPremiums = annualPremium * yearsPaid;

    // Simple surrender factor: Years Paid / PPT
    const factor = Math.min(yearsPaid / pptYears, 1);

    // Estimated GSV
    const gsv = Math.round(totalPremiums * factor);

    // Update UI
    totalPremiumsEl.textContent = formatRupees(totalPremiums);
    pptYearsEl.textContent = `${pptYears} Years`;
    factorEl.textContent = factor.toFixed(2);
    gsvEl.textContent = formatRupees(gsv);
  }

  calcBtn.addEventListener("click", calculate);

  resetBtn.addEventListener("click", () => {
    setTimeout(() => {
      totalPremiumsEl.textContent = "₹0";
      pptYearsEl.textContent = "0 Years";
      factorEl.textContent = "0.00";
      gsvEl.textContent = "₹0";
    }, 0);
  });
});
